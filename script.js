'use strict';

const addButton = document.querySelector('.buttonStyle');
const mainContent = document.querySelector('#mainContent');
const textValue = document.getElementById('textArea');

if (navigator.geolocation)
  ///////////////////////////////////////////////////////////////////////////
  // Section Map Functions and eventListeners
  ///////////////////////////////////////////////////////////////////////////
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      const coords = [latitude, longitude];
      const map = L.map('map').setView(coords, 13.5);
      // Creating a Pin or Marker
      map.on('click', function (position) {
        const latlng = [position.latlng.lat, position.latlng.lng];
        if (!textValue.value) {
          alert('Please add Task');
        } else {
          const marker = new L.marker(latlng, {
            draggable: 'true',
            autoPan: 'true',
            riseOnHover: 'true',
          })
            .addTo(map)
            .bindPopup(`${textValue.value}`);

          const createTask = document.createElement('p');
          const delButton = document.createElement('button');
          const completeTask = document.createElement('button');
          const seeTask = document.createElement('button');
          const closePopup = document.createElement('button');

          seeTask.addEventListener('click', function () {
            marker.openPopup();
            seeTask.remove();
            mainContent.appendChild(closePopup);
            closePopup.addEventListener('click', function () {
              marker.closePopup();
              closePopup.remove();
              mainContent.appendChild(seeTask);
            });
          });

          //Delete Button function
          delButton.addEventListener('click', function () {
            createTask.remove();
            delButton.remove();
            completeTask.remove();
            seeTask.remove();
            marker.remove();
          });
          //Completed Task function
          completeTask.addEventListener('click', function () {
            createTask.style.textDecoration = 'line-through';
          });
          //Giving elements properties
          createTask.id = 'orderedList';
          delButton.id = 'delButton';
          delButton.textContent = 'Delete Task';
          completeTask.id = 'completeTask';
          completeTask.textContent = 'Complete Task';
          seeTask.classList = 'seeTask';
          seeTask.textContent = 'See Task';
          closePopup.classList = 'seeTask';
          closePopup.textContent = 'Close Pop Up';

          //Appending elements to HTML
          mainContent.appendChild(createTask);
          mainContent.appendChild(delButton);
          mainContent.appendChild(completeTask);
          mainContent.appendChild(seeTask);

          createTask.textContent = textValue.value;
          textValue.value = null;
        }
      });
      ///////////////////////////////////////////////////////////////////////////
      // Section To Do List Functions and eventListeners
      ///////////////////////////////////////////////////////////////////////////

      addButton.addEventListener('click', function () {
        const createPin = document.createElement('button');
        const createTask = document.createElement('p');
        const delButton = document.createElement('button');
        const completeTask = document.createElement('button');
        const seeTask = document.createElement('button');
        const closePopup = document.createElement('button');

        navigator.geolocation.getCurrentPosition(function (position) {
          const { latitude } = position.coords;
          const { longitude } = position.coords;
          const coords = [latitude, longitude];
          const marker = L.marker(coords, {
            draggable: 'true',
            autoPan: 'true',
            riseOnHover: 'true',
          });

          createPin.addEventListener('click', function () {
            marker.addTo(map).bindPopup(`${createTask.textContent}`);

            createPin.remove();
            mainContent.appendChild(seeTask);
            seeTask.addEventListener('click', function () {
              marker.openPopup();
              seeTask.remove();
              mainContent.appendChild(closePopup);
              closePopup.addEventListener('click', function () {
                marker.closePopup();
                closePopup.remove();
                mainContent.appendChild(seeTask);
              });
            });
          });
          // click function to delete a task
          delButton.addEventListener('click', function () {
            createTask.remove();
            delButton.remove();
            completeTask.remove();
            createPin.remove();
            seeTask.remove();
            closePopup.remove();
            marker.remove();
          });

          // Click function to mark a task complete
          completeTask.addEventListener('click', function () {
            createTask.style.textDecoration = 'line-through';
          });

          // createPin.addEventListener();

          // Assigning created classes values, class, id
          createTask.id = 'orderedList';
          delButton.id = 'delButton';
          delButton.innerHTML = 'Delete Task';
          completeTask.id = 'completeTask';
          completeTask.innerHTML = 'Complete Task';
          createPin.classList = 'seeTask';
          createPin.textContent = 'Create Pin';
          seeTask.classList = 'seeTask';
          seeTask.textContent = 'See Task';
          closePopup.classList = 'seeTask';
          closePopup.textContent = 'Close Pop Up';

          // Appending created elements to side bar
          if (!textValue.value) {
            alert('Please add task');
          } else {
            mainContent.appendChild(createTask);
            mainContent.appendChild(delButton);
            mainContent.appendChild(completeTask);
            mainContent.appendChild(createPin);

            createTask.textContent = textValue.value;
            textValue.value = null;
          }
        });
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
