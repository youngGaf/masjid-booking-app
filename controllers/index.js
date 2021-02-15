const User =  require('../model/user-schema');
const Solah = require('../model/solat-time');
const Booking = require('../model/booking-schema');
const { errorResponseMsg, successResponseMsg } = require('../utils/response');
const { comparator } = require('../utils/user-util');
const moment = require('moment');

// Determine the bookings count for each batch
const countBookings = async (solat, date) => {
        const bookings = await Booking.find({ prayer: solat.prayer, bookingDate: date});
        
        var count1 = 0, count2=0, count3 =0, count4 =0;
        
        for(let i of bookings){
            switch(i.batch){
                case ('2'):
                    count2 += 1;
                    break;
                case ('3'):
                    count3 += 1;
                    break;
                case ('4'):
                    count4 += 1;
                    break;
                default:
                    count1 +=1;
            }
        }
        const bookingCount = [count1, count2, count3, count4];
    
        data = {
            solat,
            bookingCount
        }
        return data;
}

module.exports ={
    solatTime: async(req, res) =>{
        try {
            const registeredDate = moment().format('DD/MM/YYYY');
            const currentTime = moment().format('HH:mm');

            const data = {
                solat: {prayer: 'subhi'},
                bookingCount: [0,0,0,0]
            }

            // Get all solat for today and sort in place
            const todaySolat = await Solah.find({ registeredDate });

            if(todaySolat.length < 1) return errorResponseMsg(res, 404, 'No booking data for today', data);

            todaySolat.sort(comparator);


            for(let i=0; i<todaySolat.length; i++){
                if(currentTime <= todaySolat[i].time){
                    const data = await countBookings(todaySolat[i], registeredDate);
                    return successResponseMsg(res, 200, 'Booking count data loaded successfully', data)
                }else if((todaySolat[i].time < currentTime) && (i === todaySolat.length - 1)){
                    console.log(data);
                    return successResponseMsg(res, 200, 'No more solat available for today', data);
                }
            }

        } catch (error) {
            return errorResponseMsg(res, 500, error.message);
        }
    }
}