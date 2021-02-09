const router = require('express').Router();
const { adminAddUser, adminGetUsers, adminAddSolah, adminGetAllBookings } = require('../controllers/admin-user');
const { userBooking, userUnbook, bookingList } =require('../controllers/user-controller');


router.get('/home', (req, res) => {
    res.send('Hello world');
});
router.get('/admin/all-users', adminGetUsers);
router.get('/admin/all-bookings', adminGetAllBookings);
router.post('/admin/add-user', adminAddUser);
router.post('/admin/add-solah', adminAddSolah);
router.post('/user/book', userBooking);
router.delete('/user/unbook', userUnbook);
router.get('/user/bookingList', bookingList);

module.exports = router;