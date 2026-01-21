let currentRating = 0;

function switchLang(lang) {
    const html = document.getElementById('main-html');
    const elements = document.querySelectorAll('[data-en]');
    const btn = document.getElementById('lang-btn');

    if(lang === 'ar') {
        html.dir = "rtl";
        elements.forEach(el => el.innerText = el.getAttribute('data-ar'));
        btn.innerText = "English";
        btn.onclick = () => switchLang('en');
    } else {
        html.dir = "ltr";
        elements.forEach(el => el.innerText = el.getAttribute('data-en'));
        btn.innerText = "العربية";
        btn.onclick = () => switchLang('ar');
    }
}

// محاكاة الاستلام التلقائي
function startAutoPay(price, title) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('payModal').style.display = 'block';
    document.getElementById('payment-status').style.display = 'block';
    document.getElementById('success-download').style.display = 'none';

    // بعد 7 ثوانٍ يظهر رابط التحميل تلقائياً (محاكاة التأكيد)
    setTimeout(() => {
        document.getElementById('payment-status').style.display = 'none';
        document.getElementById('success-download').style.display = 'block';
    }, 7000);
}

function closeModal() { document.getElementById('payModal').style.display = 'none'; }

function setStar(n) {
    currentRating = n;
    alert("You rated us " + n + " stars!");
}

function sendWA() {
    window.open(`https://wa.me/249123638638?text=Rating: ${currentRating} stars`, '_blank');
}
