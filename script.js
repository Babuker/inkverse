let selectedBook = 'عندما يصبح الصحيح خطأ';
let selectedPrice = 12;

function buyBook(bookName, price) {
  selectedBook = bookName;
  selectedPrice = price;

  document.getElementById('selectedBook').textContent = bookName;
  document.getElementById('selectedPrice').textContent = price + ' USDT';

  document.getElementById('payment').scrollIntoView({ behavior: 'smooth' });
}

function copyWalletAddress() {
  const walletText = document.getElementById('walletAddr').textContent;
  navigator.clipboard.writeText(walletText).then(() => {
    alert('تم نسخ عنوان المحفظة إلى الحافظة!');
  }).catch(() => {
    alert('فشل نسخ عنوان المحفظة، يرجى نسخه يدوياً.');
  });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
