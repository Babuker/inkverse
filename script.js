// نظام التقييم بالنجوم
const stars = document.querySelectorAll('.star');
stars.forEach(star => {
    star.addEventListener('click', () => {
        stars.forEach(s => s.classList.remove('active'));
        star.classList.add('active');
        let val = star.getAttribute('data-value');
        // هنا يمكنك إرسال التقييم لقاعدة البيانات
        alert("شكراً لتقييمك: " + val + " نجوم");
    });
});

// فتح نافذة الدفع
function openPayment(price) {
    document.getElementById('payment-modal').style.display = 'block';
    console.log("إعداد عملية دفع بقيمة: " + price + " USDT");
}

// إغلاق النافذة عند الضغط خارجها
window.onclick = function(event) {
    let modal = document.getElementById('payment-modal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
