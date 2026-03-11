/*
    Auth Middleware

    Basit bir API key veya JWT token kontrolü yap (header'dan oku, doğrula)
*/

const authHandler = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        return res.status(401).json({
            error: 'API Key bulunamadı'
        });
    }

    if (apiKey == process.env.API_KEY) {
        next();
    } else {
        return res.status(401).json({
            error: 'API Key geçersiz'
        });
    }
};

module.exports = {
    authHandler
};