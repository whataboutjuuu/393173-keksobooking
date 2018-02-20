'use strict';
(function () {
  window.errorAlert = function (errorMessage) {
    var alert = document.createElement('div');
    alert.style.background = '#f44336';
    alert.style.position = 'fixed';
    alert.style.right = '10px';
    alert.style.top = '10px';

    alert.style.borderRadius = '6px';
    alert.style.boxShadow = '6px 6px black';
    alert.style.color = 'white';
    alert.style.padding = '15px';
    alert.textContent = errorMessage;
    document.body.appendChild(alert);
  };
})();
