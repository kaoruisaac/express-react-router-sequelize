import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 0,
      'react-refresh/only-export-components': 0,
      'no-empty-pattern': 0,
    },
  },
  {
    ignores: [
      'node_modules/**',
      'build/**',
      'dist/**',
      '.react-router/**',
      '*.config.js',
      '*.config.mjs',
      'esbuild.mjs',
      'nodemon.mjs',
    ],
  },
); 