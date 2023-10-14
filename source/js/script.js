const navMain = document.querySelector('.main-nav'),
  navToggler = document.querySelector('.main-nav__toggle'),
  catalogRange = document.getElementById('price-range'),
  minPriceInput = document.querySelector('.price__min-price'),
  maxPriceInput = document.querySelector('.price__max-price'),
  paginationItems = document.querySelectorAll('.pagination__list-item'),
  paginationControls = document.querySelectorAll('.pagination__control');

//Toggle Mobile Menu
navMain.classList.remove('main-nav--nojs');
navToggler.addEventListener('click', () => {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.remove('main-nav--opened');
    navMain.classList.add('main-nav--closed');
  }
});

//noUiSlider Settings
noUiSlider.create(catalogRange, {
  start: [0, 700],
  step: 1,
  connect: true,
  range: {
    'min': 0,
    'max': 1000,
  },
  format: {
    to: function (value) {
      return value.toFixed();
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});
catalogRange.noUiSlider.on('update', (values) => {
  minPriceInput.value = values[0];
  maxPriceInput.value = values[1];
});

//Pagination control opacity
if (paginationItems[1].classList.contains('pagination__list-item--active')) {
  paginationControls[0].classList.add('control-opacity');
} else if (paginationItems[paginationItems.length - 2].classList.contains('pagination__list-item--active')) {
  paginationControls[1].classList.add('control-opacity');
} else {
  paginationControls.forEach(control => {
    control.classList.remove('control-opacity');
  });
}

//Map
const L = window.L;
const map = L.map('map-canvas').setView({
  lat: 59.968516,
  lng: 30.317768
}, 17);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const pinMarker = L.icon({
  iconUrl: '../images/icons/stack.svg#map-pin',
  iconSize: [30, 32],
  iconAnchor: [15, 32],
});

const mainPinMarker = L.marker(
  {
    lat: 59.968516,
    lng: 30.317768
  },
  {
    icon: pinMarker,
  }
);
mainPinMarker.addTo(map);
