'use strict';
(function () {
  var FILE_TYPES = ['jpeg', 'jpg', 'png'];

  var createPreviewPhoto = function (src, target) {
    var adImage = document.createElement('img');
    adImage.width = 65;
    adImage.height = 65;
    adImage.style.border = '2px solid #f0f0ea';
    adImage.src = src;
    adImage.draggable = true;
    target.appendChild(adImage);
  };

  var sortable = function () {
    var dropContainer = document.querySelector('.drop-container');

    var draggedImage;

    var onDragOver = function (evt) {
      evt.preventDefault();
      evt.dataTransfer.dropEffect = 'move';

      var target = evt.target;
      if (target !== draggedImage && target !== dropContainer) {
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

  window.fileUpload = {
    single: function (input, preview) {
      input.addEventListener('change', function () {
        var file = input.files[0];
        var fileName = file.name.toLowerCase();
        var matches = FILE_TYPES.some(function (it) {
          return fileName.endsWith(it);
        });

        if (matches) {
          var reader = new FileReader();
          reader.addEventListener('load', function () {
            preview.src = reader.result;
          });
          reader.readAsDataURL(file);
        }
      });
    },
    multiple: function (input, preview) {
      var container = document.createElement('div');
      container.style.outline = '2px dashed #c7c7c7';
      container.style.width = '480px';
      container.style.height = '160px';
      container.classList.add('drop-container');
      preview.appendChild(container);

      input.addEventListener('change', function () {
        var file = input.files[0];
        var fileName = file.name.toLowerCase();
        var matches = FILE_TYPES.some(function (it) {
          return fileName.endsWith(it);
        });
        if (matches) {
          var reader = new FileReader();
          reader.addEventListener('load', function () {
            createPreviewPhoto(reader.result, container);
            sortable();
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
