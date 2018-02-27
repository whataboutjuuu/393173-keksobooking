'use strict';
(function () {

  window.sortFiles = function () {
    var dropContainer = document.querySelector('.drop-container');
    var draggedImage;

    var onDragOver = function (evt) {
      evt.preventDefault();
      evt.dataTransfer.dropEffect = 'move';
      var target = evt.target;
      if (target !== dropContainer) {
        dropContainer.insertBefore(draggedImage, dropContainer.children[0] !== target && target.nextSibling || target);
      }
    };

    var onDragEnd = function (evt) {
      evt.preventDefault();
      dropContainer.removeEventListener('dragover', onDragOver, false);
      dropContainer.removeEventListener('dragend', onDragEnd, false);
    };

    dropContainer.addEventListener('dragstart', function (evt) {
      draggedImage = evt.target;
      evt.dataTransfer.effectAllowed = 'move';
      evt.dataTransfer.setData('text/plain', evt.target.alt);

      dropContainer.addEventListener('dragover', onDragOver, false);
      dropContainer.addEventListener('dragend', onDragEnd, false);
    });
  };

})();
