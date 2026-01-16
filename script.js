// script.js - Common JavaScript for both languages

let selectedBook = 'عندما يصبح الصحيح خطأ';
let selectedPrice = 12;

function buyBook(bookName, price) {
  selectedBook = bookName;
  selectedPrice = price;

  // Update order summary
  document.getElementById('selectedBook').textContent = bookName;
  document.getElementById('selectedPrice').textContent = price + ' USDT';
  
  // Also update the amount in step 2
  const amountElements = document.querySelectorAll('#amountToSend');
  amountElements.forEach(el => {
    if (el) el.textContent = price + ' USDT';
  });

  // Smooth scroll to payment section
  const paymentSection = document.getElementById('payment');
  if (paymentSection) {
    paymentSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
    
    // Highlight the payment section briefly
    paymentSection.style.transition = 'box-shadow 0.3s ease';
    paymentSection.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.3), 0 14px 26px rgba(0, 0, 0, 0.07)';
    
    setTimeout(() => {
      paymentSection.style.boxShadow = '0 14px 26px rgba(0, 0, 0, 0.07)';
    }, 1500);
  }
}

function copyWalletAddress() {
  const walletText = document.getElementById('walletAddr').textContent;
  const copyBtn = document.getElementById('copyBtn');
  const originalText = copyBtn.innerHTML;
  
  navigator.clipboard.writeText(walletText).then(() => {
    // Success feedback
    copyBtn.innerHTML = '<i class="fas fa-check"></i> تم النسخ';
    
    // Reset button text after 2 seconds
    setTimeout(() => {
      copyBtn.innerHTML = originalText;
    }, 2000);
    
  }).catch((err) => {
    console.error('Failed to copy: ', err);
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = walletText;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      copyBtn.innerHTML = '<i class="fas fa-check"></i> تم النسخ';
      setTimeout(() => {
        copyBtn.innerHTML = originalText;
      }, 2000);
    } catch (fallbackErr) {
      console.error('Fallback copy failed: ', fallbackErr);
      copyBtn.innerHTML = '<i class="fas fa-times"></i> فشل النسخ';
      setTimeout(() => {
        copyBtn.innerHTML = originalText;
      }, 2000);
    }
    document.body.removeChild(textArea);
  });
}

function scrollToTop() {
  window.scrollTo({ 
    top: 0, 
    behavior: 'smooth' 
  });
}

// Show/hide back to top button based on scroll position
window.addEventListener('scroll', function() {
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Set up book purchase buttons for all books
  const bookButtons = document.querySelectorAll('.book button, .btn-primary');
  bookButtons.forEach(button => {
    // Check if the button already has a click handler
    if (!button.hasAttribute('data-event-bound')) {
      button.setAttribute('data-event-bound', 'true');
      
      if (button.classList.contains('btn-primary') && button.textContent.includes('Buy Now') || button.textContent.includes('شراء الآن')) {
        // This is the main hero button - we'll keep its original function
        return;
      }
      
      // For other book buttons, extract book info from the card
      button.addEventListener('click', function(e) {
        const bookCard = this.closest('.book');
        if (bookCard) {
          const bookName = bookCard.querySelector('h3').textContent;
          const priceText = bookCard.querySelector('.price').textContent;
          const price = parseInt(priceText.replace(' USDT', '').trim());
          
          if (bookName && !isNaN(price)) {
            buyBook(bookName, price);
            e.preventDefault();
          }
        }
      });
    }
  });
  
  // Pre-fill WhatsApp message with book info
  const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
  whatsappButtons.forEach(btn => {
    const currentHref = btn.getAttribute('href');
    if (currentHref.includes('wa.me')) {
      const lang = document.documentElement.lang === 'ar' ? 'ar' : 'en';
      const bookText = lang === 'ar' 
        ? `مرحباً! لقد دفعت مؤخراً ثمن كتاب '${selectedBook}' هذا هو رمز المعاملة: `
        : `Hello! I just paid for the book '${selectedBook}' Here is my transaction ID: `;
      
      const encodedText = encodeURIComponent(bookText);
      btn.setAttribute('href', `https://wa.me/249123638638?text=${encodedText}`);
    }
  });
  
  // Add smooth scrolling to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});