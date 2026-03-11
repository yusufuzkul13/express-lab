/**
 * Stress Test Script
 *
 * /block endpoint'ine aynı anda 20 istek gönderir.
 * Sync (readFileSync) kullanıldığı için istekler SIRALI işlenir.
 * Her istek bir öncekinin bitmesini bekler → toplam süre uzar.
 *
 * Kullanım: node stress-test.js
 */

const BASE_URL = 'http://localhost:6501';
const TOTAL_REQUESTS = 20;

async function sendRequest(index) {
    const start = Date.now();

    const res = await fetch(`${BASE_URL}/block`);
    const data = await res.text();

    const duration = Date.now() - start;
    console.log(`İstek #${index + 1} → ${res.status} | ${duration}ms`);

    return duration;
}

async function runTest() {
    console.log(`\n🚀 ${TOTAL_REQUESTS} istek aynı anda gönderiliyor → ${BASE_URL}/block\n`);

    const totalStart = Date.now();

    // Promise.all → 20 isteği AYNI ANDA gönderir
    const durations = await Promise.all(
        Array.from({ length: TOTAL_REQUESTS }, (_, i) => sendRequest(i))
    );

    const totalTime = Date.now() - totalStart;
    const avgTime = Math.round(durations.reduce((a, b) => a + b, 0) / durations.length);

    console.log(`\n📊 Sonuçlar:`);
    console.log(`   Toplam süre : ${totalTime}ms`);
    console.log(`   Ortalama    : ${avgTime}ms`);
    console.log(`   En hızlı    : ${Math.min(...durations)}ms`);
    console.log(`   En yavaş    : ${Math.max(...durations)}ms`);

    console.log(`\n💡 Sync olduğu için istekler sırayla işlendi.`);
    console.log(`   Eğer async olsaydı, toplam süre çok daha kısa olurdu.\n`);
}

runTest();
