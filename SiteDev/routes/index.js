var express = require('express');
var router = express.Router();
var model = require('./../model/tasks')();
var membrosModel = require('./../model/membros')();
var projetosModel = require('./../model/projetos')();
var multer = require('multer');
var mongoose = require('mongoose');

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
  projetosModel.find(null, (err, projetos) =>{
    if(err){
      console.log(err);
    }else{
      var projetosMembros = {};
      res.render('projetos',{projetos:projetos});
    }
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
  var dataFimArray = req.body.dataFim.split('-');
  var dataFimString = "";
  var dataFimString = dataFimArray[2]+'/'+dataFimArray[1]+'/'+dataFimArray[0];
  var dataInicioArray = req.body.dataFim.split('-');
  var dataInicioString = "";
  var dataInicioString = dataInicioArray[2]+'/'+dataInicioArray[1]+'/'+dataInicioArray[0];
  req.body.dataFim = dataFimString;
  req.body.dataInicio = dataInicioString;
  var body = req.body;
  projetosModel.create(body, (err,projetos)=>{
    if(err)
      throw err;
    res.redirect('/projetos');
  });
});
module.exports = router;
