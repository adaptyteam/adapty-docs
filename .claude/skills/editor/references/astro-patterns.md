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

## Validation Checks

### Image Verification
Verify images with specified ids and extensions exist

### Link Verification
- Internal links should resolve to existing pages
- Check for broken relative paths
- Anchor links should match heading slugs (lowercase, hyphenated)

### Import Statement Issues
- Verify component imports resolve
- Check for correct `@` path aliases
- Ensure all imported components/images are used