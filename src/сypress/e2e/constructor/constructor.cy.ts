describe('Burger Builder Integration Test', () => {
  beforeEach(() => {
    // Загрузка приложения
    cy.visit('/');
  });

  it('should allow adding ingredients, placing an order, and resetting the constructor', () => {
    // Проверяем, что ингредиенты отображаются на странице
    cy.get('[data-test-id="ingredient"]').should('have.length.at.least', 1);

    // Добавляем булку в конструктор
    cy.get('[data-test-id="ingredient"]')
      .contains('Булка') // Ищем элемент с текстом "Булка"
      .as('bun');
    cy.get('@bun').find('button').click();

    // Проверяем, что булка отображается в конструкторе
    cy.get('[data-test-id="constructor-item"]').should('contain.text', 'верх');
    cy.get('[data-test-id="constructor-item"]').should('contain.text', 'низ');

    // Добавляем ингредиент (например, начинку)
    cy.get('[data-test-id="ingredient"]')
      .not(':contains("Булка")') // Пропускаем булку
      .first()
      .as('ingredient');
    cy.get('@ingredient').find('button').click();

    // Проверяем, что ингредиент отображается в конструкторе
    cy.get('[data-test-id="constructor-item"]').should('have.length.at.least', 3); // Верхняя булка, ингредиент, нижняя булка

    // Проверяем отображение цены
    cy.get('[data-test-id="total-price"]').then(($price) => {
      const price = parseInt($price.text(), 10);
      expect(price).toBeGreaterThan(0);
    });

    // Имитируем успешный запрос на оформление заказа
    cy.intercept('POST', '/api/orders', {
      statusCode: 200,
      body: { number: 12345 },
    }).as('placeOrder');

    // Клик по кнопке «Оформить заказ»
    cy.get('[data-test-id="place-order-button"]').click();

    // Проверяем, что модальное окно открылось
    cy.get('[data-test-id="order-modal"]').should('be.visible');

    // Проверяем, что номер заказа корректен
    cy.get('[data-test-id="order-number"]').should('contain.text', '12345');

    // Закрываем модальное окно
    cy.get('[data-test-id="modal-close-button"]').click();

    // Проверяем, что модальное окно закрыто
    cy.get('[data-test-id="order-modal"]').should('not.exist');

    // Проверяем, что конструктор пуст
    cy.get('[data-test-id="constructor-item"]').should('not.exist');

    // Проверяем, что отображается сообщение о необходимости выбора булок
    cy.get('[data-test-id="constructor-empty"]').should('contain.text', 'Выберите булки');
  });
});
