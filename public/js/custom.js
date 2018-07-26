
function tratarNomes(){
  const nomes = document.querySelectorAll(".autores-name");
  var text = "";
  var nome = "";
  var count = 0;
  console.log(nomes.length);
  for(let nome of nomes){
    text = nome.innerHTML.split(" ");
    nome = text[text.length - 1][0] + ". " + text[0];
    if(count == nomes.length - 1)
      nomes[count++].innerText = nome + ". ";
    else
      nomes[count++].innerText = nome + ", ";
  }
}
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
function tratarUpload(event){

  var uploadSelect = event.target;
  var selectedIndex = uploadSelect.selectedIndex;
  var selectedOption = uploadSelect.options[selectedIndex];
  var form = document.forms[0];
  var linkInput = form.querySelector('input[name="link"]');
  var pdfInput = document.getElementById('pdf');

  if(selectedOption.value === 'link') {
    linkInput.classList.remove('element-hidden');
    linkInput.value = "";
    pdfInput.classList.add('element-hidden');
  } else {
    pdfInput.classList.remove('element-hidden');
    pdfInput.value = "";
    linkInput.classList.add('element-hidden');
  }
}
function tratarPostPublicacao(event){
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
