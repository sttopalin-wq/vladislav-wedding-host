import type { NextConfig } from "next";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: base,
  poweredByHeader: false,
  images: { unoptimized: true },
};

export default config;
