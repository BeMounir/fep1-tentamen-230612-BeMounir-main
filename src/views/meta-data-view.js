import nasaOpenApiService from '../services/nasa-openapi-service'
import metaDataService from '../services/meta-data-service'
import { filter } from '../filter'

// Get the parameter from the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
const photoId = parseInt(urlParams.get('photoid'))
const roverName = urlParams.get('rovername')
const solDate = urlParams.get('soldate')

// Get the photo
filter.solDate = parseInt(solDate)
filter.roverName = roverName
nasaOpenApiService.getRoverPhoto(photoId).then((photo) => {
  // Set the photo image
  document.querySelector('#meta-edit-image').src = photo.img_src
  document.querySelector('#rovername').textContent = roverName
  document.querySelector('#soldate').textContent = solDate
})

// Get the meta data
metaDataService.getMetaDataById(photoId).then(metaData => {
  // If there is meta data for this photo, show it
  if (metaData) {
    document.querySelector('#edit-title').value = metaData.title
    document.querySelector('#edit-description').textContent = metaData.description
    document.querySelector('#edit-coolness-factor').value = metaData.coolness
  }
})

// Install listeners
document.querySelector('#formSubmitButton').addEventListener('click', (inEvent) => {
  // stop default form behaviour (POST to server)
  inEvent.preventDefault();

  // Create meta data object
  const metaData = {
    id: photoId, 
    title: document.querySelector('#edit-title').value, 
    description: document.querySelector('#edit-description').textContent,
    coolness: Number(document.querySelector('#edit-coolness-factor').value)
  }

  metaDataService.updateMetaData(metaData).then(() => {
    window.location.href = `/index.html`;
  });
});
