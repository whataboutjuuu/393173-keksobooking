'use strict';
(function () {

  window.utils = {
    // перемешать элементы массива
    shuffleArray: function (array) {
      var sortedArray = array.slice();
      function sorting() {
        return Math.random() - 0.5;
      }

      return sortedArray.sort(sorting);
    },
    // выбрать случайное число в диапазоне
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };

})();
