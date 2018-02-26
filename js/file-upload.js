'use strict';
(function () {

  var FILE_TYPES = ['jpeg', 'jpg', 'png'];

  // window.createPreviewPhoto = function (src, target) {

  // };

  var sortable = function () {
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

  // window.showAvatar = function (container) {
  //   var reader = new FileReader();
  //   container.src = reader.result;
  // };
  // window.showPhotos = function (container) {
  //   var reader = new FileReader();
  //   var adImage = document.createElement('img');
  //   adImage.width = 65;
  //   adImage.height = 65;
  //   adImage.style.border = '2px solid #f0f0ea';
  //   adImage.src = reader.result;
  //   adImage.draggable = true;
  //   container.appendChild(adImage);
  //   sortable();
  // };
  window.showAvatar = function (container, reader) {
    container.src = reader.result;
  };
  window.showPhotos = function (container, reader) {
    var adImage = document.createElement('img');
    adImage.width = 65;
    adImage.height = 65;
    adImage.style.border = '2px solid #f0f0ea';
    adImage.src = reader.result;
    adImage.draggable = true;
    container.appendChild(adImage);
    sortable();
  };

  window.file = {
    upload: function (input, preview, cb) {
      input.addEventListener('change', function () {
        var file = input.files[0];
        var fileName = file.name.toLowerCase();
        var matches = FILE_TYPES.some(function (it) {
          return fileName.endsWith(it);
        });

        if (matches) {
          var reader = new FileReader();
          reader.addEventListener('load', cb);
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

  //window.fileUpload = {
    // single: function (input, preview) {
    //   input.addEventListener('change', function () {
    //     var file = input.files[0];
    //     var fileName = file.name.toLowerCase();
    //     var matches = FILE_TYPES.some(function (it) {
    //       return fileName.endsWith(it);
    //     });

    //     if (matches) {
    //       var reader = new FileReader();
    //       reader.addEventListener('load', function () {
    //         preview.src = reader.result;
    //       });
    //       reader.readAsDataURL(file);
    //     }
    //   });
    // },
    // multiple: function (input, preview) {
    //   var container = document.createElement('div');
    //   container.style.outline = '1px dashed #c7c7c7';
    //   container.style.width = '480px';
    //   container.style.height = '140px';
    //   container.style.marginTop = '20px';
    //   container.classList.add('drop-container');
    //   preview.appendChild(container);

    //   input.addEventListener('change', function () {
    //     var file = input.files[0];
    //     var fileName = file.name.toLowerCase();
    //     var matches = FILE_TYPES.some(function (it) {
    //       return fileName.endsWith(it);
    //     });
    //     if (matches) {
    //       var reader = new FileReader();
    //       reader.addEventListener('load', function () {
    //         createPreviewPhoto(reader.result, container);
    //         sortable();
    //       });
    //       reader.readAsDataURL(file);
    //     }
    //   });
    // },
    // remove: function (images) {
    //   if (images.length > 1) {
    //     for (var i = 0; i < images.length; i++) {
    //       if (images[i].tagName.toLowerCase() === 'img') {
    //         images[i].remove();
    //       }
    //     }
    //   } else {
    //     images.src = 'img/muffin.png';
    //   }
    // }
  //};

})();
