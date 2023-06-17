const paypal = require('@paypal/checkout-server-sdk');

const clientId = 'YOUR_CLIENT_ID';
const clientSecret = 'YOUR_CLIENT_SECRET';

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

const createOrder = async (amount) => {
    const request = new paypal.orders.OrdersCreateRequest();
    request.headers['prefer'] = 'return=representation';
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: amount,
            },
        }],
    });

    try {
        const order = await client.execute(request);
        return order.result;
    } catch (error) {
        throw error;
    }
};

module.exports = { createOrder };