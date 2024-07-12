const connection = require('../models/database')



async function login(req, res) {
    try {
      const [rows, fields] = await connection.execute('SELECT * FROM LOGIN');
      res.json(rows);
    } catch (error) {
      res.status(500).send('Error al obtener usuarios' + error);
    }
  }
  
  module.exports = { login };