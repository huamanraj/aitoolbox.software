import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
        serverActions: {
            bodySizeLimit: '20mb', 
        },
    },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
            config.externals.push('pdfjs-dist','pdf-parse');
        }

        // Handle the worker file import by ensuring it's treated as a resource URL
        // and not a standard JavaScript module.
        config.module.rules.push({
            test: /\.mjs$/,
            include: /node_modules\/pdfjs-dist/,
            type: 'javascript/auto',
        });
        
        // This is often required for Next.js to properly handle the worker URL import
        config.module.rules.push({
            test: /\.mjs$/,
            resourceQuery: /url/,
            type: 'asset/resource',
        });

    return config;
  },
};

export default nextConfig;
