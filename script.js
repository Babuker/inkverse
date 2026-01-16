// script.js - Complete JavaScript for Inkverse Store

let selectedBook = 'When Right Becomes Wrong';
let selectedPrice = 12;
let orders = [];

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    updateWhatsAppLinks();
    startPiCountdown();
    generateQRCode();
});

function initializePage() {
    // Load saved orders from localStorage
    const savedOrders = localStorage.getItem('inkverse_orders');
    if (savedOrders) {
        try {
            orders = JSON.parse(savedOrders);
        } catch (e) {
            orders = [];
            console.error('Error loading orders:', e);
        }
    } else {
        orders = [];
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
            
            // Skip main hero button (already has onclick)
            if (button.classList.contains('btn-primary') && 
                (button.textContent.includes('Buy Now') || button.textContent.includes('شراء الآن'))) {
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
    
    // Payment logo click handlers
    const usdtLogo = document.getElementById('usdtLogo');
    const piLogo = document.getElementById('piLogo');
    
    if (usdtLogo) {
        usdtLogo.addEventListener('click', function() {
            document.querySelectorAll('.payment-logo').forEach(logo => {
                logo.classList.remove('active');
            });
            this.classList.add('active');
            
            // Scroll to payment section
            const paymentSection = document.getElementById('payment');
            if (paymentSection) {
                paymentSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }
    
    if (piLogo) {
        piLogo.addEventListener('click', function() {
            notifyPiLaunch();
        });
    }
}

function buyBook(bookName, price) {
    selectedBook = bookName;
    selectedPrice = price;

    // Update order summary
    const selectedBookElement = document.getElementById('selectedBook');
    const selectedPriceElement = document.getElementById('selectedPrice');
    
    if (selectedBookElement) selectedBookElement.textContent = bookName;
    if (selectedPriceElement) selectedPriceElement.textContent = price + ' USDT';
    
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
    
    orders.push(order);
    localStorage.setItem('inkverse_orders', JSON.stringify(orders));

    // Generate new QR code with updated amount
    generateQRCode();

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
    
    if (!copyBtn) return;
    
    const originalText = copyBtn.innerHTML;
    const originalBackground = copyBtn.style.background;
    
    navigator.clipboard.writeText(walletText).then(() => {
        // Success feedback
        if (document.documentElement.lang === 'ar') {
            copyBtn.innerHTML = '<i class="fas fa-check"></i> تم النسخ';
        } else {
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied';
        }
        
        copyBtn.style.background = '#10b981';
        
        // Reset button after 2 seconds
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.background = originalBackground;
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
            copyBtn.style.background = '#10b981';
            
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.style.background = originalBackground;
            }, 2000);
            
        } catch (fallbackErr) {
            console.error('Fallback copy failed: ', fallbackErr);
            if (document.documentElement.lang === 'ar') {
                copyBtn.innerHTML = '<i class="fas fa-times"></i> فشل النسخ';
            } else {
                copyBtn.innerHTML = '<i class="fas fa-times"></i> Failed';
            }
            copyBtn.style.background = '#ef4444';
            
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.style.background = originalBackground;
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

// QR Code Functions
function generateQRCode() {
    const canvas = document.getElementById('qrCanvas');
    const loading = document.getElementById('qrLoading');
    
    if (!canvas) return;
    
    if (loading) loading.style.display = 'flex';
    
    // Get wallet address
    const walletAddress = document.getElementById('walletAddr').textContent;
    
    // Create TRON payment URL
    const tronPaymentURL = `tron:${walletAddress}?amount=${selectedPrice}&token=USDT&network=TRC20`;
    
    // Check if QRCode library is available
    if (typeof QRCode !== 'undefined') {
        // Clear previous QR code
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Generate new QR code
        QRCode.toCanvas(canvas, tronPaymentURL, {
            width: 200,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            }
        }, function(error) {
            if (error) {
                console.error('QR Code generation error:', error);
                if (loading) loading.innerHTML = 'Error generating QR code';
                drawSimpleQRCode(canvas, tronPaymentURL);
            }
            if (loading) loading.style.display = 'none';
        });
    } else {
        // Fallback to simple QR code
        drawSimpleQRCode(canvas, tronPaymentURL);
        if (loading) loading.style.display = 'none';
    }
    
    // Store QR data for download
    window.qrData = {
        text: tronPaymentURL,
        wallet: walletAddress,
        amount: selectedPrice
    };
}

function drawSimpleQRCode(canvas, text) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Simple QR-like pattern
    const cellSize = 8;
    const margin = 20;
    const size = Math.min(canvas.width, canvas.height) - 2 * margin;
    const cells = 21;
    
    // Draw QR pattern
    ctx.fillStyle = '#000000';
    
    // Position markers (3 corners)
    drawPositionMarker(ctx, margin, margin, cellSize);
    drawPositionMarker(ctx, margin + (cells - 7) * cellSize, margin, cellSize);
    drawPositionMarker(ctx, margin, margin + (cells - 7) * cellSize, cellSize);
    
    // Timing pattern
    for (let i = 8; i < cells - 8; i++) {
        if (i % 2 === 0) {
            ctx.fillRect(margin + i * cellSize, margin + 6 * cellSize, cellSize, cellSize);
            ctx.fillRect(margin + 6 * cellSize, margin + i * cellSize, cellSize, cellSize);
        }
    }
    
    // Add text
    ctx.fillStyle = '#2563eb';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    if (document.documentElement.lang === 'ar') {
        ctx.fillText('دفع USDT', canvas.width / 2, canvas.height - 20);
    } else {
        ctx.fillText('USDT Payment', canvas.width / 2, canvas.height - 20);
    }
}

function drawPositionMarker(ctx, x, y, cellSize) {
    // Outer square
    ctx.fillRect(x, y, 7 * cellSize, 7 * cellSize);
    
    // Inner white square
    ctx.fillStyle = 'white';
    ctx.fillRect(x + cellSize, y + cellSize, 5 * cellSize, 5 * cellSize);
    
    // Inner black square
    ctx.fillStyle = '#000000';
    ctx.fillRect(x + 2 * cellSize, y + 2 * cellSize, 3 * cellSize, 3 * cellSize);
}

function downloadQRCode() {
    const canvas = document.getElementById('qrCanvas');
    if (!canvas) {
        alert(document.documentElement.lang === 'ar' ? 'لم يتم إنشاء رمز QR بعد. يرجى الانتظار.' : 'QR code not generated yet. Please wait.');
        return;
    }
    
    const link = document.createElement('a');
    link.download = `usdt-payment-${selectedPrice}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
}

// Pi Network Functions
const piLaunchDate = new Date();
piLaunchDate.setDate(piLaunchDate.getDate() + 30);
piLaunchDate.setHours(12, 0, 0, 0);

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
    const piDays = document.getElementById('piDays');
    const piHours = document.getElementById('piHours');
    const piMinutes = document.getElementById('piMinutes');
    const piSeconds = document.getElementById('piSeconds');
    
    if (piDays) piDays.textContent = days.toString().padStart(2, '0');
    if (piHours) piHours.textContent = hours.toString().padStart(2, '0');
    if (piMinutes) piMinutes.textContent = minutes.toString().padStart(2, '0');
    if (piSeconds) piSeconds.textContent = seconds.toString().padStart(2, '0');
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

// Utility functions
function formatPrice(price) {
    return price.toFixed(2);
}

function hasPurchasedBook(bookName) {
    const purchases = JSON.parse(localStorage.getItem('inkverse_purchases') || '[]');
    return purchases.some(purchase => purchase.book === bookName && purchase.status === 'delivered');
}

function markAsDelivered(orderId) {
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

function getPendingOrders() {
    return orders.filter(order => order.status === 'pending');
}

function getCompletedOrders() {
    return orders.filter(order => order.status === 'delivered');
}

// Export functions for debugging
if (typeof window !== 'undefined') {
    window.inkverse = {
        buyBook,
        copyWalletAddress,
        scrollToTop,
        scrollToAuthors,
        notifyPiLaunch,
        generateQRCode,
        downloadQRCode,
        hasPurchasedBook,
        getPendingOrders,
        getCompletedOrders,
        markAsDelivered,
        selectedBook,
        selectedPrice
    };
}

console.log('Inkverse Store script loaded successfully');
