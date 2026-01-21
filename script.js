// Switch Language Function
function switchLang(lang) {
    const html = document.getElementById('main-html');
    const elements = document.querySelectorAll('[data-en]');
    
    if(lang === 'ar') {
        html.setAttribute('dir', 'rtl');
        html.setAttribute('lang', 'ar');
        elements.forEach(el => el.innerText = el.getAttribute('data-ar'));
        document.getElementById('btn-ar').classList.add('active');
        document.getElementById('btn-en').classList.remove('active');
    } else {
        html.setAttribute('dir', 'ltr');
        html.setAttribute('lang', 'en');
        elements.forEach(el => el.innerText = el.getAttribute('data-en'));
        document.getElementById('btn-en').classList.add('active');
        document.getElementById('btn-ar').classList.remove('active');
    }
}

// Automated Payment & Delivery Logic
function openAutoPayment(price, title) {
    document.getElementById('mTitle').innerText = title;
    document.getElementById('mPrice').innerText = price;
    document.getElementById('payModal').style.display = 'block';

    // Real automation would use an API. This simulates the wait for confirmation.
    setTimeout(() => {
        document.querySelector('.status-box').style.display = 'none';
        document.getElementById('downloadArea').style.display = 'block';
    }, 4000); 
}

function closeModal() { document.getElementById('payModal').style.display = 'none'; }

// WhatsApp Rating
function sendFeedback() {
    let stars = document.querySelectorAll('.star.active').length;
    let msg = document.getElementById('revText').value;
    let waUrl = `https://wa.me/249123638638?text=New Rating: ${stars} Stars%0AMessage: ${msg}`;
    window.open(waUrl, '_blank');
}

// Star logic
document.querySelectorAll('.star').forEach(s => {
    s.onclick = function() {
        document.querySelectorAll('.star').forEach(st => st.classList.remove('active'));
        this.classList.add('active');
        let prev = this.nextElementSibling;
        while(prev) { prev.classList.add('active'); prev = prev.nextElementSibling; }
    }
});
