document.addEventListener("DOMContentLoaded", function() {
    var guardaTarefas = document.querySelector("#guardaTarefas")
    var formulario = document.querySelector("#formulario")
    var entrada = document.querySelector("#adicionar")
    var btnNumberNaonula = document.querySelector("#btnnumber_naonula")
    var btnNumberNaonula2 = document.querySelector(".btnnumber_naonula2")
    var totalTarefas = document.querySelectorAll('.tarefas-feitas_naonula').length
    var tarefasFeitas = document.querySelectorAll('.checkbtn:checked').length

    guardaTarefas.addEventListener("click", handleGuardaTarefas)
    formulario.addEventListener("submit", handleFormulario)

    function handleGuardaTarefas(event) {
        var alvo = event.target;
        if (alvo.classList.contains("checkbtn")) {
            moverTarefaParaBaixo(alvo.closest('.tarefas-feitas_naonula'));
        } else if (alvo.classList.contains("lixeira")) {
            removerTarefa(alvo.closest(".tarefas-feitas_naonula"));
            atualizarContadores();
        }
    }

    function atualizarContadores() {
        btnNumberNaonula.textContent = totalTarefas;
        btnNumberNaonula2.textContent = `${tarefasFeitas} de ${totalTarefas}`;
    }

    function moverTarefaParaBaixo(tarefaDiv) {
        guardaTarefas.appendChild(tarefaDiv);
        atualizarContadores();
    }

    function handleFormulario(event) {
        event.preventDefault();

        var textoTarefa = entrada.value.trim();

        if (textoTarefa !== "") {
            adicionarTarefa(textoTarefa);
            entrada.value = "";
            atualizarContadores();
        }
    }

    function adicionarTarefa(texto) {
        var novaTarefa = document.createElement("div");
        novaTarefa.classList.add("tarefas-feitas_naonula");
        novaTarefa.innerHTML = `
            <div class="tarefas-feitas_naonula">
                <div class="check">
                    <input class="checkbtn" type="checkbox">
                    <label class="tarefafeita">${texto}</label>
                </div>
                <div class="lixo">
                    <img class="lixeira" src="./imagens/delete_24dp_FILL0_wght400_GRAD0_opsz24.png">
                </div>
            </div>
        `;
        guardaTarefas.insertBefore(novaTarefa, guardaTarefas.firstElementChild);
    }

    function removerTarefa(tarefaDiv) {
        tarefaDiv.remove();
    }
});
