const bcrypt = require('bcryptjs');
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

module.exports = helpers;
