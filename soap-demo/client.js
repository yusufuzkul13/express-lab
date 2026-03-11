const soap = require('soap');

const url = 'http://localhost:8001/calculator?wsdl';
const args = { intA: 10, intB: 20 };

soap.createClient(url, (err, client) => {
    if (err) {
        console.error('Hata oluştu:', err);
        return;
    }

    client.Add(args, (err, result) => {
        if (err) {
            console.error('İşlem hatası:', err);
            return;
        }
        console.log('--- SOAP Client Test Result ---');
        console.log(`İstediğimiz: ${args.intA} + ${args.intB}`);
        console.log('Gelen Cevap:', result);
    });
});
