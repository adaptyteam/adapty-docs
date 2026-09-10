import { visit } from 'unist-util-visit';

// Funnels every collapsible in the docs into src/components/Details.astro.
//
// Articles write three shapes — <Details summary="…">, <Details> with a child
// <summary>, and plain lowercase <details> — and the last one would otherwise
// render unstyled: Astro's MDX `components` map only covers elements markdown
// itself generates (that's why `img: MDXImage` works), not literal JSX tags an
// author types. Renaming `details` to `Details` here sends all three through
// the one component, so there is a single collapsible design to maintain.
//
// The child <summary> is left alone — it arrives through the component's slot
// and is styled there.
export function remarkNormalizeDetails() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement')
        && node.name === 'details'
      ) {
        node.name = 'Details';
      }
    });
  };
}
