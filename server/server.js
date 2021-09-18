import express from "express";
import path from "path";

const app = express();
const currentDir = path.resolve();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(currentDir, '/server/templates'));

app.get('/', (req, res) => {
  res.render("index.ejs", { title: "Web Experiments", basePath: ".", pageName: "page-home" });
  // res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
