module.exports = () =>{
  var db = require('./../libs/connect_db')();
  var Schema = require('mongoose').Schema;

  var task = Schema({
    nome: String
  });
  return db.model('tasks',task);
}
