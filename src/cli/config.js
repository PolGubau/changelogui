import fs from "node:fs/promises";
import path from "node:path";

export async function loadConfig(configPath) {
	try {
		// Asegurémonos de que siempre resolvemos la ruta de la raíz del proyecto
		const rootDir = path.resolve(process.cwd()); // Obtiene la raíz del proyecto
		const fullConfigPath = path.join(rootDir, configPath); // Combina la raíz con la ruta de configuración

		console.log("🟡 Buscando archivo de configuración en:", fullConfigPath); // Verifica la ruta generada

		// Verifica si el archivo existe en la ruta esperada
		try {
			await fs.access(fullConfigPath); // Comprobamos si el archivo existe
		} catch (err) {
			throw new Error(
				`🔴 El archivo de configuración no existe en: ${fullConfigPath}`,
			);
		}

		// Leemos el archivo si existe
		const content = await fs.readFile(fullConfigPath, "utf-8");
		const config = JSON.parse(content);

		// Validamos que las claves necesarias existan
		if (!config.repo) {
			throw new Error("🔴  El archivo de configuración debe incluir 'repo'.");
		}

		return {
			theme: "light",
			output: "./dist/changelog",
			...config, // Sobrescribimos valores predeterminados con los del usuario
		};
	} catch (error) {
		console.error("Error al cargar la configuración:", error.message);
		throw new Error(
			`No se pudo cargar el archivo de configuración. Asegúrate de que 'changelogui.config.json' existe y está correcto.`,
		);
	}
}
