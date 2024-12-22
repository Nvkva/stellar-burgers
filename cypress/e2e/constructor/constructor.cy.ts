describe('Burger Builder Integration Test', () => {
  beforeEach(() => {
    // Загрузка приложения
    cy.visit('http://192.168.1.137:4000/login');

    cy.get('input[name=email]').type('kit.solt@mail.ru')
    cy.get('input[name=password]').type(`${'qwerty'}{enter}`, { log: false })
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

    // Имитируем успешный запрос на оформление заказа
    cy.intercept('POST', '/api/orders', {
      statusCode: 200,
      body: {
        success: true,
        name: "Краторный люминесцентный бургер",
        order: {
          ingredients: [
            {
              _id: "643d69a5c3f7b9001cfa093c",
              name: "Краторная булка N-200i",
              type: "bun",
              proteins: 80,
              fat: 24,
              carbohydrates: 53,
              calories: 420,
              price: 1255,
              image: "https://code.s3.yandex.net/react/code/bun-02.png",
              image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
              image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
              __v: 0
            },
            {
              _id: "643d69a5c3f7b9001cfa093e",
              name: "Филе Люминесцентного тетраодонтимформа",
              type: "main",
              proteins: 44,
              fat: 26,
              carbohydrates: 85,
              calories: 643,
              price: 988,
              image: "https://code.s3.yandex.net/react/code/meat-03.png",
              image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
              image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
              __v: 0
            }
          ],
          _id: "67672d89750864001d3736ef",
          owner: {
            name: "Жак-Ив Кусто Жак-Ив",
            email: "kit.solt@mail.ru",
            createdAt: "2024-11-30T19:40:48.751Z",
            updatedAt: "2024-12-03T17:47:36.991Z"
          },
          status: "done",
          name: "Краторный люминесцентный бургер",
          createdAt: "2024-12-21T21:05:13.411Z",
          updatedAt: "2024-12-21T21:05:14.244Z",
          number: 63730,
          price: 2243
        }
      },
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
});
