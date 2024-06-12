document.getElementById("guardaTarefas")
var btnnumber_naonula = document.getElementById("btnnumber_naonula")
var divs = document.getElementsByClassName("tarefas-feitas_naonula")

console.log(divs.length)

function troca_number(){
    var qtde_tarefas = divs.length;
    for (var i = 0; i < btnnumber_naonula.length; i++) {
        btnnumber_naonula[i].textContent = qtde_tarefas;
    }
}


addEventListener("click")
troca_number()