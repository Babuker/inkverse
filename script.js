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

function startAutoPay(price, title) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('payModal').style.display = 'block';
    document.getElementById('payment-status').style.display = 'block';
    document.getElementById('success-download').style.display = 'none';

    // محاكاة الاستلام الآلي بعد 8 ثوانٍ
    setTimeout(() => {
        document.getElementById('payment-status').style.display = 'none';
        document.getElementById('success-download').style.display = 'block';
    }, 8000);
}

function copyWallet() {
    navigator.clipboard.writeText("THRhk1aRg2ntebnP2AMWNAg5zYeMU8idt1");
    alert("Address Copied!");
}

function closeModal() { document.getElementById('payModal').style.display = 'none'; }

function setStar(n) {
    currentRating = n;
    alert("Thanks for rating " + n + " stars!");
}

function sendWA() {
    window.open(`https://wa.me/249123638638?text=Store Rating: ${currentRating} stars`, '_blank');
}
