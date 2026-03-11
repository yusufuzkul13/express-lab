# Express.js Modern API Architecture Lab

Express.js ile geliştirilmiş; servis katmanı, modüler middleware'ler ve modern mimari prensipleri barındıran kapsamlı API laboratuvarı.

## Proje Hakkında

Bu proje, Node.js ve Express.js kullanarak ölçeklenebilir ve temiz bir RESTful API mimarisi kurmak için hazırlanmış bir şablon/laboratuvar ortamıdır. Gelişmiş routing, controller/service ayrımı ve özel middleware yapıları içerir.

### Öne Çıkan Özellikler

*   **Katmanlı Mimari:** Routes, Controllers ve Services katmanlarının net bir şekilde ayrılması.
*   **Global Error Handling:** Merkezi hata yönetimi ve ApiError sınıfı ile standartlaştırılmış hata yanıtları.
*   **Response Middleware:** API yanıtlarını (başarı/hata) tek bir formata dönüştüren yapı (`res.sendResponse`).
*   **Rate Limiting:** `express-rate-limit` ile IP bazlı istek sınırlandırması.
*   **Validation:** `express-validator` kullanarak gelen istek verilerinin doğrulanması.
*   **Auth Middleware:** Basit API Key doğrulaması (`x-api-key` header üzerinden).
*   **Yönlendirme (Routing):** Express Router ile modüler route yönetimi.
*   **SOAP Entegrasyonu:** (Opsiyonel) `soap-demo` klasöründe yer alan ayrı bir SOAP API testi.

## Kurulum ve Çalıştırma

Projeyi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyin:

### 1. Gereksinimler
*   Node.js (v18 veya daha yeni bir sürüm önerilir)
*   npm (Node.js ile birlikte gelir)
*   Git

### 2. Projeyi İndirme ve Bağımlılıkları Yükleme

Terminali açın ve projeyi klonlayıp dizinine gidin, ardından paketleri yükleyin:
```bash
git clone https://github.com/yusufuzkul13/express-lab.git
cd express-lab
npm install
```

### 3. Çevre Değişkenleri (Environment Variables)

Proje kök dizininde `.env.example` dosyasını kopyalayarak `.env` adında yeni bir dosya oluşturun:

```bash
cp .env.example .env
```
*(Windows kullanıcıları kopyala-yapıştır yapıp adını `.env` olarak değiştirebilir.)*

Ardından `.env` dosyasını açıp gerekli bilgileri düzenleyebilirsiniz. Örnek:
```env
PORT=6501
API_KEY=supersecretkey
```

### 4. Projeyi Başlatma

Aşağıdaki komutla geliştirme sunucusunu başlatabilirsiniz:

```bash
npm start
```

Uygulama başarıyla başlatıldığında terminalde şu çıktıyı göreceksiniz:
```
🚀 API Playground çalışıyor → http://localhost:6501
```

## API Endpoint'leri

Mevcut bazı temel uç noktalar:

*   **GET** `/api/health` - API durum kontrolü.
*   **GET** `/api/users` - Kullanıcı listesi (Header'da `x-api-key: supersecretkey` gerektirir).
*   **POST** `/api/users` - Yeni kullanıcı ekleme (Body validation testleri içerir).
*   **GET** `/api/products` - Ürün listesi (Async dosya okuma örneği).

## Klasör Yapısı

```
src/
├── controllers/    # İstekleri karşılayan ve servisleri çağıran işlevler
├── middlewares/    # Araya giren katmanlar (Auth, Error, Logger, Rate Limit vb.)
├── routes/         # Endpoint tanımlamaları ve yönlendirmeler
├── services/       # İş mantığının (Business Logic) yürütüldüğü yer
├── utils/          # Yardımcı sınıflar (Örn: ApiError)
└── index.js        # Ana giriş dosyası (Express kurulumu)
```
