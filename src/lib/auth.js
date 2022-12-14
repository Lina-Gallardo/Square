module.exports = {
  isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
      return next();
    }
    return res.redirect('/login');
  },

  isRoleAdmin(req, res, next) {
    if(req.user.role_user==='Administrativo'){
      return next()
    }
    return res.redirect('/perfil');
  },

  isNotLoggedIn(req, res, next) {
    if (!req.isAuthenticated()){
      return next();
    }
    return res.redirect('/perfil');
  }
}
