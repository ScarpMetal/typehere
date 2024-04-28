# The typehere app

Live link: https://typehere.matthewgraham.me/

## Why?

### Replacement

I used to love a site called https://typehere.co/, but it recently went offine. Essentially what it did, was store a single note in your browser's local storage. It was perfect, because for myself as a web dev, there was a need for something inbetween a creating a new Google Doc (feels too serious, requires login, creates clutter) and a raw text file stored on my computer (easy to get lost, slow to find, not integrated into a browser-based workflow).

### Philosophy

In my personal flow, most notes I take aren't meant to be stored long term (e.g. daily todos, drafting messages for chat apps, remembering temporary codes). I made this app have flimsy data safety on purpose. Notes are stored in local storage, so they are resilient enough to not be cleared all the time, but have the potential to be cleared at any moment.

With every note taken down, it forces me to **think** about the importance of the information I'm writing down. If the info is important to remember or security critical, this thinking will encourage me to use a better long-term storage solution such as Google Docs or a password manager. However, if the data is uninimporant or easily re-retrieved, then no problem, I can use this app as intended.

## What the app looks like:

<img src="https://i.imgur.com/qD8BUkC.png" />

### Text from screenshot above:

```
Welcome to typehere.matthewgraham.me

About this app:
- All notes are stored exclusively in local storage.
- The note name is the first line of text in the note (truncated).

How to use:
- Click the tabs above to switch between them.
- Click the "+" icon (at the end of the tab list) to create a new note.
- Right click a tab to open the note option(s) menu. Note options:
  - "Delete" - Deletes this tab
```

## Running locally

1. Make a [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository#cloning-a-repository) (or [fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo#forking-a-repository)) of this repo `git clone https://github.com/ScarpMetal/typehere.git`
2. Install pnpm globally (if you dont already have it): `npm install -g pnpm`
3. Install dependencies: `pnpm install`
4. Run it: `pnpm run dev`

## Creating a build

1. Create a build: `pnpm run build`
2. Build output should be in the `dist/` folder in the root of this project

## How to host your own instance

You are welcome to host your own build on whatever platform you'd like, but below is the approach for hosting with Firebase (this is what this repo uses).

1. Fork this repo ([instructions](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo#forking-a-repository))
2. Delete the existing `.firebaserc` and `firebase.json` files.
3. Install Firebase tools globally `npm install -g firebase-tools`
4. Log into Firebase using your Google account: `firebase login`
5. Initialize this project: `firebase init`
6. Use the arrow keys to highlight `( ) Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys`, press Space to select it, and Enter to continue.
7. Use the arrow keys to highlight `Create a new project` and press Enter.
8. Answer the following questions in the command line:
   1. `? Please specify a unique project id (warning: cannot be modified afterward) [6-30 characters]:` **typehere-\<your GitHub username>** (all lowercase)
   2. `? What would you like to call your project? (defaults to your project ID)` (press enter)
   3. `? What do you want to use as your public directory?` **dist**
   4. `? Configure as a single-page app (rewrite all urls to /index.html)?` **Yes**
   5. `? Set up automatic builds and deploys with GitHub?` **Yes**
   6. `? File dist/index.html already exists. Overwrite?` **No**
   7. `? For which GitHub repository would you like to set up a GitHub workflow? (format: user/repository)` **\<your GitHub username>/typehere**
   8. `? Set up the workflow to run a build script before every deploy?` **No**
   9. `? Set up automatic deployment to your site's live channel when a PR is merged? (Y/n)` **n**
   10. `? Set up automatic deployment to your site's live channel when a PR is merged?` **No**
   11. This will create a `firebase-hosting-pull-request.yml`, but you can delete it.
9. Commit the new `.firebaserc` and `firebase.json` files and push them to `main`.
10. Check `https://github.com/<your GitHub username>/typehere/actions` to make sure the deployment successfully completed.
