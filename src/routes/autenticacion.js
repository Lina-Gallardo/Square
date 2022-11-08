const express = require('express');
const router = express.Router();
const passport = require('passport');
const {isLoggedIn, isNotLoggedIn, isRoleAdmin} = require('../lib/auth');
const pool = require('../database');

router.get('/signup', isLoggedIn, isRoleAdmin, (req,res)=>{
  res.render('auth/signup');
});
router.post('/signup', isLoggedIn, isRoleAdmin, passport.authenticate('local.signup',{
  successRedirect: '/perfil',
  failureRedirect: '/signup',
  failureFlash: true
}));
router.get('/login', isNotLoggedIn, (req,res)=>{
  res.render('auth/login');
});
router.post('/login', isNotLoggedIn, (req,res, next)=>{
  passport.authenticate('local.login',{
    successRedirect: '/perfil',
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
