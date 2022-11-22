const bcrypt = require('bcryptjs');
const pool = require('../database');
const helpers = {};
const horario = [];
for (let i=6; i <= 21; i++) {
  for (let j=0; j < 3; j++) {
    horario.push(`${i<=9? `0`+i : i}:${j === 0 ? `00` : 15*j}:00`);
  }
}
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
//Mostrar las horas de clases
helpers.horasClase = ()=>{
  return horario;
}
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
    const {id_user, id_sala, fecha_reserva, hora_reserva, hora_final} = body;
    return {id_user, id_sala, id_equipo, fecha_reserva, hora_reserva, hora_final};
  }else{
    const {id_sala, fecha_reserva, hora_reserva, hora_final} = body;
    const {id_user} = user;
    return {id_user, id_sala, id_equipo, fecha_reserva, hora_reserva, hora_final};
  }
};
//consultar horario disponible en registro de horario
helpers.horarioDisponible = async (id_sala, dia_semana, hora_inicio, hora_fin)=>{
  const registro = await pool.query('SELECT hora_inicio, hora_fin FROM horario WHERE id_sala=? AND dia_semana=? ORDER BY hora_inicio, hora_fin',[id_sala, dia_semana]);
  let array=[];
  if(registro.length == 0){
    return [];
  }else{
    registro.forEach((item, i) => {
      horario.map((hora, j)=>{
        if(horario[j]>=registro[i].hora_inicio && horario[j]<registro[i].hora_fin) {
          array.push(horario[j]);
        }
      });
    });
    const validacion = array.map(hora =>( hora==hora_inicio || hora==hora_fin));
    return validacion.filter(item=> item==true);
  }
};
//Hora en index
helpers.horaDisponible = async (id_sala, dia_semana)=>{
  const registro = await pool.query('SELECT hora_inicio, hora_fin FROM horario WHERE id_sala=? AND dia_semana=? ORDER BY hora_inicio, hora_fin',[id_sala, dia_semana]);
  let array=[];
  registro.forEach((item, i) => {
    horario.map((hora, j)=>{
      if(horario[j]>=registro[i].hora_inicio && horario[j]<registro[i].hora_fin) {
        array[j]=horario[j];
      }
    });
  });
  const newArray = horario.filter((hora,i)=>{
    return hora!=array[i];
  });
  return newArray;
};
//hora reservas
helpers.horaFinal = async (id_sala, dia_semana)=>{
  const registro = await pool.query('SELECT hora_inicio, hora_fin FROM horario WHERE id_sala=? AND dia_semana=? ORDER BY hora_inicio, hora_fin',[id_sala, dia_semana]);
  let array=[];
  registro.forEach((item, i) => {
    horario.map((hora, j)=>{
      if(horario[j]>registro[i].hora_inicio && horario[j]<=registro[i].hora_fin) {
        array[j]=horario[j];
      }
    });
  });
  const newArray = horario.filter((hora,i)=>{
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
