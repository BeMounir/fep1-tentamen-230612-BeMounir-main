class Filter {
  // Private properties
  #roverName = 'curiosity'
  #selectedCameras = ['FHAZ']
  #solDate = 1000
  #roverData = []

  /**
   * Getter for the roverData
   */
  get roverData () {
    return this.#roverData
  }

  /**
   * Setter for the roverData
   */
  set roverData (roverData) {
    this.#roverData = roverData
  }

  /**
   * hasRoverData
   *
   * @returns Returns true if there is valid roverData available
   */
  hasRoverData () {
    return this.#roverData && this.roverData.length !== 0
  }

  /**
   * addCamera
   *
   * Adds the camera cameraAbbreviation to the list of selectedCameras
   *
   * @param {String} cameraAbbreviation
   */
  addCamera (cameraAbbreviation) {
    if (this.#selectedCameras.indexOf(cameraAbbreviation) === -1) {
      this.#selectedCameras.push(cameraAbbreviation)
    }
  }

  /**
   * removeCamera
   *
   * Reoves the camera cameraAbbreviation from the list of selectedCameras
   *
   * @param {String} cameraAbbreviation
   */
  removeCamera (cameraAbbreviation) {
    const index = this.#selectedCameras.indexOf(cameraAbbreviation)
    if (index !== -1) {
      this.#selectedCameras.splice(index, 1)
    }
  }

  /**
   * Returns the array of selected cameras (abbriviations)
   */
  get selectedCameras () {
    return this.#selectedCameras
  }

  /**
   * cameraSelected
   *
   * Returns true if the camera cameraAbbreviation is currenty in the list with selectedCameras
   *
   * @param {String} cameraAbbreviation
   * @returns
   */
  cameraSelected (cameraAbbreviation) {
    return this.#selectedCameras.indexOf(cameraAbbreviation) !== -1
  }

  /**
   * setter for solDate
   */
  set solDate (inSolDate) {
    this.#solDate = inSolDate
    this.#roverData = []
  }

  /**
   * getter for solDate
   */
  get solDate () {
    return this.#solDate
  }

  /**
   * setter for roverName
   */
  set roverName (inRoverName) {
    this.#roverName = inRoverName
    this.#roverData = []
  }

  /**
   * getter for roverName
   */
  get roverName () {
    return this.#roverName
  }
}

const filter = new Filter()
export { filter }
