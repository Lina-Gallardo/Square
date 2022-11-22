const express = require('express');
const router = express.Router();
const pool = require('../database');
const helpers = require('../lib/helpers');
const {isLoggedIn, isRoleAdmin} = require('../lib/auth');
const today = new Date();

router.get('/',async(req, res) => {
  const consulta = helpers.consultaReserva(req.user);
  const reservas = await pool.query(consulta);
  res.render('reservas/list', {reservas});
});

router.get('/add/:id_sala/:id_equipo/:hora_reserva', async (req, res) => {
  const {id_sala, id_equipo, hora_reserva} = req.params;
  const dato = await pool.query('SELECT * FROM salas WHERE id_sala =?',[id_sala]);
  const users = await pool.query('SELECT * FROM user WHERE role_user =?',["Estudiante"]);
  const horario = await helpers.horaFinal(id_sala , today.getDay());
  const sala = dato[0];
  res.render('reservas/add', {id_equipo, sala, users, hora_reserva, horario });
});
router.post('/add/:id_equipo', async (req, res) => {
  const {id_equipo} = req.params;
  const newReserva = helpers.roleConsulta(id_equipo, req.user, req.body);
  pool.query('INSERT INTO reservas SET ?', [newReserva]);
  res.redirect('/reservas');
});
module.exports = router;
