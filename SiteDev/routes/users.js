var express = require('express');
var router = express.Router();
var usuario = require('../model/users');
/* GET users listing. */
// router.post('/cadastrar', function(req, res, next) {
//   var nome = req.body.nome;
//   var email = req.body.email;
//   var password = req.body.password;
//   var passowrd2 = req.body.passowrd2;
//   var novoUsuario = new usuario({
//     nome: nome,
//     email: email,
//     password: password
//   });
//   usuario.createUser(novoUsuario, function(err,usuario){
//     if(err)
//       throw err;
//       console.log(user);
//   });
// });
module.exports = router;
