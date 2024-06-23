document.addEventListener("DOMContentLoaded", function() {
    var guardaTarefas = document.querySelector("#guardaTarefas");
    var formulario = document.querySelector("#formulario");
    var formularioVazias = document.querySelector("#formulario-vazias");
    var input = document.querySelector("#formulario .adicionar");
    var inputVazias = document.querySelector("#formulario-vazias .adicionar-vazias");
    var btnNumberNaonula = document.querySelector("#btnnumber_naonula");
    var btnNumberNaonula2 = document.querySelector(".btnnumber_naonula2");
    var tarefasVazias = document.querySelector(".container-vazias");
    var todasTarefas = document.querySelector(".container");
    var totalTarefas = 0;
    var tarefasFeitas = 0;

    lendoArmazenamento();
    fTarefasVazias()

    guardaTarefas.addEventListener("click", handleGuardaTarefas);
    formulario.addEventListener("submit", handleFormulario);
    formularioVazias.addEventListener("submit", handleFormularioVazias);

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
            if (itemClicado.closest(".tarefas-feitas_naonula").querySelector(".checkbtn").checked) {
                tarefasFeitas--; // Reduzir o contador se a tarefa excluída estiver concluída
            }
            removerTarefa(itemClicado.closest(".tarefas-feitas_naonula"));
        }

        atualizarContadores();
        fTarefasVazias();
    }


    function atualizarContadores() {
        totalTarefas = document.querySelectorAll('.tarefas-feitas_naonula').length;
        btnNumberNaonula.textContent = totalTarefas;
        btnNumberNaonula2.textContent = `${tarefasFeitas} de ${totalTarefas}`;
        criandoArmazenamento(); // Atualizar armazenamento após qualquer modificação
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

    function handleFormularioVazias(event) {
        event.preventDefault();

        var textoTarefa = inputVazias.value;

        if (textoTarefa !== "") {
            adicionarTarefa(textoTarefa);
            inputVazias.value = "";
            tarefasVazias.style.display = "none";
            todasTarefas.style.display = "block";
            atualizarContadores();
        }
    }

    function adicionarTarefa(texto) {
        var novaTarefa = document.createElement("div");
        novaTarefa.classList.add("tarefas-feitas_naonula");
        novaTarefa.innerHTML = `
            <div class="check">
                <input class="checkbtn" type="checkbox">
                <label class="tarefafeita">${texto}</label>
            </div>
            <div class="lixo">
                <img class="lixeira" src="./imagens/delete_24dp_FILL0_wght400_GRAD0_opsz24.png">
            </div>
        `;

        guardaTarefas.appendChild(novaTarefa);
        totalTarefas++;
        fTarefasVazias()
    }

    function removerTarefa(tarefaDiv) {
        tarefaDiv.remove();
        atualizarContadores();
        fTarefasVazias()
    }

    function fTarefasVazias() {
        if (totalTarefas === 0) {
            tarefasVazias.style.display = "block";
            todasTarefas.style.display = "none";
        } else {
            tarefasVazias.style.display = "none";
            todasTarefas.style.display = "block";
        }
    }

    function criandoArmazenamento() {
        var todasAsTarefas = document.querySelectorAll('.tarefas-feitas_naonula');
        var listaTarefas = [];

        todasAsTarefas.forEach(function(tarefa) {
            var texto = tarefa.querySelector('.tarefafeita').textContent;
            listaTarefas.push(texto);
        });

        localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas));
    }

    function lendoArmazenamento() {
        var dadosArmazenados = localStorage.getItem('listaTarefas');

        if (dadosArmazenados) {
            var listaTarefas = JSON.parse(dadosArmazenados);

            listaTarefas.forEach(function(textoTarefa) {
                adicionarTarefa(textoTarefa);
            });

            // Atualizar contadores após ler do localStorage
            atualizarContadores();
        }
    }
});
