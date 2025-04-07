module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended', // Nuxt-specific linting rules
    'plugin:vue/vue3-recommended', // Vue 3 recommended rules
    'plugin:@typescript-eslint/recommended', // TypeScript rules
    'plugin:prettier/recommended', // Prettier integration
  ],
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    // Prettier rules
    'prettier/prettier': ['error', { singleQuote: true, semi: true }],

    // Example: Disable multi-word component names rule
    'vue/multi-word-component-names': 'off',

    // Example: Custom TypeScript rules
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // Example: Custom Vue rules
    'vue/no-v-html': 'off',
  },
  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2021,
        sourceType: 'module',
      },
    },
  ],
};
