import { INGREDIENT_SELECTOR, MODAL_CLOSE_BUTTON_SELECTOR, MODAL_SELECTOR } from "../../constants/constants";

describe('Ingredient Modal', () => {
  beforeEach(() => {
    cy.visit('');

    cy.intercept('GET', '/api/auth/user', {
      fixture: 'user.json'
    });

    // Дожидаемся загрузки данных об ингредиентах
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.wait('@getIngredients');
  });

  it('should open the ingredient modal and display correct details', () => {
    // Ищем первый ингредиент и кликаем на него
    cy.get(INGREDIENT_SELECTOR).first().as('firstIngredient');
    cy.get('@firstIngredient').click();

    // Проверяем, что модальное окно открылось
    cy.get(MODAL_SELECTOR).should('be.visible');

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
    cy.get(MODAL_CLOSE_BUTTON_SELECTOR).click();

    // Убеждаемся, что модальное окно закрылось
    cy.get(MODAL_SELECTOR).should('not.exist');
  });

  it('should close the modal when close button is clicked', () => {
    // Ищем первый ингредиент и кликаем на него
    cy.get(INGREDIENT_SELECTOR).first().as('firstIngredient');
    cy.get('@firstIngredient').click();

    // Проверяем, что модальное окно открылось
    cy.get(MODAL_SELECTOR).should('be.visible');

    // Кликаем на кнопку закрытия
    cy.get(MODAL_CLOSE_BUTTON_SELECTOR).click();

    // Проверяем, что модальное окно закрылось
    cy.get(MODAL_SELECTOR).should('not.exist');
  });

  afterEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
  });
});
