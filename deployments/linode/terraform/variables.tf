# Linode Deployment Configuration
# Using LKE (Linode Kubernetes Engine) with worker node pools

variable "linode_token" {
  description = "Linode API Token"
  type        = string
  sensitive   = true
}

variable "cluster_name" {
  description = "Name of the Kubernetes cluster"
  type        = string
  default     = "agentx-cluster"
}

variable "region" {
  description = "Linode region"
  type        = string
  default     = "us-east"  # Newark, NJ
}

# Main application node pool - handles web traffic
variable "app_node_type" {
  description = "Linode instance type for app nodes"
  type        = string
  default     = "g6-standard-2"  # 2GB RAM, 1 CPU, $10/mo
}

variable "app_node_count" {
  description = "Number of app nodes"
  type        = number
  default     = 2
}

# Worker node pool - handles background jobs, AI processing
variable "worker_node_type" {
  description = "Linode instance type for worker nodes"
  type        = string
  default     = "g6-standard-4"  # 4GB RAM, 2 CPU, $20/mo
}

variable "worker_node_count" {
  description = "Number of worker nodes"
  type        = number
  default     = 2
}

# GPU nodes for AI model inference (optional)
variable "gpu_node_type" {
  description = "Linode GPU instance type"
  type        = string
  default     = "g6-gpu-rtx4000-a1"  # GPU + 32GB RAM
}

variable "gpu_node_count" {
  description = "Number of GPU nodes"
  type        = number
  default     = 0  # Set to 1+ if using AI model inference
}