# Working on this portfolio

This is Lohith K's personal portfolio. It's one page built with TanStack Start, React and Tailwind. It deploys to Vercel automatically when `main` is pushed.

**All content lives in `src/data/portfolio.ts`.** To add or change a project, edit only that file. Don't touch the page layout or styles unless asked.

## Adding a new GitHub project

1. **Check the repo first.** Open `https://github.com/Amulpappu/<repo-name>` and read its README and file list. The repo must be **public** and actually exist. Never add a project that has no repo.
2. **Add one entry** to the `projects` array in `src/data/portfolio.ts`, in the same format as the others:
   - `title`: a short, readable name.
   - `problem`: one sentence on the problem it solves.
   - `built`: 2–3 short bullets. Only list features you can see in the README or the code.
   - `tags`: the real languages and libraries used. Check the repo's language bar, `requirements.txt` or `package.json`.
   - `status`: an honest label. Use "Deployed (...)" only if there's a live link. Otherwise use something like "Working bot", "Prototype · in development", "Android app (APK)" or "Workshop project".
   - `repoUrl`: the **exact** repo URL, `https://github.com/Amulpappu/<repo-name>`. Never use the profile URL `https://github.com/Amulpappu`.
   - `image`: `og("<repo-name>")`. This is the repo's GitHub preview image.
   - `links` (optional): extra real links, such as `{ label: "Live", url: "https://..." }` for a deployed site.
3. **Order:** put the strongest project first. Leave "Jiraiya Bot Monitor" as the first, `featured: true` card unless told otherwise.
4. **Layout:** cards sit in a 3-column grid, and wide cards take 2 columns. If the last row ends up with a gap, make one card wide (see `p.featured || p.title === "Gamer Portfolio"` in `src/routes/index.tsx`).
5. **Skills:** if the project uses a language or tool that isn't in `skills` yet, add it to the right group.

## Rules

- Never invent features, users, numbers, awards or links.
- Don't add projects that aren't on GitHub (concepts, college assignments) as project cards.
- Competitions go in `achievements`. Give each one its real status (Submitted / Registered / Stage 2 …), and never write "won" unless it's true.
- Commits are authored by Lohith only. Don't add co-author or AI attribution lines.

## Check before pushing

```bash
bun install
bun run test     # all tests must pass
bun run build    # must build without errors
```

Then commit and push to `main`. Vercel redeploys on its own.
