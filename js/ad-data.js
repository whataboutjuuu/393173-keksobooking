'use strict';
(function () {
  window.AD_COUNT = 8;
  var MAX_GUESTS = 15;
  var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var OFFER_TYPES = ['flat', 'house', 'bungalo'];
  var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
  var OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  // генерация объявления
  var generateAd = function () {
    var ads = [];
    var offerTitle = window.utils.shuffleArray(OFFER_TITLES);
    var offerType = window.utils.shuffleArray(OFFER_TYPES);
    var offerCheckin = window.utils.shuffleArray(OFFER_CHECKIN);
    var offerCheckout = window.utils.shuffleArray(OFFER_CHECKOUT);

    var getLocation = function (min, max) {
      var location = window.utils.getRandomNumber(min, max);
      return location;
    };

    // делаем массив аватаров авторов
    var authorsAvatars = [];
    var getRandomAuthor = function () {
      for (var i = 1; i <= window.AD_COUNT; i++) {
        authorsAvatars.push('img/avatars/user0' + i + '.png');
      }
      authorsAvatars = window.utils.shuffleArray(authorsAvatars);
      return authorsAvatars;
    };
    getRandomAuthor();

    for (var i = 0; i < window.AD_COUNT; i++) {
      var getFeaturesArray = function (array) {
        var offerFeaturesArray = window.utils.shuffleArray(array);
        var offerFeatures = offerFeaturesArray.slice(1, window.utils.getRandomNumber(1, offerFeaturesArray.length));

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
          price: window.utils.getRandomNumber(1000, 1000000),
          type: offerType[i],
          rooms: window.utils.getRandomNumber(1, 5),
          guests: window.utils.getRandomNumber(1, MAX_GUESTS),
          checkin: offerCheckin[i],
          checkout: offerCheckout[i],
          features: getFeaturesArray(OFFER_FEATURES),
          description: '',
          photos: window.utils.shuffleArray(OFFER_PHOTOS)
        },
        location: {
          x: locationX,
          y: locationY
        }
      };
    }
    return ads;
  };

  window.adData = generateAd();

})();
