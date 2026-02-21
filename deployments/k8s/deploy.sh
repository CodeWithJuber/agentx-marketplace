#!/bin/bash
# Kubernetes Deployment Script

set -e

NAMESPACE="agentx"

echo "🚀 Deploying AgentX to Kubernetes..."

# Create namespace
kubectl create namespace $NAMESPACE --dry-run=client -o yaml | kubectl apply -f -

# Apply secrets
echo "🔐 Applying secrets..."
kubectl apply -f secrets.yml

# Apply deployment
echo "🏗️ Applying deployment..."
kubectl apply -f deployment.yml

# Apply ingress
echo "🌐 Applying ingress..."
kubectl apply -f ingress.yml

# Wait for rollout
echo "⏳ Waiting for deployment to complete..."
kubectl rollout status deployment/agentx-app -n $NAMESPACE

# Get status
echo ""
echo "✅ Deployment complete!"
echo ""
kubectl get pods -n $NAMESPACE
kubectl get svc -n $NAMESPACE
kubectl get ingress -n $NAMESPACE