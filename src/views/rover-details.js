import { filter } from '../filter'

/* 
  Naam:   
  Studentennummer:
 */
 

class RoverDetailView {

  getTemplateId() {
    let templateId = '';
    switch (filter.roverName) {
      case 'curiosity': templateId = '#curiosity-detail-template'; break;
      case 'opportunity': templateId = '#opportunity-detail-template'; break;
      case 'spirit': templateId = '#spirit-detail-template'; break;
    }
    return templateId;
  }

  /**
   * render
   * 
   * Renders the Rover selection view
   */
    render () {
      const roverTemplateId = this.getTemplateId();

      // TODO: See assignment WEB Opdracht DOM Manipulation
    }
}

const roverDetailView = new RoverDetailView()
export { roverDetailView }