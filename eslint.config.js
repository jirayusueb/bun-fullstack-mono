// eslint.config.js
import antfu from '@antfu/eslint-config';

export default antfu({
  // Enable TypeScript support
  typescript: true,

  // Enable JSX/TSX support
  jsx: true,

  // Enable Vue support (requires @vue-macros/volar)
  vue: false,

  // Enable JSONC support
  jsonc: true,

  // Enable YAML support
  yaml: true,

  // Disable Markdown support (causing issues)
  markdown: false,

  // Predefined configurations for ignores
  ignores: [
    'node_modules',
    'dist',
    '.nuxt',
    '.output',
    '.cache',
    'coverage',
    'package-lock.json',
    'pnpm-lock.yaml',
    'yarn.lock',
    'bun.lockb',
    'drizzle',
    '**/*.md',
  ],

  // Predefined rules to match your preference
  stylistic: {
    indent: 2, // 2 spaces indentation
    quotes: 'single', // Use single quotes
  },

  // Additional rules
  rules: {
    'style/semi': ['error', 'always'], // Always require semicolons
    'no-console': 'off', // Allow console logs in this project
    'node/prefer-global/process': 'off', // Allow process global variable
    'no-unused-vars': 'warn', // Warn about unused variables
    'style/max-len': ['warn', { code: 120, ignoreUrls: true }], // Increased line length limit
    'ts/no-explicit-any': 'off', // Allow 'any' type in TypeScript
  },
});
