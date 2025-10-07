import React from 'react';
import { useCurrentSidebarCategory, filterDocCardListItems } from '@docusaurus/theme-common';
import { useDocById } from '@docusaurus/theme-common/internal';
import useGlobalData from '@docusaurus/useGlobalData';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import sidebarConfig from '../../../versioned_sidebars/version-3.0-sidebars.json';

// Helper function to find the label for a document ID in the sidebar configuration
function findLabelForDocId(docId, sidebarItems) {
    for (const item of sidebarItems) {
        if (item.type === 'doc' && item.id === docId) {
            return item.label;
        } else if (item.type === 'category' && item.items) {
            const found = findLabelForDocId(docId, item.items);
            if (found) return found;
        }
    }
    return null;
}

function CustomDocCard({ item }) {
    const doc = useDocById(item.docId ?? undefined);

    return (
        <Link href={item.href} className={styles.card}>
            <h3 className={styles.cardTitle}>{item.label || doc?.title || item.docId}</h3>
            <p className={styles.cardDescription}>
                {item.description ?? doc?.description ?? 'Learn more about this topic.'}
            </p>
        </Link>
    );
}

export default function CustomDocCardList({ ids = null }) {
    const category = useCurrentSidebarCategory();
    const globalData = useGlobalData();

    // If specific IDs are provided, search through ALL documents instead of just current category
    if (ids && Array.isArray(ids) && ids.length > 0) {
        const allDocs = globalData['docusaurus-plugin-content-docs'];
        let allDocuments = [];

        // Extract all documents from all versions
        Object.values(allDocs).forEach(docPlugin => {
            Object.values(docPlugin.versions).forEach(version => {
                allDocuments.push(...version.docs);
            });
        });

        // Convert to the format expected by the component, preserving order from ids array
        const itemsToFilter = ids.map(id => {
            // Find the document with this ID
            const doc = allDocuments.find(doc => {
                const docId = doc.id || doc.path.replace(/^\//, '').replace(/\.html$/, '');
                return docId === id;
            });
            
            if (!doc) {
                return null; // Document not found, will be filtered out
            }
            
            // Find the label from sidebar configuration
            let sidebarLabel = null;
            for (const sidebarName in sidebarConfig) {
                sidebarLabel = findLabelForDocId(doc.id, sidebarConfig[sidebarName]);
                if (sidebarLabel) break;
            }
            
            return {
                type: 'doc',
                docId: doc.id,
                href: doc.path,
                label: sidebarLabel // Include the sidebar label
            };
        }).filter(item => item !== null); // Remove any null items (documents not found)

        // Apply Docusaurus filter to the matched items
        let filteredItems = filterDocCardListItems(itemsToFilter);

        if (filteredItems.length === 0) {
            return (
                <div style={{padding: '20px', border: '1px solid #e1e5e9', borderRadius: '8px', margin: '20px 0', backgroundColor: '#f8f9fa'}}>
                    <h3 style={{color: '#4a5568', margin: '0 0 10px 0'}}>Related Topics</h3>
                    <p>No related topics found for the specified IDs.</p>
                </div>
            );
        }

        return (
            <div className={styles.container}>
                {filteredItems.slice(0, filteredItems.length).map((item, index) => (
                    <CustomDocCard key={index} item={item} />
                ))}
            </div>
        );
    }

    // Default behavior: use current category items
    if (!category || !category.items) {
        return (
            <div style={{padding: '20px', border: '1px solid #e1e5e9', borderRadius: '8px', margin: '20px 0', backgroundColor: '#f8f9fa'}}>
                <h3 style={{color: '#4a5568', margin: '0 0 10px 0'}}>Related Topics</h3>
                <p>No related topics found. This might be because the current page doesn't have child pages in the sidebar.</p>
            </div>
        );
    }

    // Use current category items for default behavior
    let itemsToFilter = category.items;

    // Now apply Docusaurus filter to the category items
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
            {filteredItems.slice(0, 9).map((item, index) => (
                <CustomDocCard key={index} item={item} />
            ))}
        </div>
    );
}