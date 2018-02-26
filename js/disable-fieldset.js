'use strict';
(function () {

  // блокировка\разблокировка полей формы
  var notice = document.querySelector('.notice');
  var fieldsets = notice.querySelectorAll('fieldset');
  window.disableFildset = function (boolean) {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = boolean;
    }
  };

})();
