// backend.js
const TronWeb = require('tronweb');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// إعداد TronWeb (استخدم مزود شبكة TRC20 مثل Shasta testnet أو mainnet)
const tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io', // أو https://api.shasta.trongrid.io للتجربة
  // إذا تستخدم محفظة خاصة أضف privateKey هنا (إذا ستقوم بعمليات إرسال)
  // privateKey: 'YOUR_PRIVATE_KEY_HERE'
});

// محفظتك (المستلم)
const RECEIVE_ADDRESS = 'YOUR_TRON_ADDRESS_HERE';

// قائمة المدفوعات المؤكدة
const confirmedPayments = new Set();

// فحص المدفوعات الجديدة كل فترة (مثلاً كل 20 ثانية)
async function checkPayments() {
  try {
    // اجلب آخر 50 معاملة
    const transactions = await tronWeb.trx.getTransactionsRelated(RECEIVE_ADDRESS, 'to', 50);
    if (!transactions || transactions.length === 0) {
      console.log('No new transactions found');
      return;
    }

    for (const tx of transactions) {
      if (confirmedPayments.has(tx.txID)) continue; // تخطى إذا تم تأكيدها مسبقًا

      // تحقق من المبلغ و العملة (USDT على TRC20)
      if (tx.raw_data.contract[0].type === 'TriggerSmartContract') {
        // المزيد من التحقق مطلوب لفك شفرة البيانات وتحليلها
        // وهنا يمكنك التحقق من العقد الذكي الخاص بـ USDT عبر الواجهة الرسمية
        console.log('Detected a smart contract transaction:', tx.txID);

        // هنا يمكنك وضع شرط تحقق المبلغ الصحيح
        // إذا تحقق الدفع:
        console.log(`Payment confirmed for txID: ${tx.txID}`);

        // أضف txID إلى مجموعة المدفوعات المؤكدة
        confirmedPayments.add(tx.txID);

        // من هنا ترسل إشعار أو تفعّل وصول العميل للكتاب
        // مثلاً: إرسال إيميل، تحديث قاعدة بيانات، أو تمكين رابط تحميل
      }
    }
  } catch (error) {
    console.error('Error checking payments:', error);
  }
}

// شغّل الفحص كل 20 ثانية
setInterval(checkPayments, 20000);

// سيرفر ويب بسيط للتواصل مع العملاء
app.get('/', (req, res) => {
  res.send('InkVerse Payment Backend is running.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
