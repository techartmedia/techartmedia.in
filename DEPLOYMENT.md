# TechArtMedia Website — Deployment & Custom Domain Guide (techartmedia.in)

> **"Your Brand. Our Creativity. Powerful Results."**  
> Agency Domain: `techartmedia.in`  
> Founder & CEO: Durvesh Bhavsar  

This guide provides step-by-step instructions to connect this website repository to your GitHub account and point your custom domain **`techartmedia.in`**.

---

## 🚀 Option 1: Deploy with Vercel (Recommended — 2 Minutes, Zero Configuration)

Vercel provides instant global CDN speeds, automatic SSL, and zero server maintenance.

### Step 1: Push your project to GitHub
Open PowerShell in this project directory:
```powershell
cd "C:\Users\Admin\.gemini\antigravity\scratch\techartmedia-website"
git add .
git commit -m "feat: Launch official TechArtMedia digital agency website"
git branch -M main
```

If you already have a repository on GitHub (for example `https://github.com/techartmedia/techartmedia-website`):
```powershell
git remote add origin https://github.com/<YOUR-GITHUB-USERNAME>/<YOUR-REPO-NAME>.git
git push -u origin main
```

### Step 2: Import into Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account.
2. Click **"Add New..."** > **"Project"**.
3. Select your GitHub repository.
4. Click **"Deploy"** (no build settings required; it is a fast static web app).

### Step 3: Connect `techartmedia.in` Domain
1. In your Vercel project dashboard, go to **Settings** > **Domains**.
2. Enter `techartmedia.in` and click **Add**. Also add `www.techartmedia.in`.
3. Vercel will show you the exact DNS records to add at your domain registrar (GoDaddy, Hostinger, Namecheap, BigRock, etc.):
   - **Type `A`**: Name `@` → Value `76.76.21.21`
   - **Type `CNAME`**: Name `www` → Value `cname.vercel-dns.com`
4. Within a few minutes, Vercel verifies DNS and automatically issues an SSL certificate (`https://techartmedia.in`).

---

## 🌐 Option 2: Deploy with GitHub Pages (Free Native Hosting)

Because this website includes a `CNAME` file with `techartmedia.in`, GitHub Pages works immediately:

1. Push your repository to GitHub.
2. In your GitHub repository, click **Settings** > **Pages** (under Code and automation).
3. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **`main`** / Folder: **`/ (root)`**
   - Click **Save**.
4. Under **Custom domain**:
   - Type `techartmedia.in` and check **"Enforce HTTPS"**.
5. In your domain registrar DNS settings:
   - Add **4 A Records** for `@`:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Add **1 CNAME Record** for `www`:
     - Name: `www` → Value: `<YOUR-GITHUB-USERNAME>.github.io`

---

## 🛠️ Testing Locally

You can open the website right now:
1. Double-click or open in your browser:
   ```
   C:\Users\Admin\.gemini\antigravity\scratch\techartmedia-website\index.html
   ```
2. Or run a local dev server:
   ```powershell
   npx serve "C:\Users\Admin\.gemini\antigravity\scratch\techartmedia-website"
   ```
