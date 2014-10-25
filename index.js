var koa = require('koa');
var route = require('koa-route');
var cors = require('koa-cors');
var app = koa();
var PORT = process.env.PORT || 3000;

app.use(cors());

app.use(route.get('/', function *() {
  this.body = { msg: 'Hello World!' };
}));

app.listen(PORT, function() {
  console.log('Listening on port ' + PORT);
});