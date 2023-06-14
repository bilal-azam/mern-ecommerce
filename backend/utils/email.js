const emailService = require('./emailService'); // Assuming this module exists

const sendOrderConfirmationEmail = (order) => {
    const email = {
        to: order.userEmail,
        subject: 'Order Confirmation',
        text: `Your order #${order.id} has been confirmed!`,
    };
    emailService.send(email);
};

module.exports = { sendOrderConfirmationEmail };