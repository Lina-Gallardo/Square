const express = require('express');
const router = express.Router();
const pool = require('../database');
const helpers = require('../lib/helpers');
const {isLoggedIn, isRoleAdmin} = require('../lib/auth');
const fecha = new Date();
const year = fecha.getFullYear();
const month = fecha.getMonth();
const day = fecha.getDate();
const fecha_reserva = year+'-'+(month+1)+'-'+day

router.get('/list/:id_sala/:hora_reserva',isLoggedIn, async(req, res)=>{
  const {id_sala, hora_reserva} = req.params;
  const reserva = await pool.query('SELECT id_equipo FROM reservas WHERE id_sala=? AND hora_reserva=? AND fecha_reserva=?',[id_sala, hora_reserva, fecha_reserva]);
  const equipos = await pool.query('SELECT * FROM equipos WHERE id_sala=?',[id_sala]);
  const horario = await helpers.horaDisponible(id_sala, fecha.getDay());
  reserva.forEach((item, i) => {
    equipos.map((equipo, j)=>{
      if(equipo.id_equipo==item.id_equipo){
        equipo.disponibilidad_equipo=0;
      }
    });
  });
  res.render('equipos/list', {id_sala, equipos, horario, hora_reserva});
});
//Listado de equipos
router.post('/list/:id_sala',isLoggedIn, async(req, res)=>{
  const {id_sala} = req.params;
  const {hora_reserva} = req.body;
  const reserva = await pool.query('SELECT id_equipo FROM reservas WHERE id_sala=? AND hora_reserva=? AND fecha_reserva=?',[id_sala, hora_reserva, fecha_reserva]);
  const equipos = await pool.query('SELECT * FROM equipos WHERE id_sala=?',[id_sala]);
  const horario = await helpers.horaDisponible(id_sala, fecha.getDay());
  reserva.forEach((item, i) => {
    equipos.map((equipo, j)=>{
      if(equipo.id_equipo==item.id_equipo){
        equipo.disponibilidad_equipo=0;
      }
    });
  });
  for (var i = 0; i < equipos.length; i++) {
    equipos[i]['hora_reserva'] =hora_reserva;
  }
  res.render('equipos/list', {id_sala, equipos, horario, hora_reserva});
});

module.exports = router;
