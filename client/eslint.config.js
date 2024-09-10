import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tslint from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import react from "eslint-plugin-react"
import prettier from "eslint-plugin-prettier"
import prettierConfig from "eslint-config-prettier"

export default [
	{
		ignores: ["dist"]
	},
	{
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			parser: tsParser
		},
		plugins: {
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh,
			"@typescript-eslint": tslint,
			react: react,
			prettier: prettier
		},
		rules: {
			// ...reactHooks.configs.recommended.rules,
			"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
			"prettier/prettier": "error",
			"react/react-in-jsx-scope": "off",
			"react/prop-types": "off"
		}
	},
	{
		files: ["**/*.{js,jsx,ts,tsx}"],
		rules: {
			...prettierConfig.rules
		}
	}
]
