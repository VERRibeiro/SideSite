var Patente = require('../model/patentes');
var Membros = require('../model/membros');
var async = require('async');


//GET - /patentes
exports.getCreatePatente = (req, res) => {

	async.parallel({
		patentes: callback => {
			sortPatentesByYear()
				.then(patentes => {
					callback(null, patentes);
				})
				.catch(err => {
					callback(err, null);
				});
		},
		membros: callback => {
			Membros.find({})
  				.then(function(membros) {
  					callback(null, membros);
  				})
  				.catch(function(err) {
  					callback(err, null);
  				});
		}
	}, (err, results) => {
		if(err)
			return res.render('error');

		res.render('patentes', {
			patentes: results.patentes,
			membros: results.membros
		});
	});
}

//POST - /patentes/new
exports.postCreatePatente = (req, res) => {

	var novaPatente = new Patente({
			'titulo': req.body.titulo,
	    'autores': req.body.autores,
	    'numeroRegistro': req.body.numeroRegistro,
	    'instituicaoRegistro': req.body.instituicaoRegistro,
	    'dataDeposito': req.body.dataDeposito,
	    'dataConcessao': req.body.dataConcessao,
	    'tipo': req.body.tipo
	});

	novaPatente.save()
		.then(saved => {
			res.redirect('/patentes');
		})
		.catch(err => {
			res.render('error');
		});
}

exports.getDeletePatente = (req, res) => {

	var patenteId = req.params.patenteId;

	Patente.remove({_id: patenteId})
		.then(removed => {
			res.redirect('/patentes');
		})
		.catch(err => {
			res.render('error');
		});
}

exports.postDeletePatente = (req, res) => {

	var patenteId = req.body.patenteId;

	Patente.remove({_id: patenteId})
		.then(removedPatente => {
			res.redirect('/');
		})
		.catch(err => {
			res.render('error');
		});
}

//GET - /patentes
exports.listPatentesOrderedByDataConcessao = (req, res) => {

	sortPatentesByYear()
		.then(patentes => {
			res.render('patentes', {
				patentes: patentes
			});
		})
		.catch(err => {
			res.render('error');
		});
}

function sortPatentesByYear() {

	return new Promise((accept, reject) => {

		Patente
			.find({})
			.sort({dataConcessao: -1})
			.then(accept)
			.catch(reject);
	});
}
