# API Reference Management

This directory contains the configuration and source files for the API reference, rendered by an in-house Astro renderer driven by [`@apidevtools/swagger-parser`](https://www.npmjs.com/package/@apidevtools/swagger-parser).

## How to add a new API Specification

To add a new API reference page to the documentation, follow these steps:

### 1. Add the OpenAPI Specification
Place your OpenAPI YAML or JSON file in the `src/api-reference/specs/` folder:
`src/api-reference/specs/your-api.yaml`

The prebuild step copies these files into `public/api-specs/`, where the renderer loads them from at build time.

### 2. Update the Configuration
Add a new entry to the `src/api-reference/config.json` file:

```json
[
  {
    "name": "My New API",
    "slug": "my-new-api",
    "specFile": "your-api.yaml",
    "defaultAuth": {
      "apikeyAuth": "Api-Key YOUR_KEY_HERE"
    }
  }
]
```

#### Configuration Properties:
- `name`: The display name of the API.
- `slug`: The URL path where the API will be available (e.g., `/my-new-api`).
- `specFile`: The filename inside `src/api-reference/specs/`.
- `defaultAuth`: (Optional) Default authentication credentials to pre-fill the "Try It" section.

### 3. Verify
Once the configuration is saved, the new page will be automatically generated at `/[slug]` (landing page) and `/[slug]/operations/[operationId]` (per-operation pages).

## Technical Implementation
- Spec loading and dereferencing: `src/api-reference/lib/load-spec.ts` (uses `@apidevtools/swagger-parser`).
- Internal model building: `src/api-reference/lib/model.ts`.
- Sidebar generation: `src/api-reference/lib/build-sidebar.ts`.
- Code samples: `src/api-reference/lib/code-samples.ts`.
- Markdown rendering: `src/api-reference/lib/render-markdown.ts`.
- Page routes:
  - `src/pages/[slug].astro` — landing page per API.
  - `src/pages/[slug]/[...rest].astro` — per-operation pages.
  - Localized variants under `src/pages/[locale]/`.
- Page components: `src/components/api-reference/SpecLandingPage.astro` and `OperationPage.astro`.
