import type { MDXComponents } from "mdx/types";

/**
 * Brand-styled MDX components for blog posts and guides.
 * Maps standard markdown elements to FieldSignal typography rules.
 */
export function useMDXComponents(
  components: MDXComponents
): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="font-sans font-medium text-page leading-[0.95] tracking-[-0.028em] text-ink mt-12 mb-6">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-sans font-medium text-section leading-[1] tracking-[-0.022em] text-ink mt-10 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-sans font-semibold text-[20px] leading-[1.2] tracking-[-0.012em] text-ink mt-8 mb-3">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-body text-ink-2 my-4 max-w-3xl">{children}</p>
    ),
    a: ({ children, href }) => (
      <a
        href={href as string}
        className="text-ink underline decoration-rule-2 underline-offset-2 hover:text-red hover:decoration-red transition-colors"
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="my-4 space-y-2 max-w-3xl">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="my-4 space-y-2 max-w-3xl list-decimal pl-6">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="flex gap-3 text-body text-ink-2">
        <span className="text-red font-mono font-semibold mt-px">+</span>
        <span className="flex-1">{children}</span>
      </li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-red pl-5 py-2 bg-paper-2 text-ink">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="font-mono text-[13px] bg-paper-2 px-1.5 py-0.5">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="my-6 font-mono text-[13px] bg-ink text-paper p-5 overflow-x-auto">
        {children}
      </pre>
    ),
    hr: () => <hr className="my-10 border-t border-rule" />,
    strong: ({ children }) => (
      <strong className="font-semibold text-ink">{children}</strong>
    ),
    ...components,
  };
}
