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

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[value=feedback]')
      .check()
      .should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type=radio]')
      .should('have.length', 3)
      .each(($radio) => {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type=checkbox]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/certificado_4all.pdf')
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('certificado_4all.pdf')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/certificado_4all.pdf', { action: "drag-drop" })
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('certificado_4all.pdf')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('certificado_4all.pdf').as('certificado')
    cy.get('#file-upload')
      .selectFile('@certificado')
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('certificado_4all.pdf')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('a[href="privacy.html"]')
      .should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('a[href="privacy.html"]')
      .invoke('removeAttr', 'target')
      .click()
  })

})