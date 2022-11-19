const pool = require('../database');
const helpers = {};

helpers.dateDay = ()=>{
  const fecha = new Date();
  const year = fecha.getFullYear();
  const month = fecha.getMonth();
  const day = fecha.getDate();
  return year + '-' + (month+1) + '-' + day;
};

helpers.semana = (dia)=>{
  return ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'][dia];
};

helpers.formatoHoras = (horas)=>{
  var ret = "";
  ret +="<option selected>Horas disponibles</option>";
  for (var i = 0, j = horas.length; i < j; i++) {
    ret = ret + "<option value="+horas[i]+">" + (horas[i]) + "</option>";
  }
  return ret + "";
};
helpers.condition = (user)=>{
  return user.role_user=='Administrativo'? true:false
}

module.exports = helpers;
