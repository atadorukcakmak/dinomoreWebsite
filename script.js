let currentLang = 'en';
const translations = {
    en: {
        "nav.about": "About Us",
        "nav.games": "Games",
        "nav.contact": "Contact",
        "nav.location": "Location",
        "hero.title": "Welcome to Dinomore",
        "hero.subtitle": "Where Gaming Dreams Come True",
        "hero.cta": "Discover Our Games",
        "about.title": "About Us",
        "about.description": " Established in June 2025. Dinomore Games develops games for PlayStation 4, PlayStation 5,Xbox One, Nintendo Switch, and PC platforms. We also provide porting services for previously developed games. With a young and dynamic team, Dinomore Games additionally creates content for Unity and Unreal Engine game engines.",
        "games.title": "Our Games",
        "games.dragon.title": "Dragon Quest",
        "games.dragon.description": "Epic dragon adventure game",
        "games.space.title": "Space Raiders",
        "games.space.description": "Explore the cosmic frontier",
        "games.evolution.title": "Evolution X",
        "games.evolution.description": "Genetic puzzle adventure",
        "games.playstation": "PlayStation Games",
        "games.nintendo": "Nintendo Switch Games",
        "games.steam": "Steam Games",
        "games.comingsoon": "<img src='dino.png' alt='dino' style='height:3.0em;vertical-align:middle;margin-right:8px;display:inline;'/>Coming Soon<span class='dot'>.</span><span class='dot'>.</span><span class='dot'>.</span>",
        "contact.title": "Contact Us",
        "contact.name": "Name",
        "contact.email": "Email",
        "contact.message": "Message",
        "contact.submit": "Send Message",
        "location.title": "Find Us",
        "footer.copyright": "© 2025 Dinomore. All rights reserved.",
        "form.success": "Message Sent!"
    },
    tr: {
        "nav.about": "Hakkımızda",
        "nav.games": "Oyunlar",
        "nav.contact": "İletişim",
        "nav.location": "Konum",
        "hero.title": "Dinomore'a Hoş Geldiniz",
        "hero.subtitle": "Oyun Hayalleri Gerçeğe Dönüşüyor",
        "hero.cta": "Oyunlarımızı Keşfedin",
        "about.title": "Hakkımızda",
        "about.description": "Haziran 2025'te kurulan Dinomore Games, PlayStation 4, PlayStation 5, Xbox One, Nintendo Switch ve PC platformları için oyunlar geliştirmektedir. Ayrıca, daha önce geliştirilmiş oyunlar için portlama hizmetleri de sunmaktayız. Genç ve dinamik bir ekiple çalışan Dinomore Games, Unity ve Unreal Engine oyun motorları için içerikler de üretmektedir.",
        "games.title": "Oyunlarımız",
        "games.dragon.title": "Ejderha Macerası",
        "games.dragon.description": "Epik ejderha macera oyunu",
        "games.space.title": "Uzay Akıncıları",
        "games.space.description": "Kozmik sınırları keşfedin",
        "games.evolution.title": "Evrim X",
        "games.evolution.description": "Genetik bulmaca macerası",
        "games.playstation": "PlayStation Oyunları",
        "games.nintendo": "Nintendo Switch Oyunları",
        "games.steam": "Steam Oyunları",
        "games.comingsoon": "<img src='dino.png' alt='dino' style='height:3.0em;vertical-align:middle;margin-right:8px;display:inline;'/>Çok Yakında<span class='dot'>.</span><span class='dot'>.</span><span class='dot'>.</span>",
        "contact.title": "İletişim",
        "contact.name": "İsim",
        "contact.email": "E-posta",
        "contact.message": "Mesaj",
        "contact.submit": "Mesaj Gönder",
        "location.title": "Bizi Bulun",
        "footer.copyright": "© 2025 Dinomore. Tüm hakları saklıdır.",
        "form.success": "Mesajınız iletildi"
    }
};

// Mobile Navigation Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
        // Close mobile menu if open
        if (window.innerWidth <= 768) {
            navLinks.style.display = 'none';
        }
    });
});

// Enhanced Scroll Animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.game-card, .fade-in');
    const windowHeight = window.innerHeight;

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Initial check for elements in view
handleScrollAnimations();

// Scroll event listener with throttling
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        handleScrollAnimations();
    });
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Contact form submit handler
const contactForm = document.querySelector('.contact-form');
const formMessage = document.getElementById('form-message');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        if (response.ok) {
            showFormMessage(translations[currentLang]["form.success"], true);
            contactForm.reset();
        } else {
            showFormMessage('Bir hata oluştu, lütfen tekrar deneyin.', false);
        }
    });
}

// Add parallax effect to hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
});

// Carousel functionality
const track = document.querySelector('.carousel-track');
const cards = Array.from(track.children);
const nextButton = document.querySelector('.carousel-button.next');
const prevButton = document.querySelector('.carousel-button.prev');
const dotsContainer = document.querySelector('.carousel-dots');

// Calculate card width including gap
const cardStyle = window.getComputedStyle(cards[0]);
const cardWidth = cards[0].getBoundingClientRect().width;
const gapSize = 32; // 2rem gap
const slideWidth = cardWidth + gapSize;
const cardsToShow = 5; // Aynı anda 5 kart göster
const cardsToMove = 1; // Her tıklamada 1 kart kaydır

// Set up dots
const numberOfDots = Math.ceil(cards.length / cardsToMove);
for (let i = 0; i < numberOfDots; i++) {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);
}

const dots = Array.from(document.querySelectorAll('.dot'));

// Move to slide
const moveToSlide = (currentIndex) => {
    const offset = currentIndex * slideWidth;
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${offset}px)`;

    // Tüm kartları normal opacity'ye getir
    cards.forEach(card => {
        card.style.transition = 'opacity 0.3s ease-in-out';
        card.style.opacity = '0.5';
    });

    // Aktif kartı ve yanındakileri vurgula
    for(let i = 0; i < 5; i++) {
        const cardIndex = (currentIndex + i) % cards.length;
        if(cards[cardIndex]) {
            cards[cardIndex].style.opacity = '1';
        }
    }
};

// Click handlers for next and previous buttons
let currentIndex = 0;

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    moveToSlide(currentIndex);
});

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    moveToSlide(currentIndex);
});

// Dot click handlers
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index * cardsToMove;
        moveToSlide(currentIndex);
    });
});

// Auto play carousel
let autoPlayInterval;

const startAutoPlay = () => {
    autoPlayInterval = setInterval(() => {
        if (currentIndex >= cards.length - 1) {
            currentIndex = 0;
        } else {
            currentIndex += cardsToMove;
        }
        moveToSlide(currentIndex);
    }, 7000); // Change slide every 7 seconds
};

const stopAutoPlay = () => {
    clearInterval(autoPlayInterval);
};

// İlk yüklemede ilk 5 kartı vurgula
cards.slice(0, 5).forEach(card => {
    card.style.opacity = '1';
});

// Start autoplay
startAutoPlay();

// Pause autoplay on hover
const carousel = document.querySelector('.carousel-container');
carousel.addEventListener('mouseenter', stopAutoPlay);
carousel.addEventListener('mouseleave', startAutoPlay);

// Game cards hover effect
cards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const icon = card.querySelector('.game-image i');
        icon.style.transform = 'rotate(360deg) scale(1.2)';
    });
    
    card.addEventListener('mouseleave', (e) => {
        const icon = card.querySelector('.game-image i');
        icon.style.transform = '';
    });
});

// Function to change language
function changeLanguage(lang) {
    currentLang = lang;
    updateContent();
    updateLanguageButtons();
    // Save language preference
    localStorage.setItem('preferredLanguage', lang);
}

// Function to update content
function updateContent() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            if (key === 'games.comingsoon') {
                element.innerHTML = translations[currentLang][key];
            } else {
                element.textContent = translations[currentLang][key];
            }
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[currentLang][key]) {
            element.placeholder = translations[currentLang][key];
        }
    });
}

// Function to update language buttons
function updateLanguageButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        const lang = btn.onclick.toString().match(/'([^']+)'/)[1];
        if (lang === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Initialize language from localStorage or browser preference
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage');
    const browserLang = navigator.language.split('-')[0];
    const initialLang = savedLang || (browserLang === 'tr' ? 'tr' : 'en');
    
    changeLanguage(initialLang);
});

// Sağ alttaki sabit scroll-to-top butonu
const scrollToTopFixedBtn = document.getElementById('scrollToTopFixed');
if (scrollToTopFixedBtn) {
    scrollToTopFixedBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function showFormMessage(message, isSuccess) {
    if (!formMessage) return;
    if (isSuccess) {
        // Eğer message parametresi verilmemişse, lokalizasyonu kullan
        const msg = message || translations[currentLang]["form.success"] || "Message Sent!";
        formMessage.innerHTML = '<span class="checkmark"></span><span class="msg-text">' + msg + '</span>';
        formMessage.className = 'show success';
        formMessage.style.display = 'block';
        setTimeout(() => {
            formMessage.className = formMessage.className.replace('show', '');
            setTimeout(() => { formMessage.style.display = 'none'; }, 400);
        }, 3000);
    } else {
        formMessage.textContent = message;
        formMessage.className = 'show error';
        formMessage.style.display = 'block';
        setTimeout(() => {
            formMessage.className = formMessage.className.replace('show', '');
            setTimeout(() => { formMessage.style.display = 'none'; }, 400);
        }, 3000);
    }
} 