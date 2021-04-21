describe("Appointments", () => {

  beforeEach(() => {
    // Reset the state
    cy.request("GET", "/api/debug/reset");
    // Visit the root of the web server and confirm that the DOM contains the text "Monday"
    cy.visit("/")
      .contains("Monday")
  })

  it("should book an interview", () => {
    // Click the add button for the empty appointment
    cy.get("[alt=Add]")
      .first()
      .click()
    // Enter the name "Lydia Miller-Jones"
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    // Select the interviewer with the name "Sylvia Palmer"
    cy.get("[alt='Sylvia Palmer']").click();
    // Click the save button
    cy.contains("Save").click();
    // Verify that the student and interviewer names are displayed and that the element
    // has the appointment__card--show class
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  })

  it("should edit an interview", () => {
    // Click the edit button for the empty appointment
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true })
    // Enter the name "Lydia Miller-Jones"
    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
    // Select the interviewer with the name "Sylvia Palmer"
    cy.get("[alt='Tori Malcolm']").click();
    // Click the save button
    cy.contains("Save").click();
    // Verify that the student and interviewer names are displayed and that the element
    // has the appointment__card--show class
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

})
