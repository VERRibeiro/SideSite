var express = require('express');
var router = express.Router();
var model = require('./../model/tasks')();

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

router.get('/cadastro', function(req, res, next) {
  res.render('cadastro', { title: 'Express' });
});

router.post('/add-linha',(req,res,next) =>{
  var body = req.body;
  console.log("entrei");
  model.create(body, (err,task)=>{
    if(err)
      throw err;
    res.redirect('/');
  });
});
module.exports = router;
