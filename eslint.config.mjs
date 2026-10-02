import nextConfig from "eslint-config-next/core-web-vitals";

// Flat ESLint config (ESLint 9+). `next lint` was removed in Next.js 16, so
// linting is now run through the ESLint CLI (`npm run lint`).
const eslintConfig = [
  ...nextConfig,
  {
    ignores: [".next/**", "out/**", "build/**", "node_modules/**"],
  },
];

export default eslintConfig;