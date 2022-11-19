const express = require('express');
const router = express.Router();
const pool = require('../database');
const helpers = require('../lib/helpers');
const {isLoggedIn, isRoleAdmin} = require('../lib/auth');

router.get('/',async(req, res) => {
  const consulta = helpers.consultaReserva(req.user);
  console.log(consulta);
  const reservas = await pool.query(consulta);
  res.render('reservas/list', {reservas});
});

router.get('/add/:id_sala/:id_equipo', async (req, res) => {
  const {id_sala, id_equipo} = req.params;
  const dato = await pool.query('SELECT * FROM salas WHERE id_sala =?',[id_sala]);
  const users = await pool.query('SELECT * FROM user WHERE role_user =?',["Estudiante"]);
  const today = new Date();
  const horario = await helpers.horaDisponible(id_sala , today.getDay());
  const sala = dato[0];
  res.render('reservas/add', {id_equipo, sala, users, horario });
});
router.post('/add/:id_equipo', async (req, res) => {
  const {id_equipo} = req.params;
  const newReserva = helpers.roleConsulta(id_equipo, req.user, req.body);
  pool.query('INSERT INTO reservas SET ?', [newReserva]);
  res.redirect('/reservas');
});
module.exports = router;
