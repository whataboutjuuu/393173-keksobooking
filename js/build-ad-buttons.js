// 'use strict';
// (function () {

//   // получаем содержимое шаблона
//   var template = document.querySelector('template').content;
//   var button = template.querySelector('.map__pin');
//   var mapPins = document.querySelector('.map__pins');
//   var BUTTON_HEIGHT_CORRECTION = -35;

//   // создание маркеров на карте
//   var renderAdButton = function (ad) {
//     var adButton = button.cloneNode(true);
//     adButton.style.left = ad.location.x + 'px';
//     adButton.style.top = ad.location.y + BUTTON_HEIGHT_CORRECTION + 'px';
//     adButton.querySelector('img').src = ad.author.avatar;

//     return adButton;
//   };

//   window.buildAdButtons = function () {
//     var fragment = document.createDocumentFragment();
//     for (var i = 0; i < window.AD_COUNT; i++) {
//       fragment.appendChild(renderAdButton(window.adData[i]));
//     }
//     mapPins.appendChild(fragment);
//   };

// })();
