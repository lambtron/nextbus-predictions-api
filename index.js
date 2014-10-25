
var koa = require('koa');
var _ = require('koa-route');
var cors = require('koa-cors');
var app = koa();
var PORT = process.env.PORT || 3000;


app.use(cors());


app.use(_.get('/', function *() {
  this.body = "Welcome to the Nextbus Prediction API.";
}));


/**
 * API endpoints.
 *
 */
app.use(_.get('/api/prediction', function *() {
  console.log(this);
}));


/**
 * Listen on PORT || 3000.
 *
 */
app.listen(PORT, function() {
  console.log('Listening on port ' + PORT);
});
