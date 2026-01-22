// Link your PDF files here
const bookFiles = {
    main: "books/right-wrong.pdf",
    book1: "books/art-of-war.pdf",
    book2: "books/the-prince.pdf"
};

let currentBookId = "";
let selectedRating = 5;

const dictionary = {
    en: {
        btn: "العربية",
        slogan: "The leading platform for digital books and products, powered by secure Crypto payments.",
        revTitle: "Community Feedback",
        commentPlaceholder: "Share your experience with us...",
        postBtn: "Post Review",
        vMsg: "Thank you! Your download will start now."
    },
    ar: {
        btn: "English",
        slogan: "المنصة الرائدة للكتب والمنتجات الرقمية، مدعومة بوسائل دفع كريبتو آمنة.",
        revTitle: "تفاعل المجتمع",
        commentPlaceholder: "شاركنا تجربتك هنا...",
        postBtn: "انشر التقييم",
        vMsg: "شكراً لك! سيبدأ تحميل كتابك الآن."
    }
};

function toggleLang() {
    const html = document.getElementById('mainHtml');
    const lang = html.lang === 'en' ? 'ar' : 'en';
    html.lang = lang;
    document.body.className = (lang === 'ar') ? 'rtl' : 'ltr';

    document.getElementById('langBtn').innerText = dictionary[lang].btn;
    document.getElementById('site-slogan').innerText = dictionary[lang].slogan;
    document.getElementById('rev-title').innerText = dictionary[lang].revTitle;
    document.getElementById('comment-text').placeholder = dictionary[lang].commentPlaceholder;
    document.getElementById('post-btn').innerText = dictionary[lang].postBtn;
}

// Star Selection Logic
document.querySelectorAll('.star').forEach(star => {
    star.onclick = function() {
        selectedRating = this.getAttribute('data-value');
        document.querySelectorAll('.star').forEach(s => {
            s.style.color = s.getAttribute('data-value') <= selectedRating ? '#d4af37' : '#ccc';
        });
    }
});

// Interactive Comment Function
function addNewComment() {
    const text = document.getElementById('comment-text').value;
    if (!text.trim()) return;

    const container = document.getElementById('comments-container');
    const id = Date.now();
    
    const commentHtml = `
        <div class="comment-card" id="c-${id}">
            <strong>Visitor</strong> <span style="color:#d4af37; margin-left:10px;">${'★'.repeat(selectedRating)}</span>
            <p>${text}</p>
            <div class="comment-actions">
                <span class="action-btn" onclick="this.innerHTML='👍 Liked'">👍 Like</span>
                <span class="action-btn" onclick="addReply(${id})">💬 Reply</span>
            </div>
            <div id="r-${id}"></div>
        </div>
    `;
    
    container.insertAdjacentHTML('afterbegin', commentHtml);
    document.getElementById('comment-text').value = '';
}

function addReply(id) {
    const replyZone = document.getElementById(`r-${id}`);
    if (replyZone.innerHTML !== "") return;
    replyZone.innerHTML = `<div class="reply-box"><strong>InkVerse Team:</strong> Thank you for your feedback! We are glad you enjoyed the store.</div>`;
}

// Payment & Download Logic
function openPay(id) {
    currentBookId = id;
    document.getElementById('payModal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function closePay() {
    document.getElementById('payModal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function verifyStatus() {
    const lang = document.getElementById('mainHtml').lang;
    alert(dictionary[lang].vMsg);
    
    const a = document.createElement('a');
    a.href = bookFiles[currentBookId];
    a.download = "";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    closePay();
}
