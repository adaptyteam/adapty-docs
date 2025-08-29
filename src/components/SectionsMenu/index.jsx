import React from 'react';
import clsx from 'clsx';
import { useHistory } from '@docusaurus/router';
import useGlobalData from '@docusaurus/useGlobalData';
import styles from './styles.module.css';

function getPrettyPath(path) {
  return path.slice(-1) === '/' ? path.slice(0, -1) : path;
}

export default function SectionsMenu({ defaultValue, values, onValueChange, triggerClassName }) {
  const router = useHistory();
  const globalData = useGlobalData();
  const allDocs = globalData['docusaurus-plugin-content-docs'];

  const handleSectionChange = (selectedSection) => {
    if (selectedSection !== defaultValue) {
      const { pathname, hash } = router.location;
      const page = `/${selectedSection}/` + pathname.split('/').slice(2).join('/');

      const selectedSectionDocs = allDocs[selectedSection].versions[0].docs;

      if (selectedSectionDocs.find((doc) => doc.path === page)) {
        const path = page + (hash && hash.length > 0 ? '#' + hash : '');
        router.push(getPrettyPath(path));
      } else {
        const path = selectedSectionDocs[0].path;
        router.push(getPrettyPath(path));
      }
    }
  };

  const currentValue = values.find((v) => v.docId === defaultValue) || values[0];

  return (
    <div className={styles.container}>
      <select
        className={clsx(styles.select, triggerClassName)}
        value={currentValue?.docId || ''}
        onChange={(e) => handleSectionChange(e.target.value)}
      >
        {values.map((value) => (
          <option key={value.docId} value={value.docId}>
            {value.name}
          </option>
        ))}
      </select>
    </div>
  );
}
