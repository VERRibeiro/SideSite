var db = require('./../libs/connect_db')();
var Schema = require('mongoose').Schema;
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');

var usuarioSchema = Schema({
  username:{
  type: String,
    index: true
  },
  password: String
});

var usuario = module.exports = mongoose.model('usuario', usuarioSchema);

module.exports.createUser = function(novoUsuario, next){
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(novoUsuario.password, salt, function(err, hash) {
      novoUsuario.password = hash;
      novoUsuario.save(next);
    });
  });
}

module.exports.getUsuarioByUsername = function(username,next){
  var query = {username: username};
  usuario.findOne(query,next);
}

module.exports.getUsuarioById = function(id,next){
  usuario.findById(id,next);
}

module.exports.comparePassword = function(password, hash, next){
  bcrypt.compare(password, hash, function(err, isMatch) {
    if(err)
      throw err;
      next(null, isMatch);
  });
}
