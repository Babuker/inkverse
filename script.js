const dictionary = {
    en: {
        btn: "العربية",
        slogan: "The leading platform for digital books and products, powered by secure Crypto payments.",
        mTitle: "When Right Becomes Wrong",
        mDesc: "A powerful book about leadership and rules. Written by BAKRI.",
        b1T: "The Art of War", b1D: "Strategy secrets for everyone.",
        b2T: "The Prince", b2D: "Classic guide on power.",
        b3T: "Think & Grow Rich", b3D: "Master plan for success.",
        offT: "Publish Your Book!",
        offD: "Sell your digital works and keep 90% of revenue.",
        payH: "Crypto Payment",
        vMsg: "Verifying... please wait."
    },
    ar: {
        btn: "English",
        slogan: "المنصة الرائدة للكتب والمنتجات الرقمية، مدعومة بوسائل دفع كريبتو آمنة.",
        mTitle: "عندما يصبح الحق خطأ",
        mDesc: "كتاب قوي عن القيادة والقواعد. تأليف بكري.",
        b1T: "فن الحرب", b1D: "أسرار الاستراتيجية للجميع.",
        b2T: "الأمير", b2D: "الدليل الكلاسيكي عن القوة.",
        b3T: "فكر وازدد ثراءً", b3D: "الخطة الشاملة للنجاح.",
        offT: "انشر كتابك هنا!",
        offD: "بع أعمالك الرقمية واحتفظ بـ 90% من الأرباح.",
        payH: "الدفع بالكريبتو",
        vMsg: "جاري التحقق... يرجى الانتظار."
    }
};

function toggleLang() {
    const html = document.getElementById('mainHtml');
    const lang = html.lang === 'en' ? 'ar' : 'en';
    html.lang = lang;
    
    // تغيير اتجاه الصفحة
    document.body.className = (lang === 'ar') ? 'rtl' : 'ltr';

    // تحديث النصوص
    document.getElementById('langBtn').innerText = dictionary[lang].btn;
    document.getElementById('site-slogan').innerText = dictionary[lang].slogan;
    document.getElementById('m-title').innerText = dictionary[lang].mTitle;
    document.getElementById('m-desc').innerText = dictionary[lang].mDesc;
    
    document.getElementById('book1-title').innerText = dictionary[lang].b1T;
    document.getElementById('book1-desc').innerText = dictionary[lang].b1D;
    document.getElementById('book2-title').innerText = dictionary[lang].b2T;
    document.getElementById('book2-desc').innerText = dictionary[lang].b2D;
    document.getElementById('book3-title').innerText = dictionary[lang].b3T;
    document.getElementById('book3-desc').innerText = dictionary[lang].b3D;
    
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
