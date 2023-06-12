/* 
  Naam: Mounir Bekkaoui  
  Studentennummer: 1835544
 */
 

/**
 * filterByCamera
 *
 * Returns a list of photos filtered by the camera names (the abbreviation).
 * The cameraNames is an array of abbriviations of the selected Cameras
 *
 * @param {Object} roverData      The full list of photo data
 * @param {Array} cameraNames     The list of Camera names/abbreviations (FHAZ, RHAZ, MAST, CHEMCAM, etc)
 * @returns                       The filtered list of photos
 */
export function filterByCamera (roverData, cameraNames) {
  return roverData.filter(roverPhoto => cameraNames.includes(roverPhoto.camera.name))
}

/**
 * filterRange
 *
 * Returns a list of photos from the roverData starting at index startIndex
 * and ending with index endIndex
 *
 * @param {Array} roverData      The list of photos
 * @param {Number} startIndex    The index of the first photo to be included
 * @param {Number} endIndex      The index of the last photo to be included
 * @returns                      The filtered list of photos
 */
export function filterRange (roverData, startIndex, endIndex) {
  return roverData.filter((data, index) =>
    index >= startIndex && index <= endIndex)
}

/**
 * countByCamera
 *
 * Returns the number of photos in the current data set for a specific camera
 *
 * @param {Array} roverData        The list of photos
 * @param {String} cameraName      The abbreviation of the camera name (FHAZ, RHAZ, MAST, CHEMCAM, etc)
 * @returns                        The number of photos for the specifoed camera
 */
export function countByCamera(roverData, cameraName) {
  /* 
  Eerst maak een variable data aan. Dan filter ik met roverData.filter de roverData array en probeer ik alleen de data te
  krijgen. En dan return ik de data variable.
  */
  let data = roverData.filter(photo => photo.camera.name === cameraName).length
  return data;
}

/**
 * findByPhotoId
 * 
 * Returns the photo data for the photo with id photoId or undefined (if not available
 * )
 * @param {Array} roverData         The list of photos
 * @param {number} photoId          Id of the photo
 * @returns {Object}            The photo data
 */
export function findByPhotoId(roverData, photoId) {
  return roverData.find(data => data.id === photoId)
}