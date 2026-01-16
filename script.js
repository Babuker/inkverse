// script.js - Common JavaScript for both languages

let selectedBook = 'عندما يصبح الصحيح خطأ';
let selectedPrice = 12;

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    updateWhatsAppLinks();
    startPiCountdown();
});

function initializePage() {
    // Load saved orders from localStorage
    const savedOrders = localStorage.getItem('inkverse_orders');
    if (savedOrders) {
        try {
            window.orders = JSON.parse(savedOrders);
        } catch (e) {
            window.orders = [];
        }
    } else {
        window.orders = [];
    }
    
    // Initialize back to top button
    window.addEventListener('scroll', handleScroll);
    
    // Check if we should show delivery modal from URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('payment') === 'success') {
        setTimeout(showSuccessModal, 1000);
    }
}

function setupEventListeners() {
    // Book purchase buttons
    document.querySelectorAll('.book button, .btn-primary').forEach(button => {
        if (!button.hasAttribute('data-event-bound')) {
            button.setAttribute('data-event-bound', 'true');
            
            if (button.classList.contains('btn-primary') && 
                (button.textContent.includes('Buy Now') || button.textContent.includes('شراء الآن'))) {
                // Main hero button - keep its original function
                return;
            }
            
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
    
    // Smooth scrolling for anchor links
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
}

function buyBook(bookName, price) {
    selectedBook = bookName;
    selectedPrice = price;

    // Update order summary
    document.getElementById('selectedBook').textContent = bookName;
    document.getElementById('selectedPrice').textContent = price + ' USDT';
    
    // Update amounts in payment steps
    document.querySelectorAll('#amountToSend, #amountToSend2').forEach(el => {
        if (el) el.textContent = price + ' USDT';
    });

    // Create order
    const orderId = 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    const order = {
        id: orderId,
        book: bookName,
        price: price,
        date: new Date().toISOString(),
        status: 'pending'
    };
    
    window.orders.push(order);
    localStorage.setItem('inkverse_orders', JSON.stringify(window.orders));

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
    const originalWidth = copyBtn.style.width;
    
    // Store original button width
    copyBtn.style.width = getComputedStyle(copyBtn).width;
    
    navigator.clipboard.writeText(walletText).then(() => {
        // Success feedback
        if (document.documentElement.lang === 'ar') {
            copyBtn.innerHTML = '<i class="fas fa-check"></i> تم النسخ';
        } else {
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied';
        }
        
        copyBtn.style.backgroundColor = '#10b981';
        
        // Reset button after 2 seconds
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.backgroundColor = '';
            copyBtn.style.width = originalWidth;
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
            if (document.documentElement.lang === 'ar') {
                copyBtn.innerHTML = '<i class="fas fa-check"></i> تم النسخ';
            } else {
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied';
            }
            copyBtn.style.backgroundColor = '#10b981';
            
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.style.backgroundColor = '';
                copyBtn.style.width = originalWidth;
            }, 2000);
            
        } catch (fallbackErr) {
            console.error('Fallback copy failed: ', fallbackErr);
            if (document.documentElement.lang === 'ar') {
                copyBtn.innerHTML = '<i class="fas fa-times"></i> فشل النسخ';
            } else {
                copyBtn.innerHTML = '<i class="fas fa-times"></i> Failed';
            }
            copyBtn.style.backgroundColor = '#ef4444';
            
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.style.backgroundColor = '';
                copyBtn.style.width = originalWidth;
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

function scrollToAuthors() {
    const authorsSection = document.getElementById('authors');
    if (authorsSection) {
        authorsSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function handleScroll() {
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
}

function updateWhatsAppLinks() {
    // Update WhatsApp confirmation links with current book info
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
    whatsappButtons.forEach(btn => {
        const currentHref = btn.getAttribute('href');
        if (currentHref && currentHref.includes('wa.me')) {
            const lang = document.documentElement.lang === 'ar' ? 'ar' : 'en';
            const bookText = lang === 'ar' 
                ? `مرحباً! لقد دفعت مؤخراً ثمن كتاب '${selectedBook}' هذا هو رمز المعاملة: `
                : `Hello! I just paid for the book '${selectedBook}' Here is my transaction ID: `;
            
            const encodedText = encodeURIComponent(bookText);
            btn.setAttribute('href', `https://wa.me/249123638638?text=${encodedText}`);
        }
    });
}

// Pi Network Functions
const piLaunchDate = new Date();
piLaunchDate.setDate(piLaunchDate.getDate() + 30); // 30 days from now
piLaunchDate.setHours(12, 0, 0, 0); // Set to noon

function startPiCountdown() {
    updatePiCountdown();
    setInterval(updatePiCountdown, 1000);
}

function updatePiCountdown() {
    const now = new Date().getTime();
    const distance = piLaunchDate.getTime() - now;
    
    if (distance < 0) {
        // Launch time reached
        document.querySelectorAll('.pi-badge').forEach(el => {
            if (document.documentElement.lang === 'ar') {
                el.innerHTML = '<i class="fas fa-check"></i> متاح الآن';
            } else {
                el.innerHTML = '<i class="fas fa-check"></i> LIVE NOW';
            }
        });
        
        document.querySelectorAll('.pi-desc').forEach(el => {
            if (document.documentElement.lang === 'ar') {
                el.innerHTML = 'مدفوعات شبكة باي متاحة الآن! ادفع ثمن كتبك باستخدام عملة باي المشفرة.';
            } else {
                el.innerHTML = 'Pi Network payments are now live! Pay for your books using Pi cryptocurrency.';
            }
        });
        
        // Update countdown to show live
        document.getElementById('piDays').textContent = '00';
        document.getElementById('piHours').textContent = '00';
        document.getElementById('piMinutes').textContent = '00';
        document.getElementById('piSeconds').textContent = '00';
        
        return;
    }
    
    // Calculate days, hours, minutes, seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Update display
    document.getElementById('piDays').textContent = days.toString().padStart(2, '0');
    document.getElementById('piHours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('piMinutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('piSeconds').textContent = seconds.toString().padStart(2, '0');
}

function notifyPiLaunch() {
    const lang = document.documentElement.lang === 'ar' ? 'ar' : 'en';
    const message = lang === 'ar' 
        ? "من فضلك إشعرني عندما تصبح مدفوعات شبكة باي متاحة على متجر إنكفيرس!"
        : "Please notify me when Pi Network payments go live on Inkverse Store!";
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/249123638638?text=${encodedMessage}`, '_blank');
}

// Payment Success Modal
function showSuccessModal() {
    const modalHTML = `
        <div class="modal-overlay" id="successModal">
            <div class="modal-content">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h2>${document.documentElement.lang === 'ar' ? 'تم استلام الدفع!' : 'Payment Received!'}</h2>
                <p>${document.documentElement.lang === 'ar' ? 'شكراً لشرائك! سنقوم بتوصيل كتابك خلال 24 ساعة.' : 'Thank you for your purchase! We will deliver your book within 24 hours.'}</p>
                <p><strong>${document.documentElement.lang === 'ar' ? 'الكتاب:' : 'Book:'}</strong> ${selectedBook}</p>
                <p><strong>${document.documentElement.lang === 'ar' ? 'المبلغ:' : 'Amount:'}</strong> ${selectedPrice} USDT</p>
                <div class="modal-actions">
                    <button onclick="closeSuccessModal()" class="btn-primary">
                        ${document.documentElement.lang === 'ar' ? 'حسناً' : 'OK'}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles if not already added
    if (!document.querySelector('#modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                animation: fadeIn 0.3s ease;
            }
            
            .modal-content {
                background: white;
                padding: 40px 30px;
                border-radius: 20px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                animation: slideUp 0.3s ease;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            }
            
            .success-icon {
                font-size: 4rem;
                color: #10b981;
                margin-bottom: 20px;
            }
            
            .modal-content h2 {
                color: #1e40af;
                margin-bottom: 15px;
                font-size: 1.8rem;
            }
            
            .modal-content p {
                margin-bottom: 10px;
                color: #374151;
                font-size: 1.1rem;
            }
            
            .modal-actions {
                margin-top: 25px;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideUp {
                from { 
                    opacity: 0;
                    transform: translateY(20px);
                }
                to { 
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Remove URL parameter
    history.replaceState({}, document.title, window.location.pathname);
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) modal.remove();
}

// Utility function to format price
function formatPrice(price) {
    return price.toFixed(2);
}

// Function to generate QR code (placeholder - in real implementation, use a QR library)
function generateQRCode() {
    // This is a placeholder function
    // In a real implementation, you would use a QR code library like qrcode.js
    const walletAddress = document.getElementById('walletAddr').textContent;
    const amount = selectedPrice;
    
    // Example QR code data for USDT TRC20
    const qrData = `tron:${walletAddress}?amount=${amount}&token=USDT`;
    
    console.log('QR Code data:', qrData);
    // To implement actual QR code, you would use:
    // new QRCode(document.getElementById("qrcode"), qrData);
    
    return qrData;
}

// Track purchase for analytics
function trackPurchase(bookName, price) {
    // This function would typically send data to analytics service
    console.log('Purchase tracked:', { book: bookName, price: price, timestamp: new Date().toISOString() });
    
    // Example: Send to Google Analytics (if implemented)
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', 'purchase', {
    //         'transaction_id': orderId,
    //         'value': price,
    //         'currency': 'USDT',
    //         'items': [{
    //             'item_name': bookName,
    //             'price': price
    //         }]
    //     });
    // }
}

// Function to check if user has already purchased a book
function hasPurchasedBook(bookName) {
    const purchases = JSON.parse(localStorage.getItem('inkverse_purchases') || '[]');
    return purchases.some(purchase => purchase.book === bookName && purchase.status === 'delivered');
}

// Function to mark book as delivered
function markAsDelivered(orderId) {
    const orders = JSON.parse(localStorage.getItem('inkverse_orders') || '[]');
    const orderIndex = orders.findIndex(order => order.id === orderId);
    
    if (orderIndex !== -1) {
        orders[orderIndex].status = 'delivered';
        orders[orderIndex].deliveredAt = new Date().toISOString();
        localStorage.setItem('inkverse_orders', JSON.stringify(orders));
        
        // Also add to purchases
        const purchases = JSON.parse(localStorage.getItem('inkverse_purchases') || '[]');
        purchases.push({
            book: orders[orderIndex].book,
            price: orders[orderIndex].price,
            date: orders[orderIndex].deliveredAt,
            status: 'delivered'
        });
        localStorage.setItem('inkverse_purchases', JSON.stringify(purchases));
        
        return true;
    }
    return false;
}

// Function to get user's pending orders
function getPendingOrders() {
    const orders = JSON.parse(localStorage.getItem('inkverse_orders') || '[]');
    return orders.filter(order => order.status === 'pending');
}

// Function to get user's completed orders
function getCompletedOrders() {
    const orders = JSON.parse(localStorage.getItem('inkverse_orders') || '[]');
    return orders.filter(order => order.status === 'delivered');
}

// Export functions for debugging (optional)
if (typeof window !== 'undefined') {
    window.inkverse = {
        buyBook,
        copyWalletAddress,
        scrollToTop,
        scrollToAuthors,
        notifyPiLaunch,
        hasPurchasedBook,
        getPendingOrders,
        getCompletedOrders,
        markAsDelivered,
        selectedBook,
        selectedPrice
    };
}

console.log('Inkverse Store script loaded successfully');
