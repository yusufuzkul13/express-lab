const express = require('express');
const soap = require('soap');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());

// --- 1. HESAP MAKİNESİ SERVİSİ (Eski servisimiz) ---
const calcService = {
    CalculatorService: {
        CalculatorPort: {
            Add: function (args) {
                return { result: parseInt(args.intA) + parseInt(args.intB) };
            }
        }
    }
};

// --- 2. BANKA SERVİSİ (Yeni Kurumsal Servis) ---
const bankService = {
    BankService: {
        BankPort: {
            GetAccountDetails: function (args, callback, headers) {
                // GÜVENLİK KONTROLÜ: Header içinde SecurityHeader/AuthToken var mı?
                const token = headers && headers.SecurityHeader && headers.SecurityHeader.AuthToken;

                if (token !== 'ANTIGRAVITY-SECURE-TOKEN-123') {
                    // SOAP Fault (Hata) fırlatıyoruz
                    throw {
                        Fault: {
                            Code: { Value: 'soap:Sender', Subcode: { value: 'rpc:BadArguments' } },
                            Reason: { Text: 'Geçersiz veya eksik güvenlik tokenı!' },
                            statusCode: 401
                        }
                    };
                }

                console.log(`Banka Sorgusu: Hesap No -> ${args.accountNumber}`);

                // Veritabanından geliyormuş gibi simüle edilen veri
                return {
                    accountDetails: {
                        iban: "TR12 0001 0002 0003 4444 5555 66",
                        owner: "Yusuf Demir",
                        balance: 15450.75,
                        currency: "TRY"
                    }
                };
            }
        }
    }
};

// WSDL Dosyaları
const calcWsdl = fs.readFileSync(path.join(__dirname, 'service.wsdl'), 'utf8');
const bankWsdl = fs.readFileSync(path.join(__dirname, 'bank-service.wsdl'), 'utf8');

const PORT = 8001;

app.listen(PORT, () => {
    console.log(`🚀 SOAP Server (Hybrid) çalışıyor → http://localhost:${PORT}`);

    // Aynı server üzerinde iki farklı endpoint
    soap.listen(app, '/calculator', calcService, calcWsdl);
    soap.listen(app, '/bank', bankService, bankWsdl);

    console.log(`📡 Calculator: http://localhost:${PORT}/calculator?wsdl`);
    console.log(`📡 Bank Service: http://localhost:${PORT}/bank?wsdl`);
});
