'use strict';
(function () {
  var someFunction = function () {

  };

  window.filteredData = function (evtFilter, loadedData) {
    var commonItemsArray = loadedData.slice(0);
    console.log('commonItemsArray START');
    console.log(commonItemsArray);
    var selectorValue = evtFilter.value;
    if (evtFilter.id === 'housing-type') {
      commonItemsArray = commonItemsArray.filter(function (element) {
        return selectorValue === String(element.offer.type);
      });

      console.log('commonItemsArray if Type');
      console.log(commonItemsArray);
    }
    if (evtFilter.id === 'housing-price') {
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
      console.log('commonItemsArray if Price');
      console.log(commonItemsArray);
    }
    if (evtFilter.id === 'housing-rooms') {
      commonItemsArray = commonItemsArray.filter(function (element) {
        return selectorValue === String(element.offer.rooms);
      });
      console.log('commonItemsArray if Rooms');
      console.log(commonItemsArray);
    }
    if (evtFilter.id === 'housing-guests') {
      commonItemsArray = commonItemsArray.filter(function (element) {
        return selectorValue === String(element.offer.guests);
      });
      console.log('commonItemsArray if Guests');
      console.log(commonItemsArray);
    }
    // console.log('RESULT');

    commonItemsArray = commonItemsArray;

    return commonItemsArray;
  };

})();
