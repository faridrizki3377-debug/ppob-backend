const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', require('./routes/authRoutes'));
app.use('/transaction', require('./routes/transactionRoutes'));
app.use('/ppob', require('./routes/ppobRoutes'));

app.listen(process.env.PORT || 3000, () =>
  console.log('Server running...')
);
