const axios = require('axios');
require('dotenv').config();

exports.topupPulsa = async (req, res) => {
  const { phone, code } = req.body;

  const response = await axios.post('https://api.digiflazz.com/v1/transaction', {
    username: process.env.PPOB_USERNAME,
    buyer_sku_code: code,
    customer_no: phone,
    ref_id: 'REF' + Date.now(),
    sign: process.env.PPOB_SIGNATURE
  });

  res.json(response.data);
};
