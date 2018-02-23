'use strict';
(function () {
  var map = document.querySelector('.map');
  var someFunction = function () {

  };

  window.filteredData = function (loadedData) {
    var commonItemsArray = loadedData.slice(0);

    var selectors = map.querySelectorAll('.map__filter');
    selectors.forEach(function (item) {
      item.addEventListener('change', function (evt) {
        var selectorValue = evt.target.value;
        if (item.id === 'housing-type') {
          commonItemsArray = commonItemsArray.filter(function (element) {
            return selectorValue === String(element.offer.type);
          });
        }
        if (item.id === 'housing-price') {
          commonItemsArray = commonItemsArray.filter(function (element) {
            var elementPrice = element.offer.price;
            if (elementPrice > 50000) {
              var elementRange = 'high';
            } else if (elementPrice < 10000) {
              elementRange = 'low';
            } else {
              elementRange = 'middle';
            }
            return selectorValue === elementRange;
          });
        }
        if (item.id === 'housing-rooms') {
          commonItemsArray = commonItemsArray.filter(function (element) {
            return selectorValue === String(element.offer.rooms);
          });
        }
        if (item.id === 'housing-guests') {
          commonItemsArray = commonItemsArray.filter(function (element) {
            return selectorValue === String(element.offer.guests);
          });
        }
        console.log('RESULT');
        console.log(commonItemsArray);
        commonItemsArray = commonItemsArray;
      });
    });
    return commonItemsArray;
  };

})();
