const btnAdd = document.querySelector('#criar-tarefa');
const inputAdd = document.querySelector('#texto-tarefa');
const btnRemoveAll = document.querySelector('#apaga-tudo');
const btnRemoveCompleted = document.querySelector('#remover-finalizados');
const list = document.querySelector('#lista-tarefas');

let highlighted = false;

btnAdd.addEventListener('click', function(e) {
  e.preventDefault();
  if (inputAdd.value.trim().length < 3) return;

  list.insertAdjacentHTML('beforeend', `<li>${inputAdd.value}</li>`);
  inputAdd.value = '';
});

btnRemoveAll.addEventListener('click', function(e) {
  list.innerHTML = '';
});

btnRemoveCompleted.addEventListener('click', function(e) {
  const completed = document.querySelectorAll('.completed');
  
  if (completed) {
    for (const el of completed) el.remove();
  }
})

list.addEventListener('click', function(e) {
  if (highlighted) highlighted.classList.remove('highlight');

  highlighted = e.target;

  highlighted.classList.add('highlight');
});

list.addEventListener('dblclick', function(e) {
  if (e.target.classList.contains('completed')) {
    e.target.classList.remove('completed');
    return;
  }

  e.target.classList.add('completed');
});
