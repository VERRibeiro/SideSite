var db = require('./../libs/connect_db')();
var Schema = require('mongoose').Schema;

var membro = Schema({
  nome: String,
  email: String,
  titulo: String,
  tipo: String,
  imagem: {type: String, default: 'default.png'}
});

var membros = db.model('membros',membro);

module.exports = membros;
