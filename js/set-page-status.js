'use strict';
(function () {

  var map = document.querySelector('.map');
  var notice = document.querySelector('.notice');
  var form = notice.querySelector('.notice__form');
  var InitialCoords = {
    'X': map.offsetWidth / 2,
    'Y': 375
  };

  // установка статуса страницы - активный / неактивный
  window.setPageState = function (state, loadedData) {
    if (state === 'disabled') {
      window.card.destroy();
      window.buttons.remove();
      form.reset();
      window.mainPin.setCoordsStyle(InitialCoords.X, InitialCoords.Y);
      window.mainPin.setCoordsInput(InitialCoords.X, InitialCoords.Y);
      window.disableFildset(true);
      map.classList.add('map--faded');
      notice.querySelector('.notice__form').classList.add('notice__form--disabled');
    } else {
      window.buttons.build(loadedData);
      window.card.open(loadedData);
      map.classList.remove('map--faded');
      notice.querySelector('.notice__form').classList.remove('notice__form--disabled');
      window.disableFildset(false);
    }
  };

})();
