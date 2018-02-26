'use strict';
(function () {

  window.filteredData = function (evtFilter, loadedData) {
    var commonItemsArray = loadedData.slice(0);
    var selectorValue = evtFilter.value;

    if (evtFilter.name === 'features') {
      commonItemsArray = commonItemsArray.filter(function (element) {
        return element.offer.features.indexOf(selectorValue) !== -1;
      });
    }

    if (evtFilter.id === 'housing-type') {
      commonItemsArray = commonItemsArray.filter(function (element) {
        return selectorValue === String(element.offer.type);
      });
    }

    if (evtFilter.id === 'housing-price') {
      commonItemsArray = commonItemsArray.filter(function (element) {
        if (element.offer.price > 50000) {
          var elementRange = 'high';
        } else if (element.offer.price < 10000) {
          elementRange = 'low';
        } else {
          elementRange = 'middle';
        }
        return selectorValue === elementRange;
      });
    }

    if (evtFilter.id === 'housing-rooms') {
      commonItemsArray = commonItemsArray.filter(function (element) {
        return selectorValue === String(element.offer.rooms);
      });
    }

    if (evtFilter.id === 'housing-guests') {
      commonItemsArray = commonItemsArray.filter(function (element) {
        return selectorValue === String(element.offer.guests);
      });
    }

    return commonItemsArray;
  };

})();
