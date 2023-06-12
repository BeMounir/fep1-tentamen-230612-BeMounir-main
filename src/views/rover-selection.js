import { filter } from '../filter'

const ROVER_SELECTION_EVENT = 'roverselection'

class RoverSelectionView {
  // Supported rovers
  #rovers = ['curiosity', 'opportunity', 'spirit']

  /**
   * render
   * 
   * Renders the Rover selection view
   */
  render () {
    this.htmlElement = document.querySelector('#rover-selection-view')
    this.htmlElement.textContent = ''

    // Create the main view
    const cameraSelectionTemplateClone = document.querySelector('#rover-selection-template').content.cloneNode(true)
    this.htmlElement.appendChild(cameraSelectionTemplateClone)

    const roverSelectionFieldset = this.htmlElement.querySelector('fieldset')
    this.#rovers.forEach((rover) => {
      this.createRoverOption(roverSelectionFieldset, rover)
    })
  }

  /**
   * createRoverOption
   * 
   * Creates the view for the selection of a rover
   * 
   * @param {HTMLElement} parentView      The fieldset to add the rover option in
   * @param {String}      rover           The name of the rover
   */
  createRoverOption (parentView, rover) {
    const container = document.createElement('div')
    parentView.appendChild(container)

    // Create the checkbox
    const checkbox = document.createElement('input')
    checkbox.type = 'radio'
    checkbox.name = 'rover-name'
    checkbox.checked = (filter.roverName === rover)
    checkbox.id = rover

    container.appendChild(checkbox)

    // Create the label
    const labelText = document.createTextNode(rover)
    const label = document.createElement('label')
    label.setAttribute('for', rover)
    label.classList.add('rover-label')
    label.appendChild(labelText)

    container.appendChild(label)

    checkbox.addEventListener('click', this.handleRoverClick)
  }

  /**
   * handleRoverClick
   * 
   * Will dispatch the custom event with the name of the rover in the detail
   *  
   * @param {*} event 
   */
  handleRoverClick (event) {
    const handleRoverClick = new CustomEvent(
      ROVER_SELECTION_EVENT, {
        bubbles: true,
        detail: {
          rover: event.currentTarget.id
        }
      })
    this.dispatchEvent(handleRoverClick)
  }
}

const roverSelectionView = new RoverSelectionView()
export { roverSelectionView, ROVER_SELECTION_EVENT }
