# Wahid Graphics — Full Website with Admin Portal

**Business:** Wahid Graphics — Premium Printing & Design  
**WhatsApp:** +92 326 0342099  
**Email:** wahidgraphics21@gmail.com

---

## 🚀 Quick Start (Local Dev)

```bash
# 1. Install dependencies
npm install

# 2. Create your local env file
cp .env.example .env.local
# Edit .env.local with your credentials

# 3. Run dev server
npm run dev

# 4. Open browser
# Website:  http://localhost:3000
# Admin:    http://localhost:3000/admin/login
```

---

## 🔐 Admin Portal

**URL:** `https://your-domain.vercel.app/admin/login`

| Field    | Default Value       |
|----------|---------------------|
| Username | `wahidgraphics`     |
| Password | `WahidAdmin@2025`   |

### Admin Features
- ✅ Secure JWT login (7-day session, HTTP-only cookie)
- ✅ View all portfolio projects with stats
- ✅ Add new projects with image upload + drag & drop
- ✅ Edit existing projects (title, category, description, image)
- ✅ Delete projects with confirmation
- ✅ Toggle Featured/Unfeatured on any project
- ✅ Filter portfolio by category
- ✅ Route protection via Next.js middleware

---

## 🌐 Deploy to GitHub + Vercel

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "Wahid Graphics — Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/wahid-graphics.git
git branch -M main
git push -u origin main
```

### Step 2 — Deploy on Vercel
1. Go to **vercel.com** → Sign in with GitHub
2. Click **"Add New Project"**
3. Import your `wahid-graphics` repository
4. Next.js is auto-detected — don't change any settings
5. **Before clicking Deploy → Add Environment Variables:**

| Variable Name    | Value                                      |
|------------------|--------------------------------------------|
| `ADMIN_USERNAME` | `wahidgraphics` (or your preferred username) |
| `ADMIN_PASSWORD` | A strong password of your choice           |
| `JWT_SECRET`     | A random 40+ character secret string       |

6. Click **Deploy** → Your site is live in ~2 minutes 🎉

---

## 🔑 Changing Admin Credentials

### On Vercel (Production):
1. Go to your project on **vercel.com**
2. Click **Settings → Environment Variables**
3. Edit `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `JWT_SECRET`
4. Click **Redeploy** to apply changes

### Locally:
Edit `.env.local`:
```
ADMIN_USERNAME=your_new_username
ADMIN_PASSWORD=your_new_password
JWT_SECRET=your-random-64-character-secret-string-here
```

---

## 📁 Project Structure

```
wahid-graphics/
├── public/
│   └── images/              ← 39 portfolio images + logo
├── src/
│   ├── app/
│   │   ├── page.jsx         ← Main website (Home page)
│   │   ├── layout.jsx       ← Root layout + metadata
│   │   ├── globals.css      ← All styles (Tailwind + custom)
│   │   ├── not-found.jsx    ← 404 page
│   │   ├── admin/
│   │   │   ├── login/       ← Secure login page
│   │   │   ├── dashboard/   ← Project management
│   │   │   └── projects/
│   │   │       ├── new/     ← Add new portfolio project
│   │   │       └── edit/    ← Edit existing project
│   │   └── api/
│   │       ├── auth/        ← Login / Logout API
│   │       ├── projects/    ← CRUD for projects
│   │       └── upload/      ← Image upload API
│   └── lib/
│       ├── auth.js          ← JWT helpers
│       └── projects.js      ← Project data store
├── middleware.js            ← Protects /admin routes
├── .env.example             ← Copy to .env.local
├── next.config.js
├── tailwind.config.js
└── vercel.json
```

---

## 🎨 Design System

| Token         | Value      | Usage                        |
|---------------|------------|------------------------------|
| Primary       | `#F97316`  | Buttons, accents, highlights |
| Background    | `#FAFAF8`  | Page background              |
| Dark          | `#1a1a1a`  | Text, dark sections          |
| Cream         | `#F5F0E8`  | Hero, card backgrounds       |
| Border        | `#e8e4de`  | Dividers, card borders       |

**Fonts:** DM Serif Display (headings) + DM Sans (body)

---

## ➕ Adding a New Portfolio Project

1. Login to `/admin/login`
2. Click **"Add New Project"**
3. Upload image (drag & drop or click)
4. Fill in title, category, description
5. Toggle **Featured** if you want it highlighted
6. Click **"Add to Portfolio"**

The project appears instantly on the live website portfolio section.

---

## 📞 Support

WhatsApp: **+92 326 0342099**  
Email: **wahidgraphics21@gmail.com**
