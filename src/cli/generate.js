import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

// Función para ejecutar el comando de build de React
function buildReactApp() {
	return new Promise((resolve, reject) => {
		exec(
			"npm run build",
			{ cwd: path.resolve(__dirname, "../changelog-ui") },
			(error, stdout, stderr) => {
				if (error) {
					reject(`Error al ejecutar build de React: ${stderr}`);
				} else {
					resolve(stdout);
				}
			},
		);
	});
}

export async function generateStaticPage(data, outputDir, theme) {
	// Guarda los datos en la carpeta `data` del proyecto root
	const dataDir = path.join(process.cwd(), "data");
	fs.mkdirSync(dataDir, { recursive: true });
	fs.writeFileSync(
		path.join(dataDir, "commits.json"),
		JSON.stringify(data, null, 2),
	);

	// Genera el build estático con Vite
	console.log("🛠 Generando build estático...");
	execSync("cd changelog-ui && npm run build", { stdio: "inherit" });

	// Copiar el build desde changelog-ui/dist al outputDir
	const buildDir = path.join(process.cwd(), "changelog-ui", "dist");
	const outputDirectory = path.join(process.cwd(), outputDir);

	if (fs.existsSync(outputDirectory)) {
		// Limpiar la carpeta de salida si ya existe
		rmSync(outputDirectory, { recursive: true, force: true });
	}

	// Copiar todos los archivos del build generado
	fs.mkdirSync(outputDirectory, { recursive: true });
	fs.cpSync(buildDir, outputDirectory, { recursive: true });

	console.log(`🎉 ¡Página generada en ${outputDir}!`);
}
