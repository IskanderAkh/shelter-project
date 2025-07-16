export const ORDER_CHECKOUT_TEMPLATE = `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Подтверждение заказа</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7f7f7;">
  <div style="text-align: center; padding: 20px; background-color: #4CAF50; color: white;">
    <h1>Спасибо за покупку!</h1>
  </div>
  <div style="background-color: #ffffff; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Здравствуйте,</p>
    <p>Ваш заказ успешно оформлен. Спасибо, что выбрали наш магазин для своих покупок!</p>
    <p><strong>Детали заказа:</strong></p>
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px;">Товар</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Количество</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Цена</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Итоговая стоимость</th>
        </tr>
      </thead>
      <tbody>
        {productRows}
      </tbody>
    </table>
    <p><strong>Общая стоимость:</strong>$\{grandTotal} USD</p>
    <p>Мы свяжемся с вами для подтверждения деталей доставки. Если у вас есть вопросы, свяжитесь с нашей службой поддержки.</p>
    <p>С наилучшими пожеланиями,<br>Команда Uzbek Souvenir Shop</p>
  </div>
  <footer style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>Это автоматическое сообщение. Пожалуйста, не отвечайте на него.</p>
  </footer>
</body>
</html>
`;


export const WELCOMING_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Добро пожаловать в marketassist</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Добро пожаловать в marketassist!</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Привет,</p>
    <p>Спасибо, что зарегистрировались в marketassist! Мы рады приветствовать вас в нашем сообществе.</p>
    <p>Ваш аккаунт был успешно создан. Теперь вы можете воспользоваться всеми функциями нашего сервиса.</p>
    <p>Если у вас возникнут вопросы или потребуется помощь, не стесняйтесь обращаться в нашу службу поддержки.</p>
    <p>С наилучшими пожеланиями,<br>Команда marketassist</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>Это автоматическое сообщение. Пожалуйста, не отвечайте на него.</p>
  </div>
</body>
</html>
`
