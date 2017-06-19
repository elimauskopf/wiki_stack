var morgan = require('morgan');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var env = nunjucks.configure('views', {noCache: true});
var models = require('./models/index.js');
const routes = require('./routes');
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//console.log(models)

nunjucks.configure('views');


// models.Page.sync({}).then(function(){
//   return models.Users.sync({})
// }).then(function(){
//   app.listen('1337', function(){
//     console.log('app is listening')})
// }).catch(console.error);
// console.log('a');

models.db.sync().then(function(){
  app.listen('1337', function(){
    console.log('app is listening');
  });
}).catch(console.error);

app.use('/', routes);
