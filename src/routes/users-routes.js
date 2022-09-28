const express = require('express');

const getUsers = require('../controllers/users/getUsers');
const signup = require('../controllers/users/signup');
const login = require('../controllers/users/login');
const logout = require('../controllers/users/logout');
const auth = require('../middlewares/auth');
const imageUpload = require('../middlewares/image-upload');

const router = express.Router();

router.get('/', getUsers);
router.post('/signup', imageUpload.single('image'), signup);
router.post('/login', login);
router.post('/logout', auth, logout);

module.exports = router;
