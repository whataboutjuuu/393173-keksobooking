'use strict';
(function () {

  var PIN_HEIGHT = 22;
  var BUTTON_TRANSLATE_Y = 7;
  var DEBOUNCE_INTERVAL = 500;

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var form = map.querySelector('.map__filters');

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
        if (!window.pageActive) {
          window.setPageState('enabled', loadedData);
          window.pageActive = true;

          // функция перерисовки пинов по отфильтрованным данным
          var buildFilteredButtons = function () {
            var filteredData = loadedData.filter(window.getfilterList);
            window.debounce(function () {
              window.buttons.remove();
              window.buttons.build(filteredData);
              window.card.open(filteredData);
            }, DEBOUNCE_INTERVAL);
          };

          form.addEventListener('change', function () {
            if (map.querySelector('.popup')) {
              map.querySelector('.popup').remove();
            }
            buildFilteredButtons();
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
