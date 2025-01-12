import fs from "node:fs/promises";
import path from "node:path";

export async function generateStaticPage(data, outputDir, theme) {
	const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Changelog</title>
        <link rel="stylesheet" href="styles.css" />
      </head>
      <body class="${theme}">
        <div id="root"></div>
        <script>
          window.__DATA__ = ${JSON.stringify(data)};
        </script>
        <script src="main.js"></script>
      </body>
    </html>
  `;

	await fs.mkdir(outputDir, { recursive: true });
	await fs.writeFile(path.join(outputDir, "index.html"), html, "utf-8");
	console.log("✅ Página estática generada.");
}
