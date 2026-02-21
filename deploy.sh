#!/bin/bash

# AgentX Deployment Script
# Usage: ./deploy.sh [staging|production]

set -e

ENVIRONMENT=${1:-staging}

echo "🚀 Deploying AgentX to $ENVIRONMENT..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}Installing Vercel CLI...${NC}"
    npm install -g vercel
fi

# Check if logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo -e "${RED}Please login to Vercel first:${NC}"
    vercel login
fi

# Build and deploy
if [ "$ENVIRONMENT" == "production" ]; then
    echo -e "${YELLOW}Building for production...${NC}"
    vercel --prod
else
    echo -e "${YELLOW}Building for staging...${NC}"
    vercel
fi

echo -e "${GREEN}✅ Deployment complete!${NC}"

# Run smoke tests
if [ "$ENVIRONMENT" == "production" ]; then
    echo -e "${YELLOW}Running smoke tests...${NC}"
    sleep 10
    curl -f https://agentx.ai/api/health && echo -e "${GREEN}✅ Health check passed!${NC}" || echo -e "${RED}❌ Health check failed!${NC}"
fi

echo -e "${GREEN}🎉 All done!${NC}"