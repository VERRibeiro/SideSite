var express = require('express');
var router = express.Router();
var model = require('./../model/tasks')();
var membrosModel = require('./../model/membros');
var projetosModel = require('./../model/projetos')();
var publicacaoModel = require('./../model/publicacoes')();
var usuario = require('../model/users');
var multer = require('multer');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var fs = require('fs');
var async = require('async');
var moment = require('moment');

var multerConf ={
  storage : multer.diskStorage({
    destination: (req, file, cb) =>{
      cb(null,'./public/uploads')
    },
    filename:(req, file, cb)=>{
      var ext = file.mimetype.split('/')[1];
       cb(null, file.fieldname+'-'+Date.now() +'.'+ext);
     }
   }),
};
passport.use(new LocalStrategy(
  function(username,password,done){
    usuario.getUsuarioByUsername(username, function(err, user){
      if(err)
        throw err;
      if(!user){
        return done(null, false,{message: 'Usuário anônimo'});
      }
      usuario.comparePassword(password, user.password, function(err,isMatch){
        if(err)
          throw err;
        if(isMatch){
          return done(null, user);
        }else{
          return done(null, false, {message: 'Senha incorreta'});
        }
      });
    });
  }));

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }else{
    res.redirect('/login');
  }
}

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  usuario.getUsuarioById(id, function(err, user) {
    done(err, user);
  });
});
/* GET home page. */
router.get('/', function(req, res, next) {
  model.find(null, (err,tasks) =>{
    if(err){
      console.log(err);
    }else{
      res.render('index',{tasks: tasks});
    }
  });
});

router.post('/add-linha',(req,res,next) =>{
  var body = req.body;
  model.create(body, (err,task)=>{
    if(err)
      throw err;
    res.redirect('/');
  });
});

router.post('/add-publicacao',(req,res,next) =>{
  var body = req.body;
  publicacaoModel.create(body, (err,publicacao)=>{
    if(err)
      throw err;
    res.redirect('/publicacao');
  });
});

router.get('/cadastrar',ensureAuthenticated, (req, res, next) =>{
  membrosModel.find(null, (err, membros)=>{
    if(err){
      console.log(err);
    }else{
      res.render('cadastrar',{membros:membros});
    }
  });
});

router.get('/membros', function(req, res, next) {
  membrosModel.find(null, (err,membros) =>{
    if(err){
      console.log(err);
    }else{
      res.render('membros',{membros: membros});
    }
  });
});

router.post('/add-membro',multer(multerConf).single('imagem'),(req,res,next) =>{
  if(req.file){
    req.body.imagem = req.file.filename;
  }
  var membros = new membrosModel(req.body);
  membros.save();
  res.redirect('/membros');
});

router.get('/projetos',(req, res, next)=>{
  async.parallel({
  		projetos: function(callback) {
  			projetosModel.find({})
  				.then(function(projetos) {
  					callback(null, projetos);
  				})
  				.catch(function(err) {
  					callback(err, null);
  				});
  		},
  		membros: function(callback) {
  			membrosModel.find({})
  				.then(function(membros) {
  					callback(null, membros);
  				})
  				.catch(function(err) {
  					callback(err, null);
  				});
  		}
  	}, function(err, results) {
  		if(err)
  			return res.render('error');

  		res.render('projetos', {
      	projetos: results.projetos,
        membros: results.membros,
        moment: moment
      });
  	});
});

router.get('/cadastrarProjeto', function(req, res, next) {
  membrosModel.find(null, (err,membros) =>{
    if(err){
      console.log(err);
    }else{
      res.render('cadastrarProjeto',{membros: membros});
    }
  });
});



router.post('/add-projeto',(req,res,next) =>{


  var body = req.body;
  console.log(body);
  projetosModel.create(body, (err,projetos)=>{
    if(err)
      throw err;
    res.redirect('/projetos');
  });
});

router.get('/delete-linha/:id', function(req, res, next) {
  var id = req.params.id;
  model.findByIdAndRemove(id, (err, linha) => {
  res.redirect('/');
});
});

router.get('/delete-projeto/:id', function(req, res, next) {
  var id = req.params.id;
  projetosModel.findByIdAndRemove(id, (err, projeto) => {
  res.redirect('/projetos');
});
});

router.get('/delete-membro/:id', function(req, res, next) {
  var id = req.params.id;
  membrosModel.findByIdAndRemove(id, (err, membro) => {
  var path = './public/uploads/' + membro.imagem;
  fs.unlink(path, ()=>{
    res.redirect('/membros');
  });
});
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/sobre', function(req, res, next) {
  res.render('sobre');
});

router.get('/contato', function(req, res, next) {
  res.render('contato');
});

router.post('/login',
  passport.authenticate('local', { successRedirect: '/',failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
router.post('/cadastrar', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var novoUsuario = new usuario({
    username: username,
    password: password
  });
  usuario.createUser(novoUsuario, function(err,usuario){
    if(err)
      throw err;
    else {
      res.redirect('/login');
    }
  });
});

router.get('/logout',function(req, res){
  req.logout();
  res.redirect('/login');
});

var publicacoesCtrl = require('../controllers/publicacoes');
var patentesCtrl = require('../controllers/patentes');

router.get('/publicacao', publicacoesCtrl.getCreatePublicacao);
router.post('/publicacoes/new', publicacoesCtrl.postCreatePublicacoes);
router.get('/publicacoes/delete/:publicacaoId', publicacoesCtrl.getDeletePublicacao);

router.get('/patentes', patentesCtrl.getCreatePatente);
router.post('/patentes/new', patentesCtrl.postCreatePatente);
router.get('/patentes/delete/:patenteId', patentesCtrl.getDeletePatente);

module.exports = router;
