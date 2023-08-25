import * as bootstrap from 'bootstrap';
import UrlBuilder from './class/urlbuilder.js';

class App{
  constructor(form) {
    this.form = form;
    this.btnForm = document.querySelector('button');
    this.nameHtml = document.querySelector('.inputName');
    this.countryHtml = document.querySelector('.inputCountry');
    this.preventRequest = false;
    this.form.addEventListener('submit', this.onSubmit.bind(this));

  }

  onSubmit(event) {
    event.preventDefault();
    this.form.classList.add('was-validated');
    if (!this.form.checkValidity()) {
      this.preventRequest = true;
      return;
    }
    if (this.preventRequest === false) {

      let name = this.nameHtml.value;
      let country = this.countryHtml.value;

      const url = UrlBuilder.getUrl("https://api.agify.io", {
        name: name, 
        country_id: country
      })

      fetch(url)
        .then(response => response.json())
        .then(agifyResponse => {
          let age = agifyResponse.age;
          if (age === null) {

            const secondUrl = UrlBuilder.getUrl("https://api.agify.io", {
              name: name});

            fetch(secondUrl)
              .then(response => response.json())
              .then(secondAgifyResponse => {
                this.responseToUser(secondAgifyResponse.age)
              });
          } else {
              this.responseToUser(age)
          }
        });
    }
  }

  responseToUser(age){
    document.querySelector('p').textContent = `Vous avez probablement ${age} ans!`;
  }
}

(function () {
  'use strict';
  const forms = document.querySelectorAll('.needs-validation');
  forms.forEach(form => new App(form));
})();





 




