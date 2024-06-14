document.addEventListener("DOMContentLoaded", function() {
    var guardaTarefas = document.querySelector("#guardaTarefas");
    var formulario = document.querySelector("#formulario");
    var entrada = document.querySelector("#adicionar");
    var btnNumberNaonula = document.querySelector("#btnnumber_naonula");
    var btnNumberNaonula2 = document.querySelector(".btnnumber_naonula2");

    guardaTarefas.addEventListener("click", handleGuardaTarefas);
    formulario.addEventListener("submit", handleFormulario);

    atualizarContadores();

    function handleGuardaTarefas(event) {
        var itemClicado = event.target;
        if (itemClicado.classList.contains("checkbtn")) {
            moverTarefaParaBaixo(itemClicado.closest('.tarefas-feitas_naonula'));
        } else if (itemClicado.classList.contains("lixeira")) {
            removerTarefa(itemClicado.closest(".tarefas-feitas_naonula"));
        }
    }

    function atualizarContadores() {
        const totalTarefas = document.querySelectorAll('.tarefas-feitas_naonula').length;
        const tarefasFeitas = document.querySelectorAll('.checkbtn:checked').length;
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
        atualizarContadores(); // Atualizar os contadores após adicionar uma nova tarefa
    }

    function removerTarefa(tarefaDiv) {
        tarefaDiv.remove();
        atualizarContadores(); // Atualizar os contadores após remover uma tarefa
    }
});
