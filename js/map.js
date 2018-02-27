'use strict';
(function () {

  var PIN_HEIGHT = 22;
  var BUTTON_TRANSLATE_Y = 7;
  var DEBOUNCE_INTERVAL = 500;

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var form = map.querySelector('.map__filters');

  var filterType = form.querySelector('#housing-type');
  var filterPrice = form.querySelector('#housing-price');
  var filterRooms = form.querySelector('#housing-rooms');
  var filterGuests = form.querySelector('#housing-guests');
  var filterFeatures = form.querySelectorAll('input[type="checkbox"]');


  var Edges = {
    MIN: 150,
    MAX: 500
  };

  var onSuccess = function (response) {
    // при успешной загрузке данных активируется карта и ожидается взаимодействие с пользователем
    mainPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        // проверка границ
        var coordX = (mainPin.offsetLeft - shift.x);
        var coordY = (mainPin.offsetTop - shift.y);

        coordX = Math.max(coordX, mainPin.offsetWidth / 2);
        coordY = Math.max(coordY, Edges.MIN - PIN_HEIGHT - mainPin.offsetHeight / 2 + BUTTON_TRANSLATE_Y);
        coordX = Math.min(coordX, map.offsetWidth - mainPin.offsetWidth / 2);
        coordY = Math.min(coordY, Edges.MAX - PIN_HEIGHT - mainPin.offsetHeight / 2 + BUTTON_TRANSLATE_Y);

        window.mainPin.setCoordsStyle(coordX, coordY);
        window.mainPin.setCoordsInput(coordX, coordY + PIN_HEIGHT + mainPin.offsetHeight / 2 - BUTTON_TRANSLATE_Y);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        var loadedData = response;
        var resultArray = response;
        if (!window.pageActive) {
          window.setPageState('enabled', loadedData);
          window.pageActive = true;


          // создание списка фильтров
          var checkFeatures = function () {
            // var checkedFeatures = [];
            for (var i = 0; i < filterFeatures.length; i++) {
              // var a = loadedData[i].offer.features;
              console.log(loadedData[i].offer.features, filterFeatures[i].value);
              if (filterFeatures[i].checked && !loadedData[i].offer.features.includes(filterFeatures[i].value)) {
                console.log('checked and loaded data does not includes');
                return true;
              }
            }
            return false;
            // console.log(checkedFeatures);
            // var featuresIncluded = function (element) {
            //   return checkedFeatures.every(function (item) {
            //     return element.includes(item);
            //   });
            // };
          };

          var filterTypeFunction = function (element) {
            return filterType.options[filterType.selectedIndex].value === 'any' || filterType.options[filterType.selectedIndex].value === String(element.offer.type);
          };
          var filterPriceFunction = function (element) {
            if (element.offer.price > 50000) {
              var elementRange = 'high';
            } else if (element.offer.price < 10000) {
              elementRange = 'low';
            } else {
              elementRange = 'middle';
            }
            return filterPrice.options[filterPrice.selectedIndex].value === 'any' || filterPrice.options[filterPrice.selectedIndex].value === elementRange;
          };
          var filterRoomsFunction = function (element) {
            return filterRooms.options[filterRooms.selectedIndex].value === 'any' || filterRooms.options[filterRooms.selectedIndex].value === String(element.offer.rooms);
          };
          var filterGuestsFunction = function (element) {
            return filterGuests.options[filterGuests.selectedIndex].value === 'any' || filterGuests.options[filterGuests.selectedIndex].value === String(element.offer.guests);
          };

          var filterFeaturesFunction = function (element) {
            // return featuresIncluded(element);
            checkFeatures(element);
          };

          var filterList = function (element) {
            var list = filterTypeFunction(element) && filterPriceFunction(element) && filterRoomsFunction(element) && filterGuestsFunction(element) && filterFeaturesFunction(element);

            return list;
          };
          // функция перерисовки пинов согласно отфильтрованным данным
          var build = function () {
            console.log(resultArray);
            var filteredData = resultArray.filter(filterList);
            console.log(filteredData);
            window.debounce(function () {
              window.buttons.remove();
              window.buttons.build(filteredData);
              window.card.open(filteredData);
            }, DEBOUNCE_INTERVAL);

          };
          // var filteredData = function () {
          //   // var filteredArray = array.slice(0);
          //   // filteredArray = filteredArray.filter(function (element) {
          //   //   return filterType.options[filterType.selectedIndex].value === 'any' || filterType.options[filterType.selectedIndex].value === String(element.offer.type);
          //   // }).filter(function (element) {
          //   //   return filterRooms.options[filterRooms.selectedIndex].value === 'any' || filterRooms.options[filterRooms.selectedIndex].value === String(element.offer.rooms);
          //   // }).filter(function (element) {
          //   //   return filterGuests.options[filterGuests.selectedIndex].value === 'any' || filterGuests.options[filterGuests.selectedIndex].value === String(element.offer.guests);
          //   // });
          //   var filteredArray = filteredArray.filter(filterList);

          //   return filteredArray;
          // };



          form.addEventListener('change', function (evtFilter) {
            if (map.querySelector('.popup')) {
              map.querySelector('.popup').remove();
            }
            // RESULT ARRAY
            // resultArray = window.getFilteredData(evtFilter.target, resultArray);
            // resultArray = filteredData(resultArray);
            // console.log(resultArray);
            // filterFeaturesFunction();
            // console.log(filterFeaturesFunction());
            checkFeatures();
            build();

          });

        }

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  // по-умолчанию страница неактивна
  window.setPageState('disabled');
  // получение данных и активация страницы
  window.backend.load(onSuccess, window.errorAlert);

})();
