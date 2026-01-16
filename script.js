/* === Fonts & base === */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

body {
  font-family: 'Poppins', sans-serif;
  background-color: #F7F7FB;
  color: #1E1E2F;
  margin: 0;
  padding: 0;
}

/* === Headings === */
h1, h2, h3 {
  color: #1E1E2F;
  margin-bottom: 10px;
}

/* === Buttons === */
button, .btn-primary, .btn-secondary {
  background-color: #6C63FF;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

button:hover, .btn-primary:hover, .btn-secondary:hover {
  background-color: #574fbd;
}

/* === Links === */
a {
  color: #6C63FF;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* === Book Cards === */
.book {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 20px;
  margin: 15px;
  max-width: 300px;
  text-align: center;
  transition: transform 0.3s ease;
  display: inline-block;
  vertical-align: top;
}

.book:hover {
  transform: translateY(-5px);
}

.book img {
  width: 100%;
  height: 200px; /* ثابت */
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
}

.price {
  font-weight: 700;
  margin: 10px 0;
}

/* === Responsive === */
@media (max-width: 768px) {
  .book {
    max-width: 100%;
    margin: 10px 0;
  }
}

/* === WhatsApp Floating Button === */
.whatsapp-float {
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 25px;
  right: 25px;
  background-color: #25D366;
  color: white;
  border-radius: 50%;
  text-align: center;
  font-size: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.whatsapp-float:hover {
  background-color: #1ebe57;
}

/* === Pi Payment Box === */
.pi-payment {
  border: 2px solid #6C63FF;
  background-color: #F0F0FF;
  padding: 15px;
  margin-top: 20px;
  border-radius: 10px;
  font-family: 'Poppins', sans-serif;
  color: #1E1E2F;
  max-width: 400px;
}

.pi-payment h3 {
  color: #6C63FF;
  margin-top: 0;
}

.pi-payment a {
  color: #00C896;
  text-decoration: none;
  font-weight: bold;
}

.pi-payment a:hover {
  text-decoration: underline;
}

/* === Payment Section === */
.pay-info {
  max-width: 700px; /* تم تخفيض العرض للتمركز */
  margin: 40px auto;
  padding: 0 15px;
}

.order-summary, .payment-steps, .payment-note {
  margin-bottom: 25px;
}

.payment-steps .step {
  display: flex;
  margin-bottom: 20px;
}

.step-number {
  font-size: 1.6rem;
  font-weight: 700;
  color: #6C63FF;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #E5E3FF;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
}

.step-content h4 {
  margin: 0 0 5px 0;
}

.wallet {
  background: #fff;
  border: 1px solid #ddd;
  padding: 10px;
  display: inline-flex;
  align-items: center;
  border-radius: 6px;
}

#walletAddr {
  font-family: monospace;
  margin-right: 10px;
  user-select: all;
}

#copyBtn {
  background-color: #6C63FF;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

#copyBtn:hover {
  background-color: #574fbd;
}

.warning {
  color: #b00020;
  font-weight: 600;
}

.payment-note p {
  font-style: italic;
  color: #555;
}

/* === Footer === */
footer {
  background-color: #1E1E2F;
  color: #EEE;
  padding: 40px 15px 15px 15px;
  font-size: 0.9rem;
  text-align: center;
}

.footer-content {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;
  margin-bottom: 20px;
}

.footer-section {
  flex: 1 1 200px;
  margin: 10px;
}

.footer-section h3 {
  margin-bottom: 10px;
  color: #6C63FF;
}

.footer-bottom {
  border-top: 1px solid #444;
  padding-top: 15px;
}

footer a {
  color: #6C63FF;
}

footer a:hover {
  text-decoration: underline;
}

#backToTop {
  position: fixed;
  bottom: 90px; /* مرفوع عن زر واتساب */
  right: 25px;
  background-color: #6C63FF;
  color: white;
  border: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  cursor: pointer;
  font-size: 18px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease;
  z-index: 999;
}

#backToTop:hover {
  background-color: #574fbd;
}

/* === Header adjustments === */
header img {
  width: 120px;
  height: auto;
  display: block;
  margin: 0 auto 15px auto;
}

header h1,
header p.tagline {
  text-align: center;
  margin: 5px 0;
}

/* === Hero Section adjustments === */
.hero-book .hero-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  padding: 20px;
}

.hero-text,
.hero-image {
  flex: 1 1 350px;
  max-width: 450px;
}

/* === Book List adjustments === */
.books-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 0 10px;
}

.book h3 {
  margin-top: 0;
  margin-bottom: 8px;
}

.book p {
  margin-bottom: 12px;
}

/* === Button spacing === */
.hero-actions button {
  margin-right: 10px;
  margin-bottom: 10px;
}
