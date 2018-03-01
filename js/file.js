'use strict';
(function () {

  var FILE_TYPES = ['jpeg', 'jpg', 'png'];

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
