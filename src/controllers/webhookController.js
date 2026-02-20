const pool = require('../config/db');

exports.midtransWebhook = async (req, res) => {
  const { order_id, transaction_status, gross_amount } = req.body;

  if (transaction_status === "settlement") {
    const trx = await pool.query(
      "SELECT * FROM transactions WHERE order_id=$1",
      [order_id]
    );

    if (!trx.rows.length) return res.status(404).json({ msg: "Not found" });

    const userId = trx.rows[0].user_id;

    await pool.query(
      "UPDATE users SET balance = balance + $1 WHERE id=$2",
      [gross_amount, userId]
    );

    await pool.query(
      "UPDATE transactions SET status='SUCCESS' WHERE order_id=$1",
      [order_id]
    );
  }

  res.json({ msg: "Webhook processed" });
};
