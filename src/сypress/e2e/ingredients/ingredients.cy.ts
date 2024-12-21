describe('Burger Constructor - Adding Ingredient', () => {
  beforeEach(() => {
    // Открываем приложение перед каждым тестом
    cy.visit('/');
  });

  it('should add an ingredient to the constructor when clicked', () => {
    // Подожди загрузки ингредиентов
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.wait('@getIngredients');

    // Найди первый ингредиент в списке и добавь его
    cy.get('[data-testid="ingredient-item"]').first().as('ingredient');
    
    cy.get('@ingredient').find('[data-testid="ingredient-name"]').then(($ingredientName) => {
      const ingredientName = $ingredientName.text(); // Сохраняем имя ингредиента для проверки

      // Клик на ингредиент (эмулирует handleAdd)
      cy.get('@ingredient').click();

      // Проверка: ингредиент отображается в конструкторе
      cy.get('[data-testid="constructor"]').should('contain.text', ingredientName);
    });
  });
});