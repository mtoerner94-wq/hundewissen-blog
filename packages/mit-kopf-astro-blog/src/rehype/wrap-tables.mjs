import { visit } from 'unist-util-visit';

/** Wraps markdown tables in a scrollable div (class: table-scroll). */
export function rehypeWrapTables() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName === 'table' && parent && typeof index === 'number') {
        parent.children[index] = {
          type: 'element',
          tagName: 'div',
          properties: { className: ['table-scroll'] },
          children: [node],
        };
      }
    });
  };
}
