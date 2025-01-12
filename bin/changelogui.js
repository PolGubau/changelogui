#!/usr/bin/env node

import { loadEnvFile } from "node:process";

loadEnvFile(); // will load the variables from .env

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

			const githubToken = process.env.GITHUB_TOKEN;

			if (!githubToken) {
				throw new Error(
					"❌ El token de GitHub no está configurado. Asegúrate de establecerlo en un archivo .env o en tu entorno.",
				);
			}

			console.log("📦 Obteniendo datos...");
			const data = await fetchGithubData(config.repo, githubToken);
			console.log("🛠 Generando página...");
			await generateStaticPage(data, config.output);
			console.log(`🎉 ¡Página generada en ${config.output}!`);
		} catch (error) {
			console.error("❌ Error:", error.message);
		}
	});

program.parse(process.argv);
