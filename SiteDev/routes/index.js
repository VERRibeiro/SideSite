var express = require('express');
var router = express.Router();
var model = require('./../model/tasks')();
var membrosModel = require('./../model/membros')();

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

router.post('/add-membro',(req,res,next) =>{
  var body = req.body;
  membrosModel.create(body, (err,membros)=>{
    if(err)
      throw err;
    res.redirect('/membros');
  });
});

module.exports = router;
