/* 
  Naam: Mounir Bekkaoui  
  Studentennummer: 1835544
 */
 

/**
 * SolSelectionView
 *
 * A navigation view that allows the user to select a sol date
 * (the number of mars days since the aarival of the rover)
 */

const SOL_CHANGE_EVENT = 'solchange'

class SolSelectionView {
  /**
   * render
   *
   * creates the html for the view and inserts it into the DOM
   */
  render () {
    // find the container for the view and empty it
    this.htmlElement = document.querySelector('#sol-selection-view')
    this.htmlElement.textContent = ''

    // Create the view from the template
    const cameraSelectionTemplateClone = document.querySelector('#sol-selection-template').content.cloneNode(true)
    this.htmlElement.appendChild(cameraSelectionTemplateClone)

    /*
    eerst maak ik een variable aan. dan door gebruik te maken van een quertselector selecteer ik de templates
  . dan gebruik ik een eventListener en verander ik de sol.
  */
    const curiosity = this.htmlElement.querySelector('#curiosity-detail-template');
    curiosity.addEventListener('change', this.handleSolChange.bind(this));

    const opporunity = this.htmlElement.querySelector('#opportunity-detail-template');
    opporunity.addEventListener('change', this.handleSolChange.bind(this));

    const spirit = this.htmlElement.querySelector('#spirit-detail-template');
    spirit.addEventListener('change', this.handleSolChange.bind(this));

    // Add an event listener to it
    // TODO: See assignment WEB Opdracht EventListener
  }

  /**
   * handleSolChange
   *
   * Handles the change event from the sol date input.
   * throws a new event 'solDate' with the solDate (number) as a detail
   *
   * @param {object} event
   */
  handleSolChange (event) {
    const solChangeEvent = new CustomEvent(
      SOL_CHANGE_EVENT, {
        bubbles: true,
        detail: {
          solDate: parseInt(event.currentTarget.value)
        }
      })

    this.dispatchEvent(solChangeEvent)
  }
}

const solSelectionView = new SolSelectionView()
export { solSelectionView, SOL_CHANGE_EVENT }
