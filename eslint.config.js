import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    rules: {
	  'indent': [
        'error',
        2
      ],
	  'semi': [
        'error',
        'never'
      ],
      'arrow-spacing': [
        'error', { 'before': true, 'after': true }
      ],
      'quotes': [
        'error',
        'single'
      ],
      'linebreak-style': [
        'error',
        'unix'
      ],
      'no-trailing-spaces': 'error'
	  }
  }
])