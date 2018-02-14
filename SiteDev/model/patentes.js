var db = require('./../libs/connect_db')();
var Schema = require('mongoose').Schema;

var patente = Schema({
    titulo: String,
    membros: [String],
    numeroRegistro: String,
    instituicaoRegistro: String,
    dataDeposito: Date,
    dataConcessao: Date,
    tipo: String
});

var patentes = db.model('patentes', patente);

module.exports = patentes;
