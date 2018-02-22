'use strict';
(function () {

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var notice = document.querySelector('.notice');

  window.mainPin = {
    setCoordsInput: function (x, y) {
      var addressInput = notice.querySelector('#address');
      addressInput.value = x + ', ' + y;
    },
    setCoordsStyle: function (x, y) {
      mainPin.style.left = x + 'px';
      mainPin.style.top = y + 'px';
    }
  };

})();
