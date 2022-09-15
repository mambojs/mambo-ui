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
	},
	globals: {
		mamboTools: true,
		domJS: true,
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
