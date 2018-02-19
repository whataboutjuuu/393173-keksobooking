'use strict';
(function () {

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var notice = document.querySelector('.notice');
  var addressInput = notice.querySelector('#address');
  var PIN_HEIGHT = 22;
  var MIN_Y_COORD = 150;
  var MAX_Y_COORD = 500;
  var mapIsActive = false;

  // функция для отображения выбраной карточки
  var buildAdCard = function (i) {
    var fragmentOffer = document.createDocumentFragment();
    var mapFilters = map.querySelector('.map__filters-container');
    fragmentOffer.appendChild(window.renderAdCard(window.adData[i]));
    map.insertBefore(fragmentOffer, mapFilters);
  };

  // функция для удаления из дерева выбранных ранее карточек
  var destroyAdCard = function () {
    var oldCards = map.querySelectorAll('.popup');
    for (var i = 0; i < oldCards.length; i++) {
      map.removeChild(oldCards[i]);
    }
  };

  var setCoordsInput = function (x, y) {
    addressInput.value = x + ', ' + y;
  };
  // запись начальных координат метки в поле адреса
  setCoordsInput(map.offsetWidth / 2, mainPin.offsetTop + mainPin.offsetHeight / 2);

  // "перетаскивание" метки, активация страницы
  var setActiveState = function () {
    map.classList.remove('map--faded');
    notice.querySelector('.notice__form').classList.remove('notice__form--disabled');
    window.buildAdButtons();
    // открывать нужный попап в зависимости от кликнутого маркера
    var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pins.length; i++) {
      pins[i].number = i;
      pins[i].addEventListener('click', function (evt) {
        destroyAdCard();
        var index = evt.currentTarget.number;
        buildAdCard(index);
      });
    }
  };

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
      coordY = Math.max(coordY, MIN_Y_COORD);
      coordX = Math.min(coordX, map.offsetWidth - mainPin.offsetWidth / 2);
      coordY = Math.min(coordY, MAX_Y_COORD);

      mainPin.style.top = coordY + 'px';
      mainPin.style.left = coordX + 'px';
      setCoordsInput(coordX, coordY + PIN_HEIGHT + mainPin.offsetHeight / 2);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      if (!mapIsActive) {
        setActiveState();
        mapIsActive = true;
      }
      window.disableFildset(false);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
