# API Reference Management

This directory contains the configuration and source files for the interactive API reference built using [Stoplight Elements](https://stoplight.io/open-source/elements).

## How to add a new API Specification

To add a new API reference page to the documentation, follow these steps:

### 1. Add the OpenAPI Specification
Place your OpenAPI YAML or JSON file in the `public/api-specs/` folder:
`public/api-specs/your-api.yaml`

Alternatively, if you want to host the file externally (e.g., in GitHub), you can use a direct URL.

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
- `specFile`: (Optional) The filename inside `src/api-reference/specs/`. 
- `specUrl`: (Optional) A direct URL to an external OpenAPI file. If `specUrl` is present, it takes precedence over `specFile`.
- `defaultAuth`: (Optional) Default authentication credentials to pre-fill the "Try It" section.

### 3. Verify
Once the configuration is saved, the new page will be automatically generated at `/[slug]`.

## Technical Implementation
- The renderer is located at `src/pages/[slug].astro`.
- It uses Stoplight Elements via Web Components for maximum compatibility.
- Styles and layout are customized in `src/pages/[slug].astro` to ensure full-width display and a consistent look with the rest of the documentation.
