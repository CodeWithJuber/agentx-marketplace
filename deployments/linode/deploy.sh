#!/bin/bash
# Linode LKE Deployment Script with Worker Offloading

set -e

LINODE_TOKEN="${LINODE_TOKEN:-}"
CLUSTER_NAME="${CLUSTER_NAME:-agentx-cluster}"
REGION="${REGION:-us-east}"

echo "🚀 Deploying AgentX to Linode Kubernetes Engine (LKE)..."

# Check for Linode CLI
if ! command -v linode-cli &> /dev/null; then
    echo "📦 Installing Linode CLI..."
    pip install linode-cli
fi

# Check for Terraform
if ! command -v terraform &> /dev/null; then
    echo "📦 Installing Terraform..."
    wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg
    echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
    sudo apt update && sudo apt install terraform
fi

cd terraform

# Initialize Terraform
echo "🔧 Initializing Terraform..."
terraform init

# Plan deployment
echo "📋 Planning deployment..."
terraform plan -var="linode_token=$LINODE_TOKEN" -out=tfplan

# Apply deployment
echo "🏗️ Creating LKE cluster with worker nodes..."
terraform apply tfplan

# Export kubeconfig
export KUBECONFIG="$(pwd)/kubeconfig"

echo "⏳ Waiting for cluster to be ready..."
sleep 30

# Deploy application
cd ../k8s

echo "🔐 Creating secrets..."
kubectl create namespace agentx --dry-run=client -o yaml | kubectl apply -f -
kubectl apply -f ../../k8s/secrets.yml

echo "🏗️ Deploying web application..."
kubectl apply -f ../../k8s/deployment.yml
kubectl apply -f ../../k8s/ingress.yml

echo "🏗️ Deploying worker nodes..."
kubectl apply -f worker-deployment.yml

echo "⏰ Setting up cron jobs..."
kubectl apply -f cronjobs.yml

echo "⏳ Waiting for deployments..."
kubectl rollout status deployment/agentx-app -n agentx
kubectl rollout status deployment/agentx-worker -n agentx

echo ""
echo "✅ Linode deployment complete!"
echo ""
echo "Cluster Info:"
terraform output
echo ""
echo "Pods:"
kubectl get pods -n agentx
echo ""
echo "Services:"
kubectl get svc -n agentx
echo ""
echo "🌐 Your app will be available at: https://agentx.ai"
echo ""
echo "Useful commands:"
echo "  export KUBECONFIG=\"$(pwd)/../terraform/kubeconfig\""
echo "  kubectl get pods -n agentx"
echo "  kubectl logs -f deployment/agentx-worker -n agentx"