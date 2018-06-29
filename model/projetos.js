module.exports = () =>{
  var db = require('./../libs/connect_db')();
  var Schema = require('mongoose').Schema;

  var projeto = Schema({
    titulo: String,
    dataInicio: Date,
    dataFim: Date,
    membros:[String],
    tipo: String,
    financiador: String
  });
  return db.model('projetos',projeto);
}
