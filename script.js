'use strict';

const mainContent = document.querySelector('#mainContent');
const addButton = document.querySelector('.buttonStyle');
const textValue = document.getElementById('textArea');

addButton.addEventListener('click', function () {
  const createTask = document.createElement('p');
  const delButton = document.createElement('button');
  const completeTask = document.createElement('button');

  delButton.addEventListener('click', function () {
    createTask.remove();
    delButton.remove();
    completeTask.remove();
  });

  completeTask.addEventListener('click', function () {
    createTask.style.textDecoration = 'line-through';
  });

  createTask.classList = 'orderedList';
  delButton.id = 'delButton';
  delButton.innerHTML = 'Delete Task';
  completeTask.id = 'completeTask';
  completeTask.innerHTML = 'Complete Task';

  mainContent.appendChild(createTask);
  mainContent.appendChild(delButton);
  mainContent.appendChild(completeTask);

  createTask.innerHTML = textValue.value;
});
