describe('Ingredient Modal', () => {
  beforeEach(() => {
    // Открываем главную страницу перед каждым тестом
    cy.visit('http://192.168.1.137:4000/login');

    // Дожидаемся загрузки данных об ингредиентах
    cy.intercept('GET', '**/ingredients').as('getIngredients');
    cy.wait('@getIngredients');

    cy.get('input[name=email]').type('kit.solt@mail.ru')
    cy.get('input[name=password]').type(`${'qwerty'}{enter}`, { log: false })

    
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
});
