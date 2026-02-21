# 🚀 Deployment Options for AgentX

## Quick Deploy

### Option 1: Vercel (Easiest - 2 minutes)
```bash
npm i -g vercel
vercel --prod
```

### Option 2: Docker (Recommended - 5 minutes)
```bash
cd deployments/docker
docker-compose -f docker-compose.prod.yml up -d
```

### Option 3: VPS/Server (Full control - 10 minutes)
```bash
# On your Ubuntu/Debian server
curl -fsSL https://raw.githubusercontent.com/YOUR_USERNAME/agentx-marketplace/main/deployments/vps/install.sh | bash
```

### Option 4: Kubernetes (Enterprise - 15 minutes)
```bash
cd deployments/k8s
./deploy.sh
```

---

## Detailed Guides

### 🐳 Docker Deployment

**Requirements:**
- Docker 20.10+
- Docker Compose 2.0+
- 2GB RAM minimum

**Steps:**
```bash
# 1. Clone repo
git clone https://github.com/YOUR_USERNAME/agentx-marketplace.git
cd agentx-marketplace

# 2. Create .env file
cp .env.example .env
# Edit .env with your credentials

# 3. Deploy
cd deployments/docker
docker-compose -f docker-compose.prod.yml up -d

# 4. Check status
docker-compose -f docker-compose.prod.yml ps
docker-compose -f docker-compose.prod.yml logs -f
```

**Access:**
- App: http://localhost
- Health: http://localhost/api/health

---

### 🖥️ VPS Deployment (Ubuntu/Debian)

**Requirements:**
- Ubuntu 20.04+ or Debian 11+
- 2GB RAM, 1 CPU
- Domain pointed to server

**One-Line Install:**
```bash
curl -fsSL https://raw.githubusercontent.com/YOUR_USERNAME/agentx-marketplace/main/deployments/vps/install.sh | bash -s -- agentx.ai admin@agentx.ai
```

**Manual Steps:**
```bash
# 1. SSH into server
ssh root@your-server-ip

# 2. Download script
wget https://raw.githubusercontent.com/YOUR_USERNAME/agentx-marketplace/main/deployments/vps/install.sh
chmod +x install.sh

# 3. Set environment variables
export DATABASE_URL="your-db-url"
export NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-key"
# ... other vars

# 4. Run installer
./install.sh agentx.ai admin@agentx.ai
```

**Post-Install:**
```bash
# View logs
docker-compose -f /opt/agentx/deployments/docker/docker-compose.prod.yml logs -f

# Update app
cd /opt/agentx && git pull && docker-compose -f deployments/docker/docker-compose.prod.yml up -d --build

# Restart
docker-compose -f /opt/agentx/deployments/docker/docker-compose.prod.yml restart
```

---

### ☸️ Kubernetes Deployment

**Requirements:**
- Kubernetes 1.24+
- kubectl configured
- cert-manager installed
- NGINX Ingress Controller

**Steps:**
```bash
# 1. Update secrets
cd deployments/k8s
vim secrets.yml  # Add your secrets

# 2. Deploy
./deploy.sh

# 3. Check status
kubectl get pods -n agentx
kubectl get svc -n agentx
kubectl get ingress -n agentx
```

**Features:**
- Auto-scaling (3-10 pods)
- Rolling updates
- Health checks
- SSL termination
- Rate limiting

---

### 🔧 Ansible Deployment

**Requirements:**
- Ansible 2.9+
- SSH access to target server

**Steps:**
```bash
# 1. Install Ansible
pip install ansible

# 2. Create inventory
echo "[servers]\nyour-server-ip" > inventory

# 3. Set variables
export DOMAIN=agentx.ai
export EMAIL=admin@agentx.ai
export DATABASE_URL=...
# ... other vars

# 4. Deploy
ansible-playbook -i inventory deployments/ansible/playbook.yml
```

---

## Cloud Provider Specific

### AWS ECS/Fargate
```bash
# Use AWS Copilot
copilot init --app agentx --name api --type "Load Balanced Web Service" --dockerfile ./Dockerfile
copilot deploy
```

### Google Cloud Run
```bash
gcloud run deploy agentx --source . --region us-central1 --allow-unauthenticated
```

### Azure Container Instances
```bash
az container create --resource-group myRG --name agentx --image agentx/marketplace:latest --ports 3000
```

### DigitalOcean App Platform
```bash
doctl apps create --spec .do/app.yaml
```

---

## SSL/HTTPS Setup

### Let's Encrypt (Auto)
SSL is automatically configured with:
- Docker: certbot container
- VPS: certbot in install script
- K8s: cert-manager

### Custom SSL
Place your certificates in:
- Docker: `deployments/docker/ssl/`
- VPS: `/etc/letsencrypt/live/agentx.ai/`

---

## Monitoring & Logs

### Docker
```bash
# View logs
docker-compose -f docker-compose.prod.yml logs -f app

# View metrics
docker stats
```

### Kubernetes
```bash
# View logs
kubectl logs -f deployment/agentx-app -n agentx

# View metrics
kubectl top pods -n agentx
```

### Health Checks
- App: `https://your-domain/api/health`
- Database: Check connection in logs
- SSL: `https://www.ssllabs.com/ssltest/`

---

## Troubleshooting

### Port 3000 already in use
```bash
# Change port in docker-compose.prod.yml
ports:
  - "3001:3000"  # Use port 3001
```

### Database connection failed
```bash
# Check database URL format
postgresql://user:password@host:5432/database?sslmode=require
```

### SSL certificate issues
```bash
# Renew manually
certbot renew --force-renewal
```

### Out of memory
```bash
# Add swap
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
```

---

## Production Checklist

- [ ] Environment variables set
- [ ] Database migrations run
- [ ] SSL certificate active
- [ ] Domain DNS configured
- [ ] Firewall enabled (UFW)
- [ ] Auto-updates configured
- [ ] Backups scheduled
- [ ] Monitoring enabled
- [ ] Error tracking (Sentry)
- [ ] Analytics (Google/Plausible)

---

## Support

Need help? Open an issue on GitHub or email support@agentx.ai