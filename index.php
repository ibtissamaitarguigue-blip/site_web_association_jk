
<?php
session_start();
// Génération du token CSRF s'il n'existe pas
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}
?>
<!DOCTYPE html>
<html lang="fr" dir="ltr">
<!-- ... la suite de ton code ... -->
<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
    <meta name="theme-color" content="#003366">
    <title>Jeunes El Kendi - Association</title>

    <link rel="icon" type="image/png" href="logo.png">
    <link rel="apple-touch-icon" href="ajk.png">

    <!-- Ajout de la police arabe Tajawal qui ressemble à Poppins pour garder le même design -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&family=Tajawal:wght@300;400;500;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="loader-screen" id="loaderScreen">
        <div class="loader-logo"><span>JK</span></div>
        <div class="loader-bar-track"><div class="loader-bar-fill"></div></div>
    </div>

    <div class="nav-overlay" id="navOverlay" onclick="closeMenu()"></div>

    <button class="back-to-top" id="backToTop" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Retour en haut">
        <i class="fas fa-chevron-up"></i>
    </button>

    <header class="top-header" id="topHeader">
        <div class="branding">
            <img src="ajk.png" alt="Logo">
            <div class="brand-name"><span class="text-vert">Jeunes</span> El Kendi</div>
        </div>
        <div class="header-actions">
            <button class="lang-toggle" id="langToggle" onclick="toggleLanguage()">EN</button>
            <button class="theme-toggle" id="themeToggle" onclick="toggleDarkMode()">
                <i class="fas fa-moon"></i>
            </button>
            <button class="hamburger" id="hamburgerBtn" onclick="toggleMenu()" aria-label="Menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </header>

    <nav id="mainNav">
        <ul>
            <li><a href="#accueil" data-i18n="nav_home" onclick="closeMenu()">Accueil</a></li>
            <li><a href="#apropos" data-i18n="nav_about" onclick="closeMenu()">À Propos de Nous</a></li>
            <li><a href="#membres" data-i18n="nav_members" onclick="closeMenu()">Membres</a></li>
            <li><a href="#activites" data-i18n="nav_activities" onclick="closeMenu()">Activités</a></li>
            <li><a href="#inscription" data-i18n="nav_join" onclick="closeMenu()">Inscription</a></li>
            <li><a href="#contact" data-i18n="nav_contact" onclick="closeMenu()">Contact</a></li>
        </ul>
    </nav>

       <!-- ===== HERO ===== -->
    <div class="hero" id="accueil">
        <div class="hero-particles" id="heroParticles"></div>
        <div class="hero-content">
            <h1 data-i18n="hero_title">Association des <span class="text-vert">Jeunes El Kendi</span></h1>
            <p data-i18n="hero_subtitle">Ensemble, construisons l'avenir à travers l'engagement et la solidarité.</p>
            <a href="#apropos" class="btn-hero" data-i18n="hero_btn">Découvrir</a>
        </div>
    </div>

    <!-- ===== À PROPOS ===== -->
    <section class="section-box" id="apropos">
        <div class="section-title reveal">
            <h2 data-i18n="about_title">Bienvenue! chez Jeunes El Kendi</h2>
        </div>
        <div class="about-grid">
            <div class="about-image-wrap reveal from-left">
                <img src="image_asso.jpg.jpeg" alt="Équipe Jeunes El Kendi">
                
            </div>
            <div class="about-text reveal from-right">
                <h4 data-i18n="about_p1">Fondée en 2026 au cœur de l'établissement BTS El Kendi à Casablanca, notre association est née d'une ambition partagée entre professeurs et étudiants : bâtir un espace où chaque jeune peut devenir la meilleure version de lui-même.</h4>

                <div class="about-conviction reveal from-scale">
                    <p data-i18n="about_conviction"><strong>Notre Conviction :</strong> Le potentiel est partout, il suffit d'un cadre pour le révéler.</p>
                </div>

                <p data-i18n="about_p2">Que ce soit par le sport, la culture, le numérique ou l'engagement social, nous cultivons au quotidien les valeurs de solidarité et de respect. Plus qu'une association, Jeunes El Kendi est une communauté dynamique qui transforme les idées en actions.</p>

                <div class="about-values">
                    <div class="about-value-card reveal delay-1">
                        <div class="val-icon"><i class="fas fa-heart"></i></div>
                        <div class="val-title" data-i18n="val_solidarity">Solidarité</div>
                        <div class="val-desc" data-i18n="val_solidarity_desc">Entraide et soutien mutuel</div>
                    </div>
                    <div class="about-value-card reveal delay-2">
                        <div class="val-icon"><i class="fas fa-lightbulb"></i></div>
                        <div class="val-title" data-i18n="val_innovation">Innovation</div>
                        <div class="val-desc" data-i18n="val_innovation_desc">Créativité et nouvelles idées</div>
                    </div>
                    <div class="about-value-card reveal delay-3">
                        <div class="val-icon"><i class="fas fa-handshake"></i></div>
                        <div class="val-title" data-i18n="val_engagement">Engagement</div>
                        <div class="val-desc" data-i18n="val_engagement_desc">Responsabilité citoyenne</div>
                    </div>
                    <div class="about-value-card reveal delay-4">
                        <div class="val-icon"><i class="fas fa-seedling"></i></div>
                        <div class="val-title" data-i18n="val_respect">Respect</div>
                        <div class="val-desc" data-i18n="val_respect_desc">Diversité et tolérance</div>
                    </div>
                </div>

                <!-- ===== CTA ===== -->
                <div class="about-cta reveal from-scale delay-5">
                    <p data-i18n="cta_text">Prêt(e) à rejoindre cette communauté ? <strong>Remplissez notre formulaire d'inscription en quelques clics.</strong></p>
                    <a href="#inscription" class="btn-cta">
                        <span data-i18n="cta_btn">Rejoignez-nous maintenant</span>
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- ===== MEMBRES ===== -->
    <section class="section-box" id="membres">
        <div class="section-title reveal">
            <h2 data-i18n="team_title">Notre Équipe</h2>
        </div>
        <div class="members-grid">
            <div class="member-card reveal delay-1">
                <img src="pr_lamia.jpg.jpeg" alt="Membre" class="member-img">
                <h3>Dr. Lamia ELJADIRI</h3>
                <div class="role" data-i18n="role_president">Présidente</div>
            </div>
            <div class="member-card reveal delay-2">
                <img src="pr_amal.jpg.jpeg" alt="Membre" class="member-img">
                <h3>Pr. Amal EL ALAMA</h3>
                <div class="role" data-i18n="role_vice">Vice-présidente</div>
            </div>
            <div class="member-card reveal delay-3">
                <img src="pr_assia.jpg.jpeg" alt="Membre" class="member-img">
                <h3>Pr. Assia FADIL</h3>
                <div class="role" data-i18n="role_treasurer">Trésorière</div>
            </div>
            <div class="member-card reveal delay-4">
                <img src="pr_houssni.jpg.jpeg" alt="Membre" class="member-img">
                <h3>Dr. Mohamed HOUSNI</h3>
                <div class="role" data-i18n="role_vice_treasurer">Trésorier adjoint</div>
            </div>
            <div class="member-card reveal delay-5">
                <img src="pr_rachida.jpg.jpeg" alt="Membre" class="member-img">
                <h3>Pr. Rachida ZATTI</h3>
                <div class="role" data-i18n="role_secretary">Secrétaire générale</div>
            </div>
        </div>
    </section>

    <!-- ===== ACTIVITÉS ===== -->
    <section id="activites">
        <div class="section-title reveal">
            <h2 data-i18n="activities_title">Nos Activités</h2>
        </div>
        <div class="slider-container reveal from-scale">
            <div class="slider-track" id="sliderTrack">
                <div class="slide active-slide">
                    <img src="startup.jpg.jpeg" alt="Digital">
                    <div class="slide-overlay">
                        <h3 data-i18n="act1_title">ECONOVA Startup Hub 2025</h3>
                        <p data-i18n="act1_desc">L'innovation des étudiants au service de la durabilité et de la RSE.</p>
                    </div>
                </div>
                <div class="slide">
                    <img src="plg.jpg.jpeg" alt="Nature">
                    <div class="slide-overlay">
                        <h3 data-i18n="act2_title">BTS Alkendi & PL Morocco</h3>
                        <p data-i18n="act2_desc">Échanges, passion et innovation au cœur de nos métiers</p>
                    </div>
                </div>
                <div class="slide">
                    <img src="prise parole.jpg.jpeg" alt="Sport">
                    <div class="slide-overlay">
                        <h3 data-i18n="act3_title">Éloquence au BTS ALKENDI</h3>
                        <p data-i18n="act3_desc">Cultiver la confiance et le leadership</p>
                    </div>
                </div>
                <div class="slide">
                    <img src="ai.jpg.jpeg" alt="Culture">
                    <div class="slide-overlay">
                        <h3 data-i18n="act4_title">Dessiner l'école de demain</h3>
                        <p data-i18n="act4_desc">Nos apprenants imaginent le système éducatif de 2040 au lycée El Kindi.</p>
                    </div>
                </div>
                <div class="slide">
                    <img src="maroc.jpg.jpeg" alt="Social">
                    <div class="slide-overlay">
                        <h3 data-i18n="act5_title">Fierté et Citoyenneté</h3>
                        <p data-i18n="act5_desc">Le BTS Al Kendi célèbre les grandes dates du Maroc.</p>
                    </div>
                </div>
                <div class="slide">
                    <img src="foot.jpg.jpeg" alt="Atelier">
                    <div class="slide-overlay">
                        <h3 data-i18n="act6_title">BTS Al Kendi</h3>
                        <p data-i18n="act6_desc">Le terrain des exploits, l'ambition en mouvement.</p>
                    </div>
                </div>
            </div>
            <div class="slider-dots">
                <div class="dot active" onclick="goToSlide(0)"></div>
                <div class="dot" onclick="goToSlide(1)"></div>
                <div class="dot" onclick="goToSlide(2)"></div>
                <div class="dot" onclick="goToSlide(3)"></div>
                <div class="dot" onclick="goToSlide(4)"></div>
                <div class="dot" onclick="goToSlide(5)"></div>
            </div>
            <div class="progress-container">
                <div class="progress-bar" id="progressBar"></div>
            </div>
        </div>
    </section>



    <!-- ===== INSCRIPTION ===== -->
    <section id="inscription">
        <div class="section-title reveal">
            <h2 data-i18n="form_title">Rejoignez-Nous</h2>
        </div>
        <div class="form-container reveal from-scale">
            <?php if (isset($_GET['success']) && $_GET['success'] == 1): ?>
                <div class="form-success show" id="formSuccess">
                    <div class="success-icon"><i class="fas fa-check"></i></div>
                    <h3 data-i18n="success_title">Merci pour votre inscription !</h3>
                    <p data-i18n="success_desc">Votre demande a été enregistrée avec succès.</p>
                </div>
            <?php else: ?>
                <form action="save.php" method="POST" id="inscriptionForm">
    <!-- TOKEN DE SECURITE OBLIGATOIRE -->
    <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">
    
    <div class="form-grid" id="formGrid">
    
                        <div class="form-group" id="grpNom">
                            <label data-i18n="form_lastname">Nom</label>
                            <input type="text" name="nom" id="fieldNom" placeholder="Votre nom" required>
                            <div class="field-error" id="errNom"><i class="fas fa-exclamation-circle"></i><span></span></div>
                        </div>
                        <div class="form-group" id="grpPrenom">
                            <label data-i18n="form_firstname">Prénom</label>
                            <input type="text" name="prenom" id="fieldPrenom" placeholder="Votre prénom" required>
                            <div class="field-error" id="errPrenom"><i class="fas fa-exclamation-circle"></i><span></span></div>
                        </div>
                        <div class="form-group" id="grpEmail">
                            <label data-i18n="form_email">Email</label>
                            <input type="email" name="email" id="fieldEmail" placeholder="exemple@domaine.com" required>
                            <div class="field-error" id="errEmail"><i class="fas fa-exclamation-circle"></i><span></span></div>
                        </div>
                        <div class="form-group" id="grpTel">
                            <label data-i18n="form_phone">Téléphone</label>
                            <input type="tel" name="telephone" id="fieldTel" placeholder="+212 6XX XXX XXX" required>
                            <div class="field-error" id="errTel"><i class="fas fa-exclamation-circle"></i><span></span></div>
                        </div>
                        <div class="form-group" id="grpClasse">
                            <label data-i18n="form_class">Classe</label>
                            <select name="classe" id="fieldClasse" required>
                                <option value="" disabled selected data-i18n="select_default">-- Sélectionner --</option>
                                <option value="1DIA">1DIA</option>
                                <option value="2DIA">2DIA</option>
                                <option value="1CG">1CG</option>
                                <option value="2CG">2CG</option>
                                <option value="1DAI">1DAI</option>
                                <option value="2DAI">2DAI</option>
                            </select>
                            <div class="field-error" id="errClasse"><i class="fas fa-exclamation-circle"></i><span></span></div>
                        </div>
                        <div class="form-group" id="grpActivite">
                            <label data-i18n="form_activity">Activité préférée</label>
                            <select name="activite" id="fieldActivite" required>
                                <option value="" disabled selected data-i18n="select_default">-- Sélectionner --</option>
                                <option value="sport" data-i18n="opt_sport">Sport</option>
                                <option value="culture" data-i18n="opt_culture">Culture & Art</option>
                                <option value="social" data-i18n="opt_social">Action Sociale</option>
                                <option value="digital" data-i18n="opt_digital">Digital & Tech</option>
                            </select>
                            <div class="field-error" id="errActivite"><i class="fas fa-exclamation-circle"></i><span></span></div>
                        </div>
                        <div class="form-group">
                            <button type="submit" class="btn-submit" id="btnSubmit" data-i18n="form_submit">Valider mon inscription</button>
                        </div>
                    </div>
                </form>
            <?php endif; ?>
        </div>
    </section>

    <!-- ===== FOOTER ===== -->
    <footer id="contact">
        <div class="footer-content">
            <div class="footer-col reveal from-left">
                <div class="footer-brand">
                    <img src="ajk.png" alt="Logo">
                    <h4><span class="text-vert">Jeunes</span> El Kendi</h4>
                </div>
                <p style="display:block" data-i18n="footer_desc">Association à but non lucratif dédiée au développement de la jeunesse.</p>
            </div>
            <div class="footer-col reveal delay-2">
                <h4 data-i18n="footer_contact_title">Contact</h4>
                <p><i class="fas fa-map-marker-alt"></i> <span data-i18n="footer_address">BTS El Kendi, CFC, Casablanca, Maroc</span></p>
                <p><i class="fas fa-phone"></i> +212 XX XX XX XX</p>
                <p><i class="fas fa-envelope"></i> contact@elkendi.ma</p>
            </div>
            <div class="footer-col reveal from-right">
                <h4 data-i18n="footer_follow">Suivez-nous</h4>
                <a href="#"><i class="fab fa-facebook-f"></i> Facebook</a>
                <a href="#"><i class="fab fa-instagram"></i> Instagram</a>
            </div>
        </div>
        <div class="footer-bottom">
            &copy; 2026 Jeunes El Kendi developpé par ibtissam AIT ARGUIGUE. <span data-i18n="footer_rights">Tous droits réservés.</span>
        </div>
    </footer>

    <!-- ===== CHATBOT ===== -->
    <button class="chatbot-btn" id="chatbotBtn" onclick="toggleChat()" aria-label="Ouvrir le chat">
        <i class="fas fa-comments"></i>
        <span class="badge">1</span>
    </button>
    <div class="chatbot-window" id="chatWindow">
        <div class="chat-header">
            <div class="chat-header-left">
                <div class="chat-avatar">JK</div>
                <div class="chat-header-info">
                    <h4 data-i18n="chat_title">Assistant El Kendi</h4>
                    <div class="status" data-i18n="chat_status">En ligne</div>
                </div>
            </div>
            <div class="chat-header-actions">
                <button id="ttsToggle" class="tts-active" onclick="toggleTTS()" title="Synthèse vocale"><i class="fas fa-volume-up"></i></button>
                <button onclick="clearChat()" title="Effacer"><i class="fas fa-trash-alt"></i></button>
                <button onclick="toggleChat()" title="Fermer"><i class="fas fa-times"></i></button>
            </div>
        </div>
        <div class="chat-body" id="chatBody"></div>
        <div class="chat-suggestions" id="chatSuggestions"></div>
        <div class="chat-footer">
            <input type="text" id="userInput" placeholder="Écrivez votre message..." onkeypress="if(event.key==='Enter')sendMessage()">
            <button onclick="sendMessage()" aria-label="Envoyer"><i class="fas fa-paper-plane"></i></button>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>