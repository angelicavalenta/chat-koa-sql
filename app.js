
const app = require('koa')();
const fs = require('fs');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser')();
const db = require('./config/db.js');
const routes = require('./routes.js');

const notFound = fs.readFileSync('./public/404-barbie.html', 'utf8');

app.use(serve('./public'));
app.use(bodyParser);
app.use(routes.routes());


app.use(function* (next) {
  if (this.status === 404) this.body = notFound;
});

db.connect(function (err) {
  if (err) console.error('error connecting: ' + err.stack);
  app.listen(3000);
});
