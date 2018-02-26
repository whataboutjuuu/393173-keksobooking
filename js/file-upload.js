'use strict';
(function () {

  var FILE_TYPES = ['jpeg', 'jpg', 'png'];

  window.sortable = function () {
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

  window.file = {
    upload: function (input, callback) {
      input.addEventListener('change', function () {
        var file = input.files[0];
        var fileName = file.name.toLowerCase();
        var matches = FILE_TYPES.some(function (it) {
          return fileName.endsWith(it);
        });

        if (matches) {
          var reader = new FileReader();
          reader.addEventListener('load', function () {
            callback(reader.result);
          });
          reader.readAsDataURL(file);
        }
      });
    },
    remove: function (images) {
      if (images.length > 1) {
        for (var i = 0; i < images.length; i++) {
          if (images[i].tagName.toLowerCase() === 'img') {
            images[i].remove();
          }
        }
      } else {
        images.src = 'img/muffin.png';
      }
    }
  };

})();
