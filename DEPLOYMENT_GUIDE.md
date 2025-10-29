# 🚀 Deployment Guide: Vercel + Neon

## Your Generated Secure Secrets

**NEXTAUTH_SECRET:**
```
BBUJBJPxrdNWRoIWuOAw1zAuJNDO3R9B8HH8ECF7Ufw=
```

**JWT_SECRET:**
```
j00qeKXOmz1YdXQnhnAMmVe6T+t30HWatoO0DzE6F6M=
```

⚠️ **Keep these secrets safe! Don't share them publicly.**

---

## Part 1: Set Up Neon Database ✅

### Step 1: Update Local .env with Neon Database

1. Copy your Neon connection string from https://neon.tech
2. Update your `.env` file:

```env
DATABASE_URL="postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"
```

### Step 2: Push Schema to Neon

Run these commands in your terminal:

```bash
# Generate Prisma client
npm run db:generate

# Push schema to Neon database
npm run db:push

# Seed the database with sample data
npm run db:seed
```

### Step 3: Test Connection

```bash
# Open Prisma Studio to verify data
npm run db:studio
```

---

## Part 2: Deploy to Vercel 🚀

### Step 1: Go to Vercel

1. Visit: https://vercel.com
2. Sign in with GitHub
3. Click **"Add New"** → **"Project"**

### Step 2: Import Your Repository

1. Find and select: **`sidak131singh/IIITD-Infirmary`**
2. Click **"Import"**

### Step 3: Configure Project Settings

**Framework Preset:** Next.js (should be auto-detected)
**Root Directory:** `./` (leave as default)
**Build Command:** `next build` (default)
**Output Directory:** `.next` (default)

### Step 4: Add Environment Variables

Click **"Environment Variables"** and add each of these:

#### Required Variables:

| Name | Value |
|------|-------|
| `DATABASE_URL` | `postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require` |
| `NEXTAUTH_SECRET` | `BBUJBJPxrdNWRoIWuOAw1zAuJNDO3R9B8HH8ECF7Ufw=` |
| `NEXTAUTH_URL` | Leave empty for now (will update after deployment) |
| `JWT_SECRET` | `j00qeKXOmz1YdXQnhnAMmVe6T+t30HWatoO0DzE6F6M=` |

#### Optional (Email functionality):

| Name | Value |
|------|-------|
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | `snehil22503@iiitd.ac.in` |
| `SMTP_PASS` | `thmckklqsedtnrsg` |
| `SMTP_FROM` | `IIITD Infirmary <snehil22503@iiitd.ac.in>` |

**Important:** Make sure to select **Production**, **Preview**, and **Development** for all environment variables.

### Step 5: Deploy!

1. Click **"Deploy"**
2. Wait 2-3 minutes for the build to complete
3. You'll get a URL like: `https://iiitd-infirmary.vercel.app`

### Step 6: Update NEXTAUTH_URL

1. Copy your deployment URL (e.g., `https://iiitd-infirmary.vercel.app`)
2. In Vercel, go to **Settings** → **Environment Variables**
3. Find `NEXTAUTH_URL` and update it to your deployment URL
4. Click **"Save"**
5. Go to **Deployments** → Click the 3 dots on latest deployment → **"Redeploy"**

---

## Part 3: Verify Deployment ✅

### Test Your App

1. Visit your deployment URL
2. You should be redirected to `/login`
3. Try logging in with demo credentials:

**Admin:**
- Email: `admin@iiitd.ac.in`
- Password: `admin123`

**Doctor:**
- Email: `dr.smith@iiitd.ac.in`
- Password: `doctor123`

**Student:**
- Email: `john.doe@iiitd.ac.in`
- Password: `student123`

---

## Troubleshooting 🔧

### Build Fails?
- Check if all environment variables are set correctly
- Make sure `DATABASE_URL` is accessible from Vercel
- Check build logs in Vercel dashboard

### Authentication Not Working?
- Verify `NEXTAUTH_SECRET` is set
- Make sure `NEXTAUTH_URL` matches your deployment URL exactly
- Redeploy after updating environment variables

### Database Connection Issues?
- Verify Neon database is accessible (not paused)
- Check connection string format
- Ensure SSL mode is included: `?sslmode=require`

### Can't See Data?
- Make sure you ran `npm run db:seed` on the Neon database
- Check Prisma Studio to verify data exists

---

## Future Updates 🔄

When you make changes to your code:

```bash
# Commit changes
git add .
git commit -m "Your update message"

# Push to GitHub
git push

# Vercel will automatically deploy the update!
```

---

## Cost Breakdown 💰

- **Vercel:** FREE (Hobby plan - unlimited projects)
- **Neon:** FREE (0.5 GB storage, shared compute)
- **Total:** $0/month 🎉

---

## Production Checklist ✅

Before going fully live:

- [ ] Change all demo passwords in database
- [ ] Update SMTP credentials if needed
- [ ] Set up custom domain (optional)
- [ ] Enable Vercel Analytics (optional)
- [ ] Configure Neon auto-pause settings
- [ ] Set up database backups
- [ ] Review and update security settings

---

## Support

- Vercel Docs: https://vercel.com/docs
- Neon Docs: https://neon.tech/docs
- Next.js Docs: https://nextjs.org/docs
- Prisma Docs: https://www.prisma.io/docs

Good luck with your deployment! 🚀
