var Publicacao = require('../model/publicacoes');
var async = require('async');
var Membros = require('../model/membros');
var multer = require('multer');
var fs = require('fs');
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
			Membros.find({})
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



		res.render('publicacao', {
			publicacoes: results.publicacoes,
			membros: results.membros
		});
	});
}

//POST - /publicacoes/new
exports.postCreatePublicacoes = (req, res) => {
	if(req.file){
		req.body.pdf = req.file.filename;
	}else {
		req.body.pdf = "";
	}
	var colocacao = req.body.colocacao;
	var premiado = true;

	if(colocacao === '-1') {
		premiado = false;
		colocacao = null;
	}

	var novaPublicacao = new Publicacao({
		'titulo': req.body.titulo,
		'ano': req.body.ano,
		'localPublicacao': req.body.localPublicacao,
		'link': req.body.link,
		'pdf' : req.body.pdf,
		'membros': req.body.membros,
		'issn': req.body.issn,
		'doi': req.body.doi,
		'premiado': premiado,
		'colocacao': colocacao
	});

	novaPublicacao.save()
		.then(saved => {
			res.redirect('/publicacao');
		})
		.catch(err => {
			res.render('error');
		});
}

exports.getDeletePublicacao = (req, res) => {
	var id = req.params.publicacaoId;
  Publicacao.findByIdAndRemove(id, (err, deletedPublicacao) => {
	if(err)
		console.log(err);
	else if(deletedPublicacao.pdf != ""){
		console.log("DELETOU O FILE ");
		var path = './public/uploads/pdfs/' + deletedPublicacao.pdf;
		console.log(path);
		fs.unlink(path, ()=>{
			res.redirect('/publicacao');
		});
	}else{
		res.redirect('/publicacao');
	}
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
			.find({})
			.sort({ano: -1})
			.then(accept)
			.catch(reject);
	});
}
