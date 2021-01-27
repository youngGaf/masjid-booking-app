const User =  require('../model/user-schema');
const Solah = require('../model/solat-time');
const Booking = require('../model/booking-schema');
const { errorResponseMsg, successResponseMsg } = require('../utils/response');


module.exports = {
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
        const { prayer, time, batch } = req.body;
        const registerSolah = await Solah.create({ prayer, time, batch });

        if(!registerSolah) return errorResponseMsg(res, 400, 'Error registering solat time');

        return successResponseMsg(res, 200, 'Successfully added prayer time', registerSolah);

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