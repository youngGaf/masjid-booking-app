const { verifyJWT } = require('../../utils/auth-token');
const { errorResponseMsg } = require('../../utils/response');
const Admin = require('../../model/admin-schema');

module.exports = {
  isLoggedIn: async (req, res, next) => {
    try {
      const token = req.header('x-auth-token');
      if (!token) return errorResponseMsg(res, 401, 'Unauthorized user. Log in and try again');
      const decoded = await verifyJWT(token);
      const user = await Admin.findOne({_id: decoded.user});
      if (!user) return errorResponseMsg(res, 401, 'User not found');
      req.user = user;
      req.token = token;
      return next();
    } catch (err) {
      return errorResponseMsg(res, 500, err.message);
    }
  }
};
