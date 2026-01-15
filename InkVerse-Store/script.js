// Book purchase functionality
let selectedBook = "";
let selectedPrice = 0;

function buyBook(title, price) {
    selectedBook = title;
    selectedPrice = price;
    
    // Update UI
    document.getElementById('selectedBook').textContent = title;
    document.getElementById('selectedPrice').textContent = price + ' USDT';
    
    // Scroll to payment section
    document.getElementById('payment').scrollIntoView({behavior: 'smooth'});
    
    // Show confirmation message
    showMessage(`Selected: "${title}" - ${price} USDT`, 'success');
}

// Copy wallet address
function copyWalletAddress() {
    const walletAddr = document.getElementById('walletAddr').textContent;
    const copyBtn = document.getElementById('copyBtn');
    
    navigator.clipboard.writeText(walletAddr).then(() => {
        // Visual feedback
        const originalHTML = copyBtn.innerHTML;
        const isArabic = document.documentElement.lang === 'ar';
        copyBtn.innerHTML = isArabic ? 
            '<i class="fas fa-check"></i> تم النسخ!' : 
            '<i class="fas fa-check"></i> Copied!';
        copyBtn.classList.add('copied');
        
        showMessage(isArabic ? 'تم نسخ العنوان إلى الحافظة!' : 'Wallet address copied to clipboard!', 'success');
        
        // Revert after 2 seconds
        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
            copyBtn.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        const isArabic = document.documentElement.lang === 'ar';
        showMessage(isArabic ? 
            'فشل نسخ العنوان. يرجى النسخ يدوياً.' : 
            'Failed to copy address. Please select and copy manually.', 'error');
    });
}

// Show message
function showMessage(message, type = 'info') {
    // Remove existing message
    const existingMsg = document.querySelector('.global-message');
    if (existingMsg) existingMsg.remove();
    
    // Create message element
    const msgEl = document.createElement('div');
    msgEl.className = `global-message ${type}`;
    
    const icon = type === 'success' ? 'check-circle' : 
                 type === 'error' ? 'exclamation-circle' : 'info-circle';
    
    msgEl.innerHTML = `<i class="fas fa-${icon}"></i> ${message}`;
    
    // Style based on type
    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        info: '#3498db'
    };
    
    msgEl.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: white;
        color: ${colors[type] || colors.info};
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        border-left: 4px solid ${colors[type] || colors.info};
        animation: slideIn 0.3s ease-out;
        max-width: 90%;
        text-align: center;
    `;
    
    document.body.appendChild(msgEl);
    
    // Remove after 4 seconds
    setTimeout(() => {
        if (msgEl.parentNode) {
            msgEl.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => msgEl.remove(), 300);
        }
    }, 4000);
}

// Back to top
function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(-50%) translateY(-20px); opacity: 0; }
            to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(-50%) translateY(0); opacity: 1; }
            to { transform: translateX(-50%) translateY(-20px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Back to top button
    window.addEventListener('scroll', () => {
        const backToTopBtn = document.getElementById('backToTop');
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    // Initialize with default book
    const isArabic = document.documentElement.lang === 'ar';
    const defaultTitle = isArabic ? 'عندما يصبح الصحيح خطأ' : 'When Right Becomes Wrong';
    const defaultPrice = 12;
    
    buyBook(defaultTitle, defaultPrice);
});