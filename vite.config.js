import path from 'path';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import { defineConfig } from 'vite';

export default defineConfig({
	root: path.join(process.cwd(), 'src'),
	base: '/video-manager/',
	publicDir: path.join(process.cwd(), 'public'),
	server: {
		port: 3000,
		host: true,
		https: {
			cert: fs.readFileSync(
				path.join(process.cwd(), 'dev', 'certs', 'localhost.cert.pem'),
				'utf8'
			),
			key: fs.readFileSync(
				path.join(process.cwd(), 'dev', 'certs', 'localhost.key.pem'),
				'utf8'
			)
		},
		proxy: {
			'/video-manager/api': {
				target: 'https://localhost:8443',
				secure: false,
				rewrite: (path) => path.replace(/^\/video-manager\/api/, ''),
				logLevel: 'debug'
			}
		}
	},
	plugins: [react()],
	build: {
		target: 'esnext',
		outDir: path.join(process.cwd(), 'build'),
		emptyOutDir: true
	}
});
