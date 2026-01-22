const dictionary = {
    en: {
        btn: "العربية",
        aboutT: "About InkVerse",
        aboutX: "InkVerse is a leading digital platform for high-quality e-books and digital products. We empower creators by using safe Crypto Payments to ensure global access.",
        mTitle: "When Right Becomes Wrong", mDesc: "A powerful book about leadership and rules. Written by BAKRI.",
        offT: "Publish Your Book Here!", offD: "Sell your digital products and keep 90% of the revenue.",
        payH: "Crypto Payment", vMsg: "Checking blockchain... please wait."
    },
    ar: {
        btn: "English",
        aboutT: "حول إنك فيرس",
        aboutX: "إنك فيرس هي منصة رقمية رائدة للكتب والمنتجات الإلكترونية عالية الجودة. نحن نمكّن المبدعين عبر استخدام الدفع بالعملات الرقمية المشفرة لضمان وصول عالمي سريع وآمن.",
        mTitle: "عندما يصبح الحق خطأ", mDesc: "كتاب قوي عن القيادة والقواعد. تأليف بكري.",
        offT: "انشر كتابك هنا!", offD: "بع منتجاتك الرقمية واحتفظ بـ 90% من الأرباح.",
        payH: "الدفع بالكريبتو", vMsg: "جاري التحقق من الشبكة... يرجى الانتظار."
    }
};

function toggleLang() {
    const html = document.getElementById('mainHtml');
    const lang = html.lang === 'en' ? 'ar' : 'en';
    html.lang = lang;
    document.body.className = lang === 'ar' ? 'rtl' : 'ltr';

    document.getElementById('langBtn').innerText = dictionary[lang].btn;
    document.getElementById('about-title').innerText = dictionary[lang].aboutT;
    document.getElementById('about-text').innerText = dictionary[lang].aboutX;
    document.getElementById('m-title').innerText = dictionary[lang].mTitle;
    document.getElementById('m-desc').innerText = dictionary[lang].mDesc;
    document.getElementById('offer-title').innerText = dictionary[lang].offT;
    document.getElementById('offer-desc').innerText = dictionary[lang].offD;
    document.getElementById('pay-head').innerText = dictionary[lang].payH;
}

function openPay(amt) {
    document.getElementById('payModal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function closePay() {
    document.getElementById('payModal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function verifyStatus() {
    const lang = document.getElementById('mainHtml').lang;
    alert(dictionary[lang].vMsg);
}
