// Job queue utilities for offloading work to Linode workers
import { createClient } from '@redis/client';

const redis = createClient({
  url: process.env.REDIS_URL,
});

redis.connect();

export type JobType = 'email' | 'report' | 'payout' | 'agent-training' | 'image-process';

interface JobOptions {
  priority?: number;  // 1-10, higher = more important
  delay?: number;     // Delay in milliseconds
  retries?: number;   // Number of retry attempts
}

export async function enqueueJob(
  type: JobType,
  data: any,
  options: JobOptions = {}
): Promise<string> {
  const jobId = `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const job = {
    id: jobId,
    type,
    data,
    priority: options.priority || 5,
    retries: options.retries || 3,
    createdAt: new Date().toISOString(),
    attempts: 0,
  };
  
  // Add to priority queue
  const score = options.delay 
    ? Date.now() + options.delay 
    : Date.now() - (options.priority || 5) * 1000000;
  
  await redis.zAdd('jobs:scheduled', {
    score,
    value: JSON.stringify(job),
  });
  
  // Also add to regular queue for immediate processing
  if (!options.delay) {
    await redis.lPush('jobs:queue', JSON.stringify(job));
  }
  
  console.log(`[Queue] Job ${jobId} (${type}) enqueued`);
  return jobId;
}

// Helper functions for common jobs
export const jobs = {
  // Send email notification
  sendEmail: (to: string, subject: string, body: string) =>
    enqueueJob('email', { to, subject, body }, { priority: 7 }),
  
  // Generate daily report
  generateReport: (userId: string, reportType: string) =>
    enqueueJob('report', { userId, reportType }, { priority: 3 }),
  
  // Process creator payout
  processPayout: (userId: string, amount: number) =>
    enqueueJob('payout', { userId, amount }, { priority: 8 }),
  
  // Train AI agent
  trainAgent: (agentId: string, trainingData: any) =>
    enqueueJob('agent-training', { agentId, trainingData }, { priority: 4 }),
  
  // Process image
  processImage: (imageUrl: string, operations: string[]) =>
    enqueueJob('image-process', { imageUrl, operations }, { priority: 5 }),
};

// Get queue stats
export async function getQueueStats() {
  const [pending, scheduled, completed, failed] = await Promise.all([
    redis.lLen('jobs:queue'),
    redis.zCard('jobs:scheduled'),
    redis.lLen('jobs:completed'),
    redis.lLen('jobs:failed'),
  ]);
  
  return {
    pending,
    scheduled,
    completed,
    failed,
    total: pending + scheduled + completed + failed,
  };
}