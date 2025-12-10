import React from 'react';
import clsx from 'clsx';
import { useThemeConfig } from '@docusaurus/theme-common';
import Logo from '@theme/Logo';
import CollapseButton from '@theme/DocSidebar/Desktop/CollapseButton';
import Content from './Content';
import styles from './styles.module.css';
import SidebarMenu from '../../../components/SidebarMenu';

function DocSidebarDesktop({ path, sidebar, onCollapse, isHidden }) {
  console.log('DocSidebarDesktop mounted');
  const {
    navbar: { hideOnScroll },
    docs: {
      sidebar: { hideable },
    },
  } = useThemeConfig();

  return (
    <div
      className={clsx(
        styles.sidebar,
        hideOnScroll && styles.sidebarWithHideableNavbar,
        isHidden && styles.sidebarHidden,
      )}
    >
      {hideOnScroll && <Logo tabIndex={-1} className={styles.sidebarLogo} />}
      <SidebarMenu />
      <div className={styles.contentWrapper}>
        <Content path={path} sidebar={sidebar} />
      </div>
      {hideable && <CollapseButton onClick={onCollapse} />}
    </div>
  );
}
export default React.memo(DocSidebarDesktop);
