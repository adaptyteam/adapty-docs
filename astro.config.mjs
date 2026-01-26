// @ts-check
import { defineConfig } from 'astro/config';
import path from 'node:path';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import remarkDirective from 'remark-directive';
import { remarkAside } from './src/plugins/remark-aside.mjs';
import { remarkTransformRequire } from './src/plugins/remark-transform-require.mjs';
import { remarkTransformDetails } from './src/plugins/remark-transform-details.mjs';
import { remarkHeadingId } from './src/plugins/remark-heading-id.mjs';
import { remarkTransformLinks } from './src/plugins/remark-transform-links.mjs';

// https://astro.build/config
export default defineConfig({
  outDir: './build',
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      },
    },
  },
  build: {
    inlineStylesheets: 'never',
  },
  vite: {
    plugins: [tailwindcss()],
    define: {
      global: 'window',
      'process.env': '{}',
    },
    resolve: {
      alias: {
        '@site': path.resolve('./'),
        '@components': path.resolve('./src/components'),
        'react-medium-image-zoom/dist/styles.css': path.resolve('./src/styles/empty.css'),
        'react-medium-image-zoom': path.resolve('./src/components/ZoomShim.tsx'),
      }
    }
  },

  markdown: {
    remarkPlugins: [remarkHeadingId, remarkDirective, remarkAside, remarkTransformRequire, remarkTransformDetails, remarkTransformLinks],
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
      transformers: [
        {
          name: 'title-transformer',
          pre(node) {
            // Extract title from meta
            const meta = this.options.meta?.__raw || '';
            const titleMatch = meta.match(/title="([^"]+)"/);
            if (titleMatch) {
              node.properties['data-title'] = titleMatch[1];
            }

            // Add language attribute for badge display
            const lang = this.options.lang || '';
            if (lang) {
              node.properties['data-language'] = lang;
            }
          }
        }
      ]
    },
  },

  integrations: [
    react(),
    mdx({
      remarkPlugins: [remarkHeadingId, remarkDirective, remarkAside, remarkTransformRequire, remarkTransformDetails, remarkTransformLinks],
      shikiConfig: {
        theme: 'github-light',
        wrap: true,
        transformers: [
          {
            name: 'title-transformer',
            pre(node) {
              // Extract title from meta
              const meta = this.options.meta?.__raw || '';
              const titleMatch = meta.match(/title="([^"]+)"/);
              if (titleMatch) {
                node.properties['data-title'] = titleMatch[1];
              }

              // Add language attribute for badge display
              const lang = this.options.lang || '';
              if (lang) {
                node.properties['data-language'] = lang;
              }
            }
          }
        ]
      }
    })
  ]
});