function validatePassword(event){
  var form = document.forms[0];
  var senha1 = document.querySelector('input[name = "password"]');
  var senha2 = document.querySelector('input[name = "confirm"]');

  if(senha1.value != senha2.value){
    alert("As senhas devem ser iguais");
    event.preventDefault();
  }else if(senha1.value.trim() ==""){
    alert("O campo senha é obrigatório");
    event.preventDefault();
  }else {
    confirm("Deseja confirmar a senha?");
  }
}
