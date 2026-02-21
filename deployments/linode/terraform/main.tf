terraform {
  required_providers {
    linode = {
      source  = "linode/linode"
      version = "~> 2.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.0"
    }
  }
}

provider "linode" {
  token = var.linode_token
}

# Create LKE Cluster
resource "linode_lke_cluster" "agentx" {
  label       = var.cluster_name
  k8s_version = "1.29"
  region      = var.region
  
  tags = ["agentx", "production"]

  # Main app node pool - handles web requests
  pool {
    type  = var.app_node_type
    count = var.app_node_count
    
    autoscaler {
      min_nodes = 2
      max_nodes = 5
    }
  }

  # Worker node pool - background jobs, queues
  pool {
    type  = var.worker_node_type
    count = var.worker_node_count
    
    autoscaler {
      min_nodes = 1
      max_nodes = 5
    }
  }

  # GPU node pool - AI inference (optional)
  dynamic "pool" {
    for_each = var.gpu_node_count > 0 ? [1] : []
    content {
      type  = var.gpu_node_type
      count = var.gpu_node_count
    }
  }
}

# Get kubeconfig
resource "local_file" "kubeconfig" {
  content  = base64decode(linode_lke_cluster.agentx.kubeconfig)
  filename = "${path.module}/kubeconfig"
}

# Configure Kubernetes provider
provider "kubernetes" {
  config_path = local_file.kubeconfig.filename
}

provider "helm" {
  kubernetes {
    config_path = local_file.kubeconfig.filename
  }
}

# Install NGINX Ingress Controller
resource "helm_release" "nginx_ingress" {
  name       = "nginx-ingress"
  repository = "https://kubernetes.github.io/ingress-nginx"
  chart      = "ingress-nginx"
  namespace  = "ingress-nginx"
  create_namespace = true

  set {
    name  = "controller.service.type"
    value = "LoadBalancer"
  }

  set {
    name  = "controller.replicaCount"
    value = "2"
  }
}

# Install cert-manager
resource "helm_release" "cert_manager" {
  name       = "cert-manager"
  repository = "https://charts.jetstack.io"
  chart      = "cert-manager"
  namespace  = "cert-manager"
  create_namespace = true

  set {
    name  = "installCRDs"
    value = "true"
  }
}

# Install Redis for caching/queues
resource "helm_release" "redis" {
  name       = "redis"
  repository = "https://charts.bitnami.com/bitnami"
  chart      = "redis"
  namespace  = "agentx"
  create_namespace = true

  set {
    name  = "auth.enabled"
    value = "true"
  }

  set {
    name  = "auth.password"
    value = "agentx-redis-password"
  }
}

# Output cluster info
output "cluster_id" {
  value = linode_lke_cluster.agentx.id
}

output "cluster_status" {
  value = linode_lke_cluster.agentx.status
}

output "kubeconfig_path" {
  value = local_file.kubeconfig.filename
}

output "api_endpoints" {
  value = linode_lke_cluster.agentx.api_endpoints
}