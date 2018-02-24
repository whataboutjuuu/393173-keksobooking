'use strict';
(function () {
  var FILE_TYPES = ['jpeg', 'jpg', 'png'];

  var createPreviewPhoto = function (src, target) {
    var adImage = document.createElement('img');
    adImage.width = 65;
    adImage.height = 65;
    adImage.src = src;
    target.appendChild(adImage);
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
      input.addEventListener('change', function () {
        var file = input.files[0];
        var fileName = file.name.toLowerCase();
        var matches = FILE_TYPES.some(function (it) {
          return fileName.endsWith(it);
        });
        if (matches) {
          var reader = new FileReader();
          reader.addEventListener('load', function () {
            createPreviewPhoto(reader.result, preview);
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
