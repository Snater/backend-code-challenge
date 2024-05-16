import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';

export default [
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		ignores: ['index.js', 'dist'],
	},
	{
		plugins: {
			'@stylistic': stylistic,
		},
		rules: {
			'no-unused-vars': ['off'],
			'@stylistic/array-bracket-spacing': ['error'],
			'@stylistic/arrow-parens': ['error', 'as-needed'],
			'@stylistic/arrow-spacing': ['error'],
			'@stylistic/brace-style': ['error'],
			'@stylistic/comma-dangle': ['error', {
				'arrays': 'always-multiline',
				'objects': 'always-multiline',
				'imports': 'always-multiline',
				'exports': 'always-multiline',
				'functions': 'never',
			}],
			'@stylistic/comma-spacing': ['error'],
			'@stylistic/computed-property-spacing': ['error', 'never'],
			'@stylistic/dot-location': ['error', 'property'],
			'@stylistic/function-call-spacing': ['error'],
			'@stylistic/indent': ['error', 'tab'],
			'@stylistic/keyword-spacing': ['error'],
			'@stylistic/max-len': ['error', {
				'code': 100,
				'tabWidth': 2,
				'ignoreComments': true,
				'ignoreStrings': true,
				'ignoreTemplateLiterals': true,
			}],
			'@stylistic/no-extra-parens': ['error', 'all', {
				'nestedBinaryExpressions': false,
			}],
			'@stylistic/no-mixed-spaces-and-tabs': ['error'],
			'@stylistic/no-multi-spaces': ['error'],
			'@stylistic/no-multiple-empty-lines': ['error', {'max': 1}],
			'@stylistic/no-trailing-spaces': ['error'],
			'@stylistic/object-curly-spacing': ['error'],
			'@stylistic/operator-linebreak': ['error', 'before'],
			'@stylistic/quotes': ['error', 'single'],
			'@stylistic/rest-spread-spacing': ['error'],
			'@stylistic/semi': ['error'],
			'@stylistic/space-before-blocks': ['error'],
			'@stylistic/space-before-function-paren': ['error', 'never'],
			'@stylistic/space-in-parens': ['error', 'never'],
			'@stylistic/space-infix-ops': ['error'],
			'@stylistic/template-curly-spacing': ['error', 'never'],
			'@typescript-eslint/no-unused-vars': ['error', {
				args: 'all',
				argsIgnorePattern: '^_',
				caughtErrorsIgnorePattern: '^_',
				destructuredArrayIgnorePattern: '^_',
				ignoreRestSiblings: true,
				vars: 'all',
			}],
		},
	},
];
