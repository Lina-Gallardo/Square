const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.login', new LocalStrategy({
  usernameField: 'email_user',
  passwordField: 'password_user',
  passReqToCallback: true
},async (req, email_user, password_user, done)=>{
  const rows = await pool.query('SELECT * FROM user WHERE email_user = ?', [email_user]);
  if(rows.length > 0){
    const user = rows[0];
    const valiPassword = await helpers.matchPassword(password_user, user.password_user);
    if(valiPassword){
      done(null, user, req.flash('success', 'Bienvenido '+ user.name_user));
    }else{
      done(null, false, req.flash('message', 'Contraseña invalida'));
    }
  }else{
    return done(null, false, req.flash('message', 'El usuario no existe'));
  }
}));

passport.use('local.signup', new LocalStrategy({
  usernameField: 'email_user',
  passwordField: 'password_user',
  passReqToCallback: true
}, async(req, email_user, password_user, done) => {
  const {id_user, name_user, role_user} = req.body;
  const newUser = {
    id_user,
    name_user,
    email_user,
    password_user,
    role_user
  };
  newUser.password_user = await helpers.encryptPassword(password_user);
  const result = await pool.query('INSERT INTO user SET ? ', [newUser]);
  return done(null,newUser);
}));

passport.serializeUser((user, done)=>{
  done(null,user.email_user);
});

passport.deserializeUser(async (email_user, done)=>{
  const rows = await pool.query('SELECT * FROM user WHERE email_user=?', [email_user]);
  done(null,rows[0]);
});
