/**
 * Products Service (Async Versiyon)
 *
 * Bu dosya ürünlerle ilgili veritabanı (şimdilik json dosyası) işlemlerini yapar.
 * İş mantığı (Business Logic) burada döner.
 *
 * ⚡ SYNC vs ASYNC farkı:
 *   SYNC: Dosya okunana kadar sunucu DURUR.
 *   ASYNC: Dosya okunurken sunucu diğer isteklere cevap verebilir (fs.promises).
 */

const fs = require('fs');
const path = require('path');

// products.json dosyasının yolu
const productsFilePath = path.join(__dirname, '../../products.json');

/**
 * Helper: Dosyadan ürünleri oku (ASYNC)
 */
const getProductsFromFile = async () => {
    try {
        const data = await fs.promises.readFile(productsFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        if (err.code === 'ENOENT') return []; // Dosya yoksa boş dizi dön
        throw err;
    }
};

/**
 * Helper: Ürünleri dosyaya yaz (ASYNC)
 */
const saveProducts = async (products) => {
    await fs.promises.writeFile(productsFilePath, JSON.stringify(products, null, 2), 'utf-8');
};

/**
 * Tüm ürünleri filtreleme ile getirir
 */
const findAll = async (filters = {}) => {
    let products = await getProductsFromFile();
    let { name, categoryName, minPrice, maxPrice } = filters;

    let result = products;

    // Filtreleme mantığı
    if (name) result = result.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
    if (categoryName) result = result.filter(p => p.category.toLowerCase() === categoryName.toLowerCase());
    if (minPrice) result = result.filter(p => p.price >= Number(minPrice));
    if (maxPrice) result = result.filter(p => p.price <= Number(maxPrice));

    return result;
};

/**
 * ID'ye göre ürün bulur
 */
const findById = async (id) => {
    const products = await getProductsFromFile();
    return products.find(p => p.id === id);
};

/**
 * Yeni ürün oluşturur
 */
const create = async (productData) => {
    const products = await getProductsFromFile();
    const newProduct = {
        id: products.length ? products[products.length - 1].id + 1 : 1,
        ...productData,
        price: Number(productData.price),
        stock: Number(productData.stock)
    };

    products.push(newProduct);
    await saveProducts(products);
    return newProduct;
};

/**
 * Ürünü günceller (PUT veya PATCH)
 */
const update = async (id, productData, isPartial = false) => {
    const products = await getProductsFromFile();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;

    if (isPartial) {
        // PATCH: Sadece gelen alanları üstüne yaz
        products[index] = { ...products[index], ...productData };
        if (productData.price !== undefined) products[index].price = Number(productData.price);
        if (productData.stock !== undefined) products[index].stock = Number(productData.stock);
    } else {
        // PUT: Kaynağı tamamen güncelle
        products[index] = {
            id,
            ...productData,
            price: Number(productData.price),
            stock: Number(productData.stock)
        };
    }

    await saveProducts(products);
    return products[index];
};

/**
 * Ürünü siler
 */
const remove = async (id) => {
    const products = await getProductsFromFile();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;

    const deletedProduct = products.splice(index, 1)[0];
    await saveProducts(products);
    return deletedProduct;
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};
