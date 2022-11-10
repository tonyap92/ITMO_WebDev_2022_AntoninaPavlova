describe("Test - todo creation - on index page", () => {
  before(() => {
    cy.visit("https://local.dev:8888");
  });

  it("enter todo text as number and check disabled button", () => {
    cy.get("#inpTodoTitle").type(123);
    cy.get("#btnCreateTodo").should("be.disabled");
    cy.get("#inpTodoTitle").clear();
  });

  it("enter todo text and press create", () => {
    const TEST_TODO_TEXT = "New Todo";

    cy.checkInputExistAndEmpty();

    cy.get("#inpTodoTitle").type(TEST_TODO_TEXT);
    cy.get("#btnCreateTodo").click();

    cy.checkInputExistAndEmpty();

    const todoListChildren = cy.get("#listOfTodos").children();

    todoListChildren.should("exist").should("have.length", 1);
    todoListChildren.first().should("contain.text", TEST_TODO_TEXT);

    const checkChildrenExist = () =>
      cy.get('#listOfTodos > li > input[type="checkbox"]').should("exist").should("have.length", 1);

    checkChildrenExist();
    cy.reload(true);
    checkChildrenExist();
  });
});
