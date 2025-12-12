/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import {
    useAnnouncementBar,
    useScrollPosition,
} from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import DocSidebarItems from '@theme/DocSidebarItems';
import styles from './styles.module.css';

function useShowAnnouncementBar() {
    const { isActive } = useAnnouncementBar();
    const [showAnnouncementBar, setShowAnnouncementBar] = useState(isActive);
    useScrollPosition(
        ({ scrollY }) => {
            if (isActive) {
                setShowAnnouncementBar(scrollY === 0);
            }
        },
        [isActive],
    );
    return isActive && showAnnouncementBar;
}

export default function DocSidebarDesktopContent({ path, sidebar, className }) {
    console.log('DocSidebarDesktopContent mounted', { path });
    const showAnnouncementBar = useShowAnnouncementBar();
    const menuRef = useRef(null);

    useEffect(() => {
        // Function to handle active item scrolling and duplicate cleanup
        const handleActiveItem = () => {
            if (!menuRef.current) return;

            // Find all active links
            // Docusaurus uses 'menu__link--active' for the active item
            const activeLinks = menuRef.current.querySelectorAll('.menu__link--active');

            if (activeLinks.length > 0) {
                // If there are duplicates, keep only the first one active
                // We check href to ensure we don't un-highlight distinct active items (like parent categories)
                const seenHrefs = new Set();

                activeLinks.forEach((link) => {
                    const href = link.getAttribute('href');
                    if (seenHrefs.has(href)) {
                        link.classList.remove('menu__link--active');
                        link.removeAttribute('aria-current');
                    } else {
                        seenHrefs.add(href);
                    }
                });

                const activeItem = activeLinks[0];

                // Check if the item is already visible in the viewport
                const rect = activeItem.getBoundingClientRect();
                const isVisible = (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                );

                // Only scroll if not fully visible
                if (!isVisible) {
                    activeItem.scrollIntoView({
                        behavior: 'auto',
                        block: 'center',
                        inline: 'nearest'
                    });
                }
            }
        };

        // Initial check
        handleActiveItem();

        // Use MutationObserver to detect changes in the sidebar (e.g. expansion, loading)
        const observer = new MutationObserver((mutations) => {
            handleActiveItem();
        });

        if (menuRef.current) {
            observer.observe(menuRef.current, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['class']
            });
        }

        return () => {
            observer.disconnect();
        };
    }, [path, sidebar]); // Re-run when path or sidebar changes

    return (
        <nav
            ref={menuRef}
            aria-label={translate({
                id: 'theme.docs.sidebar.navAriaLabel',
                message: 'Docs sidebar',
                description: 'The ARIA label for the sidebar navigation',
            })}
            className={clsx(
                'menu',
                styles.menu,
                showAnnouncementBar && styles.menuWithAnnouncementBar,
                className,
            )}>
            <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
                <DocSidebarItems items={sidebar} activePath={path} level={1} />
            </ul>
        </nav>
    );
}
