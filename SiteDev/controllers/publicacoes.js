var Publicacao = require('../model/publicacoes');
var async = require('async');
var Membros = require('../model/membros');


//GET - /publicacoes
exports.getCreatePublicacao = (req, res) => {

	async.parallel({
		publicacoes: callback => {
			sortPublicacoesByYear()
				.then(publicacoes => {
					callback(null, publicacoes);
				})
				.catch(err => {
					callback(err, null);
				});
		},
		membros: callback => {
			membrosModel.find({})
  				.then(function(membros) {
  					callback(null, membros);
  				})
  				.catch(function(err) {
  					callback(err, null);
  				});
		}
	}, (err, results) => {
		if(err) {
			console.log('error during getCreatePublicacao: ', err);
			return res.render('error');
		}

		console.log('getCreatePublicacao, results: ', results);

		res.render('publicacao', {
			publicacoes: results.publicacoes,
			membros: results.membros
		});
	});
}

//POST - /publicacoes/new
exports.postCreatePublicacoes = (req, res) => {

	var colocacao = req.body.colocacao;
	var premiado = true;

	if(colocacao === '-1') {
		premiado = false;
		colocacao = null;
	}

	var novaPublicacao = new Publicacao({
		'titulo': req.body.title,
		'ano': req.body.ano,
		'localPublicacao': req.body.localPublicacao,
		'membros': req.body.membros,
		'issn': req.body.issn,
		'doi': req.body.doi,
		'premiado': premiado,
		'colocacao': colocacao
	});

	novaPublicacao.save()
		.then(saved => {
			res.redirect('/');
		})
		.catch(err => {
			res.render('error');
		});
}

exports.postDeletePublicacao = (req, res) => {

	var publicacaoId = req.body.publicacaoId;

	Publicacao.remove({_id: publicacaoId})
		.then(removedPublicacao => {
			res.redirect('/');
		})
		.catch(err => {
			res.render('error');
		});
}

function sortPublicacoesByYear() {

	return new Promise((accept, reject) => {

		Publicacao
			.then({})
			.sort({ano: -1})
			.then(accept)
			.catch(reject);
	});
}