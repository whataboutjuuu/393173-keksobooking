'use strict';
(function () {

  var CODE_ESC = 27;

  var map = document.querySelector('.map');
  var mapFilters = map.querySelector('.map__filters-container');

  // составление карточки похожего объявления
  var buildAdCard = function (i, loadedData) {
    var fragmentOffer = document.createDocumentFragment();
    var buildedCard = window.renderAdCard(loadedData[i]);
    fragmentOffer.appendChild(buildedCard);
    map.insertBefore(fragmentOffer, mapFilters);

    // функция закрытия открытой карточки
    var closePopup = function (card) {
      card.remove();
      document.removeEventListener('keydown', onCardEscPress);
    };
    // закрытие карточки по esc
    var onCardEscPress = function (evt) {
      if (evt.keyCode === CODE_ESC) {
        closePopup(buildedCard);
      }
    };
    // реализация закрытия карточки
    var popupClose = buildedCard.querySelector('.popup__close');
    popupClose.addEventListener('click', function () {
      closePopup(buildedCard);
    });
    document.addEventListener('keydown', onCardEscPress);
  };

  window.card = {
    // открытие определенной карточки
    open: function (loadedData) {
      var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < pins.length; i++) {
        pins[i].number = i;
        pins[i].addEventListener('click', function (evt) {
          // удаление предыдущей открытой карточки
          window.card.close();
          var index = evt.currentTarget.number;
          buildAdCard(index, loadedData);
        });
      }
    },
    close: function () {
      var popup = map.querySelector('.popup');
      if (popup) {
        popup.remove();
      }
    }
  };

})();
