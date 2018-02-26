'use strict';
(function () {

  window.debounce = function (action, interval) {
    var timeout;

    var debounced = function () {
      var later = function () {
        timeout = null;
        action();
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, interval);
    };

    return debounced();
  };

})();
