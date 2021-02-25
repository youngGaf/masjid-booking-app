const Booking = require('../model/booking-schema');
const User = require('../model/user-schema');
const { errorResponseMsg, successResponseMsg } = require('../utils/response');
const { findAlreadyBookedUser, checkBookingLimit } = require('../utils/user-util');
const moment = require('moment');


module.exports = {
    userBooking: async (req, res) => {
        try {
            const { email, prayer, batch } = req.body;

            const emailExists = await User.findOne({ email });
            if(!emailExists) return errorResponseMsg(res, 400, 'Sorry brother your email is not registered. Please contact admin');

            const bookingLimit = await checkBookingLimit(batch, prayer);
            console.log(bookingLimit);
            if(bookingLimit) return errorResponseMsg(res, 400, `Sorry batch${batch} already filled, try booking with the next batch`)
            
            const userId = emailExists._id;

            // check if user already booked
            const userBooked = await findAlreadyBookedUser(userId, prayer);
            
            if(userBooked) return errorResponseMsg(res, 400,  'Sorry brother you already booked..');

            
            const bookingDate = moment().format('DD/MM/YYYY');
            const name = emailExists.fullName;
            const userBooks = await Booking.create({ name, prayer, batch, bookingDate, userId });
            
            if(!userBooks){
                return errorResponseMsg(res, 400, 'Error: Unable to book');
            }

            return successResponseMsg(res, 200, 'Slot booked successfully!', userBooks);
        } catch (error) {
            return errorResponseMsg(res, 500, error.message);
        }    
    },
    userUnbook: async (req, res) => {
        try {
            const { email, prayer } = req.body;
            
            const emailExists = await User.findOne({ email });

            if(!emailExists) return errorResponseMsg(res, 400, 'Sorry brother your email is not registered. Please contact admin');
            
            const userId = emailExists._id;
            
            // check if user already booked
            const userBooked = await findAlreadyBookedUser(userId, prayer);

            if(!userBooked) return errorResponseMsg(res, 400,  'Sorry brother you have not booked..');

            const bookingDate = moment().format('DD/MM/YYYY');
            const userUnbooks = await Booking.deleteOne({ userId, bookingDate, prayer });

            if(!userUnbooks){
                return errorResponseMsg(res, 400, 'Unable to unbook user');
            }

            return successResponseMsg(res, 200, 'Successfully unbooked slot', userUnbooks);

        } catch (error) {
            return errorResponseMsg(res, 500, error.message);
        }
    },

    bookingList: async (req, res) =>{
        try {
            const { batch, prayer } = req.query;

            const bookingDate = moment().format('DD/MM/YYYY');

            const bookingList = await Booking.find({batch, prayer, bookingDate})
    
            if(bookingList.length === 0) return errorResponseMsg(res, 400, 'No bookings available for this time', bookingList);
    
            return successResponseMsg(res, 200, 'Booking list fetched successfully', bookingList);
            
        } catch (error) {
            return errorResponseMsg(res, 500, error.message);  
        }

    }  
    
}