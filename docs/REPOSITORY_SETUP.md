# Repository setup

## Local environment

Install Node.js and Git, then:

```bash
npm install
npm run dev
```

## Create the repository

```bash
git init
git add .
git commit -m "feat: initialize NoFi Diary website"
git branch -M main
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
git push -u origin main
```

## Deploy to Vercel

1. Push this folder to GitHub.
2. Import the repository in Vercel.
3. Keep the detected framework as Next.js.
4. Add `NEXT_PUBLIC_GOOGLE_PLAY_URL`.
5. Deploy.
6. Connect `nofidiary.com` when ready.

Each push to the production branch can trigger a new deployment; pull requests
can receive independent preview deployments.
