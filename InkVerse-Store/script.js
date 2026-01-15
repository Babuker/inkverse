// Book data
const books = [
    {
        id: 1,
        title: "When Right Becomes Wrong",
        description: "A powerful exploration of ethics, justice, and moral conflict in the modern world.",
        price: 12,
        category: "non-fiction",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        title: "Digital Horizons",
        description: "The future of technology and human interaction. A visionary look at tomorrow's world.",
        price: 15,
        category: "tech",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        title: "The Crypto Mindset",
        description: "Master cryptocurrency investing with proven strategies and psychological insights.",
        price: 18,
        category: "business",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        title: "Silent Echoes",
        description: "A haunting tale of love, loss, and redemption in a world of fading memories.",
        price: 10,
        category: "fiction",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        title: "Business Unusual",
        description: "Disruptive strategies for modern entrepreneurs in the digital age.",
        price: 20,
        category: "business",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        title: "AI Revolution",
        description: "Understanding artificial intelligence and its impact on society.",
        price: 16,
        category: "tech",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
];

// Shopping cart
let cart = JSON.parse(localStorage.getItem('inkverse_cart')) || [];
let selectedCategory = 'all';
let searchQuery = '';

// DOM elements
const cartCountEl = document.getElementById('cartCount');
const cartTotalEl = document.getElementById('cartTotal');
const cartItemsEl = document.getElementById('cartItems');
const booksContainerEl = document.getElementById('booksContainer');
const cartSidebarEl = document.getElementById('cartSidebar');
const cartOverlayEl = document.getElementById('cartOverlay');
const cartToggleBtn = document.getElementById('cartToggle');
const closeCartBtn = document.querySelector('.close-cart');
const checkoutBtn = document.getElementById('checkoutBtn');
const themeToggleBtn = document.getElementById('themeToggle');
const bookSearchEl = document.getElementById('bookSearch');
const categoryBtns = document.querySelectorAll('.category-btn');
const paymentModal = document.getElementById('paymentModal');
const modalOverlay = document.getElementById('modalOverlay');
const closeModalBtn = document.querySelector('.close-modal');
const closePaymentBtn = document.getElementById('closePaymentBtn');
const markAsPaidBtn = document.getElementById('markAsPaidBtn');
const modalCartItemsEl = document.getElementById('modalCartItems');
const modalTotalEl = document.getElementById('modalTotal');
const paymentAmountEl = document.getElementById('paymentAmount');
const whatsappLink = document.getElementById('whatsappLink');
const faqItems = document.querySelectorAll('.faq-item');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderBooks();
    updateCart();
    setupEventListeners();
    setupFAQ();
    
    // Select first book by default for single purchase
    if (books.length > 0) {
        // Not needed anymore with cart system
    }
});

// Theme functionality
function initTheme() {
    const savedTheme = localStorage.getItem('inkverse_theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('inkverse_theme', 'dark');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem('inkverse_theme', 'light');
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// Book rendering
function renderBooks() {
    booksContainerEl.innerHTML = '';
    
    const filteredBooks = books.filter(book => {
        const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
        const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            book.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });
    
    if (filteredBooks.length === 0) {
        booksContainerEl.innerHTML = `
            <div class="no-books">
                <i class="fas fa-book-open"></i>
                <h3>No books found</h3>
                <p>Try a different search or category</p>
            </div>
        `;
        return;
    }
    
    filteredBooks.forEach(book => {
        const bookEl = document.createElement('div');
        bookEl.className = 'book';
        bookEl.innerHTML = `
            <span class="book-category">${book.category}</span>
            <img src="${book.image}" alt="${book.title}" />
            <h3>${book.title}</h3>
            <div class="book-rating">
                ${getStarRating(book.rating)}
                <span>(${book.rating})</span>
            </div>
            <p>${book.description}</p>
            <div class="price">${book.price} USDT</div>
            <button class="buy-btn" onclick="addToCart(${book.id})" data-book-id="${book.id}">
                <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
        `;
        booksContainerEl.appendChild(bookEl);
    });
}

function getStarRating(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Cart functionality
function addToCart(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;
    
    const existingItem = cart.find(item => item.id === bookId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: book.id,
            title: book.title,
            price: book.price,
            quantity: 1
        });
    }
    
    updateCart();
    showMessage(`"${book.title}" added to cart!`, 'success');
    
    // Animate cart button
    cartToggleBtn.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartToggleBtn.style.transform = 'scale(1)';
    }, 300);
}

function removeFromCart(bookId) {
    cart = cart.filter(item => item.id !== bookId);
    updateCart();
    showMessage('Item removed from cart', 'info');
}

function updateQuantity(bookId, change) {
    const item = cart.find(item => item.id === bookId);
    if (item) {
        item.quantity += change;
        
        if (item.quantity < 1) {
            removeFromCart(bookId);
        } else {
            updateCart();
        }
    }
}

function updateCart() {
    // Update count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = totalItems;
    
    // Update total
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalEl.textContent = `${totalPrice} USDT`;
    
    // Update cart items
    cartItemsEl.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsEl.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <button class="btn-primary" onclick="closeCart()">Browse Books</button>
            </div>
        `;
        checkoutBtn.disabled = true;
        return;
    }
    
    cart.forEach(item => {
        const cartItemEl = document.createElement('div');
        cartItemEl.className = 'cart-item';
        cartItemEl.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.title}</h4>
                <div class="cart-item-price">${item.price} USDT × ${item.quantity}</div>
            </div>
            <div class="cart-item-actions">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cartItemsEl.appendChild(cartItemEl);
    });
    
    checkoutBtn.disabled = false;
    
    // Save to localStorage
    localStorage.setItem('inkverse_cart', JSON.stringify(cart));
}

// Cart UI
function openCart() {
    cartSidebarEl.classList.add('open');
    cartOverlayEl.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    cartSidebarEl.classList.remove('open');
    cartOverlayEl.classList.remove('show');
    document.body.style.overflow = '';
}

function openPaymentModal() {
    if (cart.length === 0) {
        showMessage('Your cart is empty!', 'error');
        return;
    }
    
    // Update modal content
    modalCartItemsEl.innerHTML = '';
    let modalTotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        modalTotal += itemTotal;
        
        const itemEl = document.createElement('div');
        itemEl.className = 'modal-cart-item';
        itemEl.innerHTML = `
            <span>${item.title} × ${item.quantity}</span>
            <span>${itemTotal} USDT</span>
        `;
        modalCartItemsEl.appendChild(itemEl);
    });
    
    modalTotalEl.textContent = `${modalTotal} USDT`;
    paymentAmountEl.textContent = `${modalTotal} USDT`;
    
    // Update WhatsApp link
    const bookTitles = cart.map(item => `${item.title} (x${item.quantity})`).join(', ');
    const whatsappMessage = `Hi! I just purchased: ${bookTitles}. Total: ${modalTotal} USDT. Here's my transaction hash: [TXID_HERE]. My email for delivery: [YOUR_EMAIL].`;
    whatsappLink.href = `https://wa.me/249123638638?text=${encodeURIComponent(whatsappMessage)}`;
    
    paymentModal.style.display = 'flex';
    modalOverlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        paymentModal.classList.add('show');
        modalOverlay.classList.add('show');
    }, 10);
}

function closePaymentModal() {
    paymentModal.classList.remove('show');
    modalOverlay.classList.remove('show');
    
    setTimeout(() => {
        paymentModal.style.display = 'none';
        modalOverlay.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
}

// Search and filter
function handleSearch() {
    searchQuery = bookSearchEl.value;
    renderBooks();
}

function handleCategoryFilter(category) {
    selectedCategory = category;
    
    // Update active button
    categoryBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });
    
    renderBooks();
}

// FAQ functionality
function setupFAQ() {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
}

// Message system
function showMessage(message, type = 'info') {
    // Remove existing message
    const existingMsg = document.querySelector('.global-message');
    if (existingMsg) existingMsg.remove();
    
    // Create message element
    const msgEl = document.createElement('div');
    msgEl.className = `global-message ${type}`;
    msgEl.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        ${message}
    `;
    
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
        background: ${document.body.classList.contains('dark-theme') ? '#2c3e50' : 'white'};
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

// Copy wallet address
function copyWalletAddressModal() {
    const walletAddr = document.getElementById('walletAddrModal').textContent;
    navigator.clipboard.writeText(walletAddr).then(() => {
        showMessage('Wallet address copied to clipboard!', 'success');
    });
}

// Setup event listeners
function setupEventListeners() {
    // Theme toggle
    themeToggleBtn.addEventListener('click', toggleTheme);
    
    // Cart toggle
    cartToggleBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlayEl.addEventListener('click', closeCart);
    
    // Checkout
    checkoutBtn.addEventListener('click', openPaymentModal);
    
    // Payment modal
    closeModalBtn.addEventListener('click', closePaymentModal);
    closePaymentBtn.addEventListener('click', closePaymentModal);
    modalOverlay.addEventListener('click', closePaymentModal);
    
    // Mark as paid
    markAsPaidBtn.addEventListener('click', () => {
        markAsPaidBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        markAsPaidBtn.disabled = true;
        
        setTimeout(() => {
            showMessage('Payment confirmed! Please send transaction hash via WhatsApp.', 'success');
            markAsPaidBtn.innerHTML = '<i class="fas fa-check"></i> Payment Sent';
            markAsPaidBtn.style.background = '#27ae60';
            
            // Clear cart
            cart = [];
            updateCart();
            closeCart();
            
            setTimeout(() => {
                closePaymentModal();
                markAsPaidBtn.innerHTML = '<i class="fas fa-check"></i> I\'ve Sent Payment';
                markAsPaidBtn.disabled = false;
                markAsPaidBtn.style.background = '';
            }, 2000);
        }, 1500);
    });
    
    // Search
    bookSearchEl.addEventListener('input', handleSearch);
    
    // Category filter
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            handleCategoryFilter(btn.dataset.category);
        });
    });
    
    // Back to top button
    window.addEventListener('scroll', () => {
        const backToTopBtn = document.getElementById('backToTop');
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
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
        
        .no-books, .empty-cart {
            text-align: center;
            padding: 40px;
            grid-column: 1 / -1;
        }
        
        .no-books i, .empty-cart i {
            font-size: 3rem;
            color: var(--primary);
            margin-bottom: 20px;
            opacity: 0.5;
        }
    `;
    document.head.appendChild(style);
    
    // Prevent form submission
    document.addEventListener('submit', (e) => e.preventDefault());
}