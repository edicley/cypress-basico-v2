/// <reference types="cypress" />
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

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName')
      .type('Edicley')
      .should('have.value', 'Edicley')

    cy.get('#lastName')
      .type('Bezerra')
      .should('have.value', 'Bezerra')

    cy.get('#email')
      .type('ehb@gmail.com')
      .should('have.value', 'ehb@gmail.com')

    cy.get('#open-text-area')
      .type('Preciso de um empréstimo.')
      .should('have.value', 'Preciso de um empréstimo.')

    cy.contains('button', 'Enviar').click()    
    //cy.get('.success').should('be.visible')
})