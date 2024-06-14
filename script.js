document.addEventListener("DOMContentLoaded", function() {
    const lixeiras = document.querySelectorAll('.lixo img');

    lixeiras.forEach(lixeira => {
        lixeira.addEventListener('click', function() {
            this.closest('.tarefas-feitas_naonula').remove();
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    function updateCounters() {
        const totalTasks = document.querySelectorAll('.tarefas-feitas_naonula').length;
        const doneTasks = document.querySelectorAll('.checkbtn:checked').length;
        document.getElementById("btnnumber_naonula").textContent = totalTasks;
        document.querySelector(".btnnumber_naonula2").textContent = `${doneTasks} de ${totalTasks}`;
    }

    function moveTaskToBottom(taskDiv) {
        const tasksContainer = document.getElementById("guardaTarefas");
        tasksContainer.appendChild(taskDiv);
        updateCounters();
    }

    const tasksContainer = document.getElementById("guardaTarefas");
    tasksContainer.addEventListener("click", function(event) {
        const target = event.target;
        if (target.classList.contains("checkbtn")) {
            moveTaskToBottom(target.closest('.tarefas-feitas_naonula'));
        } else if (target.classList.contains("lixo")) {
            target.closest(".tarefas-feitas_naonula").remove();
            updateCounters();
        }
    });

    updateCounters();
});

const formulario = document.querySelector("#formulario")

formulario.addEventListener("keyboard", event =>{
    event.preventDefault()
    
})
