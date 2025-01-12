import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		outDir: "dist", // El directorio de salida donde se generará el build
		assetsDir: "assets", // Directorio para archivos estáticos como imágenes, etc.
	},
	publicDir: "data", // Puedes mantener la carpeta `data` accesible desde la raíz
});
