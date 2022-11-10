describe("Test - todo creation", () => {
  before(() => {
    cy.visit("https://local.dev:8888");
  });

  it("goto index page enter todo text and press create", () => {
    const TEST_TODO_TEXT = "New Todo";

    expect(cy.get("#inpTodoTitle")).to.be.exist;
    const cyInput = cy.get("#inpTodoTitle");

    cyInput.should("exist").should("be.visible");
    cyInput.should("contain.text", "");
    cyInput.type(TEST_TODO_TEXT);

    cy.get("#btnCreateTodo").click();
    // expect(cy.get('#listOfTodos')).to.have.text(TEST_TODO_TEXT);
    cy.get('[data-test="todo-checker"]').should("exist").should("have.length", 1);
    cy.get("#listOfTodos").children().should("exist").should("have.length", 1).should("contain.text", TEST_TODO_TEXT);
  });
});
