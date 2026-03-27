console.log("Script yüklendi!");
function logHero() {
  try {
    var args = Array.prototype.slice.call(arguments);
    args.unshift('[HERO-VIDEO]');
    console.log.apply(console, args);
  } catch (e) {
    try {
      console.log('[HERO-VIDEO] (fallback)', arguments);
    } catch (err) { }
  }
}
// Global error hooks to surface silent errors
window.addEventListener('error', function (ev) {
  logHero('window.error:', ev && ev.message, ev && ev.filename, ev && ev.lineno, ev && ev.colno);
});
window.addEventListener('unhandledrejection', function (ev) {
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
    "nav.home": "HOME",
    "nav.about": "ABOUT US",
    "nav.games": "GAMES",
    "nav.porting": "PORTING",
    "nav.internship": "INTERNSHIP",
    "nav.contact": "CONTACT",
    "nav.location": "Location",
    "hero.badge": "Next-Gen Gaming Experience",
    "hero.title.new": "WELCOME TO",
    "hero.title.gaming": "DINOMORE",
    "hero.title.world": "",
    "hero.subtitle": "Where gaming dreams come true.",
    "hero.playNow": "Play Now",
    "hero.discover": "Discover Games",

    "about.title": "About Us",
    "about.description": "Established in June 2025, Dinomore Games is a forward-thinking game development studio dedicated to creating immersive and high-quality gaming experiences. We specialize in developing original titles for a wide range of platforms, including PlayStation 4, PlayStation 5, Xbox One, Nintendo Switch, and PC. Beyond our own creative projects, we offer expert porting services to help bring established games to new audiences and platforms. Our young, dynamic, and passionate team of developers is at the forefront of the industry, pushing the boundaries of creativity using industry-leading engines like Unity and Unreal Engine.",
    "games.title": "Our Games",
    "games.playstation": "<img src='psLogo.png' alt='PlayStation Logo' class='platform-logo' /> PlayStation Games",
    "games.nintendo": "<img src='nintendoSwitchLogo.png' alt='Nintendo Switch Logo' class='platform-logo' /> Nintendo Switch Games",
    "games.steam": "<img src='steamLogo.png' alt='Steam Logo' class='platform-logo' /> Steam Games",
    "games.kamikaze.title": "Kamikaze Strike",
    "games.voltline.title": "Voltline",
    "games.logiq.title": "Logiq Boost",
    "games.roll.title": "Rhythm Roll",
    "games.duck.title": "Ducks in Disguise",
    "games.fire.title": "Fire Crew Simulator",
    "games.drone.title": "Sky Safari FPV Drone",
    "games.play": "Play",
    "games.wip": "W.I.P",
    "games.playersLabel": "Players",
    "games.genre.racing": "Racing",
    "games.genre.action": "Action",
    "games.genre.adventure": "Adventure",
    "games.genre.puzzle": "Puzzle",

    "contact.title": "Contact Us",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.submit": "Send Message",
    "footer.copyright": "© 2026 Dinomore. All rights reserved.",
    "form.success": "Message Sent!",

    "internship.title": "Internship Program",
    "internship.subtitle": "Join our team and kickstart your career in game development. Here's how our internship process works:",
    "internship.phase1.title": "Step 1: Application",
    "internship.phase1.desc": "You can contact our team by sending an email to contact@dinomoregames.com and send your CV and portfolio.",
    "internship.phase2.title": "Step 2: Technical Assessment",
    "internship.phase2.desc": "A hands-on opportunity to shine! You'll work on a task tailored to your role, allowing us to see your creativity and problem-solving in action.",
    "internship.phase3.title": "Step 3: Interview",
    "internship.phase3.desc": "Let's dive deeper! This is your chance to present your work, ask questions, and discuss your ideas with our team.",
    "internship.phase4.title": "Step 4: Onboarding",
    "internship.phase4.desc": "Welcome aboard! You'll join your team, get set up with tools, and start contributing to real projects from day one.",

    "porting.title": "PORTING",
    "porting.intro": "Don't Let Your Game Be Limited to a Single Platform",
    "porting.description": "Developing a game is a challenging process in its own right. However, porting a game to different platforms from PC to console, mobile to different operating systems requires a whole separate expertise. Many technical details such as performance optimization, adaptation of control mechanisms, resolution and interface adjustments require a professional approach.",
    "porting.quote": "<span class='neon-email'>contact@dinomoregames.com</span>",
    "porting.why.title": "Why is Game Porting So Important?",
    "porting.why.item1": "Wider player base",
    "porting.why.item2": "Increased revenue potential",
    "porting.why.item3": "Growth in brand awareness",
    "porting.why.item4": "Sustainability across different platforms",
    "porting.approach.title": "Dinomore Games' Porting Approach",
    "porting.approach.item1.title": "Technical Expertise",
    "porting.approach.item1.desc": "A team experienced in different game engines and platform architectures.",
    "porting.approach.item2.title": "Performance Oriented Optimization",
    "porting.approach.item2.desc": "Detailed technical analysis against FPS drops, memory issues, and latency problems.",
    "porting.approach.item3.title": "Platform Specific Experience Design",
    "porting.approach.item3.desc": "Control and interface adaptation according to the player habits of each platform.",
    "porting.approach.item4.title": "Testing and Quality Assurance",
    "porting.approach.item4.desc": "Stable and smooth delivery with comprehensive testing processes before release.",
    "porting.who.title": "Who is it Suitable For?",
    "porting.who.item1": "Indie developers",
    "porting.who.item2": "Teams looking to grow their studio",
    "porting.who.item3": "Publishers who want to open their existing game to new platforms",
    "porting.who.item4": "Projects aiming to open up to the global market",
    "porting.global.title": "Gateway to the Global Market",
    "porting.global.desc": "A successful port takes your game to the next level not only technically but also commercially. Dinomore Games approaches the project not just as a 'transfer process', but as a strategic growth move.",
    "porting.cta": "If you want to see your game on different platforms, reach more players and increase your revenue potential, Dinomore Games' porting services can be a powerful solution partner."
  },
  tr: {
    "nav.home": "ANA SAYFA",
    "nav.about": "HAKKIMIZDA",
    "nav.games": "OYUNLAR",
    "nav.porting": "PORTING",
    "nav.internship": "STAJ",
    "nav.contact": "İLETİŞİM",
    "nav.location": "Konum",
    "hero.badge": "Yeni Nesil Oyun Deneyimi",
    "hero.title.new": "",
    "hero.title.gaming": "DINOMORE'A",
    "hero.title.world": "HOŞ GELDİN",
    "hero.subtitle": "Oyun hayallerinin gerçeğe dönüştüğü yer.",
    "hero.playNow": "Şimdi Oyna",
    "hero.discover": "Oyunları Keşfet",

    "about.title": "Hakkımızda",
    "about.description": "Haziran 2025'te kurulan Dinomore Games, sürükleyici ve yüksek kaliteli oyun deneyimleri yaratmaya kendini adamış, ileri görüşlü bir oyun geliştirme stüdyosudur. PlayStation 4, PlayStation 5, Xbox One, Nintendo Switch ve PC gibi geniş bir platform yelpazesi için özgün yapımlar geliştirme konusunda uzmanlaştık. Kendi yaratıcı projelerimizin yanı sıra, mevcut oyunları yeni kitlelere ve platformlara ulaştırmak için profesyonel portlama hizmetleri de sunuyoruz. Genç, dinamik ve tutkulu ekibimiz; Unity ve Unreal Engine gibi sektör lideri oyun motorlarını kullanarak yaratıcılığın sınırlarını zorlayarak oyun dünyasında fark yaratmaya devam ediyor.",
    "games.title": "Oyunlarımız",
    "games.playstation": "<img src='psLogo.png' alt='PlayStation Logo' class='platform-logo' /> PlayStation Oyunları",
    "games.nintendo": "<img src='nintendoSwitchLogo.png' alt='Nintendo Switch Logo' class='platform-logo' /> Nintendo Switch Oyunları",
    "games.steam": "<img src='steamLogo.png' alt='Steam Logo' class='platform-logo' /> Steam Oyunları",
    "games.kamikaze.title": "Kamikaze Strike",
    "games.voltline.title": "Voltline",
    "games.logiq.title": "Logiq Boost",
    "games.roll.title": "Rhythm Roll",
    "games.duck.title": "Ducks in Disguise",
    "games.fire.title": "Fire Crew Simulator",
    "games.drone.title": "Sky Safari FPV Drone",
    "games.play": "Oyna",
    "games.wip": "W.I.P",
    "games.playersLabel": "Oyuncu",
    "games.genre.racing": "Yarış",
    "games.genre.action": "AKSİYON",
    "games.genre.adventure": "Macera",
    "games.genre.puzzle": "Bulmaca",

    "contact.title": "İLETİŞİM",
    "contact.name": "İsim",
    "contact.email": "E-posta",
    "contact.message": "Mesaj",
    "contact.submit": "Mesaj Gönder",
    "footer.copyright": "© 2026 Dinomore. Tüm hakları saklıdır.",
    "form.success": "Mesajınız iletildi",

    "internship.title": "Staj Programı",
    "internship.subtitle": "Ekibimize katılın ve oyun geliştirme kariyerinize bizimle başlayın. Staj sürecimiz şöyle işliyor:",
    "internship.phase1.title": "Adım 1: Başvuru",
    "internship.phase1.desc": "Ekibimiz ile contact@dinomoregames.com adresine mail yollayarak görüşebilir, CV ve portföyünüzü gönderebilirsiniz.",
    "internship.phase2.title": "Adım 2: Teknik Değerlendirme",
    "internship.phase2.desc": "Yeteneklerinizi sergileme fırsatı! Rolünüze uygun bir görev üzerinde çalışarak yaratıcılığınızı ve problem çözme becerilerinizi göstereceksiniz.",
    "internship.phase3.title": "Adım 3: Mülakat",
    "internship.phase3.desc": "Daha derine inelim! Bu, çalışmanızı sunma, sorular sorma ve fikirlerinizi ekibimizle tartışma şansınız.",
    "internship.phase4.title": "Adım 4: Katılım",
    "internship.phase4.desc": "Aramıza hoş geldiniz! Ekibinize katılacak, araçlarınızı kuracak ve ilk günden itibaren gerçek projelere katkıda bulunmaya başlayacaksınız.",

    "porting.title": "PORTING",
    "porting.intro": "Oyununuz Tek Platformla Sınırlı Kalmasın",
    "porting.description": "Bir oyunu geliştirmek başlı başına zorlu bir süreç. Ancak oyunu farklı platformlara PC’den konsola, mobil’den farklı işletim sistemlerine taşımak apayrı bir uzmanlık gerektirir. Performans optimizasyonu, kontrol mekaniklerinin uyarlanması, çözünürlük ve arayüz düzenlemeleri gibi pek çok teknik detay profesyonel yaklaşım ister.",
    "porting.quote": "<span class='neon-email'>contact@dinomoregames.com</span>",
    "porting.why.title": "Neden Oyun Portlama Bu Kadar Önemli?",
    "porting.why.item1": "Daha geniş oyuncu kitlesi",
    "porting.why.item2": "Artan gelir potansiyeli",
    "porting.why.item3": "Marka bilinirliğinde büyüme",
    "porting.why.item4": "Farklı platformlarda sürdürülebilirlik",
    "porting.approach.title": "Dinomore Games’in Portlama Yaklaşımı",
    "porting.approach.item1.title": "Teknik Uzmanlık",
    "porting.approach.item1.desc": "Farklı oyun motorları ve platform mimarileri konusunda deneyimli ekip.",
    "porting.approach.item2.title": "Performans Odaklı Optimizasyon",
    "porting.approach.item2.desc": "FPS düşüşleri, bellek sorunları ve gecikme problemlerine karşı detaylı teknik analiz.",
    "porting.approach.item3.title": "Platforma Özel Deneyim Tasarımı",
    "porting.approach.item3.desc": "Her platformun oyuncu alışkanlıklarına göre kontrol ve arayüz uyarlaması.",
    "porting.approach.item4.title": "Test ve Kalite Güvencesi",
    "porting.approach.item4.desc": "Yayın öncesi kapsamlı test süreçleriyle stabil ve sorunsuz teslim.",
    "porting.who.title": "Kimler İçin Uygun?",
    "porting.who.item1": "Indie geliştiriciler",
    "porting.who.item2": "Stüdyosunu büyütmek isteyen ekipler",
    "porting.who.item3": "Mevcut oyununu yeni platformlara açmak isteyen yayıncılar",
    "porting.who.item4": "Global pazara açılmayı hedefleyen projeler",
    "porting.global.title": "Global Pazara Açılan Kapı",
    "porting.global.desc": "Başarılı bir port, oyununuzu sadece teknik olarak değil, ticari olarak da bir üst seviyeye taşır. Dinomore Games, projeye sadece bir “porting” olarak değil, stratejik bir büyüme hamlesi olarak yaklaşıyor.",
    "porting.cta": "Eğer siz de oyununuzu farklı platformlarda görmek, daha fazla oyuncuya ulaşmak ve gelir potansiyelinizi artırmak istiyorsanız, Dinomore Games’in oyun portlama hizmetleri güçlü bir çözüm ortağı olabilir."
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
  contactForm.addEventListener('submit', async function (e) {
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
  if (hero) hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
});

// Initialize Hero Background Slider
const heroSwiper = new Swiper('.hero-slider', {
  loop: true,
  speed: 1000,
  effect: 'slide',
  grabCursor: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  allowTouchMove: true,
  on: {
    slideChange: function () {
      const index = this.realIndex;
      const logos = document.querySelectorAll('.dynamic-logo');
      const playBtn = document.querySelector('.btn-play');
      logos.forEach(logo => logo.classList.remove('active'));

      if (index === 0 || index === 1) {
        document.querySelector('.kamikaze-logo').classList.add('active');
        if (playBtn) playBtn.href = "https://store.steampowered.com/app/3902740/Kamikaze_Strike_FPV_Drone/";
      } else if (index === 2) {
        document.querySelector('.firecrew-logo').classList.add('active');
        if (playBtn) playBtn.href = "https://store.steampowered.com/app/4012160/Fire_Crew_Simulator/";
      } else if (index === 3) {
        document.querySelector('.volt-logo').classList.add('active');
        if (playBtn) playBtn.href = "https://store.playstation.com/tr-tr/product/EB2251-CUSA58133_00-0504252544586584";
      }
    },
    init: function () {
      // Initial logo and link set
      setTimeout(() => {
        const index = this.realIndex;
        const playBtn = document.querySelector('.btn-play');
        if (index === 0 || index === 1) {
          document.querySelector('.kamikaze-logo').classList.add('active');
          if (playBtn) playBtn.href = "https://store.steampowered.com/app/3902740/Kamikaze_Strike_FPV_Drone/";
        } else if (index === 2) {
          document.querySelector('.firecrew-logo').classList.add('active');
          if (playBtn) playBtn.href = "https://store.steampowered.com/app/4012160/Fire_Crew_Simulator/";
        } else if (index === 3) {
          document.querySelector('.volt-logo').classList.add('active');
          if (playBtn) playBtn.href = "https://store.playstation.com/tr-tr/product/EB2251-CUSA58133_00-0504252544586584";
        }
      }, 100);
    }
  }
});

// Carousel functionality
const track = document.querySelector('.carousel-track');
if (track) {
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
    for (let i = 0; i < 5; i++) {
      const cardIndex = (currentIndex + i) % cards.length;
      if (cards[cardIndex]) {
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
  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
  }

  // Game cards hover effect
  cards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
      const icon = card.querySelector('.game-image i');
      if (icon) icon.style.transform = 'rotate(360deg) scale(1.2)';
    });

    card.addEventListener('mouseleave', (e) => {
      const icon = card.querySelector('.game-image i');
      if (icon) icon.style.transform = '';
    });
  });
} // end if (track)

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
    const translation = translations[currentLang][key];
    if (translation !== undefined && translation !== null) {
      const htmlKeys = ['games.comingsoon', 'games.playstation', 'games.nintendo', 'games.steam', 'porting.quote'];
      if (htmlKeys.includes(key)) {
        element.innerHTML = translation;
      } else {
        element.textContent = translation;
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
  const currentLangDisplay = document.getElementById('current-lang');
  if (currentLangDisplay) {
    currentLangDisplay.textContent = currentLang.toUpperCase();
  }

  document.querySelectorAll('.lang-option').forEach(btn => {
    // Extract lang from onclick or data attribute if we added one (but here it's in onclick)
    const onclickStr = btn.getAttribute('onclick');
    if (onclickStr && onclickStr.includes(currentLang)) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Keep support for any legacy .lang-btn if they still exist elsewhere
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.innerText.toLowerCase() === currentLang.toLowerCase()) {
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
    } catch (e) { }
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

// Game Library Interaction Logic
document.addEventListener('DOMContentLoaded', () => {
  const libraryHeaders = document.querySelectorAll('.library-header');
  const playLinks = document.querySelectorAll('.play-link');

  // Handle Play Button Click
  playLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.stopPropagation(); // Don't expand/collapse when clicking play
      const url = link.getAttribute('data-url');
      if (url) {
        window.open(url, '_blank');
      }
    });
  });

  // Handle Header Click (Expand/Collapse)
  libraryHeaders.forEach(header => {
    header.addEventListener('click', (e) => {
      const item = header.parentElement;

      // Close all other items
      document.querySelectorAll('.library-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('expanded');
        }
      });

      // Toggle current item
      item.classList.toggle('expanded');
    });
  });
});

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
    '.games-group',
    '.internship-container',
    '.phase-item',
    '.porting-header',
    '.porting-card',
    '.porting-footer'
  ];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.classList.add('fade-in');
    });
  });
}

window.addEventListener('DOMContentLoaded', function () {
  addFadeInToElements();
  handleScrollFadeIn();
  window.addEventListener('scroll', handleScrollFadeIn);
});

// Space Parallax Effect
document.addEventListener('mousemove', (e) => {
  const wrapper = document.querySelector('.space-wrapper');
  if (!wrapper) return;

  const xAxis = (window.innerWidth / 2 - e.pageX) / 30;
  const yAxis = (window.innerHeight / 2 - e.pageY) / 30;

  const stars = document.querySelector('.starfield');
  const logos = document.querySelectorAll('.logo-3d');
  const drones = document.querySelectorAll('.drone-fpv');

  if (stars) {
    stars.style.transform = `translate(${xAxis / 1.5}px, ${yAxis / 1.5}px)`;
  }

  logos.forEach(logo => {
    const isUnity = logo.classList.contains('unity');
    const depth = isUnity ? 1.8 : 1.2;
    // Apply rotation and translation to the container
    if (isUnity) {
      logo.style.transform = `translate3d(${xAxis * depth}px, ${yAxis * depth}px, 100px)`;
    } else {
      logo.style.transform = `translate3d(${xAxis * depth}px, ${yAxis * depth}px, 100px) rotateY(${xAxis * 1.5}deg) rotateX(${-yAxis * 1.5}deg)`;
    }
  });

  // Drone parallax removed — was overriding CSS animation transforms
});

window.addEventListener('resize', function () {
  applyScrollMarginTop();
});

// YouTube player setup and audio toggle logic
let heroPlayer;
let heroPlayerReady = false;
let pendingUnmute = false;
window.onYouTubeIframeAPIReady = function () {
  console.log('onYouTubeIframeAPIReady called');
  const iframe = document.getElementById('heroVideoIframe');
  if (!iframe || !window.YT || !YT.Player) return;
  heroPlayer = new YT.Player('heroVideoIframe', {
    events: {
      onReady: function (event) {
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
        } catch (e) { }
      },
      onStateChange: function (e) {
        const map = { '-1': 'UNSTARTED', 0: 'ENDED', 1: 'PLAYING', 2: 'PAUSED', 3: 'BUFFERING', 5: 'CUED' };
        let muted = null, vol = null;
        try { muted = heroPlayer && heroPlayer.isMuted && heroPlayer.isMuted(); } catch (err) { }
        try { vol = heroPlayer && heroPlayer.getVolume && heroPlayer.getVolume(); } catch (err) { }
        logHero('onStateChange:', map[e.data] || e.data, 'muted:', muted, 'volume:', vol);
      },
      onError: function (err) {
        logHero('Player error:', err && err.data, err);
      }
    }
  });
};

const audioToggleBtn = document.getElementById('hero-audio-toggle');
if (audioToggleBtn) {
  audioToggleBtn.addEventListener('click', function () {
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
      } catch (e) { }
    }, 150);
  });
}

// Keep audio button label consistent when language changes
const originalUpdateContent = updateContent;
updateContent = function () {
  originalUpdateContent();
  const btn = document.getElementById('hero-audio-toggle');
  if (btn) {
    const currentState = btn.getAttribute('data-state') || 'muted';
    btn.textContent = translations[currentLang][currentState === 'unmuted' ? 'hero.mute' : 'hero.unmute']
      || (currentState === 'unmuted' ? 'Mute' : 'Unmute');
  }
}

// ===== Dynamic Neon Star Canvas =====
window.addEventListener('load', function () {
  setTimeout(function () {
    var canvas = document.getElementById('neonStarCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var wrapper = document.querySelector('.space-wrapper');
    if (!wrapper) return;

    var NEON_COLORS = [
      [255, 255, 255], // Pure White
      [245, 245, 255], // Ghost White
      [255, 250, 240], // Floral White
      [240, 248, 255], // Alice Blue (Very light white-blue)
      [255, 255, 240], // Ivory
      [250, 250, 250], // Snow-like white
      [255, 255, 255], // Pure White repeat
      [248, 248, 255]  // Ghost white repeat
    ];

    var stars = [];
    var STAR_COUNT = 350;

    function resize() {
      canvas.width = wrapper.offsetWidth;
      canvas.height = wrapper.offsetHeight;
    }

    function createStars() {
      stars = [];
      for (var i = 0; i < STAR_COUNT; i++) {
        var c = NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)];
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.4,
          r: c[0], g: c[1], b: c[2],
          alpha: Math.random() * 0.3 + 0.1,
          twinkleSpeed: Math.random() * 0.005 + 0.001,
          twinklePhase: Math.random() * Math.PI * 2,
          glowSize: Math.random() * 8 + 4
        });
      }
    }

    function drawStars(time) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        var twinkle = Math.sin(time * s.twinkleSpeed + s.twinklePhase);
        var a = s.alpha * (0.5 + 0.5 * twinkle);
        if (a < 0.05) continue;
        var ga = a * 0.5;

        // Outer glow
        ctx.beginPath();
        var grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.glowSize);
        grad.addColorStop(0, 'rgba(' + s.r + ',' + s.g + ',' + s.b + ',' + ga + ')');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.arc(s.x, s.y, s.glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Star core
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + s.r + ',' + s.g + ',' + s.b + ',' + a + ')';
        ctx.fill();

        // Bright center
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,' + (a * 0.9) + ')';
        ctx.fill();
      }
    }

    function animate(time) {
      drawStars(time);
      requestAnimationFrame(animate);
    }

    resize();
    createStars();
    requestAnimationFrame(animate);

    if (typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(function () { resize(); createStars(); }).observe(wrapper);
    }
    window.addEventListener('resize', function () { resize(); createStars(); });
  }, 200);
});