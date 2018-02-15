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

function newUserSchema(userData) {
  return new usuario({
    'username': userData.username,
    'password': userData.password
  });
}

function newUser(user) {
  return new Promise((accept, reject) => {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        user.password = hash;
        newUserSchema(user) 
          .save()
          .then(accept)
          .catch(reject);
      });
    });
  });
}

module.exports.createDefaultUserIfDoesntExist = function() {
  usuario
    .count()
    .then(count => {
      if(count === 0) {
        console.log('There\'s no registered users. Creating a default admin user...');
        newUser({
          'username': '',
          'password': ''
        })
        .then(created => {
          console.log(`The user ${created.username} was successfully created!`);
        })
        .catch(err => {
          console.log('An error ocurred: ', err);
        });
      }
    })
    .catch(err => {
      console.log('An error ocurred: ', err);
    });
}
