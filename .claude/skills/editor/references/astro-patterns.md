# Astro Documentation Patterns

## File Structure

### Content Location
- **Documentation files**: `src/content/docs/`
- **Shared images**: `src/assets/shared/`
- **Article-specific images**: `src/assets/<article-filename>/`

### MDX File Conventions

```mdx
---
title: "Page Title"
description: "Brief description for SEO and previews"
---

import ComponentName from '@components/ComponentName.astro';
import { Image } from 'astro:assets';
import myImage from '@assets/shared/image.png';

# Main Heading

Content here...
```

## Common MDX Patterns

### Internal Links

**Relative links:**
```mdx
[Configuration guide](configuration)
[Related topic](configuration#related-topic)
```

**Anchor links:**
```mdx
[Jump to section on the current page](#section-heading)
```

Anchor slugs are auto-generated: lowercase, hyphenated, special characters stripped.
Example: "Configure A/B Tests" → `#configure-ab-tests`

## Validation Checks

### Image Verification
- Verify the image file exists at the exact path specified in the import
- Check path alias: `@assets/` not `@asset/` (common typo)
- Shared images must be in `src/assets/shared/`
- Article-specific images must be in `src/assets/<article-filename>/`
- Alt text must be descriptive (not empty, not "image", not filename)

### Link Verification
- Internal links must resolve to existing pages
- Check relative paths are correct: `../config` not `config/`
- Anchor links must match heading slugs (lowercase, hyphenated)
- Use descriptive link text: "See Installation guide" not "click here"

### Import Statement Issues
- Verify component imports resolve
- Check for correct `@` path aliases (`@components/`, `@assets/`)
- Ensure all imported components/images are used

## Scope by Review Type

### Diff Reviews
Check **only** links and images that appear in the added/modified lines. Don't validate unchanged content.

### Full Article Reviews
Validate **all** links and images in the article — not just recently changed ones.
