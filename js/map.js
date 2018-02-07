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
// убираем оверлей
var map = document.querySelector('.map');
map.classList.remove('map--faded');

// получаем содержимое шаблона
var template = document.querySelector('template').content;

// создание маркеров на карте
var createButton = function () {
  var button = template.querySelector('.map__pin');
  var BUTTON_HEIGHT_CORRECTION = -35;

  var renderAdButton = function (ad) {
    var adButton = button.cloneNode(true);
    adButton.style.left = ad.location.x + 'px';
    adButton.style.top = ad.location.y + BUTTON_HEIGHT_CORRECTION + 'px';
    adButton.querySelector('img').src = ad.author.avatar;

    return adButton;
  };

  var mapPins = document.querySelector('.map__pins');
  var buildAdButtons = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < AD_COUNT; i++) {
      fragment.appendChild(renderAdButton(ads[i]));
    }
    mapPins.appendChild(fragment);
  };
  buildAdButtons();
};
createButton();

// создание карточки объявления
var mapCard = template.querySelector('.map__card');

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

var buildAdCard = function () {
  var fragmentOffer = document.createDocumentFragment();
  var mapFilters = map.querySelector('.map__filters-container');

  fragmentOffer.appendChild(renderAdCard(ads[0]));
  map.insertBefore(fragmentOffer, mapFilters);
};
buildAdCard();
