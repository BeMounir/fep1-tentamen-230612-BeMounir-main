import { filter } from '../filter';
import { filterByCamera, findByPhotoId } from '../utils/nasa-openapi-utils';
import localStorageService from './local-storage-service';
import { nasaApiSettings } from '../data/nasa-api-settings';

/* 
  Naam:   
  Studentennummer:
 */
 

class NasaOpenApiService {
  // Private fields
  #apiKey = `api_key=${nasaApiSettings['api-key']}`;
  #baseUrl = 'https://api.nasa.gov/mars-photos/api/v1/';

  // When true a valid API key is needed and the rover data will be retrieved from the API
  // When false the rover data will be fetched from a local file
  #fetchFromApi = false;

  /**
   * fetchRoverPhotosFromApi
   *
   * Fetches the photo data from the currently selected Mars rover for the currently selected sol date,
   * decodes the recieved json data and returns it as a Promise.
   *
   * NOTE: Possible student assignment
   *
   * @returns the decoded json data from the Nasa API
   */
  fetchRoverPhotosFromApi() {
    // Full Url to the Nasa Api which includes parameters for the roverName and the solDate
    const fullUrl = `${this.#baseUrl}rovers/${filter.roverName}/photos?sol=${
      filter.solDate
    }&${this.#apiKey}`;

    return fetch(fullUrl).then((fetchResult) => {
      if (!fetchResult.ok) {
        // fetch went wrong
        throw new Error(fetchResult.status);
      }
      return fetchResult.json();
    });
  }

  /**
   * fetchRoverPhotosFromFile
   *
   * Fetches the photo data from a local file. This is a fail safe in case the NASA API is not working.
   *
   * Replace the function call fetchRoverPhotos() in retrieveRoverPhotos()
   * with this to enabled this functionality
   *
   * @see retrieveRoverPhotos
   * @returns
   */
  fetchRoverPhotosFromFile() {
    return new Promise((resolve, reject) => {
      const filePath = `./src/data/nasa-api-cache-${filter.roverName}-${filter.solDate}.json`
      fetch(filePath).then((fetchResult) => {
        if (!fetchResult.ok) {
          // fetch went wrong
          throw new Error(fetchResult.status);
        }
        fetchResult.text().then((text) => {
          const data = {
            photos: JSON.parse(text).roverData,
          };
          resolve(data);
        });
      });
    });
  }

  /**
   * fetchRoverPhoto
   * 
   * Depending on #fetchFromApi either call fetchRoverPhotosFromApi() or fetchRoverPhotosFromFile()
   * 
   * @returns Promise of rover data
   */
  fetchRoverPhotos() {
    return this.#fetchFromApi 
      ? this.fetchRoverPhotosFromApi()
      : this.fetchRoverPhotosFromFile()
  }

  /**
   * retrieveRoverPhotos
   *
   * Attempts to load the photo data for the currently selected Mars rover for the currently selected sol date
   * from the local storage. If not available then calls fetchRoverPhotos() to retrieve this data and stores
   * it into the local database.
   *
   * @returns the photo data for the selected Mars rover and the selected Sol date
   */
  retrieveRoverPhotos() {
    return new Promise((resolve) => {
      // Attempt to retrieve the data from the local storage
      localStorageService
        .readRoverData(filter.roverName, filter.solDate)
        .then((roverDataFromLocalStorage) => {
          if (roverDataFromLocalStorage) {
            // Data was available from the local storage
            filter.roverData = roverDataFromLocalStorage;
            resolve(filter.roverData);
          } else {
            // Data was not available from the local storage, fetch it
            this.fetchRoverPhotos().then((result) => {
              filter.roverData = result.photos;
              localStorageService
                .writeRoverData(
                  filter.roverData,
                  filter.roverName,
                  filter.solDate
                )
                .then(() => {
                  resolve(filter.roverData);
                });
            });
          }
        });
    });
  }

  /**
   * Returns the photo data either from the internal memory (filter), or calls retrieveRoverPhotos()
   * to retrieve this data from an external source.
   *
   * Filtered parameter is used to display either only those photo's that adhere to the current filter settings
   * (the list of photo's for example), or the complete list (used to display the number of photos per camera)
   *
   * @param {boolean} filtered if true returns the filtered data set otherise the complete data set
   * @returns the (possibly filtered) photo data for the selected Mars rover and the selected Sol date
   */
  getRoverPhotos(filtered) {
    return new Promise((resolve) => {
      if (!filter.hasRoverData()) {
        // No rover data available, fetch it
        this.retrieveRoverPhotos().then((data) => {
          resolve(
            filtered
              ? filterByCamera(filter.roverData, filter.selectedCameras)
              : filter.roverData
          );
        });
      } else {
        // Rover data available, just return
        resolve(
          filtered
            ? filterByCamera(filter.roverData, filter.selectedCameras)
            : filter.roverData
        );
      }
    });
  }

  /**
   * Returns a promise that holds a JSON array when fullfilled. The JSON array will hold one dataset
   * about the astronomy picture of the day (APOD) from the NASA API.
   * NASA might return with a 429 status code if the API is used too often, in that case the 
   * apodBackupUrl should be fetched and returned.
   * 
   * @returns a promise that when fullfilled will give a JSON array with one dataset about the APOD
   */
  getAPOD() {
    const apodUrl = `https://api.nasa.gov/planetary/apod?3IHqtrZcPdIFlkYmn5VHmUumHCPqzhmRfhEqWoW6&count=1`;
    const apodBackuplLocation = `../src/data/nasa-api-apod-cache.json`;

    return new Promise((resolve, reject) => {
      fetch(apodUrl)
        .then(res =>{
          if (res.ok) {
            return res.json();
          }
          if (response.status ===429) {
            return fetch(apodBackuplLocation.then(
              res => res.json()
            ))
          }
        })
        .then(data => resolve(data))
        .catch(error => reject(error))
    }
    // TODO: See Assignment JS Fetch/Promise Opdracht A (Producer)
  )}


  /**
   * getRoverPhoto
   * 
   * Returns a Promise for the data for the rover photo with id photoId
   * 
   * @param {number} photoId 
   * @returns 
   */
  getRoverPhoto(photoId) {
    return this.getRoverPhotos(false).then((photos) => {
      return findByPhotoId(photos, photoId)
    })
  }
}

// Instantiate the service and expose the object
const nasaOpenApiService = new NasaOpenApiService();
export default nasaOpenApiService;
