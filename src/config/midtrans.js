const midtransClient = require('midtrans-client');

let snap = new midtransClient.Snap({
  isProduction: true,
  serverKey: process.env.MIDTRANS_SERVER_KEY
});

module.exports = snap;
