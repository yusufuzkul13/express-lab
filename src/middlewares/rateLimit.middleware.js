const { rateLimit } = require('express-rate-limit');

/**
 * Rate Limiter Middleware
 * 
 * Bir IP'den gelen istek sayısını sınırlandırır.
 * Bu, Brute-force ve DoS saldırılarına karşı temel bir koruma sağlar.
 */
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 dakika
    limit: 100, // Her 15 dakikada en fazla 100 istek
    standardHeaders: 'draft-7', // combined `RateLimit` header
    legacyHeaders: false, // `X-RateLimit-*` header'larını kapat
    message: {
        status: 429,
        error: 'Cok fazla istek gonderildi, lutfen 15 dakika sonra tekrar deneyin.'
    }
});

module.exports = limiter;
