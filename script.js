/* ============================================
   🍋 ENDREWDESIGNER - JAVASCRIPT
   ============================================ */

// ===== LANGUAGE SYSTEM =====
let currentLang = 'pt';

function detectLanguage() {
    const saved = localStorage.getItem('endrew-lang');
    if (saved) return saved;
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang.startsWith('pt') ? 'pt' : 'en';
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('endrew-lang', lang);
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

    const flag = document.getElementById('langFlag');
    const label = document.getElementById('langLabel');
    if (flag) flag.textContent = lang === 'pt' ? '🇧🇷' : '🇺🇸';
    if (label) label.textContent = lang === 'pt' ? 'PT' : 'EN';

    document.querySelectorAll('[data-pt]').forEach(el => {
        const text = el.getAttribute('data-' + lang);
        if (text) {
            if (el.tagName === 'OPTION') {
                el.textContent = text;
            } else {
                el.innerHTML = text;
            }
        }
    });

    document.querySelectorAll('[data-pt-placeholder]').forEach(el => {
        const ph = el.getAttribute('data-' + lang + '-placeholder');
        if (ph) el.placeholder = ph;
    });

    updateTypedWords(lang);

    // Update theme label on language change
    const themeLabel = document.getElementById('themeLabel');
    if (themeLabel) {
        if (currentTheme === 'morango') {
            themeLabel.textContent = lang === 'en' ? 'Strawberry' : 'Morango';
        } else {
            themeLabel.textContent = lang === 'en' ? 'Passion Fruit' : 'Maracuja';
        }
    }
}

function updateTypedWords(lang) {
    if (lang === 'en') {
        words.length = 0;
        words.push('transforms.', 'delights.', 'connects.', 'inspires.', 'sells.', 'brands.');
    } else {
        words.length = 0;
        words.push('transforma.', 'encanta.', 'conecta.', 'inspira.', 'vende.', 'marca.');
    }
}

// ===== THEME SYSTEM =====
let currentTheme = 'maracuja';

function detectTheme() {
    const saved = localStorage.getItem('endrew-theme');
    if (saved) return saved;
    return 'maracuja';
}

function setTheme(theme) {
    currentTheme = theme;
    localStorage.setItem('endrew-theme', theme);

    const icon = document.getElementById('themeIcon');
    const label = document.getElementById('themeLabel');

    if (theme === 'morango') {
        document.body.classList.add('theme-morango');
        if (icon) icon.textContent = '🍓';
        if (label) label.textContent = currentLang === 'en' ? 'Strawberry' : 'Morango';
    } else {
        document.body.classList.remove('theme-morango');
        if (icon) icon.textContent = '🍋';
        if (label) label.textContent = currentLang === 'en' ? 'Passion Fruit' : 'Maracuja';
    }
}

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const newTheme = currentTheme === 'maracuja' ? 'morango' : 'maracuja';
            setTheme(newTheme);
        });
    }

    // Language toggle
    const langBtn = document.getElementById('langToggle');
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const newLang = currentLang === 'pt' ? 'en' : 'pt';
            setLanguage(newLang);
        });
    }
});

// ===== LOADER =====
window.addEventListener('load', () => {
    // Set initial language
    const detectedLang = detectLanguage();
    setLanguage(detectedLang);

    // Set initial theme
    const detectedTheme = detectTheme();
    setTheme(detectedTheme);

    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
        initAnimations();
    }, 2000);
});

// ===== PARTICLES =====
function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 20; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        p.style.left = Math.random() * 100 + '%';
        p.style.width = p.style.height = Math.random() * 4 + 2 + 'px';
        p.style.animationDuration = Math.random() * 15 + 10 + 's';
        p.style.animationDelay = Math.random() * 10 + 's';
        p.style.opacity = Math.random() * 0.5 + 0.1;
        container.appendChild(p);
    }
}
createParticles();

// ===== TYPED TEXT =====
const words = ['transforma.', 'encanta.', 'conecta.', 'inspira.', 'vende.', 'marca.'];
let wordIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById('typedText');

function typeEffect() {
    const current = words[wordIndex];
    typedEl.textContent = current.substring(0, isDeleting ? --charIndex : ++charIndex);

    let speed = isDeleting ? 50 : 100;
    if (!isDeleting && charIndex === current.length) { speed = 2000; isDeleting = true; }
    else if (isDeleting && charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; speed = 300; }

    setTimeout(typeEffect, speed);
}
typeEffect();

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 50);
    document.getElementById('backToTop').classList.toggle('visible', y > 500);
    document.getElementById('whatsappFloat').classList.toggle('visible', y > 300);
    updateActiveNav();
});

function updateActiveNav() {
    let current = '';
    document.querySelectorAll('section[id]').forEach(s => {
        if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    document.querySelectorAll('.nav-link').forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
}

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
});

document.querySelectorAll('.mobile-link').forEach(l => {
    l.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// ===== SCROLL REVEAL =====
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseFloat(entry.target.style.getPropertyValue('--delay') || '0') * 1000;
                setTimeout(() => entry.target.classList.add('revealed'), delay);
                if (entry.target.closest('.skills-container')) animateSkills();
                if (entry.target.closest('.hero-stats')) animateCounters();
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => observer.observe(el));
}

// ===== SKILLS =====
let skillsDone = false;
function animateSkills() {
    if (skillsDone) return; skillsDone = true;
    document.querySelectorAll('.skill-progress').forEach(bar => {
        setTimeout(() => bar.style.width = bar.dataset.width + '%', 300);
    });
}

// ===== COUNTERS =====
let countersDone = false;
function animateCounters() {
    if (countersDone) return; countersDone = true;
    document.querySelectorAll('.stat-number').forEach(c => {
        const target = +c.dataset.count, step = target / 125;
        let current = 0;
        const update = () => {
            current += step;
            if (current < target) { c.textContent = Math.floor(current); requestAnimationFrame(update); }
            else c.textContent = target;
        };
        update();
    });
}

// ===== BACK TO TOP =====
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== FORM → WHATSAPP =====
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('formNome').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const servico = document.getElementById('formServico').value;
    const mensagem = document.getElementById('formMensagem').value.trim();

    const msg = currentLang === 'en'
        ? [
            'Hello Endrew! I came from your portfolio and I am interested in your services.',
            '',
            '--- Contact Details ---',
            'Name: ' + nome,
            'Email: ' + email,
            'Service: ' + servico,
            '',
            '--- Message ---',
            mensagem,
            '',
            'Looking forward to your reply!'
        ].join('\n')
        : [
            'Ola Endrew! Vim pelo seu portfolio e tenho interesse nos seus servicos.',
            '',
            '--- Dados do Contato ---',
            'Nome: ' + nome,
            'Email: ' + email,
            'Servico: ' + servico,
            '',
            '--- Mensagem ---',
            mensagem,
            '',
            'Aguardo seu retorno!'
        ].join('\n');

    const btn = e.target.querySelector('.btn-submit');
    const original = btn.innerHTML;
    btn.innerHTML = currentLang === 'en'
        ? '<i class="fas fa-check"></i> Redirecting to WhatsApp...'
        : '<i class="fas fa-check"></i> Redirecionando pro WhatsApp...';
    btn.style.background = '#25D366';

    setTimeout(() => {
        window.open('https://wa.me/5511995630759?text=' + encodeURIComponent(msg), '_blank');
        btn.innerHTML = original;
        btn.style.background = '';
        e.target.reset();
    }, 1000);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        e.preventDefault();
        const t = document.querySelector(this.getAttribute('href'));
        if (t) t.scrollIntoView({ behavior: 'smooth' });
    });
});

// ===== PARALLAX =====
window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const hero = document.querySelector('.hero-content');
    if (hero && y < window.innerHeight) {
        hero.style.transform = 'translateY(' + (y * 0.15) + 'px)';
        hero.style.opacity = 1 - (y / window.innerHeight) * 0.5;
    }
});

// ===== TILT CARDS =====
document.querySelectorAll('.servico-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const rx = (e.clientY - r.top - r.height / 2) / 20;
        const ry = (r.width / 2 - (e.clientX - r.left)) / 20;
        card.style.transform = 'perspective(1000px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-8px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== CURSOR GLOW =====
const glow = document.createElement('div');
glow.style.cssText = 'position:fixed;width:300px;height:300px;background:radial-gradient(circle,rgba(255,214,0,0.03)0%,transparent 70%);border-radius:50%;pointer-events:none;z-index:0;transform:translate(-50%,-50%);transition:0.3s ease;';
document.body.appendChild(glow);
document.addEventListener('mousemove', (e) => { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; });

// ===== JUICE CARD TOUCH (MOBILE) =====
document.querySelectorAll('.juice-card').forEach(card => {
    card.addEventListener('touchstart', () => card.classList.add('touched'));
    card.addEventListener('touchend', () => setTimeout(() => card.classList.remove('touched'), 2000));
});

// Add touch CSS
const touchStyle = document.createElement('style');
touchStyle.textContent = '.juice-card.touched { border-color: var(--primary); transform: translateY(-8px); box-shadow: 0 0 10px rgba(255,214,0,0.4), 0 0 25px rgba(255,214,0,0.15), 0 20px 60px rgba(0,0,0,0.4); } .juice-card.touched .juice-overlay { opacity: 1; } .juice-card.touched .juice-overlay-content { transform: translateY(0); } .juice-card.touched .juice-image img { transform: scale(1.08); filter: brightness(0.7); }';
document.head.appendChild(touchStyle);

console.log('%c🍋 EndrewDesigner 🍋\n%cDesign com sabor e personalidade!\n%c@endrew_proshop\n%cWhatsApp: (11) 99563-0759',
'color: #FFD600; font-size: 24px; font-weight: bold;',
'color: #FFAB00; font-size: 14px;',
'color: #E1306C; font-size: 12px;',
'color: #25D366; font-size: 12px;'
);