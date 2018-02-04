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
var getSortedArray = function (array) {
  var sortedArray = array.slice();
  function sorting() {
    return Math.random() - 0.5;
  }

  return sortedArray.sort(sorting);
};

// делаем массив от 1 до AD_COUNT
var authors = [];
for (var i = 0; i < AD_COUNT; i++) {
  authors[i] = i + 1;
}

// генерация объявления
var generateAd = function () {
  var ads = [];

  var offerTitle = getSortedArray(OFFER_TITLES);
  var offerType = getSortedArray(OFFER_TYPES);
  var offerCheckin = getSortedArray(OFFER_CHECKIN);
  var offerCheckout = getSortedArray(OFFER_CHECKOUT);

  var getLocation = function (min, max) {
    var location = getRandomNumber(min, max);

    return location;
  };

  var avatarNumber = getSortedArray(authors);

  for (i = 0; i < AD_COUNT; i++) {
    // получаем случайный неповторяющийся урл
    var getAuthorAvatar = function () {
      var authorAvatar = 'img/avatars/user0' + avatarNumber[i] + '.png';
      return authorAvatar;
    };
    // Перемешиваем массив и берем произвольное число элементов
    var offerFeaturesArray = getSortedArray(OFFER_FEATURES);
    var offerFeatures = offerFeaturesArray.slice(1, getRandomNumber(1, offerFeaturesArray.length));

    var offerPrice = getRandomNumber(1000, 1000000);
    var offerRooms = getRandomNumber(1, 5);
    var offerGuests = getRandomNumber(1, MAX_GUESTS);
    var locationX = getLocation(300, 900);
    var locationY = getLocation(150, 500);
    var fullAddress = locationX + ', ' + locationY;
    var offerPhotos = getSortedArray(OFFER_PHOTOS);

    ads[i] = {author: {avatar: getAuthorAvatar()}, offer: {title: offerTitle[i], address: fullAddress, price: offerPrice, type: offerType[i], rooms: offerRooms, guests: offerGuests, checkin: offerCheckin[i], checkout: offerCheckout[i], features: offerFeatures, description: '', photos: offerPhotos}, location: {x: locationX, y: locationY}};

  }

  return ads;
};
// убираем оверлей
var map = document.querySelector('.map');
map.classList.remove('map--faded');

// создание маркеров на карте
var template = document.querySelector('template').content;
var button = template.querySelector('.map__pin');

var renderAdButton = function (ad) {
  var adButton = button.cloneNode(true);
  adButton.style.left = ad.location.x + 'px';
  adButton.style.top = ad.location.y + 'px';
  adButton.querySelector('img').src = ad.author.avatar;

  return adButton;
};

var mapPins = document.querySelector('.map__pins');
var ads = generateAd();
var fragment = document.createDocumentFragment();

var buildAdButtons = function () {
  for (i = 0; i < AD_COUNT; i++) {
    fragment.appendChild(renderAdButton(ads[i]));
  }
  mapPins.appendChild(fragment);
};
buildAdButtons();

// создание карточки объявления
var mapCard = template.querySelector('.map__card');

var renderAdCard = function (ad) {
  var adCard = mapCard.cloneNode(true);
  var offerTypeName;

  adCard.querySelector('h4 + p').classList.add('popup__rooms');
  adCard.querySelector('.popup__features + p').classList.add('popup__description');

  adCard.querySelector('h3').textContent = ad.offer.title;
  adCard.querySelector('small').textContent = ad.offer.address;
  adCard.querySelector('.popup__price').textContent = ad.offer.price + '\u20bd/ночь';

  if (ad.offer.type === 'flat') {
    offerTypeName = 'Квартира';
  } else if (ad.offer.type === 'bungalo') {
    offerTypeName = 'Бунгало';
  } else {
    offerTypeName = 'Дом';
  }
  adCard.querySelector('h4').textContent = offerTypeName;
  adCard.querySelector('h4 + p').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  adCard.querySelector('.popup__rooms + p').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  adCard.querySelector('.popup__description').textContent = ad.offer.description;

  // вывод features
  var popupFeaturesList = adCard.querySelector('.popup__features');
  var popupFeature = popupFeaturesList.querySelectorAll('li');
  var fragmentFeature = document.createDocumentFragment();

  // удаляем все существующие элементы списка
  for (var j = 0; j < popupFeature.length; j++) {
    popupFeature[j].remove();
  }

  for (i = 0; i < ad.offer.features.length; i++) {
    var createdLi = document.createElement('li');
    var generatedPopupFeature = createdLi.cloneNode(true);

    var className = 'feature--' + ad.offer.features[i];
    generatedPopupFeature.classList.add('feature');
    generatedPopupFeature.classList.add(className);

    fragmentFeature.appendChild(generatedPopupFeature);
  }
  popupFeaturesList.appendChild(fragmentFeature);

  // вывод photos

  var picturesList = adCard.querySelector('.popup__pictures');
  var fragmentPictures = document.createDocumentFragment();

  for (i = 0; i < ad.offer.photos.length; i++) {
    var pictureLi = picturesList.querySelector('li').cloneNode(true);

    pictureLi.querySelector('img').src = ad.offer.photos[i];
    pictureLi.querySelector('img').width = PHOTO_WIDTH;

    fragmentPictures.appendChild(pictureLi);
  }
  picturesList.appendChild(fragmentPictures);

  // вывод аватара автора объявления
  adCard.querySelector('.popup__avatar').src = ad.author.avatar;

  return adCard;
};

var fragmentOffer = document.createDocumentFragment();
var mapFilters = map.querySelector('.map__filters-container');
var buildAdCard = function () {
  fragmentOffer.appendChild(renderAdCard(ads[0]));
  map.insertBefore(fragmentOffer, mapFilters);
};
buildAdCard();


