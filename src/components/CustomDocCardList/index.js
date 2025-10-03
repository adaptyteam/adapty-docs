import React from 'react';
import { useCurrentSidebarCategory, filterDocCardListItems } from '@docusaurus/theme-common';
import { useDocById } from '@docusaurus/theme-common/internal';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

function CustomDocCard({ item }) {
    const doc = useDocById(item.docId ?? undefined);

    return (
        <Link href={item.href} className={styles.card}>
            <h3 className={styles.cardTitle}>{item.label}</h3>
            <p className={styles.cardDescription}>
                {item.description ?? doc?.description ?? 'Learn more about this topic.'}
            </p>
        </Link>
    );
}

export default function CustomDocCardList({ ids = null }) {
    const category = useCurrentSidebarCategory();

    if (!category || !category.items) {
        return (
            <div style={{padding: '20px', border: '1px solid #e1e5e9', borderRadius: '8px', margin: '20px 0', backgroundColor: '#f8f9fa'}}>
                <h3 style={{color: '#4a5568', margin: '0 0 10px 0'}}>Related Topics</h3>
                <p>No related topics found. This might be because the current page doesn't have child pages in the sidebar.</p>
            </div>
        );
    }

    // If specific IDs are provided, filter BEFORE using Docusaurus filter
    let itemsToFilter = category.items;

    if (ids && Array.isArray(ids) && ids.length > 0) {
        // Filter raw items first
        itemsToFilter = itemsToFilter.filter(item => {
            // Check direct docId
            const directMatch = item.docId && ids.includes(item.docId);

            // Check category href (extract ID from /docs/ID format)
            let categoryMatch = false;
            let categoryId = null;
            if (item.href && item.href.startsWith('/docs/')) {
                categoryId = item.href.replace('/docs/', '');
                categoryMatch = ids.includes(categoryId);
            }

            // Check category link docId (fallback)
            const categoryLinkMatch = item.link && item.link.docId && ids.includes(item.link.docId);

            return directMatch || categoryMatch || categoryLinkMatch;
        });
    }

    // Now apply Docusaurus filter to the (possibly pre-filtered) items
    let filteredItems = filterDocCardListItems(itemsToFilter);

    if (filteredItems.length === 0) {
        return (
            <div style={{padding: '20px', border: '1px solid #e1e5e9', borderRadius: '8px', margin: '20px 0', backgroundColor: '#f8f9fa'}}>
                <h3 style={{color: '#4a5568', margin: '0 0 10px 0'}}>Related Topics</h3>
                <p>No related topics found. This might be because the current page doesn't have child pages in the sidebar.</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {filteredItems.slice(0, ids ? filteredItems.length : 9).map((item, index) => (
                <CustomDocCard key={index} item={item} />
            ))}
        </div>
    );
}