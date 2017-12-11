'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

//var expressValidator = require('express-validator');

//Load routes
var pokemon_routes = require('./routes/r_pokemon');


//body-parser
//app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//CORS Settings
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});

//Routes
//app.use(express.static(path.join(__dirname, 'client')));
app.use('/', express.static('client', {redirect:false}));
app.use('/api',pokemon_routes);

app.get('*',function(req, res, next){
    res.sendfile(path.resolve('client/index.html'));
});

module.exports = app;

