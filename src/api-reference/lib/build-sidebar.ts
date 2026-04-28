// src/api-reference/lib/build-sidebar.ts
import type { ApiSpec } from './model.ts';

export interface SidebarItem {
  type: 'doc' | 'category' | 'link';
  id?: string;
  label?: string;
  href?: string;
  collapsible?: boolean;
  collapsed?: boolean;
  link?: { type: 'doc' | 'category'; id?: string };
  items?: SidebarItem[];
  meta?: { method?: string; kind?: 'back' };
}

export interface BuildSidebarOptions {
  backTo?: string;
  backToLabel?: string;
}

function pillForMethod(method: string): string {
  return method.toUpperCase();
}

export function buildSidebar(
  spec: ApiSpec,
  basePath: string,
  options: BuildSidebarOptions = {},
): SidebarItem[] {
  const cleanBase = basePath.replace(/\/+$/, '');
  const opByTag = new Map<string, ApiSpec['operations']>();
  const untagged: ApiSpec['operations'] = [];

  for (const op of spec.operations) {
    if (op.tag) {
      if (!opByTag.has(op.tag)) opByTag.set(op.tag, []);
      opByTag.get(op.tag)!.push(op);
    } else {
      untagged.push(op);
    }
  }

  const sections: SidebarItem[] = [];

  if (options.backTo && options.backToLabel) {
    sections.push({
      type: 'link',
      label: options.backToLabel,
      href: `${cleanBase}${options.backTo}`,
      meta: { kind: 'back' },
    });
  }

  sections.push({
    type: 'category',
    label: spec.name,
    collapsible: false,
    items: [
      { type: 'link', label: 'Overview', href: `${cleanBase}/${spec.slug}` },
    ],
  });

  for (const tag of spec.tags) {
    const ops = opByTag.get(tag.name) ?? [];
    sections.push({
      type: 'category',
      label: tag.name.toUpperCase(),
      collapsible: true,
      collapsed: false,
      items: ops.map(op => ({
        type: 'link',
        label: op.summary,
        href: `${cleanBase}/${spec.slug}/operations/${op.operationId}`,
        meta: { method: pillForMethod(op.method) },
      })),
    });
  }

  if (untagged.length) {
    sections.push({
      type: 'category',
      label: 'OTHER',
      collapsible: true,
      collapsed: false,
      items: untagged.map(op => ({
        type: 'link',
        label: op.summary,
        href: `${cleanBase}/${spec.slug}/operations/${op.operationId}`,
        meta: { method: pillForMethod(op.method) },
      })),
    });
  }

  return sections;
}
