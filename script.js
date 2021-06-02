const btnAdd = document.querySelector('#criar-tarefa');
const inputAdd = document.querySelector('#texto-tarefa');
const btnRemoveAll = document.querySelector('#apaga-tudo');
const btnRemoveCompleted = document.querySelector('#remover-finalizados');
const btnSaveList = document.querySelector('#salvar-tarefas');
const btnMoveUp = document.querySelector('#mover-cima');
const btnMoveDown = document.querySelector('#mover-baixo');
const btnRemoveSelected = document.querySelector('#remover-selecionado');
const list = document.querySelector('#lista-tarefas');

let highlighted = false;
let listData = {
  items: [],
};

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

btnSaveList.addEventListener('click', function(e) {
  if (highlighted) highlighted.classList.remove('highlight');

  const currentList = document.querySelector('#lista-tarefas');

  localStorage.setItem('listItems', JSON.stringify(currentList.innerHTML));
})

btnMoveUp.addEventListener('click', function(e) {
  const currentList = document.querySelector('#lista-tarefas');
  let arr = Array.prototype.slice.call(currentList.childNodes);

  if (!highlighted) return;
  if (arr.indexOf(highlighted) === 0) return;

  arr = [
    ...arr.slice(0, arr.indexOf(highlighted) - 1), 
    highlighted,
    arr[arr.indexOf(highlighted) - 1], 
    ...arr.slice(arr.indexOf(highlighted)+1)
  ];

  currentList.innerHTML = '';
  arr.forEach(el => currentList.appendChild(el));
})

btnMoveDown.addEventListener('click', function(e) {
  const currentList = document.querySelector('#lista-tarefas');
  let arr = Array.prototype.slice.call(currentList.childNodes);

  if (!highlighted) return;
  if (arr.indexOf(highlighted) === arr.length - 1) return;

  arr = [
    ...arr.slice(0, arr.indexOf(highlighted)), 
    arr[arr.indexOf(highlighted) + 1],
    highlighted, 
    ...arr.slice(arr.indexOf(highlighted)+2)
  ];

  currentList.innerHTML = '';
  arr.forEach(el => currentList.appendChild(el));
})

btnRemoveSelected.addEventListener('click', function(e) {
  const currentList = document.querySelector('#lista-tarefas');
  
  if (highlighted) currentList.removeChild(highlighted);
})


if (localStorage.getItem('listItems')) {
  list.insertAdjacentHTML('afterbegin', JSON.parse(localStorage.getItem('listItems')));
}




