import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    i18n: {
      locales: ['es', 'en', 'fr', 'de' ],
      defaultLocale: 'es',
    },
  };

export default nextConfig;
