// Force-collapses every top-level category so the platform sidebar reads as
// "background context" while the API sub-sidebar takes focus.

interface SidebarLikeItem {
  type?: string;
  collapsible?: boolean;
  collapsed?: boolean;
  items?: SidebarLikeItem[];
  [key: string]: unknown;
}

export function forceCollapseTopLevel<T extends SidebarLikeItem>(items: T[]): T[] {
  return items.map(item => {
    if (item.type === 'category') {
      return { ...item, collapsible: true, collapsed: true };
    }
    return item;
  });
}
