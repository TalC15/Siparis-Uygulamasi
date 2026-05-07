const router = require('express').Router();
const c = require('../controllers/order.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/',authMiddleware, c.getAll);
router.get('/:id',authMiddleware, c.getDetail);
router.post('/',authMiddleware, c.createOrder);
router.put('/:id',authMiddleware,c.updateOrder)
router.delete('/:id',authMiddleware, c.deleteOrder);

module.exports = router;