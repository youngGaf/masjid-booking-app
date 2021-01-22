const router = require('express').Router();
const { adminAddUser, adminGetUsers } = require('../controllers/admin-user')


router.get('/home', (req, res) => {
    res.send('Hello world');
});
router.get('/admin/all-users', adminGetUsers);
router.post('/admin/add-user', adminAddUser);

module.exports = router;