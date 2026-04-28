// src/api-reference/lib/build-sidebar.ts
import type { ApiSpec } from './model.ts';

export interface SidebarItem {
  type: 'doc' | 'category' | 'link';
  id?: string;
  label?: string;
  href?: string;
  collapsible?: boolean;
  collapsed?: boolean;
  // API-sidebar opt-in: hide the toggle and force items always-visible. Set on
  // every category emitted by buildSidebar so the API sub-sidebar reads as a
  // static index, not a collapsible tree. Other sidebars (tutorial, platform)
  // are unaffected.
  noToggle?: boolean;
  // Marks the spec landing page entry — rendered with a distinct card-like
  // treatment so users recognize it as the section's home, not a tag header.
  isOverview?: boolean;
  link?: { type: 'doc' | 'category'; id?: string };
  items?: SidebarItem[];
  meta?: { method?: string };
}

function pillForMethod(method: string): string {
  return method.toUpperCase();
}

export function buildSidebar(spec: ApiSpec, basePath: string): SidebarItem[] {
  const cleanBase = basePath.replace(/\/+$/, '');
  const overviewHref = `${cleanBase}/${spec.slug}`;
  const sections: SidebarItem[] = [];

  const opLink = (op: ApiSpec['operations'][number]): SidebarItem => ({
    type: 'link',
    label: op.summary,
    href: `${cleanBase}/${spec.slug}/operations/${op.operationId}`,
    meta: { method: pillForMethod(op.method) },
  });

  // Untagged: the spec name itself is the overview link, with all operations
  // listed directly underneath as a non-collapsible group.
  if (spec.tags.length === 0) {
    sections.push({
      type: 'category',
      id: spec.slug,
      label: spec.name,
      href: overviewHref,
      noToggle: true,
      isOverview: true,
      items: spec.operations.map(opLink),
    });
    return sections;
  }

  // Tagged: the spec name is a standalone overview link at the top, then each
  // tag is a non-collapsible group with its operations underneath.
  sections.push({
    type: 'link',
    id: spec.slug,
    label: spec.name,
    href: overviewHref,
    isOverview: true,
  });

  const opByTag = new Map<string, ApiSpec['operations']>();
  for (const op of spec.operations) {
    if (!op.tag) continue;
    if (!opByTag.has(op.tag)) opByTag.set(op.tag, []);
    opByTag.get(op.tag)!.push(op);
  }

  for (const tag of spec.tags) {
    const ops = opByTag.get(tag.name) ?? [];
    sections.push({
      type: 'category',
      label: tag.name.toUpperCase(),
      noToggle: true,
      items: ops.map(opLink),
    });
  }

  return sections;
}
