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
