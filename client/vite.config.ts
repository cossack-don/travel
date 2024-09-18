import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import * as path from "path"

const NUMBER_PORT = 5000

export default defineConfig({
	plugins: [react()],
	server: {
		port: NUMBER_PORT
	},
	resolve: {
		alias: [
			/* eslint-disable */
			{ find: "@", replacement: path.resolve(__dirname, "src") },
			{ find: "@api", replacement: path.resolve(__dirname, "src/api/") },
			{ find: "@helpers", replacement: path.resolve(__dirname, "src/helpers/") }
		]
	},
	css: {
		modules: {
			scopeBehaviour: "local",
			generateScopedName: "[name]__[local]___[hash:base64:5]",
			localsConvention: "camelCaseOnly"
		}
	}
})

// Example
// https://stackoverflow.com/questions/75201705/how-to-set-multiple-aliases-in-vite-react/75201776#75201776
// "@api": path.resolve(__dirname, "src/api/"),
//     "@assets": path.resolve(__dirname, "src/assets/"),
//     "@components": path.resolve(__dirname, "src/components/"),
//     "@containers": path.resolve(__dirname, "src/containers/"),
//     "@data": path.resolve(__dirname, "src/data/"),
//     "@i18n": path.resolve(__dirname, "src/i18n/"),
//     "@models": path.resolve(__dirname, "src/models/"),
//     "@pages": path.resolve(__dirname, "src/pages/"),
//     "@src": path.resolve(__dirname, "src/"),
//     "@stores": path.resolve(__dirname, "src/stores/"),
//     "@utils": path.resolve(__dirname, "src/utils/"),
