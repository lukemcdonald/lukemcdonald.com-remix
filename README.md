# Readme

Files for personal website. Moved from [Gatsby](https://www.gatsbyjs.com/) to
[Remix](https://remix.run/).

## Tech:

- [Remix](https://remix.run/)
- [Fly](https://fly.io/)
- [Tailwind CSS](https://tailwindcss.com/)

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

```sh
npm run deploy
```

You can run `flyctl info` to get the url and ip address of your server.

Check out the [fly docs](https://fly.io/docs/getting-started/node/) for more
information.

## Ideas

- [ ] Setup redirects for Fly.io. See old Netlify redirect .toml
- [ ] Consider adding content using Sanity.io or Strapi
  - https://www.sanity.io/guides/remix-run-live-preview
  - https://github.com/SimeonGriggs/simeonGriggs
- [ ] Consider using [Rome](https://rome.tools/#development-status) for a
      linter, compiler, bundler, and formatter.
