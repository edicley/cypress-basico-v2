/// <reference types="cypress" />

describe('Central de atendimento ao Cliente TAT', () => {

 beforeEach( () => {
  cy.visit('./src/index.html')
 })
  
  it('verifica o título da aplicação', () => {
    

    cy.title().should('have.equal', 'Central de Atendimento ao Cliente TAT')

  })

  it('preenche os campos obrigatórios e envia o formulário', () => {

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
      .type('Preciso de um empréstimo para a execução da obra da construção de um sobrado, no condomínio Dharmaville.',{delay:0})
      .should('have.value', 'Preciso de um empréstimo para a execução da obra da construção de um sobrado, no condomínio Dharmaville.')

    cy.contains('button', 'Enviar').click()    
    cy.get('.success').should('be.visible')
    
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {

  cy.get('#firstName')
    .type('Edicley')
    .should('have.value', 'Edicley')

  cy.get('#lastName')
    .type('Bezerra')
    .should('have.value', 'Bezerra')

  cy.get('#email')
    .type('ehb_gmail.com')
    .should('have.value', 'ehb_gmail.com')

  cy.get('#open-text-area')
    .type('Preciso de um empréstimo para a execução da obra da construção de um sobrado, no condomínio Dharmaville.')
    .should('have.value', 'Preciso de um empréstimo para a execução da obra da construção de um sobrado, no condomínio Dharmaville.')

  cy.contains('button', 'Enviar').click()    
  cy.get('.error').should('be.visible')

  })

  it('verifica se o campo telefone permanece vazio se for informado valores não numéricos', () => {

    cy.get('#firstName')
      .type('Edicley')
      .should('have.value', 'Edicley')

    cy.get('#lastName')
      .type('Bezerra')
      .should('have.value', 'Bezerra')

    cy.get('#email')
      .type('ehb@gmail.com')
      .should('have.value', 'ehb@gmail.com')

    cy.get('#phone')
      .type('ebc#@!')
      .should('have.value', '')

    // cy.get('#open-text-area')
    //   .type('Preciso de um empréstimo para a execução da obra da construção de um sobrado, no condomínio Dharmaville.')
    //   .should('have.value', 'Preciso de um empréstimo para a execução da obra da construção de um sobrado, no condomínio Dharmaville.')

    // cy.contains('button', 'Enviar').click()    
    // cy.get('.success').should('be.visible')
    
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {

    cy.get('#firstName')
      .type('Edicley')
      .should('have.value', 'Edicley')

    cy.get('#lastName')
      .type('Bezerra')
      .should('have.value', 'Bezerra')

    cy.get('#email')
      .type('ehb@gmail.com')
      .should('have.value', 'ehb@gmail.com')

    // cy.get('#phone')
    //   .type('abc#@!')
    //   .should('have.value', '')

    cy.get('#phone-checkbox').check()

    cy.get('#open-text-area')
      .type('Preciso de um empréstimo para a execução da obra da construção de um sobrado, no condomínio Dharmaville.')
      .should('have.value', 'Preciso de um empréstimo para a execução da obra da construção de um sobrado, no condomínio Dharmaville.')

    cy.contains('button', 'Enviar').click()    
    cy.get('.error').should('be.visible')
    
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Edicley')
      .should('have.value', 'Edicley')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Bezerra')
      .should('have.value', 'Bezerra')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('ehb@gmail.com')
      .should('have.value', 'ehb@gmail.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('88888888')
      .should('have.value', '88888888')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()    
    cy.get('.error').should('be.visible')
  })

  it('envia o formulário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })

})