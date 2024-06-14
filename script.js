document.addEventListener("DOMContentLoaded", function() {
    const guardaTarefas = document.getElementById("guardaTarefas");

    guardaTarefas.addEventListener("click", function(event) {
        const alvo = event.target;
        if (alvo.classList.contains("checkbtn")) {
            moverTarefaParaBaixo(alvo.closest('.tarefas-feitas_naonula'));
        } else if (alvo.classList.contains("lixeira")) {
            alvo.closest(".tarefas-feitas_naonula").remove();
            atualizarContadores();
        }
    });

    function atualizarContadores() {
        const totalTarefas = document.querySelectorAll('.tarefas-feitas_naonula').length;
        const tarefasFeitas = document.querySelectorAll('.checkbtn:checked').length;
        document.getElementById("btnnumber_naonula").textContent = totalTarefas;
        document.querySelector(".btnnumber_naonula2").textContent = `${tarefasFeitas} de ${totalTarefas}`;
    }

    function moverTarefaParaBaixo(tarefaDiv) {
        guardaTarefas.appendChild(tarefaDiv);
        atualizarContadores();
    }

    const formulario = document.getElementById("formulario");

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        const entrada = document.querySelector("#adicionar");
        const textoTarefa = entrada.value.trim();

        if (textoTarefa !== "") {
            adicionarTarefa(textoTarefa);
            entrada.value = "";
            atualizarContadores();
        }
    });

    function adicionarTarefa(texto) {
        const novaTarefa = document.createElement("div");
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
});
