const pool = require('../database');
const {format} = require('timeago.js');
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
helpers.timeago = (timestamp)=>{
  return format(timestamp);
};
helpers.formatoHoras = (horas)=>{
  var ret = "";
  ret +="";
  for (var i = 0, j = horas.length; i < j; i++) {
    ret = ret + "<option value="+horas[i]+">" + (horas[i]) + "</option>";
  }
  return ret + "";
};
helpers.condition = (user)=>{
  return user.role_user=='Administrativo'? true:false
};
//filtro de hora actual
helpers.horaActual = (horario)=>{
  fecha = new Date
  horaActual = fecha.toLocaleTimeString('en-GB');
  nuevohorario = horario.filter((item)=>item>=horaActual);
  return nuevohorario;
};
helpers.horaSeleccionada = (hora_reserva, horario)=>{
  nuevohorario = horario.filter((item)=>item>hora_reserva);
  return nuevohorario;
};
module.exports = helpers;
