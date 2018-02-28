'use strict';
(function () {






  // window.getFilteredData = function (evtFilter, filtersList) {

  // };


  // window.getFilteredData = function (evtFilter, resultArray, loadedData) {
  //   var commonItems = resultArray.slice(0);
  //   var selectorValue = evtFilter.value;

  //   if (evtFilter.name === 'features') {
  //     commonItems = commonItems.filter(function (element) {
  //       return element.offer.features.indexOf(selectorValue) !== -1;
  //     });
  //   }

  //   if (evtFilter.id === 'housing-type') {
  //     if (evtFilter.classList.contains('checked')) {
  //       console.log('checked');
  //       commonItems = loadedData.filter(function (element) {
  //         return selectorValue === String(element.offer.type);
  //       });
  //     } else {
  //       console.log('no checked');
  //       commonItems = commonItems.filter(function (element) {
  //         return selectorValue === String(element.offer.type);
  //       });
  //     }
  //     console.log('==============');
  //     console.log(commonItems);
  //   }

  //   if (evtFilter.id === 'housing-price') {
  //     commonItems = commonItems.filter(function (element) {
  //       if (element.offer.price > 50000) {
  //         var elementRange = 'high';
  //       } else if (element.offer.price < 10000) {
  //         elementRange = 'low';
  //       } else {
  //         elementRange = 'middle';
  //       }
  //       return selectorValue === elementRange;
  //     });
  //   }

  //   if (evtFilter.id === 'housing-rooms') {
  //     if (evtFilter.classList.contains('checked')) {
  //       commonItems = loadedData.filter(function (element) {
  //         return selectorValue === String(element.offer.rooms);
  //       });
  //     } else {
  //       commonItems = commonItems.filter(function (element) {
  //         return selectorValue === String(element.offer.rooms);
  //       });
  //     }
  //   }

  //   if (evtFilter.id === 'housing-guests') {
  //     if (evtFilter.classList.contains('checked')) {
  //       commonItems = loadedData.filter(function (element) {
  //         return selectorValue === String(element.offer.guests);
  //       });
  //     } else {
  //       commonItems = commonItems.filter(function (element) {
  //         return selectorValue === String(element.offer.guests);
  //       });
  //     }
  //   }
  //   console.log(commonItems);
  //   return commonItems;
  // };

})();
