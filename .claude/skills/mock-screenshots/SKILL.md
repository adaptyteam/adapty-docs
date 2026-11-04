---
name: mock-screenshots
description: Use when an article needs a new or refreshed Adapty Dashboard or Flow & Paywall Builder screenshot, when `:::note` screenshot placeholders need real images, or when the user asks for a screenshot from mock data, without a login, or of a feature that has no real data yet.
---

# Mock Screenshots

Capture docs screenshots from the real dashboard code running on mock data. No login, no real
customer data, and the same shot can be retaken after the UI changes.

`scripts/shoot.mjs` runs a shot list through the `adapty-demo-videos` recorder, which owns the
checkout, the dev server, and the mock session. This skill covers what goes in the shot list and how
to judge the result. Keep recorder internals out of this repo: it is public.

Don't use it for mobile app screens, the App Store Connect or Google Play consoles, or anything else
outside the dashboard. Those need a real capture, so list them for the user.

## First run

The skill needs two private repos, and authors keep them in different places. Find both before
anything else:

| Repo | Looked for in | Override |
|---|---|---|
| `adapty-demo-videos` (the recorder, on GitHub) | next to the docs repo | `DEMO_VIDEOS_REPO` |
| `adapty-dashboard-interface` (on GitLab) | next to the recorder | `DASHBOARD_REPO` |

1. If a repo isn't in that location, ask the author where their clone is, then prefix every command in
   this skill with the override, for example `DEMO_VIDEOS_REPO=/path/to/clone`.
2. If the author has no clone, offer to clone it. If they have no access to either repo, stop: give
   them the capture table instead.
3. If the recorder has no `node_modules/`, run `npm install` there. Node must be 22.18+.
4. If `recorder/explore.mjs` reports a missing browser, run `npx playwright install chromium
   chromium-headless-shell` in the recorder.
5. The first run takes a few minutes: it creates a worktree and installs dependencies.

The dev servers use port 3000 for the dashboard and 3010 for the builder, and keep running after the
shoot. A run restarts a recorder server that serves another checkout, so say so if the user may be
working with it. A foreign process on the port stops the run instead.

## Workflow

1. **List the shots.** Take them from the article's `:::note` placeholders, or from the capture table
   the `editor` skill produces. Read the prose around each one: the image must show what that
   sentence says.
2. **Pick the branch.** The default is `master`, the shipped UI. For an unreleased feature, set
   `branch` to the ticket branch, and get the feature flag from its E2E test.
3. **Explore before scripting.** It prints test ids, buttons, and inputs, and saves PNGs to the
   recorder's `out/explore/`. For the builder, use `--target builder` with no `--route`.

   ```bash
   (cd <recorder> && node recorder/explore.mjs --target dashboard --route /products --branch master)
   ```

   Explore runs at 1600x900 and `shoot.mjs` at 1440x900, so use its test ids, not its boxes, in a shot
   list. A route can redirect to a tab, and the same form can differ by tab: check which variant the
   prose means.

4. **Write the shot list** in the scratchpad, never in this repo. See the format below.
5. **Shoot to the scratchpad first**, from the docs repo root, and convert to PNG to look at the result:

   ```bash
   node .claude/skills/mock-screenshots/scripts/shoot.mjs <list.mjs> --out <scratchpad>/shots
   ```

6. **Check every frame** against the checklist below. Fix the list and retake with `--only file.webp`.
7. **Publish.** Rerun without `--out`, which writes to `src/assets/shared/img/`. Replace each `:::note`
   placeholder with a `<ZoomImage>` that has a specific `alt` and a `width` from the table below.

Before overwriting an existing image, view it and keep its crop and framing. Report any shot you could
not take, and why.

## Shot list

```js
export default {
  target: 'dashboard',                 // or 'builder'; one target per list
  branch: 'master',                    // the default; a ticket branch for unreleased UI
  featureFlags: {},                    // optional, for example { flowFunnel: true }
  viewport: { width: 1440, height: 900 },  // the default; a shot can set its own
  flow: 'paywall.json',                // builder only: a file in the recorder's fixtures/
  async setup(page) {},                // optional, once before the first shot
  shots: [
    {
      file: 'products-create-drawer.webp',
      route: '/products',
      async prepare(page) {            // reach the state, and wait for it to appear
        await page.getByRole('button', { name: 'Create product' }).click();
        await page.getByText('Connect an existing store product').waitFor();
      },
      clip: { x: 920, y: 0, width: 520, height: 900 },  // CSS pixels or a selector; omit for the window
      remove: ['text=Read the docs'],  // optional, taken out of the page right before the shot
      box: 'button:has-text("Create product")',  // optional, one selector or rectangle
    },
  ],
};
```

Every shot saves at 2x. `settle` overrides the 800 ms wait before the shot. A failed shot leaves
`<file>.failed.png` beside the output, which shows what the page looked like.

In `prepare`, prefer `getByRole` or a test id: `getByText` can match the **Getting started** widget,
which repeats labels such as **Create placement**.

## What to capture

Take a screenshot when the reader has to find something, the screen has several similar controls, or
the result confirms they did the step right.

Skip it when the step is a single obvious click, or the image would only repeat the sentence. Tell the
user which placeholders you skipped, and why.

Use the light theme, and the same app and data throughout an article.

## Framing

Crop to what the sentence is about. The reader needs the control, not the whole window.

| Subject | Crop | `width` in `<ZoomImage>` |
|---|---|---|
| Full page with data | the content area, without the left menu | `700px` |
| Drawer or dialog | that element only | `400px`–`500px` |
| Full-page form | a narrower viewport, then a rectangle around the fields with some padding | `500px`–`700px` |
| Dropdown or small control | the control with some context around it | `300px`–`400px` |
| Builder | the full window, or the panel the sentence is about | `700px` |

A selector clip stops at the element's box, so it cuts off anything that overflows it, such as an open
dropdown menu. Use a rectangle for those.

Dashboard pages scroll in an inner container, so content below the fold needs a taller `viewport`. In a
wide table, a sticky last column cuts off the column under it. Set the shot's `viewport` width so the
sticky column meets a column edge.

## Annotations

The only annotation is a box in the brand purple, `#6720ff`. `box` draws it.

- A box is optional. Add one when the reader has to find a specific control on a busy screen.
- A screenshot has at most one box.
- An overview screenshot, which shows a whole page or panel, has no box.

## Custom data

Most pages already have mock data. Change it only when the shot needs a state the mock doesn't have.

- **Never edit the dashboard repo.** Override responses from the shot list.
- To find the endpoint behind a screen, run the shot with `--network`, then log the suspect response's
  body in `prepare`.
- `route.fetch()` skips the mocks and returns 404. To change one field, capture the mocked JSON, edit
  it, serve it, and reload:

  ```js
  const PRODUCTS = /\/in-apps\/products\/?(\?.*)?$/;
  const [res] = await Promise.all([
    page.waitForResponse(r => PRODUCTS.test(r.url()) && r.request().method() === 'GET'),
    page.reload(),
  ]);
  const body = await res.json();
  body.data[0].title = 'Yearly plus';
  await page.route(PRODUCTS, r => (r.request().method() === 'GET' ? r.fulfill({ json: body }) : r.fallback()));
  await page.reload();
  ```

- An unmocked endpoint needs a full body: `route.fulfill({ json })` with the shape from the frontend
  types.
- For numbers, derive every field from a few inputs, weight totals rather than averaging rates, and
  don't leave a real date beside fake results.

## Check every frame

- **Is this the state the article describes?** The mock account has no connected stores, so **Create
  product** opens titled "First, connect your stores", with the first option disabled. An account with
  connected stores sees "How would you like to add your product?". Override the state, or don't use
  the shot.
- **Does it show what the sentence says?** Compare every label in the prose with the frame. If they
  differ, the UI is the source of truth: fix the prose or ask.
- **Is any data placeholder-looking?** `Test App`, `user-fake-001`, `lorem`, and `placehold.co` covers
  must not reach the docs when they are the subject of the shot. Crop or override them.
- **Does it match the article's other shots?** Light theme, same app, same data.
- **Is any box justified?** One at most, around the control the sentence names, and none on an overview.
- **Is the frame clean?** No promo modals, toasts, spinners, skeleton cells, half-finished animations,
  or dev overlays.
  Nothing real, such as emails or keys.
- **Do the numbers add up?** Divide the columns the reader can divide.
- **Is it the shipped UI?** For a `master` shot, a label that disagrees with the article may mean the
  article is out of date.

## Common failures

| Symptom | Fix |
|---|---|
| `Cannot find package 'playwright'` | Run `npm install` in the recorder repo. |
| Timeout on a selector clip | The selector matches nothing. The product drawer, for one, has no `role="dialog"`. Use a rectangle, or find the selector with `explore.mjs`. |
| `@vitejs/plugin-react can't detect preamble` on every load | Restart the dev server. Reloading the page doesn't help. |
| A promo modal covers the page | Close it in `prepare`, or `remove` it. |
| `style` or `visibility` changes do nothing | The dashboard's CSP blocks inline styles. Use `remove`. |
| A page is empty | The mock is missing. Add an override, or check the feature flag. |
| Skeleton cells stay after the page loads | The response is 200 but lacks those fields. Find it with `--network` and add them. |
| Dropdowns won't open | They are react-select: click `.select__control`, then `.select__option`, each filtered by text. |
