#!/bin/bash

# Deployment script for Wisconsin Cannabis Legalization Experience
# This script pushes the local repository to GitHub

echo "🌿 Deploying Wisconsin Cannabis Legalization Experience..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in the project directory. Please run this script from the wisconsin-cannabis-infographic folder."
    exit 1
fi

# Check git status
echo "📋 Checking git status..."
git status

# Add all changes
echo "📦 Adding all changes..."
git add .

# Commit changes if there are any
if git diff --staged --quiet; then
    echo "✅ No changes to commit"
else
    echo "💾 Committing changes..."
    git commit -m "Update: Wisconsin cannabis legalization experience - $(date '+%Y-%m-%d %H:%M:%S')"
fi

# Check if remote exists
if git remote | grep -q "origin"; then
    echo "🔗 Remote 'origin' already exists"
else
    echo "🔗 Adding remote repository..."
    git remote add origin https://github.com/KO-Tools/wi-cannabis-legalization-experience.git
fi

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push -u origin master

if [ $? -eq 0 ]; then
    echo "✅ Successfully deployed to GitHub!"
    echo "🌐 Repository: https://github.com/KO-Tools/wi-cannabis-legalization-experience"
else
    echo "❌ Failed to push to GitHub. Please check your authentication."
    echo "💡 You may need to:"
    echo "   1. Run 'gh auth login' to authenticate with GitHub CLI"
    echo "   2. Or set up a personal access token"
    echo "   3. Or use SSH authentication"
fi
