# GitHub Setup Guide

Follow these steps to push your Autodealafrica project to GitHub.

## Option 1: Using GitHub CLI (Recommended)

### Step 1: Install GitHub CLI (if not already installed)

The GitHub CLI should already be installed on your system. Verify with:

```bash
gh --version
```

### Step 2: Login to GitHub

```bash
gh auth login
```

Follow the prompts to authenticate.

### Step 3: Create and Push Repository

```bash
cd C:\Users\HP\Desktop\autodealafrica

# Create a new repository on GitHub
gh repo create autodealafrica --public --source=. --remote=origin

# Push your code
git push -u origin master
```

### Step 4: Open Your Repository

```bash
gh repo view --web
```

---

## Option 2: Using GitHub Web Interface

### Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `autodealafrica`
3. Description: "A modern car listing directory platform for Africa"
4. Choose Public or Private
5. **DO NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

### Step 2: Connect and Push

```bash
cd C:\Users\HP\Desktop\autodealafrica

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/autodealafrica.git

# Verify remote
git remote -v

# Push your code
git push -u origin master
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## Verify Your Repository

After pushing, verify that all files are uploaded:

```bash
gh repo view --web
```

Or visit: `https://github.com/YOUR_USERNAME/autodealafrica`

You should see:
- All 27 files
- Complete README.md
- Proper folder structure
- Deployment guide

---

## Next Steps

### 1. Add Repository Description

On GitHub, add a description and topics:
- Description: "Modern car listing platform for buying and selling cars in Africa"
- Topics: `react`, `nodejs`, `express`, `mongodb`, `car-listings`, `africa`

### 2. Enable GitHub Pages (Optional)

If you want to host the frontend on GitHub Pages:

1. Go to Settings → Pages
2. Source: Deploy from branch
3. Branch: `gh-pages` (you'll need to create this)
4. Click Save

### 3. Add a LICENSE

1. Click "Add file" → "Create new file"
2. Name it `LICENSE`
3. Choose a template (MIT License recommended)
4. Commit the file

### 4. Protect Main Branch

1. Go to Settings → Branches
2. Add branch protection rule for `master`
3. Enable:
   - Require pull request reviews
   - Require status checks to pass

---

## Sharing Your Project

Share your project with:
- Repository URL: `https://github.com/YOUR_USERNAME/autodealafrica`
- Live Demo (after deployment): Add the URL to README

---

## Common Issues

### Issue: Permission denied
**Solution:** Make sure you're logged in with `gh auth login`

### Issue: Remote already exists
**Solution:** Remove and re-add:
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/autodealafrica.git
```

### Issue: Authentication failed
**Solution:** Use GitHub CLI or generate a Personal Access Token

---

## Quick Reference Commands

```bash
# Check remote
git remote -v

# View status
git status

# View commit history
git log --oneline

# Open repo in browser
gh repo view --web

# Clone your repo elsewhere
git clone https://github.com/YOUR_USERNAME/autodealafrica.git
```

---

**Your project is now ready to be shared with the world! 🎉**
