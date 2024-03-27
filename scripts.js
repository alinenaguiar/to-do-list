const container = document.querySelector('.container')
const input = document.querySelector('.input')
const addButton = document.querySelector('.add')

function addTarefa(nomeDaTarefa) {
    const itemTarefa = document.createElement('div')
    itemTarefa.classList.add('item')

    const inputTarefa = document.createElement('input')
    inputTarefa.type = 'text'
    inputTarefa.disabled = true
    inputTarefa.value = nomeDaTarefa
    inputTarefa.classList.add('item-input')

    const btnEditar = document.createElement('button')
    btnEditar.classList.add('editar')
    btnEditar.innerText = "EDITAR"
    btnEditar.addEventListener('click', () => editarTarefa(inputTarefa, nomeDaTarefa))

    const btnRemover = document.createElement('button')
    btnRemover.classList.add('remover')
    btnRemover.innerText = "REMOVER"
    btnRemover.addEventListener('click', () => removerTarefa(itemTarefa, nomeDaTarefa))

    container.appendChild(itemTarefa)
    itemTarefa.appendChild(inputTarefa)
    itemTarefa.appendChild(btnEditar)
    itemTarefa.appendChild(btnRemover)
}

function saveTasks() {
    window.localStorage.setItem("tasks", JSON.stringify(tasks))
}

function editarTarefa(input, nomeDaTarefa) {
    input.disabled = !input.disabled
    if (!input.disabled) {
        const index = tasks.indexOf(nomeDaTarefa)
        tasks[index] = input.value
        saveTasks()
    }

}

function removerTarefa(itemTarefa, nomeDaTarefa) {
    container.removeChild(itemTarefa)
    const index = tasks.indexOf(nomeDaTarefa)
    tasks.splice(index, 1)
    saveTasks()
}

//Funçao que verifica se o input está preenchido
function checkInput() {
    // Pegando o valor que está no input
    const valorInput = input.value
    if (valorInput !== '') {
        addTarefa(valorInput)
        tasks.push(valorInput)
        saveTasks()
        input.value = ''
    }
}

// Adicionando evento de clique no botão
addButton.addEventListener('click', checkInput)
window.addEventListener('keypress', (e) => {
    // Verificando se a tecla pressionada foi Enter
    if (e.key === "Enter") {
        checkInput()
    }
})

// Criando/carregando o localstorage
const tasks = JSON.parse(window.localStorage.getItem("tasks")) || []
for (const task of tasks) {
    addTarefa(task)
}