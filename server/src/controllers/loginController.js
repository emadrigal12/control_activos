const { response } = require('express');
const connection = require('../models/database');

async function login(req, res) {
  const { username, password } = req.body;
  console.log(username, password);
  const query = 'SELECT * FROM LOGIN WHERE username = ? AND password = ?';
  try {
    const [result] = await connection.execute(query, [username, password]);
    if (result.length > 0) {
      console.log(result);
      res.status(200).send(result);
    } else {
      console.log('Invalid user');
      res.status(200).send({ message: 'Invalid user' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al obtener usuarios: ' + error);
  }
}

module.exports = { login };
