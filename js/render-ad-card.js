'use strict';
(function () {

  var PHOTO_WIDTH = 65;

  var template = document.querySelector('template').content;
  var mapCard = template.querySelector('.map__card');

  // создание карточки объявления
  window.renderAdCard = function (ad) {
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
      if (ad.offer.features.length > 0) {
        for (var i = 0; i < ad.offer.features.length; i++) {
          popupFeaturesList.innerHTML += '<li class="feature feature--' + ad.offer.features[i] + '"></li>';
        }
      } else {
        popupFeaturesList.remove();
      }
    };
    checkFeatures();

    // вывод photos
    var picturesList = adCard.querySelector('.popup__pictures');
    picturesList.style.maxHeight = '100px';
    picturesList.style.overflow = 'auto';
    var pictureItemTemplate = picturesList.querySelector('li');
    var fragmentPictures = document.createDocumentFragment();
    var renderPictures = function () {
      for (var i = 0; i < ad.offer.photos.length; i++) {
        var pictureLi = pictureItemTemplate.cloneNode(true);

        pictureLi.querySelector('img').src = ad.offer.photos[i];
        pictureLi.querySelector('img').width = PHOTO_WIDTH;
        pictureLi.querySelector('img').height = PHOTO_WIDTH;

        fragmentPictures.appendChild(pictureLi);
      }
      picturesList.replaceChild(fragmentPictures, pictureItemTemplate);
    };
    if (ad.offer.photos.length > 0) {
      renderPictures();
    } else {
      picturesList.remove();
    }

    // вывод аватара автора объявления
    adCard.querySelector('.popup__avatar').src = ad.author.avatar;

    return adCard;
  };

})();
