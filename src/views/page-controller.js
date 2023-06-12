import { filter } from '../filter'
import nasaOpenApiService from '../services/nasa-openapi-service'
import { apodBackground } from './apod-background'
import { cameraSelectionView, CAMERA_SELECTION_EVENT } from './camera-selection'
import { photosView } from './photos-view'
import { roverDetailView } from './rover-details'
import { roverSelectionView, ROVER_SELECTION_EVENT } from './rover-selection'
import { solSelectionView, SOL_CHANGE_EVENT } from './sol-selection'

export default class Controller {
  constructor () {
    nasaOpenApiService.getRoverPhotos(true)
      .then((roverData) => {
        // Create all views
        photosView.collectData()
        cameraSelectionView.updatePhotos()
        solSelectionView.render()
        roverSelectionView.render()
        roverDetailView.render()
        apodBackground.render()

        this.handleCameraSelection()
        this.handleSolSelection()
        this.handleRoverSelection()
      })
  }

  /**
   * handleCameraSelection
   *
   * Setup the event listener for catching camera selection changes
   */
  handleCameraSelection () {
    document.addEventListener(CAMERA_SELECTION_EVENT, (event) => {
      if (event.detail.active) {
        filter.addCamera(event.detail.camera)
      } else {
        filter.removeCamera(event.detail.camera)
      }
      photosView.collectData()
    })
  }

  /**
   * handleSolSelection
   *
   * Setup the event listener for catching sol date changes
   */
  handleSolSelection () {
    document.addEventListener(SOL_CHANGE_EVENT, (event) => {
      const newSolDate = parseInt(event.detail.solDate)
      filter.solDate = newSolDate
      photosView.collectData().then(() => {
        cameraSelectionView.updatePhotos()
      })
    })
  }

  handleRoverSelection () {
    document.addEventListener(ROVER_SELECTION_EVENT, (event) => {
      filter.roverName = event.detail.rover
      photosView.collectData().then(() => {
        cameraSelectionView.updatePhotos()
        roverDetailView.render()
      })
    })
  }
}
