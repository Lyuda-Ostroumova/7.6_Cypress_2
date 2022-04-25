const login = require("../fixtures/login.json");
const testData = require("../fixtures/testData.json");
const selectors = require("../fixtures/selectors");


it("Should create a new hall", () => {
    cy.login(`${login.email}`, `${login.password}`);
    cy.contains("Управление залами").should("be.visible");
    cy.newHall(testData.hallName);
    cy.get(`#hall-configuration [value=${testData.hallName2}]`).click();
    cy.get(selectors.saveBtn).click();
    
});

it("Should add a movie", () => {
    cy.login(`${login.email}`, `${login.password}`);
    cy.addMovie(
        testData.movieTitle, 
        testData.movieDuration, 
        testData.movieDescription, 
        testData.movieCountry);
    cy.contains(testData.movieTitle).should("be.visible");

});

it("Should add a movie into schedule", () => {
    cy.login(`${login.email}`, `${login.password}`);
    cy.get(selectors.filmInSchedule).drag(selectors.schedule);
    
});

it("Should close sales", () => {
    cy.login(`${login.email}`, `${login.password}`);
    cy.openSales(testData.hallName);
    cy.contains("Продажа билетов открыта!!!").should("be.visible");
});


it("Should open sales", () => {
    cy.login(`${login.email}`, `${login.password}`);
    cy.openSales(testData.hallName);
    cy.contains("Продажа билетов открыта!!!").should("be.visible");
});

