'use strict'

var Pokemon = require('../models/m_pokemon');



function pruebas(req,res){
    res.status(200).send({
       message: 'Test route' 
    });
};

function addPokemon(req,res) {
    var pokemon = new Pokemon();

    var params = req.body;
    console.log("params");
    console.log(req);
    if (params && params.name) {
        pokemon.name = params.name;
        pokemon.type = params.type;
        pokemon.description = params.description;
        pokemon.becomes = params.becomes;
        pokemon.fav = params.fav;

        pokemon.save((err,result) =>{
            if (err) {
                res.status(500).send({
                    message: 'Error: trying to save the pokemon'
                });
            } else if (result) {
                res.status(200).send({
                    message: 'The pokemon has been saved',
                    result: result 
                });
            } else{
                res.status(200).send({
                    message: 'Error: The pokemon could not be saved'
                });
            }
        });
    } else {
        req.status(200).send({
            message: 'All data is required!'
        });
    }
}
function getPokemons(req,res) {
    Pokemon.find({}).sort({'_id':-1}).exec((err,result) =>{
        if (err) {
            res.status(500).send({
                message: 'Error: trying to get your pokemons :('
            });
        } else if (result) {
            res.status(200).send({
                message: 'OK',
                result: result 
            });
        } else{
            res.status(404).send({
                message: 'You do not have any pokemon'
            });
        }  
    });
}

function getPokemon(req,res) {
    var pokemonId = req.params.id;
    Pokemon.findById(pokemonId).exec((err, result) =>{
        if (err) {
            res.status(500).send({
                message: 'Error: trying to get your pokemon :('
            });
        } else if (result) {
            res.status(200).send({
                message: 'OK',
                result: result 
            });
        } else{
            res.status(404).send({
                message: 'Do not exist this pokemon'
            });
        }  
    });
}

function updatePokemon(req,res){
    var pokemonId = req.params.id;
    var update = req.body;

    console.log("updatePokemon");
    console.log(pokemonId);
    console.log(update['_id']);

    Pokemon.findByIdAndUpdate(pokemonId, update, {new:false},(err,pokemonUpdated) =>{
        if (err) {
            res.status(500).send({
                message: 'An error has ocurred in the server.'
            });
        } else if (pokemonUpdated) {
            res.status(200).send({
                message: 'OK',
                result: pokemonUpdated 
            });
        } else{
            res.status(404).send({
                message: 'Do not exist this pokemon'
            });
        }  
    });
}
function favPokemon(req,res){
    var pokemonId = req.params.id;
    var body = req.body;
    var nFavs;
    var fav = {
        'fav': !Boolean(body['fav'])
    }

    currentNFavs( function(nFavs) { //FUNCION CALLBACK -- EJECUTADA AL OBTENER EL Nº POKEMONS FAVORITOS ACTUALMENTE
        if (nFavs >=10 && fav['fav']) { //ENTRA SÓLO SI TENEMOS 10 POKEMONS FAVORITOS E INTENTAMOS AÑADIR OTRO...
            res.status(200).send({
                message: 'ERROR',
                result: 'No puedes tener más de 10 Pokemons favoritos.' 
            });
        }else{ 
            Pokemon.findByIdAndUpdate(pokemonId, fav, {new:true},(err,pokemonUpdated) =>{
                if (err) {
                    res.status(500).send({
                        message: 'An error has ocurred in the server.'
                    });
                } else if (pokemonUpdated) {
                    
                    res.status(200).send({
                        message: 'OK',
                        result: pokemonUpdated 
                    });
                } else{
                    res.status(404).send({
                        message: 'Do not exist this pokemon'
                    });
                }  
            });
        }
    });    
}
function deletePokemon(req,res){
    var pokemonId = req.params.id;
    Pokemon.findByIdAndRemove(pokemonId, (err,pokemonRemoved) =>{
        if (err) {
            res.status(500).send({
                message: 'An error has ocurred in the server.'
            });
        } else if (pokemonRemoved) {
            res.status(200).send({
                message: 'OK',
                result: pokemonRemoved 
            });
        } else{
            res.status(404).send({
                message: 'Do not exist this pokemon'
            });
        }  
    });
}

// function currentNFavs() {
//     //MAX FAVS = 10
//     Pokemon.count({fav: {$eq: 'true' }}, (err, count) =>{ 
//         //console.log(count);
//         return count;
//     } );
// }

function currentNFavs(callback) {
    Pokemon.count({fav: {$eq: 'true' }}, (err, count) =>{ 
        console.log("devuelve:"+count);
        callback(count);
    }); 
}

module.exports = {
    pruebas,
    addPokemon,
    getPokemons,
    getPokemon,
    updatePokemon,
    favPokemon,
    deletePokemon
};