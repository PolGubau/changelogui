import React from "react";

export const ChangelogPage = ({ data }) => {
	return (
		<div>
			<h1>Changelog</h1>
			{data.commits.map((commit) => (
				<div key={commit.sha}>
					<h2>{commit.commit.message}</h2>
					<p>Por: {commit.author.login}</p>
				</div>
			))}
		</div>
	);
};
