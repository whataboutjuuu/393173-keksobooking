'use strict';
(function () {

  window.getFilteredData = function (evtFilter, loadedData) {
    var commonItems = loadedData.slice(0);
    var selectorValue = evtFilter.value;

    if (evtFilter.name === 'features') {
      commonItems = commonItems.filter(function (element) {
        return element.offer.features.indexOf(selectorValue) !== -1;
      });
    }

    if (evtFilter.id === 'housing-type') {
      commonItems = commonItems.filter(function (element) {
        return selectorValue === String(element.offer.type);
      });
    }

    if (evtFilter.id === 'housing-price') {
      commonItems = commonItems.filter(function (element) {
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
      commonItems = commonItems.filter(function (element) {
        return selectorValue === String(element.offer.rooms);
      });
    }

    if (evtFilter.id === 'housing-guests') {
      commonItems = commonItems.filter(function (element) {
        return selectorValue === String(element.offer.guests);
      });
    }

    return commonItems;
  };

})();
