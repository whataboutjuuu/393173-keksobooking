'use strict';
(function () {

  var notice = document.querySelector('.notice');
  var form = notice.querySelector('.notice__form');
  var fields = form.querySelectorAll('input[required]');
  var resetButton = form.querySelector('button[type="reset"]');
  var inputAvatar = form.querySelector('#avatar');
  var previewAvatar = form.querySelector('.notice__preview').querySelector('img');
  var inputPhoto = form.querySelector('#images');
  var previewPhoto = form.querySelector('.form__photo-container');

  // создание контейнера для фотографий
  var container = document.createElement('div');
  container.style.outline = '1px dashed #c7c7c7';
  container.style.width = '480px';
  container.style.height = '140px';
  container.style.marginTop = '20px';
  container.classList.add('drop-container');
  previewPhoto.appendChild(container);

  var showAvatar = function (result) {
    previewAvatar.src = result;
  };
  var showPhotos = function (result) {
    var adImage = document.createElement('img');
    adImage.width = 65;
    adImage.height = 65;
    adImage.style.border = '2px solid #f0f0ea';
    adImage.src = result;
    adImage.draggable = true;
    container.appendChild(adImage);
    window.sortFiles();
  };

  // реализация превью загруженной аватары
  window.file.upload(inputAvatar, showAvatar);
  // загрузка фотографий квартиры
  window.file.upload(inputPhoto, showPhotos);

  // установка неактивности страницы при нажатии на reset
  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();

    var images = previewPhoto.querySelectorAll('img');
    window.file.remove(previewAvatar);
    window.file.remove(images);
    window.pageActive = false;
    window.setPageState('disabled');
  });

  // красная рамка для невалидных полей
  fields.forEach(function (field) {
    field.addEventListener('invalid', function (evtInvalid) {
      evtInvalid.target.style.outline = '2px solid red';
    });
    field.addEventListener('change', function (evtChange) {
      evtChange.target.style.outline = '';
    });
  });

  // тип жилья
  var typeAndPriceObject = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };
  var typeInput = notice.querySelector('#type');
  var priceInput = notice.querySelector('#price');

  var setMinPrice = function () {
    var typeInputValue = typeInput.value;
    var minValue = typeAndPriceObject[typeInputValue];
    priceInput.setAttribute('min', minValue);
    priceInput.setAttribute('placeholder', minValue);
  };
  setMinPrice();
  typeInput.addEventListener('click', function () {
    setMinPrice();
  });

  // синхронизированное время заезда-выезда
  var timeInInput = notice.querySelector('#timein');
  var timeOutInput = notice.querySelector('#timeout');
  var setSameTime = function (field, copyField) {
    copyField.value = field.value;
  };

  timeInInput.addEventListener('click', function () {
    setSameTime(timeInInput, timeOutInput);
  });

  timeOutInput.addEventListener('click', function () {
    setSameTime(timeOutInput, timeInInput);
  });

  // соответствие количества гостей количеству комнат
  var roomInput = notice.querySelector('#room_number');
  var guestInput = notice.querySelector('#capacity');

  var roomsAndGuestsObject = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };
  var guestsTextObject = {
    1: 'для 1 гостя',
    2: 'для 2 гостей',
    3: 'для 3 гостей',
    0: 'не для гостей'
  };

  var setGuestOptions = function () {
    var roomInputValue = roomInput.value;
    var guestsAllowedObject = roomsAndGuestsObject[roomInputValue];

    var buildOption = function () {
      guestInput.innerHTML = '';
      for (var i = 0; i < guestsAllowedObject.length; i++) {
        var optionName = guestsTextObject[guestsAllowedObject[i]];

        guestInput.innerHTML += '<option value="' + guestsAllowedObject[i] + '">' + optionName + '</option>';
      }
    };
    buildOption();
  };
  setGuestOptions();

  roomInput.addEventListener('change', function () {
    setGuestOptions();
  });

  var onSuccess = function () {
    var images = previewPhoto.querySelectorAll('img');
    window.file.remove(previewAvatar);
    window.file.remove(images);
    window.setPageState('disabled');
    window.pageActive = false;
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), onSuccess, window.errorAlert);
    evt.preventDefault();
  });

})();
