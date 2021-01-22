const User =  require('../model/user-schema');
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
    
  }
}