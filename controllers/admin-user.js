const User =  require('../model/user-schema');
const Solah = require('../model/solat-time');
const Booking = require('../model/booking-schema');
const Admin = require('../model/admin-schema');
const { errorResponseMsg, successResponseMsg, sessionSuccessResponseMsg } = require('../utils/response');
const { signJWT } = require('../utils/auth-token');
const { comparePassword } = require('../utils/hash')
const moment = require('moment');

module.exports = {
    adminLogin: async (req,res) => {
        try {
          
          const { password, email } = req.body;
          const adminExist = await Admin.findOne({ email: email });

          if (!adminExist) {
            return errorResponseMsg(res, 401, 'Invalid email or password');
          }
          
          const passwordCheck = await comparePassword(password, adminExist.password);
    
          if (!passwordCheck) {
            return errorResponseMsg(res, 401, 'Invalid email or password');
          }
          const token = signJWT({
            email,
            user: adminExist.id
          });
          return sessionSuccessResponseMsg(res, 200, 'Login successful', token, adminExist.email);

        } catch (error) {
          return errorResponseMsg(res, 500, error.message);
        }
    },

    adminAddUser: async (req, res) => {
        try {
          // get data from body
          const { fullName, email } = req.body;

          // find user in db and check if user already exist
          const user = await User.findOne({ email });
          if(user) {
            return errorResponseMsg(res, 400, 'User already exist');
          }

          // create user in db and return error if not successfull
          const createUser = await User.create({ fullName, email });
          if(!createUser){ 
            return errorResponseMsg(res, 400, 'Error creating user');
          }
          
          // return success response message on successfully creating user
          return successResponseMsg(res, 200, 'User successfully created', createUser); 
           
        } catch (error) {
          return errorResponseMsg(res, 500, error.message);
        }
      
    },

    adminGetUsers: async (req, res) => {
      try {
        // find all users in db and send response back to admin
        const users = await User.find();
        return successResponseMsg(res, 200, 'Successfully fetched all users', users); 
         
      } catch (error) {
        return errorResponseMsg(res, 500, error.message);
      }
    },

    adminAddSolah: async (req, res) =>{
      try {
        const { prayer, time, batch, batches, date } = req.body;

        const registeredDate = moment(date).format('DD/MM/YYYY');

        const registerSolah = await Solah.create({ prayer, time, batch, batches, registeredDate });
        

        if(!registerSolah) return errorResponseMsg(res, 400, 'Error registering solat time');

        return successResponseMsg(res, 200, 'Successfully added prayer time', registerSolah);

      } catch (error) {
        return errorResponseMsg(res, 500, error.message);
      }
    },

    adminGetSolah: async (req, res) =>{
      try {
        const allSolah = await Solah.find();
      
        if(allSolah.length < 1) return successResponseMsg(res, 200, 'No registered solat time');

        return successResponseMsg(res, 200, 'Successfully fetched all registered prayer time', allSolah);

      } catch (error) {
        return errorResponseMsg(res, 500, error.message);
      }
    },

    adminDeleteSolah: async (req, res) =>{
      try {
        const allSolah = await Solah.deleteMany();
      
        if(!allSolah) return successResponseMsg(res, 200, 'No registered solat time');

        return successResponseMsg(res, 200, 'Successfully deleted all registered prayer time', allSolah);

      } catch (error) {
        return errorResponseMsg(res, 500, error.message);
      }
    },

    adminGetAllBookings: async (req, res) => {
      try {
        const allBookings = await Booking.find();
        
        return successResponseMsg(res, 200, 'Successfully fetched all bookings', allBookings); 
      } catch (error) {
        return errorResponseMsg(res, 500, error.message);
      }
    }
}