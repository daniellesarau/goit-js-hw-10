import Notiflix from 'notiflix';
import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const loaderSel = document.querySelector('.loader');
const errorSel = document.querySelector('.error');
const selectElement = document.querySelector('.breed-select');
const catInfoContainer = document.querySelector('.cat-info');
const breedOptions = [];

function renderBreedOptions(breeds) {
  breedOptions.push(
    ...breeds.map(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      return option;
    })
  );
  selectElement.append(...breedOptions);
}

function displayCatInfo(cat) {
  catInfoContainer.innerHTML = createMarkup(cat);
}

function createMarkup(cat) {
  return `
    <img src="${cat.url}" alt="Cat Image" class="cat_image">
  <h2 class="cat_name">${cat.breeds[0].name}</h2>
    <p class="cat_description"><p class= "descrption_text">Description:</p> ${cat.breeds[0].description}.</p>
    <p class="cat_temperament"><p class= "descrption_text">Temperament:</p> ${cat.breeds[0].temperament}.</p>
  `;
}

selectElement.addEventListener('change', () => {
  const selectedBreedId = selectElement.value;
  fetchCatByBreed(selectedBreedId)
    .then(cat => {
      displayCatInfo(cat);
      errorSel.setAttribute('hidden', true);
      loaderSel.setAttribute('hidden', true);
    })
    .catch(error => {
      console.error('Failed to fetch cat:', error);
      Notiflix.Notify.failure('Failed to fetch cat. Please try again.');
      errorSel.removeAttribute('hidden');
    });
});

fetchBreeds()
  .then(breeds => {
    renderBreedOptions(breeds);
  })
  .catch(error => {
    console.error('Failed to fetch breeds:', error);
    Notiflix.Notify.failure('Failed to fetch breeds. Please try again.');
    errorSel.removeAttribute('hidden');
  });
