import pluginJs from '@eslint/js'
import playwright from 'eslint-plugin-playwright'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  {
    ignores: [
      '**/node_modules/**',
      '**/playwright-report/**',
      '**/test-results/**',
      '**/.git/**',
    ],
  },
  {
    files: ['playwright/**/*.{js,mjs}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      playwright,
    },
  },
  pluginJs.configs.recommended,
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: false,
    jsx: false,
  }),
  {
    files: ['playwright/**/*.{js,mjs}'],
    rules: {
      // Code quality
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-undef': 'warn',
      'playwright/expect-expect': 'error',
      'playwright/no-conditional-in-test': 'warn',
      'playwright/no-element-handle': 'warn',
      'playwright/no-eval': 'error',
      'playwright/no-focused-test': 'error',
      'playwright/no-skipped-test': 'warn',
      'playwright/no-useless-await': 'error',
      '@stylistic/indent': ['error', 2],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
    },
  },
  {
    files: ['playwright.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-undef': 'off',
    },
  },
])
