import { Octokit } from "@octokit/rest";
import path from "node:path";
import fs from "node:fs";

export async function fetchGithubData(repo, token) {
	const octokit = new Octokit({ auth: token });
	const [owner, repoName] = repo.split("/");

	const commits = await octokit.rest.repos.listCommits({
		owner,
		repo: repoName,
	});
	const contributors = await octokit.rest.repos.listContributors({
		owner,
		repo: repoName,
	});

	// return { commits: commits.data, contributors: contributors.data };

	// Mapeamos los commits para el formato que vamos a usar
	const commitData = { commits: commits.data, contributors: contributors.data };

	// Guardamos los datos en un archivo JSON
	const outputDir = path.join(process.cwd(), "data");
	const filePath = path.join(outputDir, "commits.json");
	fs.mkdirSync(outputDir, { recursive: true });
	fs.writeFileSync(filePath, JSON.stringify(commitData, null, 2));

	return commitData;
}
