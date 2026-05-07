const express = require('express')
const router = express.Router();
const c = require('../controllers/auth.controller');

router.post('/register', c.register);
router.post('/login', c.login);
router.get('/verify',c.verify)

module.exports = router;