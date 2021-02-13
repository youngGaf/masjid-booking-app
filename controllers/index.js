const User =  require('../model/user-schema');
const Solah = require('../model/solat-time');
const Booking = require('../model/booking-schema');
const { errorResponseMsg, successResponseMsg } = require('../utils/response');
const { comparator } = require('../utils/user-util');
const moment = require('moment');


const steal = async (solat, date, res) => {
    const bookings = await Booking.find({ prayer: solat.prayer, bookingDate: date});
    data = {
        solat,
        bookings
    }
    return successResponseMsg(res, 200, 'Currently testing', data);
}

module.exports ={
    solatTime: async(req, res) =>{
        try {
            const registeredDate = moment().format('DD/MM/YYYY');
            const currentTime = moment().format('HH:mm')
            // console.log(currentTime);

            const todaySolat = await Solah.find({ registeredDate });
            todaySolat.sort(comparator);

            const currentSolatTime = todaySolat.some(solat => {
                if(currentTime <= solat.time){
                    steal(solat, registeredDate, res);
                    return;
                }
            })
            console.log(currentSolatTime);

            //return successResponseMsg(res, 200, 'Currently testing');
        } catch (error) {
            return errorResponseMsg(res, 500, error.message);
        }
    }
}