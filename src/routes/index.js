const express = require('express');
const router = express.Router();
const pool = require('../database')
const helpers = require('../lib/helpers');
const {isLoggedIn, isRoleAdmin} = require('../lib/auth');

router.get('/', async(req, res) => {
  let horas = [];
  const salas = await pool.query('SELECT * FROM salas');
  const fecha = new Date();
  const dia = fecha.getDay();
  for (var i = 0; i < salas.length; i++) {
    salas[i]['horas']=  await helpers.horaDisponible(salas[i].id_sala , dia);
  }
  res.render('index', {salas});
});

module.exports = router;
