'use strict';
(function () {

  var notice = document.querySelector('.notice');
  var form = notice.querySelector('.notice__form');
  var inputs = notice.querySelectorAll('[required]');

  // Валидация формы создания объявления
  var validateInputs = function () {

    console.log(inputs);
    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      input.checkValidity()
      if (input.style.invalid === true) {
        console.log('TRUE');
        // outline: 2px solid #bf0000;
      }
    }
  };
  var submitButton = form.querySelector('button[type="submit"]');
  submitButton.addEventListener('click', function () {
    console.log('submit');
    validateInputs();

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

  var choosedType = function () {
    var typeInputValue = typeInput.value;
    var minValue = typeAndPriceObject[typeInputValue];
    priceInput.setAttribute('min', minValue);
    priceInput.setAttribute('placeholder', minValue);
  };
  choosedType();
  typeInput.addEventListener('click', function () {
    choosedType();
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


  var setStartInputs = function () {
    form.reset();
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), setStartInputs, window.errorAlert);
    evt.preventDefault();
  });

})();
