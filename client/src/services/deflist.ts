/**
 * Remark DefinitionList plugin.
 */

import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';
import type { Node } from 'unist';

const isdeflist = (node: any, i: number | undefined, parent: any) =>
    i !== undefined &&
    i > 0 &&
    /^:\s/.test(toString(node)) &&
    !/^:\s/.test(toString(parent.children[i - 1])) &&
    node.type === 'paragraph' &&
    parent.children[i - 1].type === 'paragraph';

export default () =>
    (tree: Node): void => {
        // unist-util-visit v5 types the visitor's index/parent as possibly undefined.
        visit(tree, ['paragraph'], (node: any, i: number | undefined, parent: any) => {
            const isdef = isdeflist(node, i, parent);
            if (!isdef || i === undefined) {
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
