document.addEventListener("DOMContentLoaded", function() {
    var guardaTarefas = document.querySelector("#guardaTarefas");
    var formulario = document.querySelector("#formulario");
    var entrada = document.querySelector("#adicionar");
    var btnNumberNaonula = document.querySelector("#btnnumber_naonula");
    var btnNumberNaonula2 = document.querySelector(".btnnumber_naonula2");
    var totalTarefas = 0;
    var tarefasFeitas = 0;

    guardaTarefas.addEventListener("click", handleGuardaTarefas);
    formulario.addEventListener("submit", handleFormulario);

    // Contagem inicial das tarefas concluídas
    document.querySelectorAll('.checkbtn:checked').forEach(function(checkBtn) {
        tarefasFeitas++;
    });

    // Contagem inicial do número total de tarefas
    totalTarefas = document.querySelectorAll('.tarefas-feitas_naonula').length;

    atualizarContadores();

    function handleGuardaTarefas(event) {
        var itemClicado = event.target;
        if (itemClicado.classList.contains("checkbtn")) {
            moverTarefaParaBaixo(itemClicado.closest('.tarefas-feitas_naonula'));
            // Se o botão de verificação foi clicado, atualizamos a contagem de tarefas concluídas
            if (itemClicado.checked) {
                tarefasFeitas++;
            } else {
                tarefasFeitas--;
            }
        } else if (itemClicado.classList.contains("lixeira")) {
            removerTarefa(itemClicado.closest(".tarefas-feitas_naonula"));
        }
        atualizarContadores();
    }

    function atualizarContadores() {
        btnNumberNaonula.textContent = totalTarefas;
        btnNumberNaonula2.textContent = `${tarefasFeitas} de ${totalTarefas}`;
    }

    function moverTarefaParaBaixo(tarefaDiv) {
        guardaTarefas.appendChild(tarefaDiv);
    }

    function handleFormulario(event) {
        event.preventDefault();

        var textoTarefa = entrada.value;

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
        totalTarefas++;
    }

    function removerTarefa(tarefaDiv) {
        tarefaDiv.remove();
        totalTarefas--;
        atualizarContadores();
    }
});
