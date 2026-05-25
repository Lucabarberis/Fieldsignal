import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Allow .mdx files to be treated as routes/imports
  pageExtensions: ["ts", "tsx", "mdx"],
};

const withMDX = createMDX({
  // Add markdown plugins here as the blog grows
  // e.g. remarkGfm for tables, remarkSmartypants for typography
});

export default withMDX(nextConfig);
