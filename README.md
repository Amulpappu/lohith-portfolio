# Lohith K — Portfolio

Personal portfolio of **Lohith K**, first-year B.E. CSE (Cyber Security) student at Rathinam Technical Campus, Coimbatore.

Minimalist, dark-by-default single page with About, Projects, Skills, Achievements and Contact sections. Every project card links to its own GitHub repository.

## Tech stack

- [TanStack Start](https://tanstack.com/start) + React 19
- Tailwind CSS v4
- Vite
- Vitest + Testing Library
- Deployed on Vercel

## Edit the content

All text and links live in one file: [`src/data/portfolio.ts`](src/data/portfolio.ts).

- `resumeUrl` — link to your résumé PDF (the Résumé button stays hidden while it's empty)
- `links.email` — your email (the email link stays hidden while it's empty)
- `projects` — add or change project cards; each one takes its own `repoUrl`

## Run locally

```bash
bun install
bun run dev      # start the dev server
bun run test     # run the tests
bun run build    # production build
```

## Deploy

Pushing to `main` deploys automatically on Vercel.
