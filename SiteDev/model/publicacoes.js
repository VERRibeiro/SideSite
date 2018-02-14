var db = require('./../libs/connect_db')();
var Schema = require('mongoose').Schema;

var publicacao = Schema({
    titulo: String,
    ano: Number,
    localPublicacao: String,
    pdf: String,
    membros:[String],
    issn: String,
    doi: String,
    premiado: Boolean,
    colocacao: String,
});

var publicacaoes = db.model('publicacoes', publicacao);

module.exports = publicacoes;