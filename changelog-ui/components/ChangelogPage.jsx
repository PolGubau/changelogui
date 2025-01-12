import { useEffect, useState } from "react";
const ChangelogPage = () => {
	const [filters, setFilters] = useState({ author: "", date: "" });

	const [commitData, setCommitData] = useState(null);

	useEffect(() => {
		// Cargar el archivo JSON generado en el root
		fetch("/data/commits.json")
			.then((response) => response.json())
			.then((data) => setCommitData(data))
			.catch((error) => console.error("Error al cargar los datos:", error));
	}, []);

	const applyFilters = (commit) => {
		// Filtros por autor y fecha
		return (
			(filters.author === "" || commit.author.includes(filters.author)) &&
			(filters.date === "" || commit.date.includes(filters.date))
		);
	};

	const handleFilterChange = (e) => {
		const { name, value } = e.target;
		setFilters((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div className="changelog-page">
			<pre>{JSON.stringify(commitData, null, 2)}</pre>
			<h1>Changelog</h1>

			<div className="filters">
				<input
					type="text"
					name="author"
					placeholder="Filtrar por autor"
					value={filters.author}
					onChange={handleFilterChange}
				/>
				<input
					type="text"
					name="date"
					placeholder="Filtrar por fecha"
					value={filters.date}
					onChange={handleFilterChange}
				/>
			</div>

			<div className="changelog-list">
				{commitData.filter(applyFilters).map((commit, index) => (
					<div key={index} className="changelog-item">
						<h3>{commit.title}</h3>
						<p>{commit.description}</p>
						<p>
							<strong>Autor:</strong> {commit.author} | <strong>Fecha:</strong>{" "}
							{commit.date}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default ChangelogPage;
