// Authors Section Functions
function scrollToAuthors() {
    const authorsSection = document.getElementById('authors');
    if (authorsSection) {
        authorsSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Pi Network Countdown Timer
const piLaunchDate = new Date();
piLaunchDate.setDate(piLaunchDate.getDate() + 30); // 30 days from now
piLaunchDate.setHours(12, 0, 0, 0); // Set to noon

function updatePiCountdown() {
    const now = new Date().getTime();
    const distance = piLaunchDate.getTime() - now;
    
    if (distance < 0) {
        // Launch time reached
        document.querySelectorAll('.pi-badge').forEach(el => {
            el.innerHTML = '<i class="fas fa-check"></i> LIVE NOW';
        });
        document.querySelectorAll('.pi-desc').forEach(el => {
            el.innerHTML = 'Pi Network payments are now live! Pay for your books using Pi cryptocurrency.';
        });
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
    const message = encodeURIComponent("Please notify me when Pi Network payments go live on Inkverse Store!");
    window.open(`https://wa.me/249123638638?text=${message}`, '_blank');
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    // ... existing initialization code ...
    
    // Start Pi Network countdown
    updatePiCountdown();
    setInterval(updatePiCountdown, 1000);
    
    // Add author publishing link to footer
    const footerContent = document.querySelector('.footer-content');
    if (footerContent) {
        const authorSection = footerContent.querySelector('.footer-section:nth-child(1)');
        if (authorSection) {
            const authorLink = document.createElement('p');
            authorLink.innerHTML = '<i class="fas fa-pen-alt"></i> <a href="#authors" style="color:#bfdbfe; text-decoration:none;" onclick="scrollToAuthors()">Publish Your Book (10% Commission)</a>';
            authorSection.appendChild(authorLink);
        }
    }
});
