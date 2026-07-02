# Personal Website

A minimal, single-page academic homepage (AI-researcher style). Pure static HTML/CSS/JS — no build step, no dependencies.

```
resume/
├── index.html        # all content lives here (edit the sections marked "EDIT ME")
├── css/style.css     # styling + light/dark theme tokens
├── js/main.js        # theme toggle + footer year
├── assets/           # put your photo (profile.jpg), CV (cv.pdf), paper teasers (pubN.png) here
└── README.md
```

## 1. Edit your content

Open `index.html` and edit the sections marked with `EDIT ME` comments:
- **Hero**: name, tagline, affiliation, intro paragraph, and the social links (email, Scholar, GitHub, LinkedIn, Twitter).
- **News**: newest item on top.
- **Publications**: copy the `<li class="pub">…</li>` block for each paper; fill title/authors/venue/links.
- **Education & Experience**: the timeline entries.

## 2. Add your assets

Put these files in `assets/` (filenames must match, or update the `src` in `index.html`):
- `profile.jpg` — your portrait (square works best, ~400×400).
- `cv.pdf` — your CV.
- `pub1.png`, `pub2.png`, … — small teaser images for papers (~320×200).

> If a file is missing, the page shows a gray placeholder instead of a broken image, so it always looks fine while you fill things in.

## 3. Preview locally

```bash
# from inside this folder
python3 -m http.server 8000
# then open http://localhost:8000
```

## 4. Deploy to GitHub Pages (username.github.io)

To get a URL like `https://YOURNAME.github.io`:

```bash
# 1. Create a repo named exactly  YOURNAME.github.io  on GitHub (public).
# 2. From this folder:
git init
git add .
git commit -m "Initial personal website"
git branch -M main
git remote add origin https://github.com/YOURNAME/YOURNAME.github.io.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / root**. Your site goes live at `https://YOURNAME.github.io` within a minute or two.

> These files currently live in a `resume/` subfolder of your thesis repo. For a standalone
> `username.github.io` site, copy the **contents** of this folder (index.html, css/, js/, assets/)
> into the root of the new repo.

## 5. Custom domain (optional)

Buy a domain, add a `CNAME` file in the repo root containing just your domain (e.g. `bowen.com`), then set the DNS records as described in GitHub Pages → Settings → Custom domain.
