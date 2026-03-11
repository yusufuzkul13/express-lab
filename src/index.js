/**
 * =========================================================
 * API PLAYGROUND - EXPRESS.JS (Modüler Yapı)
 * =========================================================
 *
 * Bu dosya uygulamanın GİRİŞ NOKTASIDIR (entry point).
 * Sadece şunları yapar:
 *   1. Express app oluşturur
 *   2. Genel middleware'leri ekler (express.json)
 *   3. Genel route'ları tanımlar (health, search, headers, error, test-error)
 *   4. Router modüllerini bağlar (users, products)
 *   5. Error middleware'lerini ekler
 *   6. Server'ı başlatır
 *
 * İş mantığı (business logic) burada YOKTUR.
 * Her şey kendi dosyasında organize edilmiştir.
 *
 * Akış:
 *   İstek → express.json() → Route eşleşmesi → Controller → Yanıt
 *                                    ↓ (hata varsa)
 *                              Error Middleware → Hata Yanıtı
 */

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// Route modülleri
const usersRouter = require('./routes/users.routes');
const productsRouter = require('./routes/products.routes');

// Middleware modülleri
const { notFoundHandler, globalErrorHandler } = require('./middlewares/error.middleware');
const requestLogger = require('./middlewares/logger.middleware');
const limiter = require('./middlewares/rateLimit.middleware');
const responseWrapper = require('./middlewares/response.middleware');

// Utils
const ApiError = require('./utils/apiError');

const app = express();
const PORT = 6501;

/* ---------------------------------------------------------
   GENEL MIDDLEWARE'LER
   --------------------------------------------------------- */

// JSON body okuyabilmek için (POST/PUT isteklerinde req.body kullanmak için gerekli)
app.use(express.json());

// Response Wrapper Middleware
app.use(responseWrapper);

// CORS - Farklı kökenlerden gelen isteklere izin ver (Frontend, vs.)
app.use(cors());

// Rate Limiter - IP bazlı istek sınırlaması
app.use(limiter);

// Her isteği konsola logla (method, url, status, süre)
app.use(requestLogger);

/* ---------------------------------------------------------
   GENEL ROUTE'LAR
   Belirli bir kaynağa (users/products) ait olmayan endpoint'ler
   --------------------------------------------------------- */

// Health Check — API'nin durumunu kontrol eder
app.get('/api/health', (req, res) => {
    res.sendResponse({ version: '1.0.0' }, 'API calisiyor');
});

// Query Params Örneği — ?keyword=cat
app.get('/api/search', (req, res) => {
    const { keyword } = req.query;

    if (!keyword) {
        return res.status(400).json({
            success: false,
            error: 'Keyword parametresi zorunludur',
            code: 400
        });
    }

    res.sendResponse({
        keyword,
        results: [`${keyword} 1`, `${keyword} 2`]
    }, 'Arama başarıyla tamamlandı');
});

// Header Okuma Örneği
app.get('/api/headers', (req, res) => {
    const userAgent = req.headers['user-agent'];
    res.sendResponse({ userAgent }, 'Header bilgisi alındı');
});

// Bilinçli Hata Dönen API
app.get('/api/error', (req, res) => {
    res.status(500).json({
        success: false,
        error: 'Bilincli test hatasi',
        code: 500
    });
});

// Test Error — ApiError sınıfını kullanarak next(err) ile error middleware'e gönderir
app.get('/api/test-error', (req, res, next) => {
    try {
        throw new ApiError(400, 'Bu bir test hatasidir');
    } catch (err) {
        next(err); // global error middleware'e gönder
    }
});

// Sync Kullanımın Zararını Görmek İçin
app.get('/block', (req, res) => {
    const data = fs.readFileSync(path.join(__dirname, '../products.json'), 'utf-8');
    res.send("OK");
});

// Async Kullanımın Faydasını Görmek İçin
app.get('/unblock', async (req, res) => {
    const data = await fs.promises.readFile(path.join(__dirname, '../products.json'), 'utf-8');
    res.send("OK");
});

/* ---------------------------------------------------------
   KAYNAK ROUTE'LARI (Resource Routes)

   app.use('/api/users', usersRouter) →
     usersRouter içindeki '/' → '/api/users' olur
     usersRouter içindeki '/:id' → '/api/users/:id' olur
   --------------------------------------------------------- */

app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);

/* ---------------------------------------------------------
   ERROR MIDDLEWARE'LERİ
   ⚠️ Bunlar EN SONDA tanımlanmalı!
   Önce route'lar, sonra 404, sonra global error handler
   --------------------------------------------------------- */

app.use(notFoundHandler);
app.use(globalErrorHandler);

/* ---------------------------------------------------------
   SERVER BAŞLATMA
   --------------------------------------------------------- */

app.listen(PORT, () => {
    console.log(`🚀 API Playground çalışıyor → http://localhost:${PORT}`);
});
