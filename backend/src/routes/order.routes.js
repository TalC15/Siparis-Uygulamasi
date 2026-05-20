const router = require('express').Router();
const c = require('../controllers/order.controller');
const authMiddleware = require('../middleware/auth.middleware');
 
router.get('/',authMiddleware, c.getAll);
router.get('/:id',authMiddleware, c.getDetail);
router.post('/', authMiddleware, c.createOrder);
router.put('/:id',authMiddleware, c.updateOrder);
router.patch('/:id/status', authMiddleware, c.updateStatus);
router.delete('/:id', authMiddleware, c.deleteOrder);

router.get('/chart/order-count',c.getOrderCount);
 
module.exports = router;