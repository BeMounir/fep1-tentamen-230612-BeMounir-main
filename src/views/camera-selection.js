import { filter } from '../filter'
import nasaOpenApiService from '../services/nasa-openapi-service'
import { countByCamera } from '../utils/nasa-openapi-utils'


/**
 * CameraSelectionView
 * 
 * Creates and manages the view that allows the user to select one of the camera's of a rover
 */

const CAMERA_SELECTION_EVENT = 'cameraselection'

class CameraSelectionView {
  constructor () {
    // Available cameras
    this.cameras = [
      { abbriviation: 'FHAZ', name: 'Front Hazard Avoidance Camera' },
      { abbriviation: 'RHAZ', name: 'Rear Hazard Avoidance Camera' },
      { abbriviation: 'MAST', name: 'Mast Camera' },
      { abbriviation: 'CHEMCAM', name: 'Chemistry and Camera Complex' },
      { abbriviation: 'MAHLI', name: 'Mars Hand Lens Imager' },
      { abbriviation: 'MARDI', name: 'Mars Descent Imager' },
      { abbriviation: 'NAVCAM', name: 'Navigation Camera' },
      { abbriviation: 'PANCAM', name: 'Panoramic Camera' },
      { abbriviation: 'MINITES', name: 'Miniature Thermal Emission Spectrometer' }
    ]
  }

  updatePhotos () {
    nasaOpenApiService.getRoverPhotos(false).then((photos) => {
      this.photos = photos
      this.render()
    })
  }

  /**
   * render
   * 
   * Renders the camera selection view
   */
  render () {
    this.htmlElement = document.querySelector('#camera-selection-view')
    this.htmlElement.textContent = ''

    // Create the main view
    const cameraSelectionTemplateClone = document.querySelector('#camera-selection-template').content.cloneNode(true)
    this.htmlElement.appendChild(cameraSelectionTemplateClone)

    const cameraSelectionFieldset = this.htmlElement.querySelector('fieldset')

    this.cameras.forEach((camera) => {
      this.createCameraOption(cameraSelectionFieldset, camera)
    })
  }

  /**
   * createCameraOption
   * 
   * Creates a single camera option within the parentview
   * 
   * @param {HTMLElement} parentView  The element to create th e option in
   * @param {Object} camera  The camera object for which the option should be created
   */
  createCameraOption (parentView, camera) {
    const container = document.createElement('div')
    parentView.appendChild(container)

    // Create the checkbox
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.name = camera.abbriviation
    checkbox.checked = filter.cameraSelected(camera.abbriviation)
    checkbox.id = camera.abbriviation

    container.appendChild(checkbox)

    // Create the label
    const photoCount = countByCamera(this.photos, camera.abbriviation)
    const labelText = document.createTextNode(camera.name + ' (' + photoCount + ')')
    const label = document.createElement('label')
    label.setAttribute('for', camera.abbriviation)
    label.classList.add('camera-label')
    label.appendChild(labelText)

    container.appendChild(label)

    checkbox.addEventListener('click', this.handleCameraClick)
  }

  /**
   * handleCameraClick
   * 
   * Dispatches a custom event that has the camera name and the checked state in the details.
   * 
   * @param {*} event 
   */
  handleCameraClick (event) {
    const cameraSelectionEvent = new CustomEvent(
      CAMERA_SELECTION_EVENT, {
        bubbles: true,
        detail: {
          camera: event.currentTarget.name,
          active: event.currentTarget.checked
        }
      })

    this.dispatchEvent(cameraSelectionEvent)
  }
}

const cameraSelectionView = new CameraSelectionView()
export { cameraSelectionView, CAMERA_SELECTION_EVENT }
