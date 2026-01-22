// إضافة النصوص للقاموس
dictionary.en.revTitle = "Visitors Feedback";
dictionary.ar.revTitle = "آراء الزوار";
dictionary.en.commentPlaceholder = "Write your opinion...";
dictionary.ar.commentPlaceholder = "اكتب رأيك هنا...";

// تفعيل نظام النجوم
document.querySelectorAll('.star').forEach(star => {
    star.onclick = function() {
        document.querySelectorAll('.star').forEach(s => s.classList.remove('active'));
        this.classList.add('active');
        this.setAttribute('data-selected', 'true');
    }
});

function submitComment() {
    const text = document.getElementById('comment-text').value;
    const lang = document.getElementById('mainHtml').lang;
    const stars = document.querySelectorAll('.star.active').length || 5;
    
    if(!text) {
        alert(lang === 'ar' ? "من فضلك اكتب تعليقاً" : "Please write a comment");
        return;
    }

    const commentList = document.getElementById('comments-list');
    const newComment = document.createElement('div');
    newComment.className = 'comment-box';
    
    let starIcons = '★'.repeat(stars) + '☆'.repeat(5-stars);
    
    newComment.innerHTML = `
        <strong>Guest User</strong> <span class="stars-gold">${starIcons}</span>
        <p>${text}</p>
    `;
    
    commentList.prepend(newComment);
    document.getElementById('comment-text').value = ''; // مسح النص بعد الإرسال
    alert(lang === 'ar' ? "شكراً لتقييمك!" : "Thank you for your review!");
}

// تحديث وظيفة toggleLang لتشمل عنوان التعليقات
const originalToggle = toggleLang;
toggleLang = function() {
    originalToggle();
    const lang = document.getElementById('mainHtml').lang;
    document.getElementById('rev-title').innerText = dictionary[lang].revTitle;
    document.getElementById('comment-text').placeholder = dictionary[lang].commentPlaceholder;
}
