# updategit

Push all code to GitHub, keep the README and repo About in sync, verify no secrets were committed, and ensure GitHub Pages is healthy with no 404 errors.

## Steps

### 1. Security scan — abort if secrets found

Before touching git, scan for secrets, API keys, and passwords. Check for:
- Hardcoded API keys, tokens, passwords (patterns like `sk-`, `ghp_`, `Bearer `, `password =`, `secret =`, `api_key =`)
- Plain-text passwords or credentials inside HTML forms, JS config objects, or CSS comments
- `.env` files or any file containing environment variable assignments with real values
- Any `*.pem`, `*.key`, `*.p12`, `*.pfx` private-key files

Run both scans:
```bash
# Secrets, tokens, API keys
grep -rn --include="*.js" --include="*.html" --include="*.css" --include="*.json" \
  -E "(api[_-]?key|apikey|secret|token|bearer|sk-[a-zA-Z0-9]{20,}|ghp_[a-zA-Z0-9]+)" \
  . --exclude-dir=".git" --exclude-dir="node_modules"

# Passwords — catches hardcoded password strings and common credential patterns
grep -rn --include="*.js" --include="*.html" --include="*.css" --include="*.json" --include="*.env*" \
  -iE "(password\s*[:=]\s*['\"][^'\"]{3,}['\"]|passwd\s*[:=]\s*['\"][^'\"]{3,}['\"]|pwd\s*[:=]\s*['\"][^'\"]{3,}['\"])" \
  . --exclude-dir=".git" --exclude-dir="node_modules"
```

Evaluate hits carefully: a CSS property like `input[type=password]` or a form label is safe. A string like `password: "hunter2"` or `const API_KEY = "sk-abc123"` is not. 

If any real secrets or passwords are found: **stop immediately**, tell the user exactly which file and line, and do not proceed until they are removed or moved to a `.env` file that is listed in `.gitignore`.

### 2. Stage and push to GitHub

```bash
git add index.html styles.css script.js README.md CLAUDE.md
git status
```

Show the user the staged diff and ask for a short commit message, or use a descriptive default based on what changed (e.g. "update site content and styles").

```bash
git commit -m "<message>"
git push origin main
```

Confirm the push succeeded and show the commit SHA.

### 3. Update README.md

Read the current `README.md`. Then read `index.html`, `styles.css`, and `script.js` to check for any changes that should be reflected in the README (new sections, changed features, updated tech). 

Update `README.md` if any of the following are stale:
- Feature list
- File structure description
- Running-locally instructions
- Live site URL

After editing, stage and commit:
```bash
git add README.md
git commit -m "docs: sync README with current site"
git push origin main
```

Only do this if the README actually needed changes — skip if it is already accurate.

### 4. Verify and fix GitHub Pages deployment

#### 4a. Confirm GitHub Pages is enabled and using GitHub Actions

```bash
gh api repos/aahdooshJC/classdemorestaurant/pages 2>/dev/null || echo "Pages not configured"
```

If Pages is not enabled, enable it via the API (source: GitHub Actions):
```bash
gh api repos/aahdooshJC/classdemorestaurant/pages \
  --method POST \
  -f build_type=workflow 2>/dev/null || \
gh api repos/aahdooshJC/classdemorestaurant/pages \
  --method PUT \
  -f build_type=workflow
```

#### 4b. Confirm the deploy workflow exists and is correct

Read `.github/workflows/deploy.yml`. It must:
- Trigger on `push` to `main`
- Have `permissions: pages: write` and `id-token: write`
- Use `actions/upload-pages-artifact@v3` with `path: '.'`
- Use `actions/deploy-pages@v4`

If the file is missing or misconfigured, create/fix it:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### 4c. Diagnose and fix common 404 causes

Check for each known 404 trigger and fix it if found:

**Missing `index.html` at repo root:**
```bash
ls index.html 2>/dev/null || echo "MISSING: index.html must be at the repo root"
```
If missing, the site will 404 — create or move it to the root.

**Wrong artifact path:** Confirm `path: '.'` in the workflow (not `path: './dist'` or a subfolder). If wrong, fix the workflow.

**Broken internal links** — scan HTML for relative links that point to non-existent files:
```bash
grep -oE 'href="[^"#http][^"]*"' index.html | sed 's/href="//;s/"//' | while read f; do
  [ ! -f "$f" ] && echo "BROKEN LINK: $f not found"
done
grep -oE 'src="[^"http][^"]*"' index.html | sed 's/src="//;s/"//' | while read f; do
  [ ! -f "$f" ] && echo "BROKEN SRC: $f not found"
done
```
Fix any broken links by correcting the path or adding the missing file.

**Case sensitivity:** GitHub Pages is Linux-based — `Styles.css` ≠ `styles.css`. Verify that all filenames referenced in HTML match the exact case on disk:
```bash
grep -oE '(href|src)="[^"http][^"]*"' index.html | sed 's/(href|src)="//;s/"//'
```

**404 on deep URLs (no trailing slash):** For a single-page site served from root, this only matters for custom 404 pages. If a `404.html` is needed, note it but do not create one unless asked.

#### 4d. Check the latest Actions run

After pushing, verify the workflow ran successfully:
```bash
gh run list --repo aahdooshJC/classdemorestaurant --limit 3
```

If the latest run failed, fetch the logs:
```bash
gh run view --repo aahdooshJC/classdemorestaurant --log-failed $(gh run list --repo aahdooshJC/classdemorestaurant --limit 1 --json databaseId -q '.[0].databaseId')
```

Report the failure reason and fix it (bad workflow YAML, missing file, wrong path) before declaring the deployment successful.

### 5. Update GitHub repo About (description + website + topics)

Use `gh` CLI to update the repo metadata:

```bash
gh repo edit aahdooshJC/classdemorestaurant \
  --description "Single-page restaurant website for Maison Lumière — vanilla HTML/CSS/JS, no frameworks" \
  --homepage "https://aahdooshjc.github.io/classdemorestaurant/" \
  --add-topic "html" \
  --add-topic "css" \
  --add-topic "javascript" \
  --add-topic "restaurant" \
  --add-topic "github-pages"
```

Confirm success and print the updated repo URL.

### 6. Final security verification

After the push, confirm no sensitive files were included:

```bash
git log --name-only -1
git show --stat HEAD
```

Check that the committed files are only the expected source files. Report any unexpected files to the user.

### 7. Summary report

Print a concise summary:
- Commit SHA and message
- Files pushed
- README status (updated / already current)
- Repo About status (updated / already current)
- GitHub Pages status (live / fixed / Actions run failed)
- 404 issues found and resolved (list each fix, or "none found")
- Security scan result (clean / issues found — list secrets and passwords separately)
- Live site URL: https://aahdooshjc.github.io/classdemorestaurant/
