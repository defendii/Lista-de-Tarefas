var btncheck = document.querySelectorAll(".checkbtn");
var tarefafeita_risco = document.querySelectorAll(".tarefafeita");
document.querySelectorAll(".checkbtn").checked = false;

btncheck.addEventListener("change", BotaoChecked);

function BotaoChecked(){
    if (btncheck.checked == true){
        tarefafeita_risco.style.textDecoration = "line-through";
        tarefafeita_risco.style.color = "#808080"
    }
}
