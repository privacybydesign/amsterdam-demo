/**
 * Remark DefinitionList plugin.
 */

import visit from 'unist-util-visit';
import toString from 'mdast-util-to-string';

const isdeflist = (node: any, i: number, parent: any) =>
    i > 0 &&
    /^:\s/.test(toString(node)) &&
    !/^:\s/.test(toString(parent.children[i - 1])) &&
    node.type === 'paragraph' &&
    parent.children[i - 1].type === 'paragraph';

export default () => (tree: unknown): void => {
    visit(tree, ['paragraph'], (node: any, i: number, parent: any) => {
        const isdef = isdeflist(node, i, parent);
        if (!isdef) {
            return;
        }

        // Remove the ": " that we use to identify a deflist to begin with.
        visit(node, (n: any) => {
            if (typeof n.value !== 'undefined') {
                n.value = n.value.replace(/^:\s+/, '');
            }
        });

        const child = {
            type: 'descriptionlist',
            data: {
                hName: 'dl'
            },
            children: [
                {
                    type: 'descriptionterm',
                    data: {
                        hName: 'dt'
                    },
                    children: parent.children[i - 1].children
                },
                {
                    type: 'descriptiondetails',
                    data: {
                        hName: 'dd'
                    },
                    children: node.children
                }
            ]
        };

        parent.children.splice(i - 1, 2, child);
    });
};
