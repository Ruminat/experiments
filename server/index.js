import express from 'express';
import path from 'path';

const app = express();
const currentDir = path.resolve();
const port = 3000;

app.use('/assets', express.static('assets'));
app.use('/dist', express.static('dist'));

express.static.mime.define({
  'text/html': ['html'],
  'text/css': ['css'],
  'text/javascript': ['js'],
  'image/svg+xml': ['svg'],
  'image/svg': ['svg'],
  'image/png': ['png'],
  'image/jpg': ['jpg'],
  'image/jpeg': ['jpeg'],
});

app.set('view engine', 'ejs');
app.set('views', path.join(currentDir, '/server/templates'));

makeRoute('/', { title: 'Web Experiments', pageName: 'home' });
makeRoute('/about', { title: 'About', pageName: 'about' });
makeRoute('/japanese', { title: 'Japanese Tools', pageName: 'japanese' });

function makeRoute(route, { title = 'Web Experiments', basePath = '', faviconPath = 'favicon/icon', pageName } = {}) {
  app.get(route, (req, res) => {
    res.render('index.ejs', { title, basePath, faviconPath, pageName });
  })
}

// app.get('/', (req, res) => {
//   res.render('index.ejs', { title: 'Web Experiments', basePath: '.', pageName: 'home' });
// })
// app.get('/about', (req, res) => {
//   res.render('index.ejs', { title: 'About', basePath: '.', pageName: 'about' });
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
