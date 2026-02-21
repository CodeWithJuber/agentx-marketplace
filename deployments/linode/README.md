# Linode LKE Deployment Guide

## 🚀 Quick Deploy to Linode

### Prerequisites
- Linode account (https://cloud.linode.com)
- Linode API token (with read/write access)
- Terraform installed
- kubectl installed

### 1. Get Linode API Token
1. Go to https://cloud.linode.com/profile/tokens
2. Create a Personal Access Token
3. Copy the token

### 2. Deploy with One Command
```bash
export LINODE_TOKEN="your-linode-api-token"
cd deployments/linode
./deploy.sh
```

### 3. Manual Deployment
```bash
# Set token
export LINODE_TOKEN="your-token"

# Deploy infrastructure
cd terraform
terraform init
terraform apply -var="linode_token=$LINODE_TOKEN"

# Configure kubectl
export KUBECONFIG="$(pwd)/kubeconfig"

# Deploy app
cd ../k8s
kubectl apply -f ../../k8s/
kubectl apply -f .
```

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Linode Cloud                            │
│                                                             │
│  ┌─────────────────┐    ┌─────────────────┐                │
│  │  App Node Pool  │    │ Worker Node Pool│                │
│  │  (Web Servers)  │    │ (Background)    │                │
│  │                 │    │                 │                │
│  │  ┌───────────┐  │    │  ┌───────────┐  │                │
│  │  │ App Pod 1 │  │    │  │ Worker 1  │  │                │
│  │  │ App Pod 2 │  │    │  │ Worker 2  │  │                │
│  │  │ App Pod 3 │  │    │  │ Worker 3  │  │                │
│  │  └───────────┘  │    │  └───────────┘  │                │
│  │                 │    │                 │                │
│  │  g6-standard-2  │    │  g6-standard-4  │                │
│  │  2GB RAM, 1 CPU │    │  4GB RAM, 2 CPU │                │
│  │  $10/mo each    │    │  $20/mo each    │                │
│  └─────────────────┘    └─────────────────┘                │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Redis (Message Queue)                   │   │
│  │         Handles job distribution                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 💰 Cost Breakdown

| Component | Specs | Cost/Month |
|-----------|-------|------------|
| App Nodes | 2x g6-standard-2 | $20 |
| Worker Nodes | 2x g6-standard-4 | $40 |
| Load Balancer | NodeBalancer | $10 |
| Block Storage | 50GB | $5 |
| **Total** | | **~$75/mo** |

---

## 🔄 Worker Offloading

### What Runs on Workers?
- ✅ Email notifications
- ✅ Analytics reports
- ✅ Creator payouts
- ✅ AI model training
- ✅ Data exports
- ✅ Image processing

### What Runs on App Nodes?
- ✅ Web requests
- ✅ API endpoints
- ✅ Real-time features
- ✅ User authentication

### Auto-Scaling
- **App nodes**: 2-5 based on CPU/memory
- **Worker nodes**: 1-5 based on queue length

---

## 📊 Monitoring

```bash
# View worker queue length
kubectl exec -it deployment/redis -n agentx -- redis-cli LLEN jobs:queue

# View worker logs
kubectl logs -f deployment/agentx-worker -n agentx

# View all pods
kubectl get pods -n agentx -o wide

# Check node usage
kubectl top nodes
kubectl top pods -n agentx
```

---

## 🔧 Scaling

### Scale App Nodes
```bash
# Manual scale
kubectl scale deployment agentx-app --replicas=5 -n agentx

# Or update Terraform
cd terraform
terraform apply -var="app_node_count=3"
```

### Scale Worker Nodes
```bash
# Manual scale
kubectl scale deployment agentx-worker --replicas=5 -n agentx

# Or update Terraform
cd terraform
terraform apply -var="worker_node_count=4"
```

---

## 🗑️ Cleanup

```bash
cd terraform
terraform destroy -var="linode_token=$LINODE_TOKEN"
```

---

## Troubleshooting

### Workers not processing jobs
```bash
# Check Redis connection
kubectl exec -it deployment/redis -n agentx -- redis-cli ping

# Restart workers
kubectl rollout restart deployment/agentx-worker -n agentx
```

### High queue length
```bash
# Check queue
kubectl exec -it deployment/redis -n agentx -- redis-cli LRANGE jobs:queue 0 10

# Scale up workers
kubectl scale deployment agentx-worker --replicas=5 -n agentx
```