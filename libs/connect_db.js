var mongoose = require('mongoose');
var db;

module.exports = () =>{
  if(!db){
    db = mongoose.connect('mongodb://verribeiro:Pcab2021442021-@ds123171.mlab.com:23171/sidesite', { useMongoClient: true});
  }
    return db;
}
