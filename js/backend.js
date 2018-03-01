'use strict';
(function () {

  var TIMEOUT = 10000;

  var Code = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };
  var Path = {
    form: 'https://js.dump.academy/keksobooking',
    data: 'https://js.dump.academy/keksobooking/data'
  };

  var configurateBackend = function (url, method, data, onLoad, onError) {
    var URL = url;
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case Code.SUCCESS:
          onLoad(xhr.response);
          break;

        case Code.BAD_REQUEST:
          onError('Неверный запрос');
          break;

        case Code.NOT_FOUND:
          onError('Ничего не найдено');
          break;

        case Code.SERVER_ERROR:
          onError('Ошибка сервера');
          break;

        default:
          onError('status: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT;

    xhr.open(method, URL);
    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }

  };

  window.backend = {
    load: function (onLoad, onError) {
      configurateBackend(Path.data, 'GET', false, onLoad, onError);
    },
    save: function (data, onLoad, onError) {
      configurateBackend(Path.form, 'POST', data, onLoad, onError);
    }
  };

})();
