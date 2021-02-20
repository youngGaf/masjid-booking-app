const router = require('express').Router();
const { 
    adminAddUser, adminGetUsers, 
    adminAddSolah, adminGetAllBookings, 
    adminDeleteSolah, adminGetSolah , adminLogin
} = require('../controllers/admin-user');
const { userBooking, userUnbook, bookingList } =require('../controllers/user-controller');
const { solatTime, solatToday } = require('../controllers/index');
// const { isLoggedIn} = require('./middlewares/auth');


// Index
router.get('/index', solatTime);
router.get('/solat-today', solatToday);


// Admin
router.post('/admin/auth', adminLogin);
router.get('/admin/all-users', adminGetUsers);
router.get('/admin/all-bookings', adminGetAllBookings);
router.post('/admin/add-user', adminAddUser);
router.post('/admin/add-solah', adminAddSolah);
router.get('/admin/all-solah', adminGetSolah);
router.delete('/admin/delete-solah', adminDeleteSolah);

// Users
router.post('/user/book', userBooking);
router.delete('/user/unbook', userUnbook);
router.get('/user/bookingList', bookingList);

module.exports = router;