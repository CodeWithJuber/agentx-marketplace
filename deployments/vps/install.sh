#!/bin/bash
# VPS Deployment Script for AgentX
# Run this on your Ubuntu/Debian server

set -e

DOMAIN="${1:-agentx.ai}"
EMAIL="${2:-admin@agentx.ai}"

echo "🚀 Deploying AgentX to $DOMAIN..."

# Update system
echo "📦 Updating system packages..."
apt-get update
apt-get upgrade -y

# Install Docker
echo "🐳 Installing Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com | sh
    usermod -aG docker $USER
    systemctl enable docker
    systemctl start docker
fi

# Install Docker Compose
echo "🐳 Installing Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi

# Create app directory
mkdir -p /opt/agentx
cd /opt/agentx

# Clone repository
echo "📥 Cloning repository..."
if [ -d ".git" ]; then
    git pull origin main
else
    git clone https://github.com/YOUR_USERNAME/agentx-marketplace.git .
fi

# Create environment file
echo "⚙️ Setting up environment..."
cat > .env << EOF
NODE_ENV=production
PORT=3000
DATABASE_URL=${DATABASE_URL}
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
CLERK_SECRET_KEY=${CLERK_SECRET_KEY}
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
STRIPE_WEBHOOK_SECRET=${STRIPE_WEBHOOK_SECRET}
CRON_SECRET=${CRON_SECRET}
EOF

# Setup SSL
echo "🔒 Setting up SSL with Let's Encrypt..."
apt-get install -y certbot
mkdir -p /etc/letsencrypt/live/$DOMAIN

# Get SSL certificate
certbot certonly --standalone -d $DOMAIN -d www.$DOMAIN --agree-tos -n -m $EMAIL || true

# Build and start containers
echo "🏗️ Building and starting containers..."
cd deployments/docker
docker-compose -f docker-compose.prod.yml down || true
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d

# Setup auto-renewal for SSL
echo "🔄 Setting up SSL auto-renewal..."
(crontab -l 2>/dev/null; echo "0 12 * * * certbot renew --quiet --deploy-hook 'docker-compose -f /opt/agentx/deployments/docker/docker-compose.prod.yml restart nginx'") | crontab -

# Setup firewall
echo "🔥 Configuring firewall..."
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow http
ufw allow https
ufw --force enable

# Health check
echo "🏥 Running health check..."
sleep 10
curl -f http://localhost:3000/api/health && echo "✅ Application is healthy!" || echo "❌ Health check failed!"

echo ""
echo "🎉 Deployment complete!"
echo "🌐 Your app is running at: https://$DOMAIN"
echo ""
echo "Useful commands:"
echo "  View logs: docker-compose -f /opt/agentx/deployments/docker/docker-compose.prod.yml logs -f"
echo "  Restart:   docker-compose -f /opt/agentx/deployments/docker/docker-compose.prod.yml restart"
echo "  Update:    cd /opt/agentx && git pull && docker-compose -f deployments/docker/docker-compose.prod.yml up -d --build"