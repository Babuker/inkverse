let rating = 0;

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

function openPayment(price, title) {
    document.getElementById('modal-book-title').innerText = title;
    document.getElementById('payment-modal').style.display = 'block';
    document.getElementById('payment-status').style.display = 'block';
    document.getElementById('download-section').style.display = 'none';

    // محاكاة الأتمتة: يظهر الرابط تلقائياً بعد 8 ثوانٍ
    setTimeout(() => {
        document.getElementById('payment-status').style.display = 'none';
        document.getElementById('download-section').style.display = 'block';
    }, 8000);
}

function closeModal() { document.getElementById('payment-modal').style.display = 'none'; }

function copyAddr() {
    navigator.clipboard.writeText("THRhk1aRg2ntebnP2AMWNAg5zYeMU8idt1");
    alert("Address Copied!");
}

function setRating(n) {
    rating = n;
    const stars = document.querySelectorAll('.stars span');
    stars.forEach((s, i) => s.style.color = i >= (5-n) ? "#d4af37" : "#475569");
}

function sendToWA() {
    const text = document.getElementById('review-text').value;
    window.open(`https://wa.me/249123638638?text=Rating: ${rating}/5 Stars%0AFeedback: ${text}`, '_blank');
}
