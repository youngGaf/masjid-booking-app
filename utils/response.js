/* eslint-disable max-len */
const errorResponseMsg = (res, status, message, data) => res.status(status).json({
  status: 'error',
  message,
  data
});

const successResponseMsg = (res, status = 200, message, data) => res.status(status).json({
  status: 'success',
  message,
  data
});


module.exports.errorResponseMsg = errorResponseMsg;
module.exports.successResponseMsg = successResponseMsg;
