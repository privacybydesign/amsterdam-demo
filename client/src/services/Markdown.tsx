import React from 'react';
import ReactMarkdownLib from 'react-markdown';

/**
 * Backwards-compatible shim around react-markdown.
 *
 * react-markdown v5+ replaced the v4 API (`source`, `renderers`, `plugins`) with
 * `children`, `components` (keyed by HTML tag name) and `remarkPlugins`. This adapter keeps
 * the app's original v4 call sites unchanged while rendering through react-markdown v10.
 */

type Renderers = Record<string, React.ElementType>;

// Map react-markdown v4 renderer node-type keys to the v10 HTML element component keys.
// Custom deflist node types resolve to dl/dt/dd because services/deflist.ts sets data.hName.
const NODE_TYPE_TO_TAGS: Record<string, string[]> = {
    paragraph: ['p'],
    heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    link: ['a'],
    list: ['ul', 'ol'],
    listItem: ['li'],
    emphasis: ['em'],
    strong: ['strong'],
    definitionlist: ['dl'],
    descriptionlist: ['dl'],
    descriptionterm: ['dt'],
    descriptiondetails: ['dd']
};

// react-markdown v10 passes an internal `node` prop to every component; strip it so it is
// not forwarded onto DOM elements by the wrapped (often styled) components.
const stripNode = (Comp: React.ElementType): React.FC<any> => {
    const Wrapped: React.FC<any> = ({ node, ...rest }) => <Comp {...rest} />;
    return Wrapped;
};

const toComponents = (renderers?: Renderers): Record<string, React.FC<any>> | undefined => {
    if (!renderers) return undefined;
    const components: Record<string, React.FC<any>> = {};
    Object.entries(renderers).forEach(([key, Comp]) => {
        const wrapped = stripNode(Comp);
        (NODE_TYPE_TO_TAGS[key] || [key]).forEach(tag => {
            components[tag] = wrapped;
        });
    });
    return components;
};

export interface MarkdownProps {
    /** v4-style markdown string source. */
    source?: string;
    /** Alternative to `source`, matching react-markdown's own children API. */
    children?: string;
    /** v4-style renderer map keyed by mdast node type. */
    renderers?: Renderers;
    /** v4-style remark plugins (e.g. the deflist plugin). */
    plugins?: any[];
}

const Markdown: React.FC<MarkdownProps> = ({ source, children, renderers, plugins }) => (
    <ReactMarkdownLib components={toComponents(renderers) as any} remarkPlugins={plugins}>
        {source ?? children ?? ''}
    </ReactMarkdownLib>
);

export default Markdown;
