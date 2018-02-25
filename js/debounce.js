'use strict';
(function () {

  window.debounce = function (func, interval) {
    var timeout;

    var debounced = function () {
      var later = function () {
        timeout = null;
        func();
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, interval);
    };

    return debounced();
  };

})();
