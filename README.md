# Sandra Atkinson | UX Portfolio

A static, responsive portfolio built with Vue 3, JavaScript, Vite and Tailwind CSS. No backend, database or paid hosting is required.

## Local development

Node.js 20.12 or newer is supported by this project's Vite 6 setup. Node.js 22 LTS is recommended for a fresh installation.

```sh
npm install
npm run dev
```

Open the local URL printed in the terminal. To check the production site:

```sh
npm run build
npm run preview
```

## Add your project links

Edit `src/data/projects.js`. Set each project's `figmaUrl` to the public interactive prototype URL. Add the two YouTube URLs as `videoUrl` for SCMS2 and Enzo Speakers. Check that all prototypes are shared with the intended audience. Empty links appear as "coming soon" text, not broken buttons.

All project descriptions are in the same file. Add another object with a unique `id` to add a project; counts and numbering update automatically. To replace an illustrative preview, place your screenshot in `public` (for example, `scms2.png`) and add `image: './scms2.png'` and `imageAlt: 'Your description'` to that project's object. The current mockups are illustrative, not representations of the actual deliverables. A new project without an image gets a simple title preview.

The name, email, LinkedIn URL and about text are in `src/App.vue`. Page title and search description are in `index.html`. Colours and responsive styling are in `src/style.css`; Tailwind utilities are also available in Vue templates.

## Free hosting on GitHub Pages

Packages are installed only during development and the GitHub build. The finished `dist` folder contains ordinary static HTML, CSS, JavaScript and images. Visitors and GitHub Pages do not need Node.js.

1. Create a GitHub repository and push this folder to its `main` branch, including `package-lock.json`. Do not upload `node_modules` or `dist`.
2. In the repository, open **Settings > Pages > Build and deployment** and choose **GitHub Actions** as the source.
3. Open **Actions** and run **Deploy portfolio to GitHub Pages**, or push another change to `main`.
4. Once the workflow succeeds, the Pages settings and deployment show the public URL, typically `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.

Relative build paths support both a repository site and `YOUR-USERNAME.github.io`. Navigation uses page anchors, so there are no client-side routes that need server rewrites. GitHub Pages on a free account normally requires a public repository; check your plan before uploading confidential commercial work. Confirm permission to share Network Ltd designs and remove sensitive data from screenshots and prototypes.

## Images and fonts

The Enzo illustrative preview uses a speaker photograph from Unsplash (https://images.unsplash.com/photo-1608043152269-423dbba4e7e1), stored locally in `public/speaker.jpg`. Replace it with your own authorised project image when available. Fonts are DM Sans and Fraunces from Google Fonts, with local fallbacks if unavailable.

## Before publishing

- Add and test all three public Figma links and both YouTube links.
- Replace illustrative previews with real, authorised project screenshots.
- Review all copy, project confidentiality and contact details.
- Test the site on a phone and use the keyboard to open and close each case study.
