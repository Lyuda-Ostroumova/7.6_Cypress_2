const testData = require("../fixtures/testData.json");

it("Shoiuld book a ticket", () => {
    cy.visit("/client/index.php");
    cy.bookPlaces();
    cy.contains("Забронировать").click();
    cy.get(cy.get('.ticket__info-wrapper > :nth-child(3)').contains(`${testData.hallName}`));
    cy.contains("Получить код бронирования").click();
    cy.contains("Электронный билет").should("be.visible");
    cy.get('.ticket__info-qr').should("be.visible");
    
})