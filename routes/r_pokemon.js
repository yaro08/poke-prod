'use strict'

var express = require('express');

var PokemonController = require('../controllers/c_pokemon');

var api = express.Router();

api.post('/new-pokemon', PokemonController.addPokemon);
api.get('/pokemons', PokemonController.getPokemons);
api.get('/pokemon/:id', PokemonController.getPokemon);
api.put('/pokemon/:id', PokemonController.updatePokemon);
api.put('/pokemon/fav/:id', PokemonController.favPokemon);
api.delete('/pokemon/:id', PokemonController.deletePokemon);

module.exports = api;