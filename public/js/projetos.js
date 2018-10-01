function autoFillAtual(titulo, dataInicio,financiador,tipo) {
  document.getElementById("recipient-titulo").value = titulo;
  document.getElementById("recipient-titulo-antigo").value = titulo;
  document.getElementById("recipient-financiador").value = financiador;
  document.getElementById("recipient-tipo").value = tipo;
  document.getElementById("recipient-dataInicio").value = dateValueFormater(dataInicio);
  document.getElementById("recipient-dataFim").value = null;
}

function autoFillAntigo(titulo, dataInicio,dataFim,financiador,tipo) {
  document.getElementById("recipient-titulo").value = titulo;
  document.getElementById("recipient-titulo-antigo").value = titulo;
  document.getElementById("recipient-financiador").value = financiador;
  document.getElementById("recipient-tipo").value = tipo;
  document.getElementById("recipient-dataInicio").value = dateValueFormater(dataInicio);
  document.getElementById("recipient-dataFim").value = dateValueFormater(dataFim);
}

function dateValueFormater(data){
  let dataInicioFormatada;
  let dataInicioPronta = '';
  dataInicioFormatada = data.split('/');
  dataInicioPronta+= dataInicioFormatada[2] + '-';
  dataInicioPronta+= dataInicioFormatada[1] + '-';
  dataInicioPronta+= dataInicioFormatada[0];
  return dataInicioPronta;
}
