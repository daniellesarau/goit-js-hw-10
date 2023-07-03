import axios from 'axios';

const API_KEY =
  'live_AFCJYjkSjTdmvTMRaVvufaeMrhWCGxsSYk8sGKzGaMmB9IgEzr5xlQdfYGpNtarp';
axios.defaults.headers.common['x-api-key'] = API_KEY;
const urlBreeds = 'https://api.thecatapi.com/v1/breeds';
const urlSearch = 'https://api.thecatapi.com/v1/images/search';
export function fetchBreeds() {
  return fetch(`${urlBreeds}?${API_KEY}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      console.error(error);
      document.querySelector('.error').removeAttribute('hidden');
    });
}

export function fetchCatByBreed(breedId) {
  return fetch(`${urlSearch}?breed_ids=${breedId}&api_key=${API_KEY}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.length === 0) {
        throw new Error('No cat found for the given breed ID');
      }
      return data[0];
    })
    .catch(error => {
      console.error(error);
      document.querySelector('.error').removeAttribute('hidden');
    });
}
