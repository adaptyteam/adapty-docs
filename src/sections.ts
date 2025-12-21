import type { ComponentProps, ReactNode } from 'react';

export type Section = { docId: string } & (
  | {
    section: false;
  }
  | {
    section: string;
    icon: (props: ComponentProps<'svg'>) => ReactNode;
    name: string;
  }
);

const SECTIONS: Section[] = [
  // Mobile SDKs
  {
    name: 'iOS',
    docId: 'default',
    section: 'mobile-sdk',
  },
  {
    name: 'Android',
    docId: 'default',
    section: 'mobile-sdk',
  },
  {
    name: 'React Native',
    docId: 'default',
    section: 'mobile-sdk',
  },
  {
    name: 'Flutter',
    docId: 'default',
    section: 'mobile-sdk',
  },
  {
    name: 'Unity',
    docId: 'default',
    section: 'mobile-sdk',
  },
  {
    name: 'Kotlin Multiplatform',
    'docId': 'default',
    section: 'mobile-sdk'
  }
];

export type SectionsGroup = {
  name: string;
  section: string;
  description?: string;
  className?: string;
};

const SECTION_GROUPS: SectionsGroup[][] = [
  [
    {
      name: 'Mobile SDK',
      section: 'mobile-sdk',
      description: 'Choose your mobile platform to view platform-specific documentation.',
    },
  ],
];

export { SECTIONS, SECTION_GROUPS };
