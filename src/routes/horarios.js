const express = require('express');
const router = express.Router();
const pool = require('../database');
const helpers = require('../lib/helpers');
let msj;
let form;
router.get('/', async(req,res)=>{
  const datos = await pool.query('SELECT sa.id_sala, sa.bloque_sala, sa.piso_sala, sa.aula_sala, us.name_user, h.id_horario, h.dia_semana, h.hora_inicio, h.hora_fin FROM user as us, salas as sa, horario as h WHERE us.id_user=h.id_user AND sa.id_sala=h.id_sala ORDER BY h.id_sala, h.dia_semana');
  res.render('horarios/list', {datos})
});
router.get('/add', async(req,res)=>{
  const salas = await pool.query('SELECT * FROM salas');
  const usuarios = await pool.query('SELECT * FROM user WHERE role_user=?',["Docente"]);
  const horario = await helpers.horasClase();
  res.render('horarios/add', {salas, usuarios, horario})
});
router.post('/add', async(req, res)=>{
  const {id_sala, id_user, dia_semana, hora_inicio, hora_fin} = req.body;
  const newHorario = {id_sala, id_user, dia_semana, hora_inicio, hora_fin};
  const results = await helpers.horarioDisponible(id_sala, dia_semana, hora_inicio, hora_fin);
  if(results.length == 0){
    try {
      await pool.query('INSERT INTO horario SET ?', [newHorario]);
      msj = 'Hora reservada con exito';
      form = 'success';
    } catch (e) {
      msj = e.sqlMessage;
      form = 'message';
    }
  }else{
    msj = 'Esta sala ya se encuentra reservada';
    form = 'message';
  }
  req.flash(form, msj);
  res.redirect('/horarios');
});
router.get('/delete/:id_horario', async(req, res)=>{
  const {id_horario} = req.params;
  try {
    await pool.query('DELETE FROM horario WHERE id_horario=?', [id_horario]);
    msj='Eliminado con exito';
    form = 'success';
  } catch (e) {
    msj = e;
    form = 'message';
    console.log(e);
  }
  req.flash(form, msj);
  res.redirect('/horarios');
});
module.exports = router;
