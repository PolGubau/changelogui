import fs from "node:fs/promises";

export async function loadConfig(configPath) {
	try {
		const content = await fs.readFile(configPath, "utf-8");
		const config = JSON.parse(content);

		if (!config.repo || !config.githubToken) {
			throw new Error(
				"El archivo de configuración debe incluir 'repo' y 'githubToken'.",
			);
		}

		return {
			theme: "light",
			output: "./dist/changelog",
			...config, // Sobrescribir valores predeterminados con los del usuario
		};
	} catch (error) {
		throw new Error(
			"No se pudo cargar el archivo de configuración. Asegúrate de que 'changelogify.config.json' existe y está correcto.",
		);
	}
}
