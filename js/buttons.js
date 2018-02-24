'use strict';
(function () {

  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var BUTTON_HEIGHT_CORRECTION = -35;

  var renderAdButton = function (ad) {
    var template = document.querySelector('template').content;
    var button = template.querySelector('.map__pin');
    var adButton = button.cloneNode(true);
    adButton.style.left = ad.location.x + 'px';
    adButton.style.top = ad.location.y + BUTTON_HEIGHT_CORRECTION + 'px';
    adButton.querySelector('img').src = ad.author.avatar;

    return adButton;
  };

  window.buttons = {
    buildAdButtons: function (loadedData) {
      var count = loadedData.length > 5 ? 5 : loadedData.length;
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < count; i++) {
        fragment.appendChild(renderAdButton(loadedData[i]));
      }
      mapPins.appendChild(fragment);
    },
    removeAdButtons: function () {
      var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < pins.length; i++) {
        pins[i].remove();
      }
    }
  };

})();
