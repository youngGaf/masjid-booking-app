const mongoose = require('mongoose');

const connect = async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(process.env.MONGODB_URI,
        {
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false,
          useUnifiedTopology: true
        }).then(() => {
        console.log('successfully connected to mongodb atlas');
      });
    } catch (err) {
      console.error('App starting error:', err.stack);
    }
  }
};

const disconnect = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    console.log('Database closed successfully');
  }
};

module.exports = {
  connect,
  disconnect
};