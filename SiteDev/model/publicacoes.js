module.exports = () =>{
  var db = require('./../libs/connect_db')();
  var Schema = require('mongoose').Schema;

  var publicacao = Schema({
    titulo: String,
    data: String,
    autores:[String],
    localPublicacao: String,
    premiacao: String,
    link: String
  });
  return db.model('publicacao',publicacao);
}
