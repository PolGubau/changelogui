import { Octokit } from "@octokit/rest";

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

	return { commits: commits.data, contributors: contributors.data };
}
