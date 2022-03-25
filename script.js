'use strict';

const addButton = document.querySelector('.buttonStyle');
const mainContent = document.querySelector('#mainContent');
const textValue = document.getElementById('textArea');
const section1 = document.getElementById('section1');

//////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////*******FUNCTIONS*****//////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

//Appends all elements when clicking on Map or when clicking Add to do Task
const appendElements = function (
  elementId,
  appendEl1,
  appendEl2,
  appendEl3,
  appendEl4
) {
  elementId.appendChild(appendEl1);
  elementId.appendChild(appendEl2);
  elementId.appendChild(appendEl3);
  elementId.appendChild(appendEl4);
};

// Creates a Pin if needed
const createdPinTask = function (firstElement, pin, mapElement, secondElement) {
  firstElement.addEventListener('click', function () {
    pin.addTo(mapElement).bindPopup(`${secondElement.textContent}`);

    switch (firstElement.textContent) {
      case 'Create Pin':
        firstElement.textContent = 'See Task';
        break;
      case 'See Task':
        pin.openPopup();
        firstElement.textContent = 'Hide Task';
        break;
      case 'Hide Task':
        pin.closePopup();
        firstElement.textContent = 'See Task';
    }
  });
};

//Will delete appended Task after created
const deleteElements = function (deleteBtn, el1, el2, el3, el4, el5) {
  //Delete Button function
  deleteBtn.addEventListener('click', function () {
    el1.remove();
    el2.remove();
    el3.remove();
    el4.remove();
    el5.remove();
  });
};

// Complete task element, on click will cross out the task or uncross it
const completeTaskButton = function (completeButton, createElement) {
  completeButton.addEventListener('click', function () {
    switch (completeButton.textContent) {
      case 'Complete Task':
        createElement.style.textDecoration = 'line-through';
        completeButton.textContent = 'Uncomplete Task';
        break;
      case 'Uncomplete Task':
        createElement.style.textDecoration = null;
        completeButton.textContent = 'Complete Task';
    }
  });
};

// Assign values and classes to the appended element after clicking on map or clicking on Add to do Task
const assignValuesToElements = function (
  createElement,
  delElement,
  completeElement,
  createPinElement,
  textValueElement,
  createPinElementValue
) {
  createElement.classList = 'orderedList';
  delElement.classList = 'delButton';
  delElement.textContent = 'Delete Task';
  completeElement.classList = 'completeTask';
  completeElement.textContent = 'Complete Task';
  createPinElement.classList = 'seeTask';
  createPinElement.textContent = createPinElementValue;
  createElement.textContent = textValueElement.value;
  textValueElement.value = null;
};
//////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////*******FUNCTIONS*****//////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

if (navigator.geolocation) {
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
        const createTask = document.createElement('p');
        const delButton = document.createElement('button');
        const completeTask = document.createElement('button');
        const createPin = document.createElement('button');
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

          //Appending elements to HTML
          appendElements(
            section1,
            createTask,
            delButton,
            completeTask,
            createPin
          );

          createdPinTask(createPin, marker, map, createTask);

          //Delete Button function
          deleteElements(
            delButton,
            createTask,
            delButton,
            completeTask,
            createPin,
            marker
          );

          //Completed Task function
          completeTaskButton(completeTask, createTask);

          //Giving elements properties
          assignValuesToElements(
            createTask,
            delButton,
            completeTask,
            createPin,
            textValue,
            'See Task'
          );
        }
      });
      ///////////////////////////////////////////////////////////////////////////
      // Section To Do List Functions and eventListeners
      ///////////////////////////////////////////////////////////////////////////

      addButton.addEventListener('click', function () {
        const createTask = document.createElement('p');
        const delButton = document.createElement('button');
        const completeTask = document.createElement('button');
        const createPin = document.createElement('button');

        navigator.geolocation.getCurrentPosition(function (position) {
          const { latitude } = position.coords;
          const { longitude } = position.coords;
          const coords = [latitude, longitude];
          const marker = L.marker(coords, {
            draggable: 'true',
            autoPan: 'true',
            riseOnHover: 'true',
          });

          // Appending created elements to side bar
          if (!textValue.value) {
            alert('Please add task');
          } else {
            appendElements(
              section1,
              createTask,
              delButton,
              completeTask,
              createPin
            );

            createdPinTask(createPin, marker, map, createTask);

            //Delete Button function
            deleteElements(
              delButton,
              createTask,
              delButton,
              completeTask,
              createPin,
              marker
            );

            //Completed Task function
            completeTaskButton(completeTask, createTask);

            // createPin.addEventListener();

            // Assigning created classes values, class, id
            assignValuesToElements(
              createTask,
              delButton,
              completeTask,
              createPin,
              textValue,
              'Create Pin'
            );
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
}
