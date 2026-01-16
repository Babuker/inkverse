// دالة اختيار الكتاب والسعر لعرضها في قسم الدفع
function buyBook(title, price) {
  document.getElementById('selectedBook').textContent = title;
  document.getElementById('selectedPrice').textContent = price + ' USDT';
  document.getElementById('walletAddr').textContent = 'THRhk1aRg2ntebnP2AMWNAg5zYeMU8idt';
  // يمكنك تحديث السعر في Pi أيضا لو أردت
  // هنا فقط لتوضيح الإجراء
  // Scroll to payment section
  document.getElementById('payment').scrollIntoView({ behavior: 'smooth' });
}

// دالة نسخ عنوان المحفظة
function copyWalletAddress() {
  const wallet = document.getElementById('walletAddr').textContent;
  navigator.clipboard.writeText(wallet).then(() => {
    alert('Wallet address copied to clipboard!');
  });
}

// دالة للتمرير لأعلى الصفحة
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
