/**
 * Users Routes
 *
 * Bu dosya sadece URL tanımı yapar ve ilgili controller fonksiyonuna yönlendirir.
 * İş mantığı (business logic) burada OLMAMALI, controller'da olmalı.
 *
 * express.Router() → Mini bir app gibi düşün.
 * Ana app'e app.use('/api/users', usersRouter) şeklinde bağlanır.
 * Bu yüzden buradaki '/' aslında '/api/users' anlamına gelir.
 */

const express = require('express');
const router = express.Router();

// Controller fonksiyonlarını içe aktar
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    patchUser,
    deleteUser
} = require('../controllers/users.controller');

const { validateUser } = require('../middlewares/validate.middleware');
const { authHandler } = require('../middlewares/auth.middleware');

// Route tanımları
// Not: '/' burada '/api/users' demek (prefix index.js'de ekleniyor)
router.get('/', authHandler, getUsers);           // GET    /api/users
router.get('/:id', getUserById);     // GET    /api/users/:id
router.post('/', validateUser, createUser);        // POST   /api/users (Validator eklendi)
router.put('/:id', validateUser, updateUser);      // PUT    /api/users/:id (Validator eklendi)
router.patch('/:id', patchUser);     // PATCH  /api/users/:id    → Kısmi güncelleme
router.delete('/:id', deleteUser);   // DELETE /api/users/:id

module.exports = router;
