import { filter } from '../filter'
import metaDataService from '../services/meta-data-service'
import nasaOpenApiService from '../services/nasa-openapi-service'
import { findMetaDataById } from '../utils/meta-data-utils'
import { filterRange } from '../utils/nasa-openapi-utils'

/**
 * PhotosView
 *
 * Represents a collection of photos displayed on the screen.
 */
class PhotosView {
  MAX_PHOTOS = 50

  /**
   * collectData
   *
   * Collects the photo data from the Nasa service and stores this data in this.photos
   * and renders the view
   */
  collectData () {
    return new Promise((resolve) => {
      this.showSpinner();
      nasaOpenApiService.getRoverPhotos(true).then((photos) => {
        this.photos = photos
        this.render()
        resolve();
      })
    })
  }

  showSpinner() {
    this.htmlElement = document.querySelector('#photos-view')
    this.htmlElement.textContent = ''

    const spinner = document.createElement('div');
    spinner.classList.add('spinner')
    this.htmlElement.appendChild(spinner)
  }

  /**
   * render
   *
   * Appends the PhotoView to the the pre defined photos-view element in the DOM.
   * The view is based on a template that needs to be available in the DOM
   */
  render () {
    this.htmlElement = document.querySelector('#photos-view')
    this.htmlElement.textContent = ''

    // Create the main view
    const PhotoViewTemplateClone = document.querySelector('#photo-view-template').content.cloneNode(true)
    const photoCollectionDiv = PhotoViewTemplateClone.querySelector('div')

    // Create the photo's
    filterRange(this.photos, 0, this.MAX_PHOTOS).forEach((photo, index) => {
      this.createSinglePhotoView(photoCollectionDiv, photo, index)
    })
    this.htmlElement.appendChild(PhotoViewTemplateClone)
  }

  /**
   * createSinglePhotoView
   *
   * Appends a single image to the parentView based on the photoData on index index and
   * a template.
   *
   * @param {parentNode} parentView The view this image view needs to be appended to
   * @param {Object} photoData the data for the image
   * @param {Number} index The index in the this.photos array
   */
  createSinglePhotoView (parentView, photoData, index) {
    // Create the view for one photo from the template
    const photoTemplateClone = document.querySelector('#photo-element-template').content.cloneNode(true)

    const theButton = photoTemplateClone.querySelector('button')
    theButton.dataset.photoId = index

    // Fill the image attributes
    const roverImage = photoTemplateClone.querySelector('img')
    roverImage.setAttribute('src', photoData.img_src)
    roverImage.setAttribute('alt', 'Photo taken by ' + photoData.rover.name + ' rover ')
    roverImage.dataset.photoId = index
    parentView.appendChild(photoTemplateClone)

    // Listen for clicks on the button that will open the photo dialog
    theButton.addEventListener('click', this.openDialog.bind(this))
  }

  /**
   * openDialog
   *
   * Opens a dialog with detailed information on the Mars photo
   */
  openDialog (event) {
    // Get the photo data from the event currectTarget dataset
    const photoId = event.currentTarget.dataset.photoId
    const photoData = this.photos[photoId]

    // Add meta data
    metaDataService.getMetaDataById(photoData.id).then((metaData) => {

      const title = metaData ? metaData.title : photoData.camera.full_name
      const description = metaData ? metaData.description : 'No description available'
  
      // Fill the dialog
      const dialog = document.querySelector('#photo-dialog')
      dialog.querySelector('#photo-dialog-heading').textContent = title
      dialog.querySelector('#photo-dialog-description').textContent = description
      dialog.querySelector('#photo-dialog-image').src = photoData.img_src
      dialog.querySelector('#photo-dialog-sol-date').textContent = `Sol date: ${photoData.sol}`
      dialog.querySelector('#photo-dialog-earth-date').textContent = `Earth date: ${photoData.earth_date}`
      dialog.querySelector('#photo-dialog-rover-name').textContent = `Rover name: ${photoData.rover.name}`
      dialog.querySelector('#photo-dialog-rover-landing-date').textContent = `Landing date: ${photoData.rover.landing_date}`
      dialog.querySelector('#photo-dialog-rover-launch-date').textContent = `Launch date: ${photoData.rover.launch_date}`
  
      // update the edit link
      const editLink = dialog.querySelector('#edit-link')
      editLink.href = `${editLink.href}?photoid=${photoData.id}&soldate=${filter.solDate}&rovername=${filter.roverName}`
      dialog.showModal()
    })
  }
}

const photosView = new PhotosView()
export { photosView }
