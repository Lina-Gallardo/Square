const express = require('express');
const router = express.Router();

const pool = require('../database');
const {isLoggedIn, isRoleAdmin} = require('../lib/auth');

router.get('/add',isLoggedIn, isRoleAdmin, (req,res)=>{
  res.render('salas/add');
});
router.post('/add',isLoggedIn, isRoleAdmin, async(req,res)=>{
  const {bloque_sala, piso_sala, aula_sala, cantidad_equipos_sala} =req.body;
  const newSalas = {bloque_sala, piso_sala, aula_sala, cantidad_equipos_sala};
  await pool.query('INSERT INTO salas SET ?', [newSalas]);
  const dato = await pool.query('SELECT id_sala FROM salas WHERE bloque_sala = ? AND piso_sala = ? AND aula_sala = ?', [bloque_sala, piso_sala, aula_sala]);
  const id_sala = dato[0].id_sala;
  for (var i = 1; i <= cantidad_equipos_sala; i++) {
    await pool.query('INSERT INTO equipos (id_sala) values(?)',[id_sala]);
  }
  req.flash('success', 'Sala guardada correctamente');
  res.redirect('/salas');
});
router.get('/',isLoggedIn, isRoleAdmin, async(req, res)=>{
  const salas = await pool.query('SELECT * FROM salas');
  res.render('salas/list', {salas});
});
router.get('/delete/:id_sala', isLoggedIn, async(req, res)=>{
  const id_sala = req.params;
  await pool.query('DELETE FROM salas WHERE id_sala=?',[id_sala]);
  console.log(id_sala);
  res.redirect('/');
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


//Listado de equipos
router.get('/equipos/:id_sala',isLoggedIn, isRoleAdmin, async(req, res)=>{
  const {id_sala} = req.params;
  const equipos = await pool.query('SELECT *FROM equipos WHERE id_sala=?',[id_sala]);
  console.log(equipos);
  res.render('salas/equipos', {equipos});
});

module.exports = router;
