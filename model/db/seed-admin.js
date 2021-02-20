const chalk = require('chalk');
const bcrypt = require('bcryptjs');
const { hash } = require('../../utils/hash');
const Admin = require('../admin-schema');

module.exports = {
    seedAdminUser: async () => {
      const check = `${chalk.yellow('[?]')} ${chalk.green('checking seed . . .')}`;
      console.log(check);
      const user = await Admin.findOne({email:'riddeekal@gmail.com'});
      if (user) {
        const log = `${chalk.green('SuperAdmin already seeded . . . ')}`;
        return console.log(log);
      }
      const password = 'ilmenauAdmin@123';
      const hashedPassword = hash(password);
      const userDetails = {
        fullName: 'Ilmenau SuperAdmin',
        email: 'riddeekal@gmail.com',
        password: hashedPassword,
      };
  
      await Admin.create(userDetails);
      const log = `${chalk.green('Seeded SuperAdmin . . . ')}`;
      return console.log(log);
    },

}



