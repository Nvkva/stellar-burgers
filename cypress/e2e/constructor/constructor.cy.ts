describe('Burger Builder Integration Test', () => {
  beforeEach(() => {
    // Загрузка приложения
    cy.visit('http://localhost:4000');
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'mockRefreshToken12345');
    });

    cy.setCookie('accessToken', 'mockAccessToken12345');
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', '/api/auth/user', {fixture: 'user.json'});
  });

  it('should allow adding ingredients, placing an order, and resetting the constructor', () => {

    // Проверяем, что ингредиенты отображаются на странице
    cy.get('[data-test-id="ingredient"]').should('have.length.at.least', 1);

    // Добавляем булку в конструктор
    cy.get('[data-test-id="ingredient"]')
      .contains('булка') // Ищем элемент с текстом "Булка"
      .first()
      .parent()
      .as('bun');
    cy.get('@bun').find('button').click();

    // Проверяем, что булка отображается в конструкторе
    cy.get('[data-test-id="constructor-item"]').should('contain.text', 'верх');
    cy.get('[data-test-id="constructor-item"]').should('contain.text', 'низ');

    // Добавляем ингредиент (например, начинку)
    cy.get('[data-test-id="ingredient"]')
      .not(':contains("булка")') // Пропускаем булку
      .first()
      .as('ingredient');
    cy.get('@ingredient').find('button').click();

    // Проверяем, что ингредиент отображается в конструкторе
    cy.get('[data-test-id="constructor-item"]').should('have.length.at.least', 3); // Верхняя булка, ингредиент, нижняя булка

    // Проверяем отображение цены
    cy.get('[data-test-id="total-price"]').then(($price) => {
      const price = parseInt($price.text(), 10);
      expect(price).greaterThan(0);
    });


    // Интерцепт запроса на создание заказа для проверки заголовков
    cy.intercept('POST', '/api/orders', (req) => {
      // Проверяем, что в заголовке Authorization есть токен
      expect(req.headers).to.have.property('authorization', 'mockAccessToken12345');
      req.reply({ fixture: 'order.json' });
    }).as('placeOrder');

    // Клик по кнопке «Оформить заказ»
    cy.get('[data-test-id="place-order-button"]').click();

    // Проверяем, что модальное окно открылось
    cy.get('[data-test-id="modal"]').should('be.visible');

    // Проверяем, что номер заказа корректен
    cy.get('[data-test-id="order-number"]').should('contain.text', '63730');

    // Закрываем модальное окно
    cy.get('[data-test-id="modal-close-button"]').click();

    // Проверяем, что модальное окно закрыто
    cy.get('[data-test-id="modal"]').should('not.exist');

    // Проверяем, что отображается сообщение о необходимости выбора булок
    cy.get('[data-test-id="constructor-empty"]').should('contain.text', 'Выберите булки');
  });

  afterEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
  });
});
