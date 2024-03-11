import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const gallery = document.querySelector('.gallery');

const getImgList = images => {
  return images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        <li class="gallery__item">
            <a href="${largeImageURL}" class="gallery__link"
                ><img src="${webformatURL}" alt="${tags}" class="gallery__image"
            /></a>
            <div class="gallery__description">
                <p class="gallery__text"><strong>Likes</strong> <span>${likes}</span></p>
                <p class="gallery__text"><strong>Views</strong> <span>${views}</span></p>
                <p class="gallery__text"><strong>Comments</strong> <span>${comments}</span></p>
                <p class="gallery__text"><strong>Downloads</strong> <span>${downloads}</span></p>
            </div>
        </li>
      `;
      }
    )
    .join('');
};

export const renderImages = imgList => {
  gallery.insertAdjacentHTML('beforeend', getImgList(imgList));
};

gallery.addEventListener('click', e => {
  e.preventDefault();
  const gallerySimple = new SimpleLightbox('a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  gallerySimple.open();
});
