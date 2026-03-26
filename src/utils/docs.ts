import type { CollectionEntry } from 'astro:content';
import fs from 'node:fs/promises';
import path from 'node:path';
import platformsData from '../data/platforms.json';

type DocEntry = CollectionEntry<'docs'>;

/**
 * Three-strategy ID matcher: exact id, id without extension, or basename without extension.
 */
export function findDocEntry(allDocs: DocEntry[], docId: string): DocEntry | undefined {
  return allDocs.find(d =>
    d.id === docId ||
    d.id.replace(/\.(md|mdx)$/, '') === docId ||
    d.id.split('/').pop()?.replace(/\.(md|mdx)$/, '') === docId
  );
}

/**
 * Recursively extract doc IDs from sidebar items and build static path entries.
 * Mutates addedSlugs to track which slugs have already been added.
 */
export function extractIdsFromSidebar(
  items: any[],
  allDocs: DocEntry[],
  platform: { id: string; label: string },
  sidebar: any[],
  paths: any[],
  addedSlugs: Set<string>
): void {
  items.forEach(item => {
    let id = item.id || (item.link && item.link.id);
    if (id) {
      const doc = findDocEntry(allDocs, id);
      const actualId = doc ? doc.id : id;

      if (!addedSlugs.has(id)) {
        const redirectTo = doc?.data.customSlug;
        paths.push({
          params: { slug: id },
          props: { platform, sidebar, docId: actualId, redirectTo }
        });
        addedSlugs.add(id);
      }

      if (doc && doc.data.customSlug) {
        const customSlug = doc.data.customSlug;
        const slugParam = customSlug === '/' ? undefined : customSlug.replace(/^\//, '');
        const slugKey = customSlug === '/' ? 'ROOT_HOME' : customSlug;

        if (!addedSlugs.has(slugKey)) {
          paths.push({
            params: { slug: slugParam },
            props: { platform, sidebar, docId: actualId }
          });
          addedSlugs.add(slugKey);
        }
      }
    }
    if (item.items) {
      extractIdsFromSidebar(item.items, allDocs, platform, sidebar, paths, addedSlugs);
    }
  });
}

/**
 * Build the full list of static path entries from all sidebar files plus orphaned docs.
 */
export async function buildDocPaths(allDocs: DocEntry[]): Promise<any[]> {
  const paths: any[] = [];
  const addedSlugs = new Set<string>();

  const sidebarFiles = (await fs.readdir(path.resolve('./src/data/sidebars')))
    .filter(f => f.endsWith('.json'))
    .sort();

  for (const filename of sidebarFiles) {
    const platformId = filename.replace('.json', '');
    const platform = (platformsData as any).sdkPlatforms.find((p: any) => p.id === platformId)
      || { id: platformId, label: platformId.charAt(0).toUpperCase() + platformId.slice(1) };

    const sidebarPath = path.resolve(`./src/data/sidebars/${filename}`);
    try {
      const sidebarContent = await fs.readFile(sidebarPath, 'utf-8');
      const sidebar = JSON.parse(sidebarContent);
      extractIdsFromSidebar(sidebar, allDocs, platform, sidebar, paths, addedSlugs);
    } catch (e) {
      // Silently fail for missing sidebars
    }
  }

  // Orphaned pages — all docs reachable via their basename
  for (const doc of allDocs) {
    const docBasename = doc.id.split('/').pop()?.replace(/\.(md|mdx)$/, '');
    if (docBasename && !addedSlugs.has(docBasename)) {
      paths.push({
        params: { slug: docBasename },
        props: {
          platform: { id: '', label: '' },
          sidebar: null,
          docId: doc.id
        }
      });
      addedSlugs.add(docBasename);
    }
  }

  return paths;
}

/**
 * Build breadcrumb trail for a doc in a sidebar.
 * Returns the path excluding the current page (last item).
 */
export function buildBreadcrumbs(
  sidebar: any[],
  targetId: string,
  allDocs: DocEntry[],
  baseUrl: string
): { label: string; href?: string }[] {
  function getBreadcrumbs(
    items: any[],
    targetId: string,
    currentPath: { label: string; href?: string }[]
  ): { label: string; href?: string }[] | null {
    for (const item of items) {
      let href = item.href;

      if (!href) {
        const candidateId = item.link?.id || item.id;
        if (candidateId) {
          const docExists = allDocs.some(d =>
            d.id === candidateId ||
            d.id.replace(/\.(md|mdx)$/, '') === candidateId ||
            d.id.split('/').pop()?.replace(/\.(md|mdx)$/, '') === candidateId
          );
          if (docExists) {
            href = `${baseUrl}/${candidateId}`.replace(/\/+/g, '/');
          }
        }
      }

      if (href === `/${targetId}` || href === targetId) {
        href = undefined;
      }

      const newPath = [...currentPath, { label: item.label, href }];

      if (item.id === targetId || item.link?.id === targetId) {
        return newPath;
      }

      if (item.items) {
        const found = getBreadcrumbs(item.items, targetId, newPath);
        if (found) return found;
      }
    }
    return null;
  }

  const full = getBreadcrumbs(sidebar, targetId, []) || [];
  return full.length > 0 ? full.slice(0, -1) : [];
}
