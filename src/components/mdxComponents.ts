// Shared MDX component map.
//
// Both doc routes — `src/pages/[...slug].astro` (English) and
// `src/pages/[locale]/[...slug].astro` (localized) — render article MDX via
// `<Content components={...} />`. Astro only injects MDX components through that
// prop, so components CANNOT be provided from DocsLayout (the layout receives
// already-rendered HTML via <slot /> and never sees the component map).
//
// To avoid the recurring "registered in one route but not the other" build
// break, register every component that both routes share here and spread it in
// each route. Route-specific components (e.g. the localized Homepage, the React
// calculators) are added alongside the spread in their own route.
import Tabs from './Tabs.astro';
import TabItem from './TabItem.astro';
import Callout from './Callout.astro';
import Zoom from './Zoom.astro';
import CustomDocCardList from './CustomDocCardList.astro';
import Details from './Details.astro';
import InlineTooltip from './InlineTooltip.astro';
import ZoomImage from './ZoomImage.astro';
import Button from './Button.astro';
import Inline from './Inline.astro';
import MDXImage from './MDXImage.astro';
import SDKv4 from './SDKv4.astro';
import SDKv3 from './SDKv3.astro';
import MethodPromo from './MethodPromo.astro';
import SkillPromo from './SkillPromo.astro';
import ProductMap from './ProductMap.astro';

export const mdxComponents = {
  Tabs,
  TabItem,
  Callout,
  Zoom,
  CustomDocCardList,
  Details,
  InlineTooltip,
  ZoomImage,
  MDXImage,
  Button,
  Inline,
  SDKv4,
  SDKv3,
  MethodPromo,
  SkillPromo,
  ProductMap,
  img: MDXImage,
};
