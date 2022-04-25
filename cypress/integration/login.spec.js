const login = require("../fixtures/login.json");

it("Should open the main page", () => {
    cy.visit("/admin");
    cy.get('.page-header__title').should('be.visible');
	cy.get('.page-header__subtitle').should('be.visible');
	cy.get('.login__title').should('be.visible');
 
});

it("Should login with correct data", () => {
    cy.login(`${login.email}`, `${login.password}`);
    cy.contains("Управление залами").should("be.visible");
    
});

it("Should not login with empty e-mail", () => {
    cy.login(`${login.emptyEmail}`, `${login.password}`);
    cy.get("[for=email] > .login__input")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
    cy.get("[for=email] > .login__input")
      .then(($el) => $el[0].validationMessage)
      .should("contain", "Заполните это поле.");
    
});

it("Should not login with incorrect password", () => {
    cy.login(`${login.email}`, `${login.incorrectPassword}`);
    cy.contains('Ошибка авторизации!').should("be.visible");
    
});

it("Should not login with incorrect email", () => {
    cy.login(`${login.incorrectEmail}`, `${login.password}`);
    cy.contains('Ошибка авторизации!').should("be.visible");
    
})