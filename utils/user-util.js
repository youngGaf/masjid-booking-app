const Booking = require('../model/booking-schema');
const moment = require('moment');



module.exports = {
    findAlreadyBookedUser: async (userId, prayer) => {
        const todayDate = moment().format('DD/MM/YYYY');

        const todayPrayer = await Booking.find({ bookingDate: todayDate });

        const users = await todayPrayer.filter(user => {
            return user.prayer === prayer;
        });

        if(users){
            for(let user of users){
                if(user.userId.toString() === userId.toString()) return true;
            }
        } else {
            return false;
        }
    },
    
    comparator: (a,b) => {
        if(a.time > b.time){
            return 1;
        }else if(a.time < b.time){
            return -1;
        }
        return 0;
    },
    
    checkBookingLimit: async(batch, prayer) => {
        const todayDate = moment().format('DD/MM/YYYY');

        const todayPrayer = await Booking.find({ bookingDate: todayDate, batch, prayer });

        if(todayPrayer.lenght === 7){
            return true;
        }else{
            return false;
        }
    }
}