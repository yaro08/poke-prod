'use strict'

var Pokemon = require('../models/m_pokemon');


function addPokemon(req,res) {
    var pokemon = new Pokemon();

    var params = req.body;

    if (params && params.name) {
        //FALTA COMPROBAR PREVIAMENTE QUE TODOS LOS DATOS NO SON NULOS
        //Y CUMPLEN LAS RESTRICCIONES
        pokemon.name = params.name;
        pokemon.type = params.type;
        pokemon.description = params.description;
        pokemon.becomes = params.becomes;
        pokemon.fav = params.fav;

        pokemon.save((err,result) =>{
            if (err) {
                res.status(500).send({
                    message: 'Error al guardar el pokemon.'
                });
            } else if (result) {
                res.status(200).send({
                    status: "OK",
                    message: 'El pokemon se ha guardado con éxito.',
                    result: result 
                });
            } else{
                res.status(200).send({
                    message: 'Error: no se ha podido guardar el pokemon'
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
                message: 'Error al intentar encontrar tus pokemons'
            });
        } else if (result) {
            res.status(200).send({
                status: 'OK',
                message: 'OK',
                result: result 
            });
        } else{
            res.status(404).send({
                message: 'Parece que no tienes ningún pokemon todavia.'
            });
        }  
    });
}

function getPokemon(req,res) {
    var pokemonId = req.params.id;
    Pokemon.findById(pokemonId).exec((err, result) =>{
        if (err) {
            res.status(500).send({
                message: 'Error al intentar encontrar tus pokemon.'
            });
        } else if (result) {
            res.status(200).send({
                status: 'OK',
                message: 'OK',
                result: result 
            });
        } else{
            res.status(404).send({
                message: 'Parece que este pokemon no existe.'
            });
        }  
    });
}

function updatePokemon(req,res){
    var pokemonId = req.params.id;
    var update = req.body;

    Pokemon.findByIdAndUpdate(pokemonId, update, {new:false},(err,pokemonUpdated) =>{
        if (err) {
            res.status(500).send({
                message: 'Ha ocurrido un error en el servidor.'
            });
        } else if (pokemonUpdated) {
            res.status(200).send({
                status: 'OK',
                message: 'El pokemon se ha actualizado con éxito.',
                result: pokemonUpdated 
            });
        } else{
            res.status(404).send({
                message: 'Parece que este pokemon no existe.'
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
                        message: 'Ha ocurrido un error en el servidor.'
                    });
                } else if (pokemonUpdated) {
                    
                    res.status(200).send({
                        status: 'OK',
                        message: 'OK',
                        result: pokemonUpdated 
                    });
                } else{
                    res.status(404).send({
                        message: 'Parece que este pokemon no existe.'
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
                message: 'Ha ocurrido un error en el servidor'
            });
        } else if (pokemonRemoved) {
            res.status(200).send({
                status: 'OK',
                message: 'OK',
                result: pokemonRemoved 
            });
        } else{
            res.status(404).send({
                message: 'Parece que este pokemon no existe.'
            });
        }  
    });
}

function currentNFavs(callback) {
    Pokemon.count({fav: {$eq: 'true' }}, (err, count) =>{ 
        callback(count);
    }); 
}

module.exports = {
    addPokemon,
    getPokemons,
    getPokemon,
    updatePokemon,
    favPokemon,
    deletePokemon
};