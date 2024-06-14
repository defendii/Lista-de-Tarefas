document.addEventListener("DOMContentLoaded", function() {
    var guardaTarefas = document.querySelector("#guardaTarefas")
    var formulario = document.querySelector("#formulario")
    var input = document.querySelector("#adicionar")
    var btnNumberNaonula = document.querySelector("#btnnumber_naonula")
    var btnNumberNaonula2 = document.querySelector(".btnnumber_naonula2")
    var totalTarefas = 0
    var tarefasFeitas = 0

    guardaTarefas.addEventListener("click", handleGuardaTarefas)
    formulario.addEventListener("submit", handleFormulario)

    document.querySelectorAll('.checkbtn:checked').forEach(function(checkBtn) {
        tarefasFeitas++
    });
    totalTarefas = document.querySelectorAll('.tarefas-feitas_naonula').length

    atualizarContadores();

    function handleGuardaTarefas(event) {
        var itemClicado = event.target;
        if (itemClicado.classList.contains("checkbtn")) {
            if (itemClicado.checked) {
                tarefasFeitas++;
                moverTarefaParaBaixo(itemClicado.closest('.tarefas-feitas_naonula'));
            } else {
                tarefasFeitas--;
                moverTarefaParaCima(itemClicado.closest('.tarefas-feitas_naonula'));
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

    function moverTarefaParaCima(tarefaDiv) {
        var primeiroItem = guardaTarefas.firstElementChild;
        guardaTarefas.insertBefore(tarefaDiv, primeiroItem);
    }

    function moverTarefaParaBaixo(tarefaDiv) {
        guardaTarefas.appendChild(tarefaDiv);
    }

    function handleFormulario(event) {
        event.preventDefault();

        var textoTarefa = input.value;

        if (textoTarefa !== "") {
            adicionarTarefa(textoTarefa);
            input.value = "";
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
