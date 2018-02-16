'use strict';
(function () {

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var notice = document.querySelector('.notice');
  var addressInput = notice.querySelector('#address');

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

  // получение начальных координат метки
  var getInitialMainCoordinates = function () {
    var initialX = map.offsetWidth / 2;
    var initialY = mainPin.offsetTop + mainPin.offsetHeight / 2;
    addressInput.value = initialX + ', ' + initialY;
  };
  getInitialMainCoordinates();

  // запись начальных координат метки в поле формы
  var setMainCoordinates = function () {
    addressInput.value = mainPin.offsetLeft + ', ' + (mainPin.offsetTop + mainPin.offsetHeight);
  };

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

  // по событию mouseup задаем активный статус страницы и новые координаты в поле Адрес
  mainPin.addEventListener('mouseup', function () {
    setActiveState();
    window.disableFildset(false);
    setMainCoordinates();
  });

})();
