/**
 * Request Logger Middleware
 *
 * Her gelen HTTP isteğini konsola loglar.
 * Şu bilgileri gösterir:
 *   - Tarih/Saat
 *   - HTTP Method (GET, POST, PUT, DELETE)
 *   - İstek yapılan URL
 *   - Yanıt süresi (ms)
 *   - Status code
 *
 * Middleware olarak çalışır:
 *   İstek gelir → log başlar → next() ile sonraki adıma geçer
 *   → Yanıt dönerken ('finish' event) süre ve status loglanır
 *
 * Kullanım (index.js'de):
 *   app.use(requestLogger);
 *   ⚠️ Route'lardan ÖNCE tanımlanmalı, yoksa loglamaz!
 */

const requestLogger = (req, res, next) => {
    // İstek anındaki zamanı kaydet
    const start = Date.now();

    // res.on('finish') → Yanıt tamamen gönderildiğinde tetiklenir
    res.on('finish', () => {
        const duration = Date.now() - start;
        const timestamp = new Date().toLocaleString('tr-TR');

        console.log(
            `[${timestamp}] ${req.method} ${req.originalUrl} → ${res.statusCode} (${duration}ms)`
        );
    });

    // Bir sonraki middleware/route'a geç
    next();
};

module.exports = requestLogger;
