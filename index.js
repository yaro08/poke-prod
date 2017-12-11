'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/poke_db',{useMongoClient: true})
        .then(()=>{
            console.log("connection to DB ok");

            app.listen(port, () =>{
                console.log('Server is running on: localhost:3800');
            });
        })
        .catch(err => console.log(err));