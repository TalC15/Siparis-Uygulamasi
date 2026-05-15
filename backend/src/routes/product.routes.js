const router = require('express').Router();
const c = require('../controllers/product.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/',authMiddleware, c.getProducts);
router.post('/',authMiddleware, c.postProduct);
router.put('/:id',authMiddleware, c.updateProduct);
router.delete('/:id',authMiddleware, c.deleteProduct);

module.exports = router;