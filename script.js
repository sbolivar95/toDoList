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

    //Leaflet library adding tile layers to map
    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2JvbGl2YXI5NSIsImEiOiJja3poaW5hMTAxOXB3MzFvYmdpcWI0ODR6In0.oI4-d-N66_1DlhrX_Fqs0A',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          'pk.eyJ1Ijoic2JvbGl2YXI5NSIsImEiOiJja3poaW5hMTAxOXB3MzFvYmdpcWI0ODR6In0.oI4-d-N66_1DlhrX_Fqs0A',
      }
    ).addTo(map);
  },
  function () {
    alert('Could not get your position, browser needs your current position');
  }
);
