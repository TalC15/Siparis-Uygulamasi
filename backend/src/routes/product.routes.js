const express = require('express');
const router = express.Router();
const controller = require('../controllers/product.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/',authMiddleware,controller.getProducts);
router.post('/',authMiddleware,controller.postProduct);
router.put('/:id',authMiddleware,controller.updateProduct);
router.delete('/:id',authMiddleware,controller.deleteProduct);

module.exports = router;