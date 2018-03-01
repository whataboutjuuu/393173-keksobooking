'use strict';
(function () {

  var form = document.querySelector('.map__filters');
  var filterType = form.querySelector('#housing-type');
  var filterPrice = form.querySelector('#housing-price');
  var filterRooms = form.querySelector('#housing-rooms');
  var filterGuests = form.querySelector('#housing-guests');
  var filterFeatures = form.querySelectorAll('input[type="checkbox"]');

  var filterTypeFunction = function (element) {
    return filterType.options[filterType.selectedIndex].value === 'any' || filterType.options[filterType.selectedIndex].value === String(element.offer.type);
  };
  var filterPriceFunction = function (element) {
    if (element.offer.price > 50000) {
      var elementRange = 'high';
    } else if (element.offer.price < 10000) {
      elementRange = 'low';
    } else {
      elementRange = 'middle';
    }
    return filterPrice.options[filterPrice.selectedIndex].value === 'any' || filterPrice.options[filterPrice.selectedIndex].value === elementRange;
  };
  var filterRoomsFunction = function (element) {
    return filterRooms.options[filterRooms.selectedIndex].value === 'any' || filterRooms.options[filterRooms.selectedIndex].value === String(element.offer.rooms);
  };
  var filterGuestsFunction = function (element) {
    return filterGuests.options[filterGuests.selectedIndex].value === 'any' || filterGuests.options[filterGuests.selectedIndex].value === String(element.offer.guests);
  };
  var filterFeaturesFunction = function (element) {
    var checkedFeatures = Array.prototype.slice.call(filterFeatures);
    for (var i = 0; i < checkedFeatures.length; i++) {
      if (checkedFeatures[i].checked) {
        var checkedFeatureValue = checkedFeatures[i].value;
        return element.offer.features.indexOf(checkedFeatureValue) !== -1;
      }
    }

    return checkedFeatures;
  };

  window.getfilterList = function (element) {
    var list = filterTypeFunction(element) && filterPriceFunction(element) && filterRoomsFunction(element) && filterGuestsFunction(element) && filterFeaturesFunction(element);

    return list;
  };

})();
