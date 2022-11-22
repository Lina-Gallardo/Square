const express = require('express');
const router = express.Router();
const passport = require('passport');
const helpers = require('../lib/helpers');
const {isLoggedIn, isNotLoggedIn, isRoleAdmin} = require('../lib/auth');
const pool = require('../database');
let msj;
let form;
router.get('/signup', isLoggedIn, isRoleAdmin, (req,res)=>{
  res.render('auth/signup');
});
router.post('/signup', isLoggedIn, isRoleAdmin, async(req, res)=>{
  const {id_user, name_user, email_user, password_user, role_user} = req.body;
  const newUser = {id_user, name_user, email_user, password_user, role_user};
  newUser.password_user = await helpers.encryptPassword(password_user);
  try {
    const result = await pool.query('INSERT INTO user SET ? ', [newUser]);
    form = 'success';
    msj = 'Registrado con exito';
  } catch (e) {
    console.log(e);
    form = 'message';
    msj = e.sqlMessage;
  }
  req.flash(form, msj);
  res.redirect('/usuarios');
});
router.get('/login', isNotLoggedIn, (req,res)=>{
  res.render('auth/login');
});
router.post('/login', isNotLoggedIn, (req,res, next)=>{
  passport.authenticate('local.login',{
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});
router.get('/usuarios', isLoggedIn, isRoleAdmin, async(req,res)=>{
  const usuarios = await pool.query('SELECT * FROM user');
  res.render('auth/usuarios', {usuarios});
});
router.get('/perfil', isLoggedIn, (req,res)=>{
  res.render('perfil');
});
router.get('/logout', isLoggedIn, (req,res, next)=>{
  req.logOut(req.user,err=>{
    if(err)return next(err);
    res.redirect('/login');
  });
});
module.exports = router;
