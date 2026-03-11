/**
 * Error Middlewares
 *
 * Express'te middleware sırası ÖNEMLİDİR!
 * Bu middleware'ler tüm route'lardan SONRA tanımlanmalıdır.
 *
 * 1) notFoundHandler  → Hiçbir route eşleşmezse 404 döner
 * 2) globalErrorHandler → next(err) ile gönderilen hataları yakalar
 *
 * Not: globalErrorHandler'ın 4 parametresi olması ZORUNLUDUR (err, req, res, next).
 * Express, 4 parametreli fonksiyonları "error middleware" olarak tanır.
 */

/**
 * 404 Handler
 * Tanımlı olmayan bir endpoint'e istek geldiğinde çalışır
 */
const notFoundHandler = (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint bulunamadı',
        code: 404
    });
};

/**
 * Global Error Handler
 * next(err) çağrıldığında devreye girer
 *
 * err.status → ApiError'dan gelen özel status code
 * Yoksa varsayılan 500 (Internal Server Error) kullanılır
 */
const globalErrorHandler = (err, req, res, next) => {
    // Geliştirme ortamında hatayı konsola bas
    console.error(`[HATA] ${req.method} ${req.url}:`, err.message || err);

    const status = err.status || 500;
    const message = err.message || 'Sunucuda beklenmedik bir hata oluştu';

    res.status(status).json({
        success: false,
        error: message,
        code: status
    });
};

module.exports = {
    notFoundHandler,
    globalErrorHandler
};
