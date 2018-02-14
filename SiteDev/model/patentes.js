var db = require('./../libs/connect_db')();
var Schema = require('mongoose').Schema;

var publicacao = Schema({
    titulo: String,
    autores: [String],
    numeroRegistro: String,
    instituicaoRegistro: String,
    dataDeposito: Date,
    dataConcessao: Date,
    tipo: String
});

var publicacaoes = db.model('publicacoes', publicacao);

module.exports = publicacoes;