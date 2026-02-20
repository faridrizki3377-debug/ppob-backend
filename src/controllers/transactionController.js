const snap = require('../config/midtrans');

exports.createPayment = async (req, res) => {
  const { amount } = req.body;

  const parameter = {
    transaction_details: {
      order_id: 'ORDER-' + Date.now(),
      gross_amount: amount
    }
  };

  const transaction = await snap.createTransaction(parameter);
  res.json({ token: transaction.token });
};
