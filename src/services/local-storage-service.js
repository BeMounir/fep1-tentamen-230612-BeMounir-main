/* eslint-disable object-shorthand */
/**
 * LocalStorageService
 *
 * Service that handles managing data storage on the LocalStorage of the browser
 */
class LocalStorageService {
  #roverDataStorageKey = 'roverdata' // The key used to store and retrieve the rover data
  #roverMetaDataStorageKey = 'rovermetadata' // The key used to store and retrieve the rover meta data
  
  /**
   * writeRoverData
   *
   * writes the roverData, along with the roverName and the solDate to the local storage.
   *
   * @param {Object} roverData      The data to write
   * @param {String} roverName      The abbreviation of the roverName
   * @param {Number} solDate        The solDate, the number of mars days since the rover landed
   * @returns                       A Promise resolving when the data is stored
   */
  writeRoverData (roverData, roverName, solDate) {
    return new Promise((resolve) => {
      // Create the storage object
      const storageData = {
        roverName: roverName,
        solDate: parseInt(solDate),
        roverData: roverData
      }

      // Store the storage object
      localStorage.setItem(this.#roverDataStorageKey, JSON.stringify(storageData))

      resolve()
    })
  }

  /**
   * readRoverData
   *
   * read the roverData from the local storage. If there is no data in the local storage
   * or the the roverName or the solDate does not match, return a null
   *
   * @param {String} roverName    The abbreviation of the roverName
   * @param {Number} solDate      The solDate, the number of mars days since the rover landed
   * @returns                     a Promise for the  stored roverData {Object} or null
   */
  readRoverData (roverName, solDate) {
    return new Promise((resolve) => {
      // Access the localStorage
      const roverData = JSON.parse(localStorage.getItem(this.#roverDataStorageKey)) || null

      // If the stored data is not in sync with the requested data, return a null, so data can be requested again
      if (!roverData || roverData.roverName !== roverName || roverData.solDate !== solDate) {
        resolve(null)
      }

      resolve(roverData.roverData)
    })
  }

  /**
   * writeRoverMetaData
   *
   * writes the roverMetaData to the local storage.
   *
   * @param {Object} roverData      The data to write
   * @returns                       A Promise resolving when the data is stored
   */
  writeRoverMetaData (roverMetaData) {
    return new Promise((resolve) => {

      // Store the storage object
      localStorage.setItem(this.#roverMetaDataStorageKey, JSON.stringify(roverMetaData))

      resolve()
    })
  }

  /**
   * readRoverMetaData
   *
   * reads the roverMetaData from the local storage. If there is no metadata in the local storage
   * return a null.
   * 
   * The meta data is stored as an Array<Object>
   * Each Object has an {number}id, {string}title, {string}description
   *
   * @returns                     a Promise for the  stored roverData {Object} or null
   */
  readRoverMetaData (roverName, solDate) {
    return new Promise((resolve) => {
      // Access the localStorage
      const roverData = JSON.parse(localStorage.getItem(this.#roverMetaDataStorageKey)) || null
  
      resolve(roverData)
    })
  }
}

const localStorageService = new LocalStorageService()
export default localStorageService
