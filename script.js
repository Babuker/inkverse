let currentRating = 0;

// نظام النجوم التفاعلي
document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', function() {
        currentRating = this.getAttribute('data-v');
        document.querySelectorAll('.star').forEach(s => s.classList.remove('active'));
        this.classList.add('active');
        let next = this.nextElementSibling;
        while(next) { next.classList.add('active'); next = next.nextElementSibling; }
    });
});

// إرسال التقييم للواتساب
function sendRatingToWA() {
    const msg = document.getElementById('reviewMsg').value;
    const phone = "249123638638";
    if(currentRating === 0) { alert("من فضلك اختر التقييم بالنجوم أولاً"); return; }
    
    const finalMsg = `*تقييم جديد لمتجر InkVerse*%0Aالتقييم: ${currentRating} نجوم ⭐%0Aالرسالة: ${msg}`;
    window.open(`https://wa.me/${phone}?text=${finalMsg}`, '_blank');
}

// التحكم في نافذة الدفع
function openPayment(price) {
    document.getElementById('amountText').innerText = price;
    document.getElementById('paymentModal').style.display = 'block';
}

function closePayment() {
    document.getElementById('paymentModal').style.display = 'none';
}
