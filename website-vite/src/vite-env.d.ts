/// <reference types="vite/client" />

declare module "*.mdx" {
  import * as React from "react";
  const MDXComponent: React.ComponentType<any>;
  export default MDXComponent;

  // Provided by remark-mdx-frontmatter
  export const frontmatter: Record<string, any>;
}
