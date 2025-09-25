import pluginJs from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  { files: ['playwright/*.{js}'],
    languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  stylistic.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      '@stylistic/indent': ['error', 2],
      '@stylistic/quotes': ['error', 'single'],
    },
  },
])
