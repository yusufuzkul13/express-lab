/**
 * Products Controller (Async Versiyon)
 *
 * Bu dosya ürünlerle ilgili tüm iş mantığını içerir.
 * Artık veri işlemleri (dosya okuma/yazma) Service katmanına taşındı.
 *
 * Controller'ın görevi:
 *   1. İsteği al (req)
 *   2. Gerekli verileri ayıkla (params, query, body)
 *   3. Service'i çağır
 *   4. Yanıtı gönder (res)
 */

const productService = require('../services/products.service');

/**
 * GET /api/products
 * Ürünleri listeler — Filtreleme ve Sayfalama (Pagination) destekler
 */
const getProducts = async (req, res, next) => {
    try {
        let { page = 1, limit = 5, ...filters } = req.query;
        page = Number(page);
        limit = Number(limit);

        const allFiltered = await productService.findAll(filters);

        const total = allFiltered.length;
        const start = (page - 1) * limit;
        const data = allFiltered.slice(start, start + limit);

        res.sendResponse({ page, limit, total, data }, 'Ürünler başarıyla listelendi');
    } catch (err) {
        next(err);
    }
};

/**
 * GET /api/products/:id
 * Tek ürün getirir
 */
const getProductById = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const product = await productService.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Ürün bulunamadı',
                code: 404
            });
        }

        res.sendResponse(product);
    } catch (err) {
        next(err);
    }
};

/**
 * POST /api/products
 * Yeni ürün oluşturur
 */
const createProduct = async (req, res, next) => {
    try {
        const { name, price, category, stock } = req.body;

        if (!name || !price || !category || stock === undefined) {
            return res.status(400).json({
                success: false,
                error: 'name, price, category ve stock zorunludur',
                code: 400
            });
        }

        const newProduct = await productService.create(req.body);
        res.sendResponse(newProduct, 'Ürün oluşturuldu', 201);
    } catch (err) {
        next(err);
    }
};

/**
 * PUT /api/products/:id
 * TAM GÜNCELLEME — Tüm alanlar zorunludur
 */
const updateProduct = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const { name, price, category, stock } = req.body;

        if (!name || price === undefined || !category || stock === undefined) {
            return res.status(400).json({
                success: false,
                error: 'PUT ile güncelleme yaparken name, price, category ve stock zorunludur',
                code: 400
            });
        }

        const updatedProduct = await productService.update(id, req.body, false);

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                error: 'Ürün bulunamadı',
                code: 404
            });
        }

        res.sendResponse(updatedProduct, 'Ürün tamamen güncellendi (PUT)');
    } catch (err) {
        next(err);
    }
};

/**
 * PATCH /api/products/:id
 * KISMİ GÜNCELLEME — Sadece gönderilen alanlar güncellenir
 */
const patchProduct = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const updatedProduct = await productService.update(id, req.body, true);

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                error: 'Ürün bulunamadı',
                code: 404
            });
        }

        res.sendResponse(updatedProduct, 'Ürün kısmen güncellendi (PATCH)');
    } catch (err) {
        next(err);
    }
};

/**
 * DELETE /api/products/:id
 * Ürünü siler
 */
const deleteProduct = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const deletedProduct = await productService.remove(id);

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                error: 'Ürün bulunamadı',
                code: 404
            });
        }

        res.sendResponse(deletedProduct, 'Ürün silindi');
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};
