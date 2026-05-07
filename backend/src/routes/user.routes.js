const router = require('express').Router();
const c = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/',authMiddleware, c.getAll);
router.post('/',authMiddleware, c.create);
router.put('/:id',authMiddleware, c.update);
router.delete('/:id',authMiddleware, c.delete);
module.exports = router;