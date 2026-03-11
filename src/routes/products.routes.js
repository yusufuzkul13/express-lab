/**
 * Products Routes
 *
 * Ürün endpoint'lerinin URL tanımları.
 * app.use('/api/products', productsRouter) ile bağlandığı için
 * buradaki '/' → '/api/products' anlamına gelir.
 */

const express = require('express');
const router = express.Router();

const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
} = require('../controllers/products.controller');

router.get('/', getProducts);           // GET    /api/products
router.get('/:id', getProductById);     // GET    /api/products/:id
router.post('/', createProduct);        // POST   /api/products
router.put('/:id', updateProduct);      // PUT    /api/products/:id    → Tam güncelleme
router.patch('/:id', patchProduct);     // PATCH  /api/products/:id    → Kısmi güncelleme
router.delete('/:id', deleteProduct);   // DELETE /api/products/:id

module.exports = router;
