import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts';

import { resolve } from 'path'
import path from 'path';

export default defineConfig({
  plugins: [react(),dts()],

	build: {
		rollupOptions: {
			input: {
				// main: path.resolve(__dirname, 'src/main.ts'),
				secondary: path.resolve(__dirname, 'src/secondary.tsx')
			},
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) return;
					const chunk = id.split('/').slice(-2)[0];
					return chunk ? chunk : null;
				}
			}
		},
		minify: 'esbuild',
		sourcemap: false
	}

	// build: {
	// 	lib: {
	// 		entry: resolve(__dirname, 'src/main.ts'),
	// 		name: 'ui-kit',
	// 		fileName: 'ui-kit',
	// 	},
	// 	rollupOptions: {
	// 		external: ['react'],
	// 		output: {
	// 			globals: {
	// 				vue: 'React',
	// 			},
	// 		},
	// 	},
	// },
})
