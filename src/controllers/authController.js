const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  const result = await pool.query(
    'INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING *',
    [name, email, hash]
  );

  res.json(result.rows[0]);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query(
    'SELECT * FROM users WHERE email=$1',
    [email]
  );

  if (!result.rows.length) return res.status(401).json({ msg: 'User not found' });

  const user = result.rows[0];
  const valid = await bcrypt.compare(password, user.password);

  if (!valid) return res.status(401).json({ msg: 'Wrong password' });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  res.json({ token });
};
