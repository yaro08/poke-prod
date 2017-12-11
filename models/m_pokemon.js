'use strict'

var mongoose =require('mongoose');
var Schema = mongoose.Schema;

var PokemonSchema = Schema({
    //_id: String,
    name: String,
    type: Array,
    description: String,
    fav: Boolean,
    becomes: String,
});

module.exports = mongoose.model('Pokemon', PokemonSchema);
