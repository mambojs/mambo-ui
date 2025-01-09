import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default [
	{
		ignores: ["**/build/", "**/node_modules/", "**/dist/"],
	},
	...compat.extends("eslint:recommended"),
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
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

			ecmaVersion: 11,
			sourceType: "commonjs",
		},

		rules: {
			"no-unused-vars": "warn",

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
				{
					blankLine: "any",
					prev: ["const", "let", "var", "expression"],
					next: ["const", "let", "var", "expression"],
				},
				{
					blankLine: "always",
					prev: "*",
					next: "return",
				},
			],
		},
	},
];
