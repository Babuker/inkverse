const dictionary = {
    en: {
        btn: "العربية",
        mTitle: "When Right Becomes Wrong",
        mDesc: "A powerful book about leadership and rules. Written by BAKRI.",
        b1T: "The Art of War", b1D: "Learn the best secrets of strategy.",
        b2T: "The Prince", b2D: "A famous guide about power.",
        b3T: "Think & Grow Rich", b3D: "The master plan for success.",
        offT: "Publish Your Book Here!",
        offD: "Are you an author? Sell your book on InkVerse. You keep 90% of the money. We only take 10%.",
        payH: "Easy Payment",
        vMsg: "Checking payment... Please wait 60 seconds."
    },
    ar: {
        btn: "English",
        mTitle: "عندما يصبح الحق خطأ",
        mDesc: "كتاب قوي عن القيادة والقواعد. تأليف بكري.",
        b1T: "فن الحرب", b1D: "تعلم أفضل أسرار الاستراتيجية.",
        b2T: "الأمير", b2D: "دليل شهير عن القوة والسياسة.",
        b3T: "فكر وازدد ثراءً", b3D: "الخطة الشاملة للنجاح المالي.",
        offT: "انشر كتابك هنا!",
        offD: "هل أنت مؤلف؟ بع كتابك على متجرنا. ستحصل على 90% من الأرباح ونحن نأخذ 10% فقط.",
        payH: "دفع سهل",
        vMsg: "جاري التحقق... يرجى الانتظار 60 ثانية."
    }
};

function toggleLang() {
    const html = document.getElementById('mainHtml');
    const lang = html.lang === 'en' ? 'ar' : 'en';
    html.lang = lang;
    document.body.className = lang === 'ar' ? 'rtl' : 'ltr';

    document.getElementById('langBtn').innerText = dictionary[lang].btn;
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
