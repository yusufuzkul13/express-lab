/**
 * Users Controller
 *
 * Bu dosya kullanıcılarla ilgili tüm iş mantığını (business logic) içerir.
 * Route dosyası sadece URL tanımlar, asıl işi yapan fonksiyonlar burada.
 *
 * Her fonksiyon (req, res) parametreleri alır:
 *   - req: İstemciden gelen istek bilgileri (params, query, body, headers)
 *   - res: Sunucudan gönderilecek yanıt
 */

const userService = require('../services/users.service');

/**
 * GET /api/users
 * Tüm kullanıcıları listeler
 */
const getUsers = (req, res) => {
    const data = userService.findAll();
    res.sendResponse(data, 'Kullanıcılar başarıyla listelendi');
};

/**
 * GET /api/users/:id
 * Route params ile tek kullanıcı getirir
 *
 * req.params.id → URL'deki :id değeri (string gelir, Number'a çevirmek lazım)
 */
const getUserById = (req, res) => {
    const id = Number(req.params.id);
    const user = userService.findById(id);

    if (!user) {
        return res.status(404).json({
            success: false,
            error: 'Kullanıcı Bulunamadı',
            code: 404
        });
    }
    res.sendResponse(user);
};

/**
 * POST /api/users
 * Body'den (JSON) name ve email alarak yeni kullanıcı oluşturur
 *
 * req.body → POST/PUT isteklerinde gönderilen JSON verisi
 */
const createUser = (req, res) => {
    const newUser = userService.create(req.body);
    res.sendResponse(newUser, 'Kullanıcı oluşturuldu', 201);
};

/**
 * PUT /api/users/:id
 * TAM GÜNCELLEME (Full Replace)
 *
 * Tüm alanlar ZORUNLUDUR. Kaynağı baştan yazar.
 */
const updateUser = (req, res) => {
    const id = Number(req.params.id);
    const updatedUser = userService.update(id, req.body, false);

    if (!updatedUser) {
        return res.status(404).json({
            success: false,
            error: 'Kullanıcı bulunamadı',
            code: 404
        });
    }

    res.sendResponse(updatedUser, 'Kullanıcı tamamen güncellendi (PUT)');
};

/**
 * PATCH /api/users/:id
 * KISMİ GÜNCELLEME (Partial Update)
 *
 * Sadece gönderilen alanlar güncellenir, geri kalanı aynen kalır.
 */
const patchUser = (req, res) => {
    const id = Number(req.params.id);
    const updatedUser = userService.update(id, req.body, true);

    if (!updatedUser) {
        return res.status(404).json({
            success: false,
            error: 'Kullanıcı bulunamadı',
            code: 404
        });
    }

    res.sendResponse(updatedUser, 'Kullanıcı kısmen güncellendi (PATCH)');
};

/**
 * DELETE /api/users/:id
 * Kullanıcıyı siler
 */
const deleteUser = (req, res) => {
    const id = Number(req.params.id);
    const deletedUser = userService.remove(id);

    if (!deletedUser) {
        return res.status(404).json({
            success: false,
            error: 'Kullanıcı bulunamadı',
            code: 404
        });
    }

    res.sendResponse(deletedUser, 'Kullanıcı silindi');
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    patchUser,
    deleteUser
};
