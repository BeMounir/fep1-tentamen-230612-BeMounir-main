import nasaOpenApiService from '../services/nasa-openapi-service'

/* 
  Naam:   
  Studentennummer:
 */
 

/**
 * ApodBackground
 * 
 * Creates and manages the view that shows the Astronomy Picture of the Day (APOD) as background image
 */
class ApodBackground {
  constructor() {
    // TODO: See Assignment JS Fetch/Promise Opdracht B (Consumer)
  }

  render() {
    if (this.apod) {
      const infoText = this.apod?.copyright ? `© ${this.apod?.copyright} - ${this.apod?.date}` : `${this.apod?.date}`;

      document.querySelector('#backgroundimage-info').textContent = infoText;
      document.querySelector('#photos-view').setAttribute('title', this.apod?.explanation);
      document.querySelector('main').style.backgroundImage = `url(${this.apod.hdurl})`;
    }
  }
}

const apodBackground = new ApodBackground();
export { apodBackground }
