'use strict';

var AD_COUNT = 8;
var MAX_GUESTS = 15;
var PHOTO_WIDTH = 65;

var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPES = ['flat', 'house', 'bungalo'];
var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// функция выбирает случайное число в диапазоне
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
// функция перемешивает массив
var shuffleArray = function (array) {
  var sortedArray = array.slice();
  function sorting() {
    return Math.random() - 0.5;
  }

  return sortedArray.sort(sorting);
};

// генерация объявления
var generateAd = function () {
  var ads = [];
  var offerTitle = shuffleArray(OFFER_TITLES);
  var offerType = shuffleArray(OFFER_TYPES);
  var offerCheckin = shuffleArray(OFFER_CHECKIN);
  var offerCheckout = shuffleArray(OFFER_CHECKOUT);

  var getLocation = function (min, max) {
    var location = getRandomNumber(min, max);
    return location;
  };

  // делаем массив аватаров авторов
  var authorsAvatars = [];
  var getRandomAuthor = function () {
    for (var i = 1; i <= AD_COUNT; i++) {
      authorsAvatars.push('img/avatars/user0' + i + '.png');
    }
    authorsAvatars = shuffleArray(authorsAvatars);
    return authorsAvatars;
  };
  getRandomAuthor();

  for (var i = 0; i < AD_COUNT; i++) {
    var getFeaturesArray = function (array) {
      var offerFeaturesArray = shuffleArray(array);
      var offerFeatures = offerFeaturesArray.slice(1, getRandomNumber(1, offerFeaturesArray.length));

      return offerFeatures;
    };

    var locationX = getLocation(300, 900);
    var locationY = getLocation(150, 500);

    ads[i] = {
      author: {
        avatar: authorsAvatars[i]
      },
      offer: {
        title: offerTitle[i],
        address: locationX + ', ' + locationY,
        price: getRandomNumber(1000, 1000000),
        type: offerType[i],
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1, MAX_GUESTS),
        checkin: offerCheckin[i],
        checkout: offerCheckout[i],
        features: getFeaturesArray(OFFER_FEATURES),
        description: '',
        photos: shuffleArray(OFFER_PHOTOS)
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
  }
  return ads;
};

var ads = generateAd();
var map = document.querySelector('.map');

// получаем содержимое шаблона
var template = document.querySelector('template').content;
var button = template.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var mapCard = template.querySelector('.map__card');
var BUTTON_HEIGHT_CORRECTION = -35;

// создание маркеров на карте
var renderAdButton = function (ad) {
  var adButton = button.cloneNode(true);
  adButton.style.left = ad.location.x + 'px';
  adButton.style.top = ad.location.y + BUTTON_HEIGHT_CORRECTION + 'px';
  adButton.querySelector('img').src = ad.author.avatar;

  return adButton;
};

var buildAdButtons = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < AD_COUNT; i++) {
    fragment.appendChild(renderAdButton(ads[i]));
  }
  mapPins.appendChild(fragment);
};

// создание карточки объявления
var renderAdCard = function (ad) {
  var adCard = mapCard.cloneNode(true);

  // функция для вывода текста в карточку объявления
  var setTextContent = function (selector, textContent) {
    adCard.querySelector(selector).textContent = textContent;
  };
  // вспомогательные классы
  adCard.querySelector('h4 + p').classList.add('popup__rooms');
  adCard.querySelector('.popup__features + p').classList.add('popup__description');

  var typeObject = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };
  setTextContent('h3', ad.offer.title);
  setTextContent('small', ad.offer.address);
  setTextContent('.popup__price', ad.offer.price + '\u20bd/ночь');
  setTextContent('h4', typeObject[ad.offer.type]);
  setTextContent('h4 + p', ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей');
  setTextContent('.popup__rooms + p', 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout);
  setTextContent('.popup__description', ad.offer.description);

  // вывод features
  var popupFeaturesList = adCard.querySelector('.popup__features');
  var checkFeatures = function () {
    popupFeaturesList.innerHTML = '';
    for (var i = 0; i < ad.offer.features.length; i++) {
      popupFeaturesList.innerHTML += '<li class="feature feature--' + ad.offer.features[i] + '"></li>';
    }
  };
  checkFeatures();

  // вывод photos
  var picturesList = adCard.querySelector('.popup__pictures');
  var pictureItemTemplate = picturesList.querySelector('li');
  var fragmentPictures = document.createDocumentFragment();
  var picturesRender = function () {
    for (var i = 0; i < ad.offer.photos.length; i++) {
      var pictureLi = pictureItemTemplate.cloneNode(true);

      pictureLi.querySelector('img').src = ad.offer.photos[i];
      pictureLi.querySelector('img').width = PHOTO_WIDTH;
      pictureLi.querySelector('img').height = PHOTO_WIDTH;

      fragmentPictures.appendChild(pictureLi);
    }
    picturesList.replaceChild(fragmentPictures, pictureItemTemplate);
  };
  picturesRender();
  // вывод аватара автора объявления
  adCard.querySelector('.popup__avatar').src = ad.author.avatar;

  return adCard;
};

// функция для отображения выбраной карточки
var buildAdCard = function (i) {
  var fragmentOffer = document.createDocumentFragment();
  var mapFilters = map.querySelector('.map__filters-container');

  fragmentOffer.appendChild(renderAdCard(ads[i]));
  map.insertBefore(fragmentOffer, mapFilters);
};

// функция для удаления из дерева выбранных ранее карточек
var destroyAdCard = function () {
  var oldCards = map.querySelectorAll('.popup');
  for (var i = 0; i < oldCards.length; i++) {
    map.removeChild(oldCards[i]);
  }
};

// блокировка\разблокировка полей формы
var notice = document.querySelector('.notice');
var fieldsets = notice.querySelectorAll('fieldset');
var disableFildset = function (boolean) {
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = boolean;
  }
};

// функция для получения начальных координат метки и установки их в поле Адрес
var mainPin = map.querySelector('.map__pin--main');
var getInitialMainCoordinates = function () {
  var initialX = map.offsetWidth / 2;
  var initialY = mainPin.offsetTop + mainPin.offsetHeight / 2;
  var addressInput = notice.querySelector('#address');
  addressInput.value = initialX + ', ' + initialY;
};

// функция для получения новых координат, на которые указывает конец метки и установки их в поле Адрес
var setMainCoordinates = function () {
  var addressInput = notice.querySelector('#address');
  addressInput.value = mainPin.offsetLeft + ', ' + (mainPin.offsetTop + mainPin.offsetHeight);
};

// "перетаскивание" метки, активация страницы
var setActiveState = function () {
  map.classList.remove('map--faded');
  notice.querySelector('.notice__form').classList.remove('notice__form--disabled');
  buildAdButtons();
  // открывать нужный попап в зависимости от кликнутого маркера
  var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var i = 0; i < pins.length; i++) {
    pins[i].number = i;
    pins[i].addEventListener('click', function (evt) {
      destroyAdCard();
      var index = evt.currentTarget.number;
      buildAdCard(index);
    });
  }
};

disableFildset(true);
getInitialMainCoordinates();
// по событию mouseup задаем активный статус страницы и новые координаты в поле Адрес
mainPin.addEventListener('mouseup', function () {
  setActiveState();
  disableFildset(false);
  setMainCoordinates();
});
