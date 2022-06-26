const express = require('express');
const app = express();
const path = require("path");

// const PORT = 8080;
const PORT = 49204;
const distPath = path.join(__dirname, "..", "dist");

console.log("HOBA!", distPath);

app.use(express.static(distPath));

app.get('*', (req, res) => {
  // res.send('Hello World!');
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
