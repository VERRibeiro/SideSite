var db = require('./../libs/connect_db')();
var Schema = require('mongoose').Schema;

var publicacao = Schema({
  titulo: String,
  ano: String,
  membros:[String],
  localPublicacao: String,
  premiacao: String,
  pdf: String,
  colocacao: String,
  issn: String,
  doi: String
});

var publicacoes = db.model('publicacao', publicacao);

module.exports = publicacoes;
