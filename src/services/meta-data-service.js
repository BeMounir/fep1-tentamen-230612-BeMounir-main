import { findMetaDataById, findMetaDataIndexById } from '../utils/meta-data-utils';
import localStorageService from './local-storage-service'

class MetaDataService {
  #metaData = undefined;

  constructor() {
    localStorageService.readRoverMetaData().then( data => {
      if (!data) {
        this.#fillDefaultData();
      } else {
        this.#metaData = data;
      }
    })
  }

  /**
   * getMetaDataById
   * 
   * Returns a Promise for the metadata for the photo with Id photoId
   * 
   * @param {number} photoId 
   * @returns {Promise<Object | null>} Promise for The Meta data for the photoId or null
   */
  getMetaDataById(photoId) {
    return new Promise((resolve) => {
      if (!this.#metaData) {
        setTimeout(() => {
          resolve (findMetaDataById(this.#metaData, photoId))
        }, 100)
      } else {
        resolve (findMetaDataById(this.#metaData, photoId))
      }
    })
  }

  /**
   * updateMetaData
   * 
   * Updates the metadata in memory and localstorage
   * 
   * @param {Object} metaData 
   */
  updateMetaData(metaData) {
    return new Promise((resolve) => {
      // Does the metaData already exist
      const photoIndex = findMetaDataIndexById(this.#metaData, metaData.id)

      if (photoIndex === -1) {
        // Add new element
        
        this.#metaData.push(metaData);
      } else {
        // Update existing element
        this.#metaData[photoIndex].title = metaData.title
        this.#metaData[photoIndex].description = metaData.description
        this.#metaData[photoIndex].coolness = metaData.coolness
      }

      localStorageService.writeRoverMetaData(this.#metaData)
      resolve()
    })
  }

  /**
   * #fillDefaultData
   * 
   * Set some default data into the system
   */
  #fillDefaultData() {
    this.#metaData = [];
    this.#metaData.push({
      id: 102693, 
      title: 'Curiocity exploring Mars', 
      description: 'Black and white panoramic photograph made by the Front Hazard Avoidance Camera of the Mars curiocity rover. Tracks are visible in the soil.',
      coolness: 50
    })
    this.#metaData.push({
      id: 424905, 
      title: 'Curiocity exploring Mars', 
      description: 'Color photograph made by the Mast Camera of the Mars surface showing sharp rocks and small boulders.',
      coolness: 75 
    })
    
    localStorageService.writeRoverMetaData(this.#metaData)
  }
}

const metaDataService = new MetaDataService()
export default metaDataService
