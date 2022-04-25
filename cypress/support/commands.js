// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-file-upload';
import "@4tw/cypress-drag-drop";


const selectors = require("../fixtures/selectors");
const filepath = "../../cypress/fixtures/images/poster.png";
const seats = require("../fixtures/seats.json");


Cypress.Commands.add('login', (email, password) => {
  cy.visit("/admin");
  cy.get(selectors.loginEmail).type(email);
  cy.get(selectors.loginPass).type(password);
  cy.get(selectors.loginBtn).click();

});

Cypress.Commands.add('newHall', (hallName) => {
  cy.get(selectors.newHall).click();
  cy.get(selectors.nameHall).type(hallName);
  cy.get(selectors.addHall).click();
});

Cypress.Commands.add("deleteHall", (hallName) => {
  cy.get(`#hall-control [data-hall-name=${hallName}]`).click();
  cy.on("window:confirm", () => true);
  cy.get(selectors.deleteHallButton).click();
    
});

Cypress.Commands.add("addMovie", (title, duration, description, country) => {
  cy.get(selectors.addMovie).click();
  cy.get(selectors.movieTitle).type(title);
  cy.get(selectors.duration).type(duration);
  cy.get(selectors.description).type(description);
  cy.get(selectors.country).type(country);
  cy.get(selectors.addPoster).click().attachFile(filepath);
  cy.get(selectors.addMovieBtn).click();
    
});

Cypress.Commands.add("openSales", (hallName) => {
  cy.get(`#start-sales [value=${hallName}]`).click();
  cy.contains("Открыть продажу билетов").click();
});

Cypress.Commands.add("closeSales", (hallName) => {
  cy.get(`#start-sales .conf-step__selectors-box [value=${hallName}]`).click();
  cy.contains("Закрыть продажу билетов").click();
  cy.contains("Все готово к открытию").should("be.visible");
});

Cypress.Commands.add("bookPlaces",() => {
  cy.get(selectors.day).click();
  cy.get(selectors.time).click();
  seats.forEach(seat=> {
    cy.get(`.buying-scheme__wrapper > :nth-child(${seat.row}) > :nth-child(${seat.seat})`).click();
  });
})

