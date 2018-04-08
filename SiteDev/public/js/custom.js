function tratarColocacao(event){
  var colocacaoSelect = event.target;
  var selectedIndex = colocacaoSelect.selectedIndex;
  var selectedOption = colocacaoSelect.options[selectedIndex];

  var colocacaoManualInput = document.getElementById('colocacao-manual');

  if(selectedOption.value === '-2') {
    colocacaoManualInput.disabled = false;
    colocacaoManualInput.classList.remove('element-hidden');
    colocacaoSelect.name = 'ignoredColocacao';
  } else {
    colocacaoSelect.name = 'colocacao';
    colocacaoManualInput.disabled = true;
    colocacaoManualInput.classList.add('element-hidden');
  }
}

function tratarPostPublicacao(event){
  console.log("AAAAAAAAA");
  var form = document.forms[0];
  var titulo = form.querySelector('input[name="titulo"]');
  var ano = form.querySelector('input[name="ano"]');
  var local = form.querySelector('input[name="localPublicacao"]');

  console.log(titulo.value);
  if(titulo.value == '' || ano.value == '' || local.value == ''){
    alert("Os campos titulo ano e local da publicação são obrigatórios");
    event.preventDefault();
  }
}
