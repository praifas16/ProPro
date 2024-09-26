describe("Recording 26/9/2567 at 13:34:18", () => {
  it("tests Recording 26/9/2567 at 13:34:18", () => {
    cy.viewport(852, 696);
    cy.visit("http://127.0.0.1:5500/docs/index.html");
    cy.get("#email").click();
    cy.get("#email").type("pont64@gmail.com");
    cy.get("#password").click();
    cy.get("#password").type("1234");
    cy.get("div.left-section button").click();
    cy.location("href").should("eq", "http://127.0.0.1:5500/docs/studenthead.html?email=pont64%40gmail.com");
    cy.get("div.sidebar a:nth-of-type(1) > i").click();
    cy.location("href").should("eq", "http://127.0.0.1:5500/docs/studenthead.html?email=pont64%40gmail.com");
    cy.get("div.sidebar a:nth-of-type(2)").click();
    cy.location("href").should("eq", "http://127.0.0.1:5500/docs/Chat.html?email=pont64%40gmail.com");
    cy.get("#searchInput").click();
    cy.get("#searchInput").type("ป");
    cy.get("div.topbar div:nth-of-type(2) > p").click();
    cy.get("#messageInput").click();
    cy.get("#messageInput").type("แากห่อด");
    cy.get("#sendButton > i").click();
    cy.get("a:nth-of-type(1)").click();
    cy.location("href").should("eq", "http://127.0.0.1:5500/docs/studenthead.html?email=pont64%40gmail.com");
    cy.get("div.user-section i").click();
    cy.get("#logoutLink").click();
    cy.location("href").should("eq", "http://127.0.0.1:5500/docs/index.html");
  });
});
