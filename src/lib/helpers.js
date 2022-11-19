const bcrypt = require('bcryptjs');
const pool = require('../database');
const helpers = {};

helpers.encryptPassword = async (password_user) => {
  const salt = await  bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password_user, salt);
  return hash;
};

helpers.matchPassword = async (password_user, savePassword) => {
  try {
    return await bcrypt.compare(password_user, savePassword);
  }catch (e) {
    console.log(e);
  }
};

//Mostrar datos de reserva por user
helpers.consultaReserva =(user)=>{
  if(user.role_user == 'Administrativo'){
    return 'SELECT r.*, us.name_user  FROM reservas as r, user as us, salas as sa WHERE r.id_sala=sa.id_sala AND r.id_user = us.id_user';
  }else{
    return 'SELECT r.*, us.name_user  FROM reservas as r, user as us, salas as sa WHERE r.id_sala=sa.id_sala AND r.id_user = us.id_user AND r.id_user='+user.id_user;
  }
}
//Guardar reserva con user
helpers.roleConsulta =(id_equipo, user, body)=>{
  if(user.role_user == 'Administrativo'){
    const {id_user, id_sala, fecha_reserva, hora_reserva} = body;
    return {id_user, id_sala, id_equipo, fecha_reserva, hora_reserva};
  }else{
    const {id_sala, fecha_reserva, hora_reserva} = body;
    const {id_user} = user;
    return {id_user, id_sala, id_equipo, fecha_reserva, hora_reserva};
  }
};
//consultar horario disponible en registro de horario
helpers.horarioDisponible = async (id_sala, dia_semana, hora_inicio, hora_fin)=>{
  const horas = ['06:30','07:30','08:30','09:30','10:30','11:30','12:30','13:30','14:30','15:30','16:30','17:30','18:30','19:30','20:30','21:30'];
  const registro = await pool.query('SELECT hora_inicio, hora_fin FROM horario WHERE id_sala=? AND dia_semana=?',[id_sala, dia_semana]);
  if(registro.length == 0){
    return [];
  }else{
    const array = horas.filter(hora =>( hora<=registro[0].hora_inicio || hora<registro[0].hora_fin));
    console.log(array);
    const validacion = array.map(hora =>( hora==hora_inicio || hora==hora_fin));
    return validacion.filter(item=> item==true);
  }
};
//desplegar horario de salas
// helpers.horarioReserva = async (id_sala) =>{
//   let fecha = new Date();
//   dia_semana = fecha.getDay();
//   // const horas = ['06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00'];
//   const horas = ['06:00','06:30','07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30',
//   '11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30',
//   '17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30'];
//   const registro = await pool.query('SELECT hora_inicio, hora_fin FROM horario WHERE id_sala=? AND dia_semana=?',[id_sala, dia_semana]);
//   if(registro.length == 0){
//     return horas;
//   }else{
//     // const array = horas.filter(hora =>( hora<=registro.hora_inicio || hora<registro.hora_fin));
//      const newArray = horas.filter(function(hora){
//        return hora<=registro[0].hora_inicio || hora<registro[0].hora_fin;
//      });
//      console.log(newArray);
//     return horas;
//   }
// };
helpers.horaDisponible = async (id_sala, dia_semana)=>{
  const horas = ['06:00:00','06:30:00','07:00:00','07:30:00','08:00:00','08:30:00','09:00:00','09:30:00','10:00:00','10:30:00','11:00:00','11:30:00','12:00:00','12:30:00','13:00:00','13:30:00','14:00:00','14:30:00','15:00:00','15:30:00','16:00:00','16:30:00','17:00:00','17:30:00','18:00:00','18:30:00','19:00:00','19:30:00','20:00:00','20:30:00','21:00:00','21:30:00'];
  const registro = await pool.query('SELECT hora_inicio, hora_fin FROM horario WHERE id_sala=? AND dia_semana=? ORDER BY hora_inicio, hora_fin',[id_sala, dia_semana]);
  let array=[];
  for (var i = 0; i < registro.length; i++) {
    for (var j = 0; j < horas.length; j++) {
      if(horas[j]>=registro[i].hora_inicio && horas[j]<registro[i].hora_fin) {
        array[j]=horas[j];
      }
    }
  }
  const newArray = horas.filter((hora,i)=>{
    return hora!=array[i];
  });
  return newArray;
};
//Hallar id de sala
helpers.salaId = async (id_equipo)=>{
  const datos = await pool.query('SELECT id_sala FROM equipos WHERE id_equipo=?',[id_equipo]);
  return datos[0].id_sala;
};
module.exports = helpers;
