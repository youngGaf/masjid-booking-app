const router = require('express').Router();
const { adminAddUser, adminGetUsers } = require('../controllers/admin-user');
const { userBooking, userUnbook } =require('../controllers/user-controller');


router.get('/home', (req, res) => {
    res.send('Hello world');
});
router.get('/admin/all-users', adminGetUsers);
router.post('/admin/add-user', adminAddUser);
router.post('/user/book', userBooking);
router.delete('/user/unbook', userUnbook);

module.exports = router;