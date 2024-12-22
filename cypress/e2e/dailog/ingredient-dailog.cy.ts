describe('Ingredient Modal', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000');

    cy.intercept('GET', '/api/auth/user', {
      fixture: 'user.json'
    });

    // Дожидаемся загрузки данных об ингредиентах
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.wait('@getIngredients');
  });

  it('should open the ingredient modal and display correct details', () => {
    // Ищем первый ингредиент и кликаем на него
    cy.get('[data-test-id="ingredient"]').first().as('firstIngredient');
    cy.get('@firstIngredient').click();

    // Проверяем, что модальное окно открылось
    cy.get('[data-test-id="modal"]').should('be.visible');

    // Проверяем, что отображаются правильные данные ингредиента
    cy.get('[data-test-id="ingredient-detail-name"]').as('ingredientDetailName').then(() => {
      cy.get('@firstIngredient').within(() => {
        cy.get('[data-test-id="ingredient-card-name"]').then(($name) => {
          const ingredientName = $name.text();
          cy.get('@ingredientDetailName').should('contain', ingredientName);
        });
      });
    })

    // Закрываем модальное окно
    cy.get('[data-test-id="modal-close-button"]').click();

    // Убеждаемся, что модальное окно закрылось
    cy.get('[data-test-id="modal"]').should('not.exist');
  });

  it('should close the modal when close button is clicked', () => {
    // Ищем первый ингредиент и кликаем на него
    cy.get('[data-test-id="ingredient"]').first().as('firstIngredient');
    cy.get('@firstIngredient').click();

    // Проверяем, что модальное окно открылось
    cy.get('[data-test-id="modal"]').should('be.visible');

    // Кликаем на кнопку закрытия
    cy.get('[data-test-id="modal-close-button"]').click();

    // Проверяем, что модальное окно закрылось
    cy.get('[data-test-id="modal"]').should('not.exist');
  });

  afterEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
  });
});
