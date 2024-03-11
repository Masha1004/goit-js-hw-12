import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchImages } from './js/pixabay-api';
import { gallery, renderImages } from './js/render-functions';

const searchForm = document.querySelector('.js-form');
const searchButton = document.querySelector('button[type="submit"]');
const loadMoreButton = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

const getErrorMessage = (message, messageColor) =>
  iziToast.show({
    message,
    messageColor,
    position: 'topCenter',
  });

const setStylesLoader = display => (loader.style.display = display);

const setStylesButton = ({ elem, disabled = false, display }) => {
  elem.style.display = display;
  elem.disabled = disabled;
};

let page = 1;

const searchImages = async ({ value, page = 1 }) => {
  setStylesLoader('block');
  setStylesButton({ elem: searchButton, disabled: true });

  const result = await fetchImages({ value, page });

  setStylesButton({ elem: searchButton });
  setStylesLoader('none');

  if (result.status === 200) {
    const { data } = result;
    if (data.hits.length) {
      renderImages(data.hits);
    } else {
      getErrorMessage(
        'Sorry, there are no images matching your search query. Please try again!',
        'green'
      );
    }
  } else {
    getErrorMessage('Something went wrong. Please try again', 'red');
  }
};

searchForm.addEventListener('submit', async evt => {
  evt.preventDefault();
  const value = evt.currentTarget.elements['js-input'].value;

  if (value) {
    gallery.innerHTML = '';

    if (loadMoreButton.style.display === 'block') {
      setStylesButton({ elem: loadMoreButton, display: 'none' });
    }
    await searchImages({ value });
    setStylesButton({ elem: loadMoreButton, display: 'block' });
  }

  searchForm.reset();
});

loadMoreButton.addEventListener('click', () => {
  page++;
  searchImages({ page });
});
