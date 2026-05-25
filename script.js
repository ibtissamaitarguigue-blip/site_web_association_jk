/* ============================================================
   JEUNES EL KENDI — SCRIPT.JS (Version Presentation Hors-Ligne)
   ============================================================ */

/* ===== ÉCRAN DE CHARGEMENT ===== */
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loaderScreen');
        if (loader) loader.classList.add('hidden');
    }, 1800);
});

/* ===== UTILITAIRES ===== */
function escapeHTML(str) {
    const d = document.createElement('div');
    d.appendChild(document.createTextNode(str));
    return d.innerHTML;
}

/* ===== TTS (SYTHÈSE VOCALE) ===== */
let ttsEnabled = true, ttsVoicesReady = false, ttsVoiceCache = { fr: null, en: null, ar: null };

function loadVoices() {
    if (!window.speechSynthesis) return;
    const allVoices = window.speechSynthesis.getVoices();
    if (allVoices.length === 0) return;
    ttsVoicesReady = true;
    
    console.log("🔊 Voix détectées sur cet appareil :");
    allVoices.forEach(v => {
        if (v.localService) console.log(`✅ [LOCALE] ${v.name} (${v.lang})`);
    });
    
    ttsVoiceCache.fr = allVoices.find(v => v.lang === 'fr-FR' && v.localService) 
        || allVoices.find(v => v.lang === 'fr-FR') 
        || allVoices.find(v => v.lang.startsWith('fr') && v.localService) 
        || allVoices.find(v => v.lang.startsWith('fr')) || null;
        
    ttsVoiceCache.en = allVoices.find(v => v.lang === 'en-US' && v.localService) 
        || allVoices.find(v => v.lang === 'en-US') 
        || allVoices.find(v => v.lang.startsWith('en') && v.localService) 
        || allVoices.find(v => v.lang.startsWith('en')) || null;
        
    ttsVoiceCache.ar = allVoices.find(v => v.lang === 'ar-SA' && v.localService) 
        || allVoices.find(v => v.lang === 'ar-EG' && v.localService) 
        || allVoices.find(v => v.lang.startsWith('ar') && v.localService) 
        || allVoices.find(v => v.lang.startsWith('ar')) || null;
        
    console.log("🇫🇷 Voix FR choisie:", ttsVoiceCache.fr?.name || "Aucune");
    console.log("🇬🇧 Voix EN choisie:", ttsVoiceCache.en?.name || "Aucune");
    console.log("🇸🇦 Voix AR choisie:", ttsVoiceCache.ar?.name || "Aucune");
}

if (window.speechSynthesis) { 
    loadVoices(); 
    window.speechSynthesis.onvoiceschanged = loadVoices; 
}

function toggleTTS() {
    ttsEnabled = !ttsEnabled; 
    if (!ttsEnabled) stopSpeech();
    const btn = document.getElementById('ttsToggle'), icon = btn.querySelector('i');
    if (ttsEnabled) { 
        icon.className = 'fas fa-volume-up'; 
        btn.classList.add('tts-active'); 
        btn.title = currentLang === 'fr' ? 'Voix activée' : currentLang === 'ar' ? 'الصوت مفعل' : 'Voice enabled'; 
    } else { 
        icon.className = 'fas fa-volume-mute'; 
        btn.classList.remove('tts-active'); 
        btn.title = currentLang === 'fr' ? 'Voix désactivée' : currentLang === 'ar' ? 'الصوت معطل' : 'Voice disabled'; 
    }
}

function stopSpeech() { 
    if (window.speechSynthesis) window.speechSynthesis.cancel(); 
}

function speakText(htmlText) {
    if (!ttsEnabled || !window.speechSynthesis) return;
    const cleanText = htmlText
        .replace(/<br\s*\/?>/gi, '. ')
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#\d+;/g, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
        
    if (!cleanText) return; 
    
    stopSpeech();
    
    const speech = new SpeechSynthesisUtterance(cleanText);
    
    // Définition de la langue cible et de la vitesse
    if (currentLang === 'en') { speech.lang = 'en-US'; speech.rate = 0.95; }
    else if (currentLang === 'ar') { speech.lang = 'ar-SA'; speech.rate = 0.9; }
    else { speech.lang = 'fr-FR'; speech.rate = 0.92; }
    
    speech.pitch = 1;
    
    // Tentative d'attribuer la voix en cache
    if (ttsVoiceCache[currentLang]) {
        speech.voice = ttsVoiceCache[currentLang];
        speech.lang = ttsVoiceCache[currentLang].lang; // Adapter la langue à la voix
    }
    
    // Gestion des erreurs (si la voix plante hors-ligne)
    speech.onerror = (e) => {
        console.error("❌ Erreur TTS:", e.error);
    };
    
    // Délai de 100ms pour éviter le bug Chrome/Edge
    setTimeout(() => {
        window.speechSynthesis.speak(speech);
    }, 100);
}

/* ===== DARK MODE ===== */
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const icon = document.querySelector('#themeToggle i');
    const isDark = document.body.classList.contains('dark-mode');
    icon.classList.replace(isDark ? 'fa-moon' : 'fa-sun', isDark ? 'fa-sun' : 'fa-moon');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

/* ===== MENU MOBILE ===== */
function toggleMenu() { 
    const nav = document.getElementById('mainNav');
    nav.classList.toggle('open'); 
    document.getElementById('hamburgerBtn').classList.toggle('active'); 
    document.getElementById('navOverlay').classList.toggle('show'); 
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : ''; 
}

function closeMenu() { 
    document.getElementById('mainNav').classList.remove('open'); 
    document.getElementById('hamburgerBtn').classList.remove('active'); 
    document.getElementById('navOverlay').classList.remove('show'); 
    document.body.style.overflow = ''; 
}

/* ===== TRADUCTIONS (FR / EN / AR) ===== */
let currentLang = 'fr';

const translations = {
    en: {
        nav_home:"Home", nav_about:"About", nav_members:"Members", nav_activities:"Activities", nav_join:"Join Us", nav_contact:"Contact",
        hero_title:'<span class="text-vert">Jeunes El Kendi</span> Association',
        hero_subtitle:"Together, let's build the future through commitment and solidarity.", hero_btn:"Discover",
        about_title:"Welcome to Jeunes El Kendi",
        about_p1:"Founded in 2026 in the heart of El Kendi school in Casablanca, our association was born from a shared ambition between teachers and students: to build a space where every young person can become the best version of themselves.",
        about_conviction:"<strong>Our Conviction:</strong> Potential is everywhere — it just needs a framework to be revealed.",
        about_p2:"Whether through sports, culture, digital skills or social engagement, we cultivate values of solidarity and respect every day. More than an association, Jeunes El Kendi is a dynamic community that turns ideas into actions.",
        about_badge:"Since 2026",
        cta_text:"Ready to join this community? <strong>Fill out our registration form in just a few clicks.</strong>",
        cta_btn:"Join us now",
        val_solidarity:"Solidarity", val_solidarity_desc:"Mutual aid and support",
        val_innovation:"Innovation", val_innovation_desc:"Creativity and new ideas",
        val_engagement:"Commitment", val_engagement_desc:"Civic responsibility",
        val_respect:"Respect", val_respect_desc:"Diversity and tolerance",
        team_title:"Our Team", role_president:"President", role_vice:"Vice-President", role_treasurer:"Treasurer",
        role_vice_treasurer:"Assistant Treasurer", role_secretary:"General Secretary",
        activities_title:"Our Activities",
        act1_title:"ECONOVA Startup Hub 2025", act1_desc:"Student innovation for sustainability and CSR.",
        act2_title:"BTS Alkendi & PL Morocco", act2_desc:"Exchanges, passion and innovation at the heart of our professions",
        act3_title:"Eloquence at BTS ALKENDI", act3_desc:"Cultivate confidence and leadership",
        act4_title:"Drawing the school of tomorrow", act4_desc:"Our learners imagine the education system of 2040 at El Kindi high school.",
        act5_title:"Pride and Citizenship", act5_desc:"BTS Al Kendi celebrates the great dates of Morocco.",
        act6_title:"BTS Al Kendi", act6_desc:"The field of achievements, ambition in motion.",
        form_title:"Join Us", form_lastname:"Last Name", form_firstname:"First Name", form_email:"Email", form_phone:"Phone",
        form_class:"Class", form_activity:"Favorite Activity", form_submit:"Submit Registration",
        select_default:"-- Select --",
        opt_sport:"Sport", opt_culture:"Culture & Art", opt_social:"Social Action", opt_digital:"Digital & Tech",
        opt_1dia:"1st Year DIA", opt_2dia:"2nd Year DIA", 
        opt_1cg:"1st Year CG", opt_2cg:"2nd Year CG", 
        opt_1dai:"1st Year DAI", opt_2dai:"2nd Year DAI",
        form_select_class:"-- Select your class --",
        footer_desc:"Non-profit association dedicated to youth development.", footer_contact_title:"Contact",
        footer_address:"BTS El Kendi, CFC, Casablanca, Morocco",
        footer_follow:"Follow Us", footer_rights:"All rights reserved.",
        chat_title:"El Kendi Assistant", chat_status:"Online",
        stat_members:"Active Members", stat_events:"Events Held", stat_beneficiaries:"Beneficiaries", stat_partners:"Partners",
        success_title:"Thank you for your registration!", success_desc:"Your request has been successfully submitted.",
        err_required:"This field is required.", err_nom_length:"At least 2 characters.",
        err_email_invalid:"Please enter a valid email (must contain @).", err_email_format:"Invalid format. Example: nom@domaine.com",
        err_tel_format:"Format: +212 6XX XXX XXX", err_select:"Please select an option."
    },
    ar: {
        nav_home:"الرئيسية", nav_about:"من نحن", nav_members:"الأعضاء", nav_activities:"الأنشطة", nav_join:"انضم إلينا", nav_contact:"اتصل بنا",
        hero_title:'جمعية <span class="text-vert">شباب الكندي</span>',
        hero_subtitle:"معًا، لنبنِ المستقبل من خلال الالتزام والتضامن.", hero_btn:"اكتشف",
        about_title:"مرحبًا بكم في شباب الكندي",
        about_p1:"تأسست جمعيتنا عام 2026 في قلب مؤسسة BTS الكندي بالدار البيضاء، وولدت من طموح مشترك بين الأساتذة والطلاب: بناء مساحة حيث يمكن لكل شاب أن يصبح أفضل نسخة من نفسه.",
        about_conviction:"<strong>قناعتنا:</strong> الإمكانات موجودة في كل مكان — إنها تحتاج فقط إلى إطار لتكشف عن نفسها.",
        about_p2:"سواء من خلال الرياضة أو الثقافة أو المهارات الرقمية أو المشاركة الاجتماعية، نزرع قيم التضامن والاحترام يوميًا. أكثر من مجرد جمعية، شباب الكندي هو مجتمع ديناميكي يحول الأفكار إلى أفعال.",
        about_badge:"منذ 2026",
        cta_text:"مستعد للانضمام إلى هذا المجتمع؟ <strong>املأ نموذج التسجيل الخاص بنا بنقرات قليلة.</strong>",
        cta_btn:"انضم إلينا الآن",
        val_solidarity:"التضامن", val_solidarity_desc:"المساعدة والدعم المتبادل",
        val_innovation:"الابتكار", val_innovation_desc:"الإبداع والأفكار الجديدة",
        val_engagement:"الالتزام", val_engagement_desc:"المسؤولية المدنية",
        val_respect:"الاحترام", val_respect_desc:"التنوع والتسامح",
        team_title:"فريقنا", role_president:"الرئيسة", role_vice:"نائبة الرئيسة", role_treasurer:"أمينة الصندوق",
        role_vice_treasurer:"مساعد أمين الصندوق", role_secretary:"الكاتبة العامة",
        activities_title:"أنشطتنا",
        act1_title:"ECONOVA Startup Hub 2025", act1_desc:"ابتكار الطلاب في خدمة الاستدامة والمسؤولية الاجتماعية للشركات.",
        act2_title:"BTS Alkendi و PL Morocco", act2_desc:"تبادلات وشغف وابتكار في صميم مهننا",
        act3_title:"الخطابة في BTS ALKENDI", act3_desc:"زرع الثقة والقيادة",
        act4_title:"رسم مدرسة الغد", act4_desc:"متعلمنا يتخيلون النظام التعليمي لعام 2040 في ثانوية الكندي.",
        act5_title:"الفخر والمواطنة", act5_desc:"BTS الكندي يحتفل بالتواريخ الكبرى للمغرب.",
        act6_title:"BTS الكندي", act6_desc:"ميدان الإنجازات، الطموح في حركة.",
        form_title:"انضم إلينا", form_lastname:"اللقب", form_firstname:"الاسم", form_email:"البريد الإلكتروني", form_phone:"الهاتف",
        form_class:"القسم", form_activity:"النشاط المفضل", form_submit:"إرسال التسجيل",
        select_default:"-- اختر --",
        opt_sport:"رياضة", opt_culture:"ثقافة وفن", opt_social:"عمل اجتماعي", opt_digital:"رقمي وتقنية",
        opt_1dia:"السنة الأولى DIA", opt_2dia:"السنة الثانية DIA", 
        opt_1cg:"السنة الأولى CG", opt_2cg:"السنة الثانية CG", 
        opt_1dai:"السنة الأولى DAI", opt_2dai:"السنة الثانية DAI",
        form_select_class:"-- اختر قسمك --",
        footer_desc:"جمعية غير ربحية مكرسة لتطوير الشباب.", footer_contact_title:"اتصل بنا",
        footer_address:"BTS الكندي، CFC، الدار البيضاء، المغرب",
        footer_follow:"تابعنا", footer_rights:"جميع الحقوق محفوظة.",
        chat_title:"مساعد الكندي", chat_status:"متصل",
        stat_members:"أعضاء نشطون", stat_events:"فعاليات منجزة", stat_beneficiaries:"المستفيدون", stat_partners:"الشركاء",
        success_title:"شكرًا لتسجيلك!", success_desc:"تم إرسال طلبك بنجاح.",
        err_required:"هذا الحقل مطلوب.", err_nom_length:"حرفان على الأقل.",
        err_email_invalid:"يرجى إدخال بريد إلكتروني صالح.", err_email_format:"صيغة غير صالحة.",
        err_tel_format:"الصيغة: +212 6XX XXX XXX", err_select:"يرجى اختيار خيار."
    }
};

function t(k) { 
    return (currentLang !== 'fr' && translations[currentLang] && translations[currentLang][k]) 
        ? translations[currentLang][k] 
        : k; 
}

/* ===== MISE À JOUR DES SELECTS DU FORMULAIRE ===== */
function updateFormSelects() {
    const optionMap = { 'sport': 'opt_sport', 'culture': 'opt_culture', 'social': 'opt_social', 'digital': 'opt_digital' };
    const fieldActivite = document.getElementById('fieldActivite');
    if (fieldActivite) {
        Array.from(fieldActivite.options).forEach(opt => {
            if (opt.value === '') opt.text = t('select_default');
            else if (optionMap[opt.value]) opt.text = t(optionMap[opt.value]);
        });
    }
    const fieldClasse = document.getElementById('fieldClasse');
    if (fieldClasse) {
        const classMap = { '1dia': 'opt_1dia', '2dia': 'opt_2dia', '1cg': 'opt_1cg', '2cg': 'opt_2cg', '1dai': 'opt_1dai', '2dai': 'opt_2dai' };
        Array.from(fieldClasse.options).forEach(opt => {
            if (opt.value === '') opt.text = t('select_default');
            else {
                const key = classMap[opt.value.toLowerCase()];
                if (key && translations[currentLang] && translations[currentLang][key]) opt.text = translations[currentLang][key];
            }
        });
    }
    const submitBtn = document.querySelector('.btn-submit');
    if (submitBtn && !submitBtn.hasAttribute('data-i18n')) submitBtn.textContent = t('form_submit');
}

/* ===== CHANGEMENT DE LANGUE ===== */
function toggleLanguage() {
    const btn = document.getElementById('langToggle');
    if (currentLang === 'fr') currentLang = 'en';
    else if (currentLang === 'en') currentLang = 'ar';
    else currentLang = 'fr';
    btn.textContent = currentLang === 'fr' ? 'EN' : currentLang === 'en' ? 'AR' : 'FR';
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    stopSpeech();
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const k = el.getAttribute('data-i18n');
        if (!el.getAttribute('data-fr-text')) el.setAttribute('data-fr-text', el.innerHTML);
        const val = currentLang !== 'fr' && translations[currentLang] && translations[currentLang][k] ? translations[currentLang][k] : el.getAttribute('data-fr-text');
        if (val.includes('<strong>') || val.includes('<br') || val.includes('<span')) el.innerHTML = val; 
        else el.textContent = val; 
    });
    document.getElementById('userInput').placeholder = currentLang === 'fr' ? 'Écrivez votre message...' : currentLang === 'ar' ? 'اكتب رسالتك...' : 'Type your message...';
    const ttsBtn = document.getElementById('ttsToggle');
    if (ttsBtn) ttsBtn.title = ttsEnabled ? (currentLang === 'fr' ? 'Voix activée' : currentLang === 'ar' ? 'الصوت مفعل' : 'Voice enabled') : (currentLang === 'fr' ? 'Voix désactivée' : currentLang === 'ar' ? 'الصوت معطل' : 'Voice disabled');
    updateSuggestions(getCurrentSuggestionSet());
    updateSlider();
    updateFormSelects();
}

/* ===== SCROLL EFFECTS ===== */
window.addEventListener('scroll', () => {
    const y = window.scrollY;
    document.getElementById('topHeader').classList.toggle('scrolled', y > 60);
    document.getElementById('backToTop').classList.toggle('show', y > 400);
}, { passive: true });

/* ===== REVEAL ANIMATIONS ===== */
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); if (e.target.querySelector('.stat-number[data-count]')) animateCounters(e.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.reveal, .section-title').forEach(el => revealObs.observe(el));

/* ===== COMPTEURS ANIMÉS ===== */
let countersAnimated = false;
function animateCounters(container) { 
    if (countersAnimated) return; countersAnimated = true; 
    container.querySelectorAll('.stat-number[data-count]').forEach(counter => { 
        const target = parseInt(counter.getAttribute('data-count')); const start = performance.now(); 
        function update(now) { const p = Math.min((now - start) / 2000, 1); counter.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target) + '+'; if (p < 1) requestAnimationFrame(update); } 
        requestAnimationFrame(update); 
    }); 
}

/* ===== PARTICULES HERO ===== */
(function() { 
    const c = document.getElementById('heroParticles'); if (!c) return;
    const count = window.innerWidth < 480 ? 10 : 18; 
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div'); p.className = 'particle'; p.style.left = Math.random() * 100 + '%';
        p.style.width = p.style.height = (3 + Math.random() * 4) + 'px'; p.style.animationDuration = (8 + Math.random() * 12) + 's';
        p.style.animationDelay = Math.random() * 10 + 's'; p.style.opacity = 0.12 + Math.random() * 0.3; c.appendChild(p);
    } 
})();

/* ===== EFFET 3D SUR CARTES MEMBRES ===== */
if (window.innerWidth >= 768) {
    document.querySelectorAll('.member-card').forEach(card => {
        card.addEventListener('mousemove', e => { const r = card.getBoundingClientRect(); const x = ((e.clientX - r.left) / r.width) * 100; const y = ((e.clientY - r.top) / r.height) * 100; card.style.setProperty('--mx', x + '%'); card.style.setProperty('--my', y + '%'); card.style.transform = `translateY(-5px) perspective(600px) rotateX(${((y - 50) / 50) * -5}deg) rotateY(${((x - 50) / 50) * 5}deg)`; });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
}

/* ===== SLIDER ===== */
const track = document.getElementById('sliderTrack');
const progressBar = document.getElementById('progressBar');
const dots = document.querySelectorAll('.dot');
const slides = document.querySelectorAll('.slide');
let currentSlide = 0, totalSlides = slides.length, slideDuration = 4000, timer, width = 0;

function goToSlide(i) { if (i < 0 || i >= totalSlides) return; slides[currentSlide].classList.remove('active-slide'); currentSlide = i; updateSlider(); resetProgress(); setTimeout(() => slides[currentSlide].classList.add('active-slide'), 50); }
function updateSlider() { if (!track) return; track.style.transform = `translateX(-${currentSlide * 100}%)`; dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide)); }
function nextSlide() { slides[currentSlide].classList.remove('active-slide'); currentSlide = (currentSlide + 1) % totalSlides; updateSlider(); resetProgress(); setTimeout(() => slides[currentSlide].classList.add('active-slide'), 50); }
function animateProgress() { clearInterval(timer); const step = 1000 / slideDuration; width = 0; timer = setInterval(() => { if (width >= 100) { clearInterval(timer); nextSlide(); } else { width += step; progressBar.style.width = width + '%'; } }, 10); }
function resetProgress() { width = 0; if (progressBar) progressBar.style.width = '0%'; clearInterval(timer); animateProgress(); }

let touchStartX = 0;
const sc = document.querySelector('.slider-container');
if (sc) {
    sc.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    sc.addEventListener('touchend', e => { const diff = touchStartX - e.changedTouches[0].clientX; if (Math.abs(diff) > 40) { if (diff > 0 && currentSlide < totalSlides - 1) goToSlide(currentSlide + 1); else if (diff < 0 && currentSlide > 0) goToSlide(currentSlide - 1); } }, { passive: true });
}

/* ===== FORMULAIRE ===== */
const fields = { nom: { grp: 'grpNom', err: 'errNom', input: 'fieldNom' }, prenom: { grp: 'grpPrenom', err: 'errPrenom', input: 'fieldPrenom' }, email: { grp: 'grpEmail', err: 'errEmail', input: 'fieldEmail' }, tel: { grp: 'grpTel', err: 'errTel', input: 'fieldTel' }, classe: { grp: 'grpClasse', err: 'errClasse', input: 'fieldClasse' }, activite: { grp: 'grpActivite', err: 'errActivite', input: 'fieldActivite' } };
function showError(k, m) { const f = fields[k]; const grp = document.getElementById(f.grp); const err = document.getElementById(f.err); if (!grp || !err) return; grp.classList.remove('is-valid'); grp.classList.add('has-error'); err.querySelector('span').textContent = t(m); err.classList.add('show'); }
function setValid(k) { const f = fields[k]; const grp = document.getElementById(f.grp); const err = document.getElementById(f.err); if (!grp || !err) return; grp.classList.remove('has-error'); grp.classList.add('is-valid'); err.classList.remove('show'); }
function clearState(k) { const f = fields[k]; const grp = document.getElementById(f.grp); const err = document.getElementById(f.err); if (!grp || !err) return; grp.classList.remove('has-error', 'is-valid'); err.classList.remove('show'); }
function validateField(k) { const inputEl = document.getElementById(fields[k].input); if (!inputEl) return true; const v = inputEl.value.trim(); switch (k) { case 'nom': case 'prenom': if (!v) { showError(k, 'err_required'); return false; } if (v.length < 2) { showError(k, 'err_nom_length'); return false; } setValid(k); return true; case 'email': if (!v) { showError(k, 'err_required'); return false; } if (!v.includes('@')) { showError(k, 'err_email_invalid'); return false; } if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { showError(k, 'err_email_format'); return false; } setValid(k); return true; case 'tel': if (!v) { showError(k, 'err_required'); return false; } const d = v.replace(/[\s\-\(\)]/g, ''); if (!/^(\+212|0)[5-7]\d{8}$/.test(d)) { showError(k, 'err_tel_format'); return false; } setValid(k); return true; case 'classe': case 'activite': if (!v) { showError(k, 'err_select'); return false; } setValid(k); return true; } return true; }
Object.keys(fields).forEach(k => { const inputEl = document.getElementById(fields[k].input); if (!inputEl) return; inputEl.addEventListener('blur', () => { if (inputEl.value.trim()) validateField(k); }); inputEl.addEventListener('input', () => { if (document.getElementById(fields[k].grp).classList.contains('has-error')) clearState(k); }); });
const inscriptionForm = document.getElementById('inscriptionForm');
if (inscriptionForm) { inscriptionForm.addEventListener('submit', function (e) { let ok = true; ['nom', 'prenom', 'email', 'tel', 'classe', 'activite'].forEach(k => { if (!validateField(k)) ok = false; }); if (!ok) { e.preventDefault(); const fe = document.querySelector('.form-group.has-error'); if (fe) { fe.scrollIntoView({ behavior: 'smooth', block: 'center' }); const inp = fe.querySelector('input,select'); if (inp) setTimeout(() => inp.focus(), 350); } } }); }

/* ===== CHATBOT ===== */
const knowledgeBase = { presentation: { fr: `<span class="msg-icon"><i class="fas fa-info-circle"></i></span><strong>Jeunes El Kendi</strong> est une association étudiante à but non lucratif basée à Casablanca. Notre mission : développer le potentiel des jeunes.`, en: `<span class="msg-icon"><i class="fas fa-info-circle"></i></span><strong>Jeunes El Kendi</strong> is a non-profit student association based in Casablanca. Our mission: developing youth potential.`, ar: `<span class="msg-icon"><i class="fas fa-info-circle"></i></span><strong>شباب الكندي</strong> هي جمعية طلابية غير ربحية مقرها الدار البيضاء. مهمتنا: تطوير إمكانات الشباب.` }, objectifs: { fr: `<span class="msg-icon"><i class="fas fa-bullseye"></i></span>Nos objectifs :\n\n&#8226; <strong>Former</strong> aux compétences numériques\n&#8226; <strong>Sensibiliser</strong> à l'écologie\n&#8226; <strong>Créer des liens</strong> sociaux`, en: `<span class="msg-icon"><i class="fas fa-bullseye"></i></span>Our objectives:\n\n&#8226; <strong>Train</strong> in digital skills\n&#8226; <strong>Raise awareness</strong> about ecology\n&#8226; <strong>Create social bonds</strong>`, ar: `<span class="msg-icon"><i class="fas fa-bullseye"></i></span>أهدافنا:\n\n&#8226; <strong>التدريب</strong> على المهارات الرقمية\n&#8226; <strong>التحسيس</strong> بالبيئة\n&#8226; <strong>خلق روابط</strong> اجتماعية` }, activites: { fr: `<span class="msg-icon"><i class="fas fa-calendar-alt"></i></span>Nos activités :\n\n&#127942; <strong>Sport</strong>\n&#127912; <strong>Culture & Art</strong>\n&#128187; <strong>Digital & Tech</strong>`, en: `<span class="msg-icon"><i class="fas fa-calendar-alt"></i></span>Our activities:\n\n&#127942; <strong>Sports</strong>\n&#127912; <strong>Culture & Art</strong>\n&#128187; <strong>Digital & Tech</strong>`, ar: `<span class="msg-icon"><i class="fas fa-calendar-alt"></i></span>أنشطتنا:\n\n&#127942; <strong>رياضة</strong>\n&#127912; <strong>ثقافة وفن</strong>\n&#128187; <strong>رقمي وتقنية</strong>` }, sport: { fr: `<span class="msg-icon"><i class="fas fa-futbol"></i></span>Tournois inter-classes de foot et basket, athlétisme, défis mensuels. Ouvert à tous ! &#128170;`, en: `<span class="msg-icon"><i class="fas fa-futbol"></i></span>Inter-class football and basketball tournaments, athletics, monthly challenges. &#128170;`, ar: `<span class="msg-icon"><i class="fas fa-futbol"></i></span>بطولات كرة القدم وكرة السلة بين الأقسام، ألعاب القوى، تحديات شهرية. مفتوح للجميع! &#128170;` }, culture: { fr: `<span class="msg-icon"><i class="fas fa-palette"></i></span>Expos de peinture, ateliers d'écriture, soirées poésie, visites de musées. &#127912;`, en: `<span class="msg-icon"><i class="fas fa-palette"></i></span>Painting exhibitions, writing workshops, poetry evenings, museum visits. &#127912;`, ar: `<span class="msg-icon"><i class="fas fa-palette"></i></span>معارض رسم، ورشات الكتابة، أمسيات شعرية، زيارات متاحف. &#127912;` }, social: { fr: `<span class="msg-icon"><i class="fas fa-hands-helping"></i></span>Collectes, visites aux orphelinats, aide aux devoirs, campagnes de sensibilisation. &#10084;&#65039;`, en: `<span class="msg-icon"><i class="fas fa-hands-helping"></i></span>Food drives, orphanage visits, homework help, awareness campaigns. &#10084;&#65039;`, ar: `<span class="msg-icon"><i class="fas fa-hands-helping"></i></span>جمع تبرعات، زيارات لدور الأيتام، مساعدة في الواجبات، حملات تحسيسية. &#10084;&#65039;` }, digital: { fr: `<span class="msg-icon"><i class="fas fa-laptop-code"></i></span>Ateliers HTML/CSS, Python, montage vidéo, design, cybersécurité. &#128640;`, en: `<span class="msg-icon"><i class="fas fa-laptop-code"></i></span>HTML/CSS, Python, video editing, design, cybersecurity workshops. &#128640;`, ar: `<span class="msg-icon"><i class="fas fa-laptop-code"></i></span>ورشات HTML/CSS، بايثون، مونتاج فيديو، تصميم، أمن سيبراني. &#128640;` }, environnement: { fr: `<span class="msg-icon"><i class="fas fa-leaf"></i></span>Nettoyage plages/parcs, plantation d'arbres, recyclage créatif. &#127793;`, en: `<span class="msg-icon"><i class="fas fa-leaf"></i></span>Beach and park clean-ups, tree planting, creative recycling. &#127793;`, ar: `<span class="msg-icon"><i class="fas fa-leaf"></i></span>تنظيف الشواطئ والحدائق، تشجير، إعادة تدوير إبداعية. &#127793;` }, membres: { fr: `<span class="msg-icon"><i class="fas fa-users"></i></span>Bureau :\n\n&#128081; <strong>Dr. Lamia ELJADIRI</strong> — Présidente\n&#128082; <strong>Pr. Amal EL ALAMA</strong> — Vice-présidente`, en: `<span class="msg-icon"><i class="fas fa-users"></i></span>Board:\n\n&#128081; <strong>Dr. Lamia ELJADIRI</strong> — President\n&#128082; <strong>Pr. Amal EL ALAMA</strong> — Vice-President`, ar: `<span class="msg-icon"><i class="fas fa-users"></i></span>المكتب:\n\n&#128081; <strong>د. لمية الجاديري</strong> — الرئيسة\n&#128082; <strong>أ. أمال العلامة</strong> — نائبة الرئيسة` }, president: { fr: `<span class="msg-icon"><i class="fas fa-user-tie"></i></span>La <strong>Dr. Lamia ELJADIRI</strong> est la fondatrice et présidente de l'association.`, en: `<span class="msg-icon"><i class="fas fa-user-tie"></i></span><strong>Dr. Lamia ELJADIRI</strong> is the founder and president.`, ar: `<span class="msg-icon"><i class="fas fa-user-tie"></i></span><strong>د. لمية الجاديري</strong> هي المؤسسة والرئيسة للجمعية.` }, inscription: { fr: `<span class="msg-icon"><i class="fas fa-user-plus"></i></span>1&#65039;&#8419; Remplissez le <strong>formulaire</strong>\n2&#65039;&#8419; Choisissez <strong>classe</strong> et <strong>activité</strong>\n3&#65039;&#8419; Validez !`, en: `<span class="msg-icon"><i class="fas fa-user-plus"></i></span>1&#65039;&#8419; Fill out the <strong>form</strong>\n2&#65039;&#8419; Choose <strong>class</strong> and <strong>activity</strong>\n3&#65039;&#8419; Submit!`, ar: `<span class="msg-icon"><i class="fas fa-user-plus"></i></span>1&#65039;&#8419; املأ <strong>الاستمارة</strong>\n2&#65039;&#8419; اختر <strong>القسم</strong> و <strong>النشاط</strong>\n3&#65039;&#8419; أرسل!` }, conditions: { fr: `<span class="msg-icon"><i class="fas fa-clipboard-check"></i></span>&#9989; Étudiant de l'établissement\n&#9989; Classe 1DIA/2DIA/1CG/2CG/1DAI/2DAI\n&#9989; Esprit d'équipe\n&#9989; <strong>Gratuit</strong>`, en: `<span class="msg-icon"><i class="fas fa-clipboard-check"></i></span>&#9989; Student at the institution\n&#9989; Class 1DIA/2DIA/1CG/2CG/1DAI/2DAI\n&#9989; Team spirit\n&#9989; <strong>Free</strong>`, ar: `<span class="msg-icon"><i class="fas fa-clipboard-check"></i></span>&#9989; تلميذ في المؤسسة\n&#9989; قسم 1DIA/2DIA/1CG/2CG/1DAI/2DAI\n&#9989; روح الفريق\n&#9989; <strong>مجاني</strong>` }, frais: { fr: `<span class="msg-icon"><i class="fas fa-gift"></i></span>Adhésion <strong>100% gratuite</strong>.`, en: `<span class="msg-icon"><i class="fas fa-gift"></i></span>Membership is <strong>100% free</strong>.`, ar: `<span class="msg-icon"><i class="fas fa-gift"></i></span>الانضمام <strong>مجاني 100%</strong>.` }, contact: { fr: `<span class="msg-icon"><i class="fas fa-envelope"></i></span>&#128205; Casablanca\n&#128222; +212 XX XX XX XX\n&#128231; contact@elkendi.ma`, en: `<span class="msg-icon"><i class="fas fa-envelope"></i></span>&#128205; Casablanca\n&#128222; +212 XX XX XX XX\n&#128231; contact@elkendi.ma`, ar: `<span class="msg-icon"><i class="fas fa-envelope"></i></span>&#128205; الدار البيضاء\n&#128222; +212 XX XX XX XX\n&#128231; contact@elkendi.ma` }, localisation: { fr: `<span class="msg-icon"><i class="fas fa-map-marker-alt"></i></span><strong>Casablanca</strong>, au sein de l'établissement et en extérieur.`, en: `<span class="msg-icon"><i class="fas fa-map-marker-alt"></i></span><strong>Casablanca</strong>, at the school and outdoors.`, ar: `<span class="msg-icon"><i class="fas fa-map-marker-alt"></i></span><strong>الدار البيضاء</strong>، داخل المؤسسة وفي الخارج.` }, horaires: { fr: `<span class="msg-icon"><i class="fas fa-clock"></i></span>&#128197; <strong>Mercredi</strong> 14h-16h\n&#128197; <strong>Samedi</strong> 10h-12h`, en: `<span class="msg-icon"><i class="fas fa-clock"></i></span>&#128197; <strong>Wednesday</strong> 2pm-4pm\n&#128197; <strong>Saturday</strong> 10am-12pm`, ar: `<span class="msg-icon"><i class="fas fa-clock"></i></span>&#128197; <strong>الأربعاء</strong> 14h-16h\n&#128197; <strong>السبت</strong> 10h-12h` }, bonjour: { fr: `<span class="msg-icon"><i class="fas fa-hand-sparkles"></i></span>Bienvenue ! &#128075; Je peux renseigner sur l'association, les activités, l'inscription, le contact. Que souhaitez-vous savoir ?`, en: `<span class="msg-icon"><i class="fas fa-hand-sparkles"></i></span>Welcome! &#128075; I can help with the association, activities, registration, and contact. What would you like to know?`, ar: `<span class="msg-icon"><i class="fas fa-hand-sparkles"></i></span>أهلاً بك! &#128075; يمكنني مساعدتك بخصوص الجمعية، الأنشطة، التسجيل، والتواصل. ماذا تريد أن تعرف؟` }, merci: { fr: `<span class="msg-icon"><i class="fas fa-smile-beam"></i></span>Avec plaisir ! On vous attend ! &#128149;`, en: `<span class="msg-icon"><i class="fas fa-smile-beam"></i></span>You're welcome! Looking forward to meeting you! &#128149;`, ar: `<span class="msg-icon"><i class="fas fa-smile-beam"></i></span>بسرور! ننتظرك! &#128149;` }, au_revoir: { fr: `<span class="msg-icon"><i class="fas fa-hand-peace"></i></span>Au revoir ! N'oubliez pas le formulaire. À bientôt !`, en: `<span class="msg-icon"><i class="fas fa-hand-peace"></i></span>Goodbye! Don't forget the form. See you soon!`, ar: `<span class="msg-icon"><i class="fas fa-hand-peace"></i></span>مع السلامة! لا تنسَ الاستمارة. نراك قريباً!` }, partenaires: { fr: `<span class="msg-icon"><i class="fas fa-handshake"></i></span>L'établissement, associations environnementales, acteurs du numérique, médias étudiants.`, en: `<span class="msg-icon"><i class="fas fa-handshake"></i></span>The school, environmental associations, digital actors, and student media.`, ar: `<span class="msg-icon"><i class="fas fa-handshake"></i></span>المؤسسة، جمعيات بيئية، فعالون في الرقمية، وإعلام طلابي.` }, evenements: { fr: `<span class="msg-icon"><i class="fas fa-star"></i></span>&#127942; Tournoi foot inter-classes\n&#127793; Journée plantation\n&#128187; Atelier code\n&#128241; Concours photo Instagram`, en: `<span class="msg-icon"><i class="fas fa-star"></i></span>&#127942; Inter-class football tournament\n&#127793; Tree planting day\n&#128187; Coding workshop\n&#128241; Instagram photo contest`, ar: `<span class="msg-icon"><i class="fas fa-star"></i></span>&#127942; بطولة كرة قدم بين الأقسام\n&#127793; يوم التشجير\n&#128187; ورشة برمجة\n&#128241; مسابقة صور انستغرام` }, how_are_you: { fr: `<span class="msg-icon"><i class="fas fa-smile"></i></span>Je vais très bien, merci ! Prêt à vous aider. &#128522;`, en: `<span class="msg-icon"><i class="fas fa-smile"></i></span>I'm doing great, thanks! Ready to help you. &#128522;`, ar: `<span class="msg-icon"><i class="fas fa-smile"></i></span>أنا بخير الحمد لله! مستعد لمساعدتك. &#128522;` }, help: { fr: `<span class="msg-icon"><i class="fas fa-life-ring"></i></span>Je peux vous aider avec :\n\n&#8226; L'<strong>association</strong>\n&#8226; Les <strong>activités</strong> (Sport, Digital...)\n&#8226; L'<strong>inscription</strong>\n&#8226; Le <strong>contact</strong>`, en: `<span class="msg-icon"><i class="fas fa-life-ring"></i></span>I can help you with:\n\n&#8226; The <strong>association</strong>\n&#8226; <strong>Activities</strong> (Sports, Digital...)\n&#8226; <strong>Registration</strong>\n&#8226; <strong>Contact</strong>`, ar: `<span class="msg-icon"><i class="fas fa-life-ring"></i></span>يمكنني مساعدتك في:\n\n&#8226; <strong>الجمعية</strong>\n&#8226; <strong>الأنشطة</strong> (رياضة، رقمي...)\n&#8226; <strong>التسجيل</strong>\n&#8226; <strong>الاتصال</strong>` } };
const keywordMap = [ { keys: ['bonjour', 'salut', 'hello', 'hi', 'hey', 'coucou', 'bonsoir', 'salam', 'مرحبا', 'اهلا', 'سلام', 'صباح الخير', 'مساء الخير'], topic: 'bonjour' }, { keys: ['merci', 'thanks', 'thank you', 'choukran', 'شكرا', 'شكرا جزيلا', 'ممنون'], topic: 'merci' }, { keys: ['au revoir', 'bye', 'goodbye', 'a bientot', 'ciao', 'مع السلامة', 'وداعا', 'الى اللقاء'], topic: 'au_revoir' }, { keys: ['comment vas', 'comment tu vas', 'ca va', 'how are you', 'كيف حالك', 'كيفك', 'شخبارك'], topic: 'how_are_you' }, { keys: ['aide', 'help', 'aider', 'مساعدة', 'ساعدني', 'اريد مساعدة'], topic: 'help' }, { keys: ['association', 'el kendi', 'elkendi', 'kendi', 'presentation', 'presentez', 'describe', 'parle', 'a propos', 'about', 'propos', 'جمعية', 'الكندي', 'ما هي', 'قدم', 'تكلم', 'من أنتم', 'نادي'], topic: 'presentation' }, { keys: ['objectif', 'mission', 'but', 'pourquoi', 'vision', 'valeurs', 'أهداف', 'مهمة', 'لماذا', 'رؤية', 'قيم', 'دور', 'غاية'], topic: 'objectifs' }, { keys: ['activite', 'activity', 'faire', 'programme', 'evenement', 'event', 'أنشطة', 'نشاط', 'برنامج', 'فعاليات', 'ماذا تفعلون'], topic: 'activites' }, { keys: ['sport', 'football', 'foot', 'basket', 'tournoi', 'tournament', 'رياضة', 'كرة القدم', 'كرة السلة', 'بطولة', 'مباراة', 'العاب قوى'], topic: 'sport' }, { keys: ['culture', 'art', 'peinture', 'exposition', 'musique', 'theatre', 'poesie', 'ثقافة', 'فن', 'رسم', 'معرض', 'موسيقى', 'مسرح', 'شعر'], topic: 'culture' }, { keys: ['social', 'solidaire', 'solidarite', 'benevolat', 'don', 'aide', 'orphelin', 'اجتماعي', 'تضامن', 'تطوع', 'تبرع', 'مساعدة', 'أيتام', 'إنساني'], topic: 'social' }, { keys: ['digital', 'numerique', 'code', 'codage', 'tech', 'informatique', 'programmation', 'رقمي', 'تقنية', 'كود', 'برمجة', 'حاسوب', 'تكنولوجيا', 'معلوميات'], topic: 'digital' }, { keys: ['environnement', 'ecologie', 'nature', 'arbre', 'plantation', 'recyclage', 'nettoyage', 'بيئة', 'بيئي', 'ايكولوجيا', 'طبيعة', 'شجرة', 'تشجير', 'إعادة تدوير', 'تنظيف'], topic: 'environnement' }, { keys: ['membre', 'equipe', 'bureau', 'tresorier', 'secretaire', 'qui', 'board', 'team', 'members', 'who', 'أعضاء', 'فريق', 'مكتب', 'أمين مال', 'كاتب', 'مسؤول', 'إدارة', 'اداره', 'اعضاء'], topic: 'membres' }, { keys: ['president', 'presidente', 'lamia', 'eljadiri', 'fondatrice', 'رئيسة', 'لمية', 'الجاديري', 'مؤسسة', 'مديرة', 'رئيس'], topic: 'president' }, { keys: ['inscrire', 'inscription', 'rejoindre', 'adherer', 'join', 'register', 'sign up', 'devenir membre', 'participer', 'تسجيل', 'انضم', 'اشتراك', 'عضوية', 'مشاركة', 'دخول', 'سجل'], topic: 'inscription' }, { keys: ['condition', 'critere', 'requirement', 'eligib', 'شروط', 'معايير', 'متطلبات', 'أهلية'], topic: 'conditions' }, { keys: ['prix', 'gratuit', 'cout', 'frais', 'payer', 'free', 'combien', 'argent', 'مجاني', 'سعر', 'تكلفة', 'رسوم', 'دفع', 'كم', 'مال'], topic: 'frais' }, { keys: ['contact', 'contacter', 'telephone', 'phone', 'email', 'facebook', 'instagram', 'whatsapp', 'اتصل', 'هاتف', 'بريد', 'فيسبوك', 'انستغرام', 'واتساب', 'رسالة'], topic: 'contact' }, { keys: ['ou', 'localisation', 'location', 'casablanca', 'maroc', 'where', 'adresse', 'place', 'أين', 'موقع', 'الدار البيضاء', 'المغرب', 'عنوان', 'مكان'], topic: 'localisation' }, { keys: ['horaire', 'quand', 'heure', 'reunion', 'meeting', 'schedule', 'time', 'date', 'وقت', 'متى', 'ساعة', 'اجتماع', 'جدول', 'تاريخ', 'يوم'], topic: 'horaires' }, { keys: ['partenaire', 'partenariat', 'partner', 'collaboration', 'sponsor', 'شركاء', 'شراكة', 'تعاون', 'راعي', 'داعم'], topic: 'partenaires' }, { keys: ['prochain', 'futur', 'planifie', 'upcoming', 'next', 'agenda', 'قادم', 'مستقبل', 'مخطط', 'فعاليات قادمة'], topic: 'evenements' } ];
const suggestionSets = { fr: { welcome: ["Qu'est-ce que l'association ?", "Les activités", "S'inscrire", "Le bureau"], activites: ["Sport", "Culture & Art", "Action Sociale", "Digital & Tech"], inscription: ["Conditions", "Gratuit ?", "Horaires", "Contact"], membres: ["La présidente", "Objectifs", "Événements", "Partenaires"], general: ["Activités", "S'inscrire", "Contact", "Événements"] }, en: { welcome: ["What is the association?", "Activities", "How to join?", "Board"], activites: ["Sports", "Culture & Art", "Social Action", "Digital & Tech"], inscription: ["Requirements", "Free?", "Schedule", "Contact"], membres: ["The president", "Objectives", "Events", "Partners"], general: ["Activities", "Join us", "Contact", "Events"] }, ar: { welcome: ["ما هي الجمعية؟", "الأنشطة", "التسجيل", "المكتب"], activites: ["رياضة", "ثقافة وفن", "عمل اجتماعي", "رقمي وتقنية"], inscription: ["الشروط", "مجاني؟", "الأوقات", "الاتصال"], membres: ["الرئيسة", "الأهداف", "الفعاليات", "الشركاء"], general: ["الأنشطة", "انضم إلينا", "الاتصال", "الفعاليات"] } };

let currentSuggestionContext = 'welcome';
function getActiveLang() { return currentLang; }
function getCurrentSuggestionSet() { return suggestionSets[getActiveLang()][currentSuggestionContext] || suggestionSets[getActiveLang()].general; }
function updateSuggestions(set) { const c = document.getElementById('chatSuggestions'); if (!c) return; c.innerHTML = ''; set.forEach((text, i) => { const ch = document.createElement('button'); ch.className = 'suggestion-chip'; ch.textContent = text; ch.style.opacity = '0'; ch.style.transform = 'translateY(6px)'; ch.onclick = () => { document.getElementById('userInput').value = text; sendMessage(); }; c.appendChild(ch); setTimeout(() => { ch.style.transition = 'opacity 0.25s,transform 0.25s'; ch.style.opacity = '1'; ch.style.transform = 'translateY(0)'; }, 50 * i); }); }

function cleanText(text) { return text.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED]/g, '').replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').replace(/[^\w\u0600-\u06FF\s]/g, '').replace(/\s+/g, ' '); }
function detectTopic(msg) { const n = cleanText(msg); let best = null, bs = 0; for (const e of keywordMap) { let s = 0; for (const k of e.keys) { const nk = cleanText(k); if (nk.length > 1 && n.includes(nk)) s += nk.length; } if (s > bs) { bs = s; best = e.topic; } } return best; }
function updateContextFromTopic(tp) { const m = { bonjour: 'welcome', how_are_you: 'welcome', help: 'general', presentation: 'general', objectifs: 'general', activites: 'activites', sport: 'activites', culture: 'activites', social: 'activites', digital: 'activites', environnement: 'activites', membres: 'membres', president: 'membres', inscription: 'inscription', conditions: 'inscription', frais: 'inscription', contact: 'inscription', localisation: 'inscription', horaires: 'inscription', partenaires: 'membres', evenements: 'general', merci: 'general', au_revoir: 'welcome' }; currentSuggestionContext = m[tp] || 'general'; }
function getTime() { const n = new Date(); return n.getHours().toString().padStart(2, '0') + ':' + n.getMinutes().toString().padStart(2, '0'); }

function addMessage(text, isUser) { const b = document.getElementById('chatBody'); if (!b) return; const w = document.createElement('div'); w.className = `chat-msg ${isUser ? 'msg-user' : 'msg-bot'}`; w.innerHTML = (isUser ? escapeHTML(text) : text) + `<span class="msg-time">${getTime()}</span>`; b.appendChild(w); b.scrollTo({ top: b.scrollHeight, behavior: 'smooth' }); if (!isUser && typeof speakText === 'function') speakText(text); }
function showTyping() { const b = document.getElementById('chatBody'); if (!b) return; const i = document.createElement('div'); i.className = 'typing-indicator'; i.id = 'typingIndicator'; i.innerHTML = '<div class="dot-typing"></div><div class="dot-typing"></div><div class="dot-typing"></div>'; b.appendChild(i); b.scrollTo({ top: b.scrollHeight, behavior: 'smooth' }); }
function hideTyping() { const i = document.getElementById('typingIndicator'); if (i) i.remove(); }

const defaultReplies = { fr: `<span class="msg-icon"><i class="fas fa-question-circle"></i></span>Je ne comprends pas bien. Essayez :\n\n&#8226; L'association\n&#8226; Les activités\n&#8226; L'inscription\n&#8226; Le contact`, en: `<span class="msg-icon"><i class="fas fa-question-circle"></i></span>I'm not sure I understand. Try:\n\n&#8226; The association\n&#8226; Activities\n&#8226; Registration\n&#8226; Contact`, ar: `<span class="msg-icon"><i class="fas fa-question-circle"></i></span>لم أفهم جيداً. جرب:\n\n&#8226; الجمعية\n&#8226; الأنشطة\n&#8226; التسجيل\n&#8226; الاتصال` };
let isProcessing = false;

function sendMessage() { if (isProcessing) return; const inp = document.getElementById('userInput'); if (!inp) return; const txt = inp.value.trim(); if (!txt) return; isProcessing = true; addMessage(txt, true); inp.value = ''; stopSpeech(); showTyping(); setTimeout(() => { try { hideTyping(); const topic = detectTopic(txt); const lang = getActiveLang(); if (topic && knowledgeBase[topic]) { addMessage(knowledgeBase[topic][lang] || knowledgeBase[topic].fr, false); updateContextFromTopic(topic); } else { addMessage(defaultReplies[lang] || defaultReplies.fr, false); currentSuggestionContext = 'general'; } updateSuggestions(getCurrentSuggestionSet()); } catch (e) { console.error("Erreur Chatbot:", e); hideTyping(); } finally { isProcessing = false; } }, 500 + Math.random() * 700); }

let chatOpen = false;
function toggleChat() { const w = document.getElementById('chatWindow'), b = document.getElementById('chatbotBtn'); if (!w || !b) return; chatOpen = !chatOpen; if (chatOpen) { w.style.display = 'flex'; b.classList.add('open'); if (document.getElementById('chatBody').children.length === 0) { showTyping(); setTimeout(() => { hideTyping(); addMessage(knowledgeBase.bonjour[getActiveLang()], false); updateSuggestions(getCurrentSuggestionSet()); }, 400); } setTimeout(() => { const inp = document.getElementById('userInput'); if (inp) inp.focus(); }, 120); } else { stopSpeech(); w.style.display = 'none'; b.classList.remove('open'); } }
function clearChat() { stopSpeech(); const b = document.getElementById('chatBody'); if (b) b.innerHTML = ''; currentSuggestionContext = 'welcome'; updateSuggestions(getCurrentSuggestionSet()); showTyping(); setTimeout(() => { hideTyping(); addMessage(knowledgeBase.bonjour[getActiveLang()], false); updateSuggestions(getCurrentSuggestionSet()); }, 400); }

/* ===== INITIALISATION ===== */
window.addEventListener('load', function() { if (localStorage.getItem('theme') === 'dark') { document.body.classList.add('dark-mode'); const themeIcon = document.querySelector('#themeToggle i'); if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun'); } updateSlider(); animateProgress(); updateSuggestions(getCurrentSuggestionSet()); updateFormSelects(); if (window.location.search.includes('success=1')) { const formGrid = document.getElementById('formGrid'); const formSuccess = document.getElementById('formSuccess'); if (formGrid) formGrid.style.display = 'none'; if (formSuccess) formSuccess.classList.add('show'); } });