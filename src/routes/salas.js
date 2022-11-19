const express = require('express');
const router = express.Router();

const pool = require('../database');
const {isLoggedIn, isRoleAdmin} = require('../lib/auth');
let msj;
let form;
router.get('/add',isLoggedIn, isRoleAdmin, (req,res)=>{
  res.render('salas/add');
});
router.post('/add',isLoggedIn, isRoleAdmin, async(req,res)=>{
  const {bloque_sala, piso_sala, aula_sala, cantidad_equipos_sala} =req.body;
  const id_sala = bloque_sala+piso_sala+aula_sala;
  const newSalas = {id_sala, bloque_sala, piso_sala, aula_sala, cantidad_equipos_sala};
  try {
    await pool.query('INSERT INTO salas SET ?', [newSalas]);
    for (var i = 1; i <= cantidad_equipos_sala; i++) {
      await pool.query('INSERT INTO equipos (id_sala) values(?)',[id_sala]);
    }
    form = 'success';
    msj = 'Sala guardada correctamente'
  } catch (e) {
    form = 'message'
    msj = e;
  }
  req.flash(form, msj);
  res.redirect('/salas');
});
router.get('/',isLoggedIn, isRoleAdmin, async(req, res)=>{
  const salas = await pool.query('SELECT * FROM salas');
  res.render('salas/list', {salas});
});
router.get('/delete/:id_sala', isLoggedIn, async(req, res)=>{
  const {id_sala} = req.params;
  try {
    await pool.query('DELETE FROM salas WHERE id_sala=?',[id_sala]);
    msj = 'Eliminado con exito'
    form = 'success';
  } catch (e) {
    msj = e.sqlMessage;
    form = 'message';
    console.log(e);
  }
  req.flash(form, msj);
  res.redirect('/salas');
});
router.get('/edit/:id_sala',isLoggedIn, isRoleAdmin, async(req, res)=>{
  const {id_sala} = req.params;
  const sala = await pool.query('SELECT * FROM salas WHERE id_sala=?',[id_sala]);
  res.render('salas/edit', {sala:sala[0]});
});
router.post('/edit/:id_sala',isLoggedIn, isRoleAdmin, async(req, res)=>{
  const {id_sala}=req.params;
  const {bloque_sala, piso_sala, aula_sala, cantidad_equipos_sala} =req.body
  const newSala = {
    bloque_sala,
    piso_sala,
    aula_sala,
    cantidad_equipos_sala
  };
  await pool.query('UPDATE salas set ? WHERE id_sala = ?', [newSala, id_sala]);
  res.redirect('/salas');
});
// 
//
// //Listado de equipos
// router.get('/equipos/:id_sala',isLoggedIn, isRoleAdmin, async(req, res)=>{
//   const {id_sala} = req.params;
//   const equipos = await pool.query('SELECT *FROM equipos WHERE id_sala=?',[id_sala]);
//   res.render('salas/equipos', {equipos});
// });

module.exports = router;
