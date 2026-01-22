const bookFiles = {
    main: "books/right-wrong.pdf",
    book1: "books/art-of-war.pdf",
    book2: "books/the-prince.pdf"
};

let currentBookId = "";
let selectedStars = 5;

const dictionary = {
    en: {
        btn: "العربية",
        slogan: "The leading platform for digital books and products, powered by secure Crypto payments.",
        mTitle: "When Right Becomes Wrong", mDesc: "A powerful book about leadership and rules. Written by BAKRI.",
        b1T: "The Art of War", b1D: "Strategy secrets for everyone.",
        b2T: "The Prince", b2D: "Classic guide on power.",
        revTitle: "Community Feedback", commentPlaceholder: "Share your experience with us...",
        postBtn: "Post Review",
        payH: "Crypto Payment", vMsg: "Thank you! Your download will start now."
    },
    ar: {
        btn: "English",
        slogan: "المنصة الرائدة للكتب والمنتجات الرقمية، مدعومة بوسائل دفع كريبتو آمنة.",
        mTitle: "عندما يصبح الحق خطأ", mDesc: "كتاب قوي عن القيادة والقواعد. تأليف بكري.",
        b1T: "فن الحرب", b1D: "أسرار الاستراتيجية للجميع.",
        b2T: "الأمير", b2D: "الدليل الكلاسيكي عن القوة.",
        revTitle: "تفاعل المجتمع", commentPlaceholder: "شاركنا تجربتك هنا...",
        postBtn: "انشر التقييم",
        payH: "الدفع بالكريبتو", vMsg: "شكراً لك! سيبدأ تحميل كتابك الآن."
    }
};

function toggleLang() {
    const html = document.getElementById('mainHtml');
    const lang = html.lang === 'en' ? 'ar' : 'en';
    html.lang = lang;
    document.body.className = (lang === 'ar') ? 'rtl' : 'ltr';

    document.getElementById('langBtn').innerText = dictionary[lang].btn;
    document.getElementById('site-slogan').innerText = dictionary[lang].slogan;
    document.getElementById('m-title').innerText = dictionary[lang].mTitle;
    document.getElementById('m-desc').innerText = dictionary[lang].mDesc;
    document.getElementById('book1-title').innerText = dictionary[lang].b1T;
    document.getElementById('book1-desc').innerText = dictionary[lang].b1D;
    document.getElementById('book2-title').innerText = dictionary[lang].b2T;
    document.getElementById('book2-desc').innerText = dictionary[lang].b2D;
    document.getElementById('rev-title').innerText = dictionary[lang].revTitle;
    document.getElementById('comment-text').placeholder = dictionary[lang].commentPlaceholder;
    document.getElementById('post-btn').innerText = dictionary[lang].postBtn;
    document.getElementById('pay-head').innerText = dictionary[lang].payH;
}

// Interactive Star Selection
document.querySelectorAll('.star').forEach(star => {
    star.onclick = function() {
        selectedStars = this.getAttribute('data-value');
        document.querySelectorAll('.star').forEach(s => {
            s.style.color = s.getAttribute('data-value') <= selectedStars ? '#d4af37' : '#ccc';
        });
    }
});

function addNewComment() {
    const text = document.getElementById('comment-text').value;
    if (!text) return;
    const container = document.getElementById('comments-container');
    const id = Date.now();
    
    const html = `
        <div class="comment-card" id="c-${id}">
            <strong>Visitor</strong> <span style="color:#d4af37">${'★'.repeat(selectedStars)}</span>
            <p>${text}</p>
            <div class="comment-actions">
                <span class="action-btn" onclick="this.innerText='👍 Liked'">👍 Like</span>
                <span class="action-btn" onclick="showReply(${id})">💬 Reply</span>
            </div>
            <div id="r-${id}"></div>
        </div>
    `;
    container.insertAdjacentHTML('afterbegin', html);
    document.getElementById('comment-text').value = '';
}

function showReply(id) {
    const box = document.getElementById(`r-${id}`);
    if(box.innerHTML !== "") return;
    box.innerHTML = `<div class="reply-box"><input type="text" placeholder="Admin reply..." id="ri-${id}"><button onclick="sendReply(${id})">Send</button></div>`;
}

function sendReply(id) {
    const val = document.getElementById(`ri-${id}`).value;
    if(!val) return;
    document.getElementById(`r-${id}`).innerHTML = `<div class="reply-box" style="background:#eee"><strong>InkVerse Team:</strong> ${val}</div>`;
}

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
