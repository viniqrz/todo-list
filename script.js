const btnAdd = document.querySelector('#criar-tarefa');
const inputAdd = document.querySelector('#texto-tarefa');
const list = document.querySelector('#lista-tarefas');

btnAdd.addEventListener('click', function(e) {
  e.preventDefault();
  if (inputAdd.value.trim().length < 3) return;

  list.insertAdjacentHTML('beforeend', `<li>${inputAdd.value}</li>`);
  inputAdd.value = '';
})

list.addEventListener('click', function(e) {
  e.target.classList.add('highlight');
})