# Just JavaScript

All ten episodes and eight quizzes are freely available at `/learn`. No account or purchase is required. Lessons and quizzes are generated from the MDX files in `content/` during the build.

## Run locally

Use Node 20 (see `.nvmrc` and `.node-version`) and Yarn Classic:

```sh
yarn install --frozen-lockfile
yarn build
yarn start
```

Open `http://localhost:3000`. The production build needs no service credentials or content-fetching step. Dependency installation needs access to the package registry.

This branch keeps Next 11 and React 17. The build script enables the legacy OpenSSL provider for its webpack version and disables Node's experimental fetch for its bundled image processor. The start script also disables experimental fetch so the image processor can load local WASM files. These compatibility options do not upgrade the old framework; a framework upgrade is separate work.

For development, use:

```sh
NODE_OPTIONS='--openssl-legacy-provider --no-experimental-fetch' yarn dev
```

## Verify anonymous access

With the production server running:

```sh
node scripts/check-free-access.cjs http://localhost:3000
```

The check requests every episode and quiz without cookies, checks rendered lesson paragraphs, rejects purchase/login links, checks old URLs redirect to content, and checks retired APIs return HTTP 410.

## Progress and retired services

Episode progress and quiz answers stay in the current browser's local storage. They do not sync across devices or restore from an old account. Reading still works when storage is unavailable. Account-based certificates and remote feedback submission are no longer shown.

Old purchase, login, invoice, and checkout-return pages redirect to `/learn`. The former preview URL redirects to the full episode. Legacy progress, answer, and subscription APIs return HTTP 410 without contacting external services.

Unused authentication, commerce, and backend helpers remain for historical reference but are not imported by the active pages. The legacy `build:data` scripts still fetch commerce bundle data from the old backend and require network access and a service credential. Do not run them for the free site; `yarn build` uses local MDX only.

## Styles

The site uses Tailwind CSS, Tailwind Typography, and Framer Motion.
