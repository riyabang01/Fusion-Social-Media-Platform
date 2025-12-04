const router = require('express').Router();
const authCtrl = require('../controllers/authCtrl');
const auth = require('../middleware/auth');

// User Auth Routes
router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);

// Admin Auth Routes
router.post("/register_admin", auth, authCtrl.registerAdmin);
router.post("/admin_login", authCtrl.adminLogin);

// Protected User Actions
router.post("/changePassword", auth, authCtrl.changePassword);

// Logout & Token Refresh
router.post("/logout", authCtrl.logout);
router.post("/refresh_token", authCtrl.generateAccessToken);

module.exports = router;
