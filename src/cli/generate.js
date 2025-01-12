import fs from "node:fs";
import path from "node:path";

const tmpDirName = ".changelogui";

export async function generateStaticPage(data, outputDir, theme) {
	// Guarda los datos en la carpeta `data` del proyecto root
	const dataDir = path.join(process.cwd(), "public", tmpDirName); // Cambiar a public/data

	fs.mkdirSync(dataDir, { recursive: true });
	fs.writeFileSync(
		path.join(dataDir, "data.json"),
		JSON.stringify(data, null, 2),
	);

	// Crear el archivo HTML básico
	const htmlContent = `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Changelog</title>
    <style>
      body { font-family: Arial, sans-serif; }
      table { width: 100%; border-collapse: collapse; }
      th, td { padding: 10px; text-align: left; border: 1px solid #ddd; }
      th { background-color: #f4f4f4; }
    </style>
  </head>
  <body>
    <h1>Changelog</h1>
    <div>
      <label for="filter">Filtrar por autor: </label>
      <input type="text" id="filter" placeholder="Escribe el nombre del autor">
    </div>
    <table id="commits-table">
      <thead>
        <tr>
          <th>SHA</th>
          <th>Autor</th>
          <th>Fecha</th>
          <th>Mensaje</th>
        </tr>
      </thead>
      <tbody id="commits-body">
        <!-- Los commits se cargarán aquí -->
      </tbody>
    </table>
    <script>
      // Cargar los datos del archivo JSON
      fetch('/.changelogui/data.json')
        .then(response => response.json())
        .then(data => {
          const commitsBody = document.getElementById('commits-body');
          const filterInput = document.getElementById('filter');

          // Función para actualizar la tabla de commits
          const updateTable = (commits) => {
            commitsBody.innerHTML = '';
            commits.forEach(commit => {
              const row = document.createElement('tr');
              row.innerHTML = \`
                <td>\${commit.sha}</td>
                <td>\${commit.commit.author.name}</td>
                <td>\${new Date(commit.commit.author.date).toLocaleString()}</td>
                <td>\${commit.commit.message}</td>
              \`;
              commitsBody.appendChild(row);
            });
          };

          // Filtrar commits por autor
          filterInput.addEventListener('input', () => {
            const filterValue = filterInput.value.toLowerCase();
            const filteredCommits = data.commits.filter(commit =>
              commit.commit.author.name.toLowerCase().includes(filterValue)
            );
            updateTable(filteredCommits);
          });

          // Inicializar la tabla con todos los commits
          updateTable(data.commits);
        })
        .catch(error => console.error('Error al cargar los datos:', error));
    </script>
  </body>
  </html>
  `;

	// Escribir el HTML en el directorio de salida
	const targetPath = path.join(process.cwd(), outputDir, "index.html");
	fs.mkdirSync(path.dirname(targetPath), { recursive: true });
	fs.writeFileSync(targetPath, htmlContent);

	console.log(`🎉 ¡Página generada en ${targetPath}!`);
}
