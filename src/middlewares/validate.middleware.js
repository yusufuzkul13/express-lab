/**
 * Validation Middleware
 * 
 * req.body kontrolünü controller'dan ayırır.
 * Bu sayede controller sadece iş mantığına odaklanır.
 */

/**
 * Kullanıcı oluşturma/güncelleme şeması doğrulaması
 */

const { body, validationResult } = require('express-validator');

const validateUser = [
    body('email').isEmail().withMessage('Gecersiz email adresi'),
    body('name').isString().withMessage('Gecersiz name. String olmali ve bos olmamali.'),
    body('password').isLength({ min: 6 }).withMessage('Password en az 6 karakter olmalidir.'),

    (req, res, next) => {
        console.log('DEBUG: req.body =', req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: errors.array()
            });
        }
        
        next(); // Her şey yolundaysa bir sonraki middleware/controller'a geç
    }
];

module.exports = {
    validateUser
};
