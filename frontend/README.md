# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Vercel Deployment Instructions

## Deploying to Vercel
1. Push this project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com/) and sign up/log in.
3. Click "New Project" and import your GitHub repo.
4. Vercel will auto-detect the Vite + React setup. Just click "Deploy".
5. After deployment, you can add a custom domain in the Vercel dashboard (Project > Settings > Domains).

## API Routes (Serverless Functions)
- Place any API files in `/api` (e.g., `/api/pairs.js`).
- Each file exports a handler for requests (see Vercel docs for examples).
- These run as Node.js serverless functions.

## Custom Domain
- In your Vercel project dashboard, go to "Domains" and add your domain.
- Follow the DNS instructions provided by Vercel.
- Your app will be live on your domain with free SSL!
