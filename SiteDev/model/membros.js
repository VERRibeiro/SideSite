module.exports = () =>{
  var db = require('./../libs/connect_db')();
  var Schema = require('mongoose').Schema;

  var membro = Schema({
    nome: String,
    titulacao: String,
    email: String,
    tipo: String
  });
  return db.model('membros',membro);
}
