console.log("Script yüklendi!");
function logHero() {
  try {
    var args = Array.prototype.slice.call(arguments);
    args.unshift('[HERO-VIDEO]');
    console.log.apply(console, args);
  } catch (e) {
    try {
      console.log('[HERO-VIDEO] (fallback)', arguments);
    } catch (err) {}
  }
}
// Global error hooks to surface silent errors
window.addEventListener('error', function(ev){
  logHero('window.error:', ev && ev.message, ev && ev.filename, ev && ev.lineno, ev && ev.colno);
});
window.addEventListener('unhandledrejection', function(ev){
  logHero('unhandledrejection:', ev && ev.reason);
});
document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    console.log("Butona tıklandı!", btn.className);
  });
});

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
        "hero.gameDescription": "Our upcoming game is in development. Add it to your wishlist to get notified at launch!",
        "hero.wishlist": "Add to Wishlist on Steam",
        "hero.unmute": "Unmute",
        "hero.mute": "Mute",
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
        "hero.gameDescription": "Yeni oyunumuz geliştirme aşamasında. Çıkışta haberdar olmak için istek listenize ekleyin!",
        "hero.wishlist": "Steam'de İstek Listesine Ekle",
        "hero.unmute": "Sesi Aç",
        "hero.mute": "Sesi Kapat",
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
    navLinks.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
function getHeaderOffset() {
    const navbar = document.querySelector('.navbar');
    const mobileTopBar = document.querySelector('.mobile-logo-bar');
    const isMobile = window.innerWidth <= 768;
    const navbarHeight = (navbar ? navbar.offsetHeight : 0);
    const mobileBarHeight = (isMobile && mobileTopBar ? mobileTopBar.offsetHeight : 0);
    return Math.max(navbarHeight, mobileBarHeight, 0) + 24; // başlık için ekstra boşluk
}

function applyScrollMarginTop() {
    const offset = getHeaderOffset();
    document.querySelectorAll('section').forEach(sec => {
        sec.style.scrollMarginTop = offset + 'px';
    });
}

function scrollToWithOffset(target) {
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const top = rect.top + scrollTop - getHeaderOffset();
    window.scrollTo({ top, behavior: 'smooth' });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            scrollToWithOffset(target);
        }
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
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
    // Debug current iframe src and params
    const heroIframe = document.getElementById('heroVideoIframe');
    if (heroIframe) {
      logHero('Iframe found. Initial src:', heroIframe.src);
      try {
        const u = new URL(heroIframe.src);
        logHero('enablejsapi:', u.searchParams.get('enablejsapi'), 'origin:', u.searchParams.get('origin'));
      } catch (e) {
        logHero('URL parse error:', e);
      }
    } else {
      logHero('Iframe NOT found at DOMContentLoaded');
    }
    // Ensure embed has origin param for YouTube API controls
    if (heroIframe && heroIframe.src) {
        try {
            const u = new URL(heroIframe.src);
            if (!u.searchParams.has('origin') && window.location.origin && window.location.origin !== 'null') {
                u.searchParams.set('origin', window.location.origin);
                heroIframe.src = u.toString();
            }
        } catch (e) {}
    }
    applyScrollMarginTop();
    // Load YouTube Iframe API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    tag.addEventListener('load', () => logHero('YouTube Iframe API script loaded'));
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
        document.head.appendChild(tag);
    }
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

// Tema ile ilgili tüm fonksiyonlar ve event handler'lar kaldırıldı. 

// Scroll ile animasyonlu fade-in
function handleScrollFadeIn() {
  const fadeEls = document.querySelectorAll('.fade-in');
  const windowHeight = window.innerHeight;
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < windowHeight - 40) {
      el.classList.add('visible');
    }
  });
}

function addFadeInToElements() {
  const selectors = [
    '.game-card',
    '.about-content',
    '.contact-container',
    '.footer-content',
    '.engine-logos-bar',
    '.games-section-box',
    '.games-group',
    '.coming-soon-animated'
  ];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.classList.add('fade-in');
    });
  });
}

window.addEventListener('DOMContentLoaded', function() {
  addFadeInToElements();
  handleScrollFadeIn();
  window.addEventListener('scroll', handleScrollFadeIn);
}); 

window.addEventListener('resize', function() {
  applyScrollMarginTop();
});

// YouTube player setup and audio toggle logic
let heroPlayer;
let heroPlayerReady = false;
let pendingUnmute = false;
window.onYouTubeIframeAPIReady = function() {
  console.log('onYouTubeIframeAPIReady called');
  const iframe = document.getElementById('heroVideoIframe');
  if (!iframe || !window.YT || !YT.Player) return;
  heroPlayer = new YT.Player('heroVideoIframe', {
    events: {
      onReady: function(event) {
        console.log('Player onReady fired');
        heroPlayerReady = true;
        try {
          event.target.mute();
          event.target.playVideo();
          logHero('Muted and playVideo() invoked in onReady');
        } catch (e) {
          logHero('Error in onReady mute/play:', e);
        }
        if (pendingUnmute) {
          try {
            event.target.unMute();
            event.target.setVolume(100);
            event.target.playVideo();
            logHero('Pending unmute applied');
          } catch (e) {
            logHero('Error applying pending unmute:', e);
          }
          pendingUnmute = false;
        }
        try {
          logHero('Initial state after ready => isMuted:', event.target.isMuted && event.target.isMuted(), 'volume:', event.target.getVolume && event.target.getVolume());
        } catch (e) {}
      },
      onStateChange: function(e) {
        const map = { '-1': 'UNSTARTED', 0: 'ENDED', 1: 'PLAYING', 2: 'PAUSED', 3: 'BUFFERING', 5: 'CUED' };
        let muted = null, vol = null;
        try { muted = heroPlayer && heroPlayer.isMuted && heroPlayer.isMuted(); } catch (err) {}
        try { vol = heroPlayer && heroPlayer.getVolume && heroPlayer.getVolume(); } catch (err) {}
        logHero('onStateChange:', map[e.data] || e.data, 'muted:', muted, 'volume:', vol);
      },
      onError: function(err) {
        logHero('Player error:', err && err.data, err);
      }
    }
  });
};

const audioToggleBtn = document.getElementById('hero-audio-toggle');
if (audioToggleBtn) {
  audioToggleBtn.addEventListener('click', function() {
    logHero('Audio toggle clicked. heroPlayerReady:', heroPlayerReady, 'heroPlayer exists:', !!heroPlayer);
    if (!heroPlayer || !heroPlayer.getPlayerState) {
      pendingUnmute = true;
      audioToggleBtn.setAttribute('data-state', 'unmuted');
      audioToggleBtn.textContent = translations[currentLang]['hero.mute'] || 'Mute';
      logHero('Player not ready yet. Marked pendingUnmute=true');
      return;
    }
    const state = audioToggleBtn.getAttribute('data-state');
    if (state === 'muted') {
      try {
        heroPlayer.playVideo();
        heroPlayer.unMute();
        heroPlayer.setVolume(100);
        logHero('Requested unMute + play + volume=100');
      } catch (e) {
        logHero('Error on unmute click:', e);
      }
      audioToggleBtn.setAttribute('data-state', 'unmuted');
      audioToggleBtn.textContent = translations[currentLang]['hero.mute'] || 'Mute';
    } else {
      try { heroPlayer.mute(); logHero('Requested mute'); } catch (e) { logHero('Error on mute click:', e); }
      audioToggleBtn.setAttribute('data-state', 'muted');
      audioToggleBtn.textContent = translations[currentLang]['hero.unmute'] || 'Unmute';
    }
    // Log current state shortly after
    setTimeout(() => {
      try {
        logHero('Post-click => isMuted:', heroPlayer.isMuted && heroPlayer.isMuted(), 'volume:', heroPlayer.getVolume && heroPlayer.getVolume(), 'state:', heroPlayer.getPlayerState && heroPlayer.getPlayerState());
      } catch (e) {}
    }, 150);
  });
}

// Keep audio button label consistent when language changes
const originalUpdateContent = updateContent;
updateContent = function() {
  originalUpdateContent();
  const btn = document.getElementById('hero-audio-toggle');
  if (btn) {
    const currentState = btn.getAttribute('data-state') || 'muted';
    btn.textContent = translations[currentLang][currentState === 'unmuted' ? 'hero.mute' : 'hero.unmute']
      || (currentState === 'unmuted' ? 'Mute' : 'Unmute');
  }
}