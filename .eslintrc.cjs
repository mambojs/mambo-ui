module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: "eslint:recommended",
	parserOptions: {
		ecmaVersion: 11,
	},
	rules: {
		"no-unused-vars": "off",
		indent: [
			"error",
			"tab",
			{
				SwitchCase: 1,
				ignoredNodes: ["ConditionalExpression"],
			},
		],
		"linebreak-style": ["error", "windows"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
		"padding-line-between-statements": [
			"error",
			// Espacios antes y después de bloques reales (if, for, function, etc.)
			{
				blankLine: "always",
				prev: "*",
				next: "block-like",
			},
			{
				blankLine: "always",
				prev: "block-like",
				next: "*",
			},
			// Espacios antes y después de asignaciones multilínea
			{
				blankLine: "always",
				prev: "*",
				next: "multiline-expression",
			},
			{
				blankLine: "always",
				prev: "multiline-expression",
				next: "*",
			},
			// Sin espacios adicionales entre declaraciones simples consecutivas
			{
				blankLine: "any",
				prev: ["const", "let", "var", "expression"],
				next: ["const", "let", "var", "expression"],
			},
			// Línea en blanco antes de return para legibilidad
			{
				blankLine: "always",
				prev: "*",
				next: "return",
			},
		],
	},
	globals: {
		feather: true,
		mamboTools: true,
		domJS: true,
		marked: true,
		router: true,
		object: true,
		dom: true,
		ui: true,
		Hls: true,
		HlsjsIpfsLoader: true,
		m3u8Parser: true,
		PR: true,
		installStoryboard: true,
		mapboxgl: true,
		MapboxGeocoder: true,
	},
};
