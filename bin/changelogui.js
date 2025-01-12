import { program } from "commander";
import { loadConfig } from "../src/cli/config.js";
import { fetchGithubData } from "../src/cli/fetch.js";
import { generateStaticPage } from "../src/cli/generate.js";

program
	.name("changelogui")
	.description("Genera un changelog interactivo basado en GitHub.")
	.action(async () => {
		try {
			console.log("🔍 Leyendo configuración...");
			const config = await loadConfig("./changelogui.config.json");
			console.log("📦 Obteniendo datos...");
			const data = await fetchGithubData(config.repo, config.githubToken);
			console.log("🛠 Generando página...");
			await generateStaticPage(data, config.output);
			console.log(`🎉 ¡Página generada en ${config.output}!`);
		} catch (error) {
			console.error("❌ Error:", error.message);
		}
	});

program.parse(process.argv);
