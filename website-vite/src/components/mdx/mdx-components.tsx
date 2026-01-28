import React from "react";
import { InlineNotification, Grid, Column, CodeSnippet } from "@carbon/react";
import PageDescription from "./PageDescription";
import AnchorLinks from "./AnchorLinks";
import AnchorLink from "./AnchorLink";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Map MDX "custom tags" to real React components.
 * This is how we avoid having to import these in every MDX file.
 */
export const mdxComponents = {
  PageDescription,
  AnchorLinks,
  AnchorLink,

  // Carbon component used in your MDX without explicit import
  InlineNotification,
  CodeSnippet,

  /**
   * Your MDX currently uses <Row> and <Column colMd={9} colLg={9}> ... </Column>.
   * Carbon v11 uses <Grid> and <Column>.
   * We provide a <Row> alias that is just a Grid wrapper for simple layout blocks.
   */
  Row: (props: any) => <Grid {...props} />,

  /**
   * Provide a custom Column wrapper to accept colMd/colLg like your MDX.
   * Carbon Column uses `md`, `lg`, etc.
   */
  Column: ({ colSm, colMd, colLg, children, ...rest }: any) => (
    <Column sm={colSm} md={colMd} lg={colLg} {...rest}>
      {children}
    </Column>
  ),

  // Make <Link> in MDX degrade gracefully if any remain:
  Link: ({ href, to, children, ...rest }: any) => (
    <a href={href ?? to} {...rest}>
      {children}
    </a>
  ),
  
  // Add heading components with automatic IDs for anchor links
  h1: ({ children, ...props }: any) => {
    const text = typeof children === "string" ? children : "";
    const id = text ? slugify(text) : undefined;
    return <h1 id={id} {...props}>{children}</h1>;
  },
  h2: ({ children, ...props }: any) => {
    const text = typeof children === "string" ? children : "";
    const id = text ? slugify(text) : undefined;
    return <h2 id={id} {...props}>{children}</h2>;
  },
  h3: ({ children, ...props }: any) => {
    const text = typeof children === "string" ? children : "";
    const id = text ? slugify(text) : undefined;
    return <h3 id={id} {...props}>{children}</h3>;
  },
  h4: ({ children, ...props }: any) => {
    const text = typeof children === "string" ? children : "";
    const id = text ? slugify(text) : undefined;
    return <h4 id={id} {...props}>{children}</h4>;
  },
  
  // Handle code blocks with CodeSnippet
  pre: ({ children, ...props }: any) => {
    // Extract code content from pre > code structure
    const codeElement = React.Children.toArray(children).find(
      (child: any) => child?.type === "code"
    );
    
    if (codeElement && React.isValidElement(codeElement)) {
      const codeContent = codeElement.props.children;
      const codeString = typeof codeContent === "string" ? codeContent : String(codeContent);
      
      // Determine if it's multiline
      const isMultiline = codeString.includes("\n");
      
      return (
        <CodeSnippet
          type={isMultiline ? "multi" : "single"}
          feedback="Copied to clipboard"
        >
          {codeString}
        </CodeSnippet>
      );
    }
    
    return <pre {...props}>{children}</pre>;
  },
};
