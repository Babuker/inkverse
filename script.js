// Localization Dictionary
const texts = {
    en: {
        btn: "العربية",
        mTitle: "When Right Becomes Wrong",
        mDesc: "A deep exploration of how correct rules can become a trap. By BAKRI.",
        awTitle: "The Art of War",
        pTitle: "The Prince",
        oTitle: "Author Surprise!",
        oDesc: "Get the highest revenue share in the digital world.",
        payHead: "Secure Payment",
        verifyMsg: "Verification initiated. Please wait for blockchain confirmation."
    },
    ar: {
        btn: "English",
        mTitle: "عندما يصبح الحق خطأ",
        mDesc: "استكشاف عميق لكيفية تحول القواعد الصحيحة إلى فخ للمؤسسات. بقلم بكري.",
        awTitle: "فن الحرب",
        pTitle: "الأمير",
        oTitle: "مفاجأة للمؤلفين!",
        oDesc: "احصل على أعلى نسبة عوائد في العالم الرقمي.",
        payHead: "دفع رقمي آمن",
        verifyMsg: "بدأ التحقق. يرجى الانتظار لتأكيد البلوكشين."
    }
};

// Toggle Language Function
function toggleLang() {
    const html = document.getElementById('mainHtml');
    const currentLang = html.lang === 'en' ? 'ar' : 'en';
    
    // Update HTML attribute and Body class
    html.lang = currentLang;
    document.body.className = currentLang === 'ar' ? 'rtl' : 'ltr';
    
    // Update Text Elements
    document.getElementById('langBtn').innerText = texts[currentLang].btn;
    document.getElementById('m-title').innerText = texts[currentLang].mTitle;
    document.getElementById('m-desc').innerText = texts[currentLang].mDesc;
    document.getElementById('aw-title').innerText = texts[currentLang].awTitle;
    document.getElementById('p-title').innerText = texts[currentLang].pTitle;
    document.getElementById('o-title').innerText = texts[currentLang].oTitle;
    document.getElementById('o-desc').innerText = texts[currentLang].oDesc;
    document.getElementById('pay-head').innerText = texts[currentLang].payHead;
}

// Modal Control Functions
function openPay(price) {
    document.getElementById('payModal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    
    // Ensure the QR starts with the local file, but the fallback is handled by the 'onerror' in HTML
    console.log("Opening payment for amount: " + price + " USDT");
}

function closePay() {
    document.getElementById('payModal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function verifyStatus() {
    const currentLang = document.getElementById('mainHtml').lang;
    alert(texts[currentLang].verifyMsg);
}
