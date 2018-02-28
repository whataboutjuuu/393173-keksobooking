'use strict';
(function () {

  var CODE_ESC = 27;

  var map = document.querySelector('.map');


  // составление карточки похожего объявления
  var buildAdCard = function (i, loadedData) {
    var fragmentOffer = document.createDocumentFragment();
    var mapFilters = map.querySelector('.map__filters-container');
    fragmentOffer.appendChild(window.renderAdCard(loadedData[i]));
    map.insertBefore(fragmentOffer, mapFilters);
  };
  // закрытие карточки по esc
  var onCardEscPress = function (evt) {
    if (evt.keyCode === CODE_ESC) {
      closePopup();
    }
  };
  // функция закрытия открытой карточки
  var closePopup = function () {
    var card = map.querySelector('.map__card');
    card.remove();
    document.removeEventListener('keydown', onCardEscPress);
  };

  window.card = {
    // открытие определенной карточки
    open: function (loadedData) {
      var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < pins.length; i++) {
        pins[i].number = i;
        pins[i].addEventListener('click', function (evt) {
          window.card.destroy();
          var index = evt.currentTarget.number;
          buildAdCard(index, loadedData);
          // закрытие открытой карточки
          var popupClose = map.querySelector('.popup__close');
          popupClose.addEventListener('click', function () {
            closePopup();
          });
          document.addEventListener('keydown', onCardEscPress);
        });
      }
    },
    // функция для удаления из дерева выбранных ранее карточек
    destroy: function () {
      document.removeEventListener('keydown', onCardEscPress);
      var oldCards = map.querySelectorAll('.popup');
      for (var i = 0; i < oldCards.length; i++) {
        map.removeChild(oldCards[i]);
      }
    }
  };

})();
