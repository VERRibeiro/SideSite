module.exports = () =>{
  var db = require('./../libs/connect_db')();
  var Schema = require('mongoose').Schema;

  var projeto = Schema({
    titulo: String,
    dataInicio: String,
    dataFim: String,
    membros:[String]
  });
  return db.model('projetos',projeto);
}
