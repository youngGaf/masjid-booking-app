const bcrypt = require('bcryptjs');

module.exports = {
  hash: (value) => {
    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(value, salt);
    return hashed;
  },

  comparePassword: (password, hashedPassword) => {
    const result = bcrypt.compare(password, hashedPassword);
    return result;
  }
};
