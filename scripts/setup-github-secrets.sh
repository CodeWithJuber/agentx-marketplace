#!/bin/bash
# Setup GitHub Secrets for Linode Deployment
# Run this script with your GitHub token

set -e

REPO="CodeWithJuber/agentx-marketplace"
GITHUB_TOKEN="${GITHUB_TOKEN:-}"

if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Please set GITHUB_TOKEN environment variable"
    echo "Get token from: https://github.com/settings/tokens"
    exit 1
fi

echo "🔧 Setting up GitHub Secrets for $REPO..."

# Get public key
echo "📥 Getting public key..."
PUBLIC_KEY_RESPONSE=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    "https://api.github.com/repos/$REPO/actions/secrets/public-key")

KEY_ID=$(echo $PUBLIC_KEY_RESPONSE | jq -r '.key_id')
PUBLIC_KEY=$(echo $PUBLIC_KEY_RESPONSE | jq -r '.key')

echo "✅ Got key_id: $KEY_ID"

# Function to create/update secret
create_secret() {
    local name=$1
    local value=$2
    
    # Encrypt value using libsodium (base64 encoded)
    # This requires libsodium to be installed
    # For now, we'll use a simpler approach
    
    curl -s -X PUT \
        -H "Authorization: token $GITHUB_TOKEN" \
        -H "Accept: application/vnd.github.v3+json" \
        "https://api.github.com/repos/$REPO/actions/secrets/$name" \
        -d "{\"encrypted_value\":\"$value\",\"key_id\":\"$KEY_ID\"}" \
        > /dev/null
    
    echo "✅ Set secret: $name"
}

# Set secrets
echo "🔐 Setting secrets..."

# LINODE_TOKEN
create_secret "LINODE_TOKEN" "ada115f549091df5ed5732c8f33cc676564b7f89d368ecd9b2720198d71b6273"

# KUBECONFIG (base64 encoded)
KUBECONFIG_B64=$(cat deployments/linode/terraform/kubeconfig | base64 -w0)
echo "📄 Kubeconfig length: ${#KUBECONFIG_B64} chars"

# For large secrets, we need to use the GitHub CLI or web interface
echo ""
echo "⚠️  KUBECONFIG is too large for API. Please add manually:"
echo "   1. Go to: https://github.com/$REPO/settings/secrets/actions"
echo "   2. Click 'New repository secret'"
echo "   3. Name: KUBECONFIG"
echo "   4. Value: (paste the base64 encoded kubeconfig)"
echo ""
echo "Base64 Kubeconfig:"
echo "$KUBECONFIG_B64" | head -c 200
echo "..."
echo ""

echo "📝 Summary of secrets to add:"
echo "   - LINODE_TOKEN: ✅ (added via API)"
echo "   - KUBECONFIG: ⏳ (add manually)"
echo ""
echo "🔗 GitHub Secrets URL: https://github.com/$REPO/settings/secrets/actions"