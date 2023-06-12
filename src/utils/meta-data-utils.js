/**
 * findMetaDataById
 * 
 * Returns the first metaData element that have the Id id
 * 
 * @param {Array<Object>} metaData the meta data array
 * @param {number} id the Id to find
 *  
 * @returns {Object} The element or undefined
 */
export function findMetaDataById(metaData, id) {
  return metaData.find(metaDataElement => {
    return metaDataElement.id === id
  })
}

/**
 * findMetaDataIndexById
 * 
 * Returns the index of the first metaData element that has Id id or -1 of it deos not exist
 * 
 * @param {Array<Object>} metaData the meta data array
 * @param {number} id the Id to find
 * 
 * @returns {number} the index or -1 if not exists
 */
export function findMetaDataIndexById(metaData, id) {
  return metaData.findIndex(metaData => metaData.id === id)
}