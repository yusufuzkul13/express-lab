/**
 * ApiError - Özel hata sınıfı
 *
 * Normal Error sınıfını genişleterek HTTP status code taşıyabilen
 * bir hata nesnesi oluşturur. Bu sayede error middleware'inde
 * hangi status code ile yanıt döneceğimizi biliriz.
 *
 * Kullanım:
 *   throw new ApiError(404, 'Kullanıcı bulunamadı');
 */

class ApiError extends Error {
    constructor(status, message) {
        super(message);    // Error sınıfının constructor'ına mesajı gönder
        this.status = status;  // HTTP status code'u ekstra olarak sakla
    }
}

module.exports = ApiError;
