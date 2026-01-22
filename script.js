const dictionary = {
    en: {
        btn: "العربية",
        slogan: "The leading platform for digital books and products, powered by secure Crypto payments.",
        mTitle: "When Right Becomes Wrong", mDesc: "A powerful book about leadership and rules. Written by BAKRI.",
        offT: "Publish Your Book!", offD: "Sell your digital works and keep 90% of revenue.",
        payH: "Crypto Payment", vMsg: "Verifying... please wait."
    },
    ar: {
        btn: "English",
        slogan: "المنصة الرائدة للكتب والمنتجات الرقمية، مدعومة بوسائل دفع كريبتو آمنة.",
        mTitle: "عندما يصبح الحق خطأ", mDesc: "كتاب قوي عن القيادة والقواعد. تأليف بكري.",
        offT: "انشر كتابك هنا!", offD: "بع أعمالك الرقمية واحتفظ بـ 90% من الأرباح.",
        payH: "الدفع بالكريبتو", vMsg: "جاري التحقق... يرجى الانتظار."
    }
};

function toggleLang() {
    const html = document.getElementById('mainHtml');
    const lang = html.lang === 'en' ? 'ar' : 'en';
    html.lang = lang;
    document.body.className = lang === 'ar' ? 'rtl' : 'ltr';

    document.getElementById('langBtn').innerText = dictionary[lang].btn;
    document.getElementById('site-slogan').innerText = dictionary[lang].slogan;
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
