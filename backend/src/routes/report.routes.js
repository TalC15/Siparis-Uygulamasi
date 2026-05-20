const router = require('express').Router();
const c = require('../controllers/report.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/product-reports',authMiddleware, c.getProductReports);
router.get('/order-detail-reports',authMiddleware,c.getOrderDetailReports)

module.exports = router;