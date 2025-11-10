</main>

<!-- Site Footer -->
<footer class="footer">
    <div class="container">
        <div class="footer__main">
            <div class="footer__grid">
                <!-- Col 1 - Brand -->
                <div class="footer__col footer__col--brand">
                    <h3 class="footer__logo"><?php bloginfo('name'); ?></h3>
                    <p class="footer__tagline">"<?php echo get_bloginfo('description'); ?>"</p>
                    <p class="footer__baseline"><?php esc_html_e('Studio narratif & musical', 'efsvp'); ?></p>
                </div>

                <!-- Col 2 - Navigation -->
                <div class="footer__col">
                    <h4 class="footer__title"><?php esc_html_e('Navigation', 'efsvp'); ?></h4>
                    <ul class="footer__links">
                        <li><a href="#creations"><?php esc_html_e('Créations', 'efsvp'); ?></a></li>
                        <li><a href="#services"><?php esc_html_e('Services', 'efsvp'); ?></a></li>
                        <li><a href="#portfolio"><?php esc_html_e('Portfolio', 'efsvp'); ?></a></li>
                        <li><a href="#process"><?php esc_html_e('Process', 'efsvp'); ?></a></li>
                        <li><a href="#faq"><?php esc_html_e('FAQ', 'efsvp'); ?></a></li>
                        <li><a href="#contact"><?php esc_html_e('Contact', 'efsvp'); ?></a></li>
                    </ul>
                </div>

                <!-- Col 3 - Legal -->
                <div class="footer__col">
                    <h4 class="footer__title"><?php esc_html_e('Informations', 'efsvp'); ?></h4>
                    <ul class="footer__links">
                        <li><a href="#mentions"><?php esc_html_e('Mentions légales', 'efsvp'); ?></a></li>
                        <li><a href="#cgv"><?php esc_html_e('CGV', 'efsvp'); ?></a></li>
                        <li><a href="#confidentialite"><?php esc_html_e('Confidentialité', 'efsvp'); ?></a></li>
                        <li><a href="#rgpd"><?php esc_html_e('RGPD', 'efsvp'); ?></a></li>
                    </ul>
                </div>

                <!-- Col 4 - Newsletter -->
                <div class="footer__col">
                    <h4 class="footer__title"><?php esc_html_e('Restez inspiré', 'efsvp'); ?></h4>
                    <p class="footer__newsletter-text"><?php esc_html_e('1 email/mois · Projets & coulisses', 'efsvp'); ?></p>
                    <form class="footer__newsletter" method="post" action="<?php echo admin_url('admin-ajax.php'); ?>">
                        <input
                            type="email"
                            name="email"
                            class="footer__newsletter-input"
                            placeholder="<?php esc_attr_e('Votre email', 'efsvp'); ?>"
                            aria-label="<?php esc_attr_e('Email pour newsletter', 'efsvp'); ?>"
                            required
                        />
                        <button type="submit" class="footer__newsletter-btn" aria-label="<?php esc_attr_e('S\'inscrire', 'efsvp'); ?>">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <!-- Footer Bottom -->
        <div class="footer__bottom">
            <p class="footer__copyright">
                &copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?> · <?php esc_html_e('Tous droits réservés', 'efsvp'); ?>
            </p>
            <p class="footer__made"><?php esc_html_e('Made with', 'efsvp'); ?> <span class="footer__heart">♥</span> <?php esc_html_e('in Angers', 'efsvp'); ?></p>
            <button class="footer__back-to-top" id="back-to-top" aria-label="<?php esc_attr_e('Retour en haut', 'efsvp'); ?>">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
            </button>
        </div>
    </div>
</footer>

<!-- RGPD Consent Banner -->
<aside
    class="cookie-banner"
    id="cookie-banner"
    role="dialog"
    aria-label="Gestion des cookies"
>
    <div class="cookie-banner__content">
        <div class="cookie-banner__text">
            <h3>Bienvenue 👋</h3>
            <p>Nous utilisons des cookies pour vous offrir la meilleure expérience possible.</p>
        </div>
        <div class="cookie-banner__buttons">
            <button id="cookie-reject" class="btn btn--secondary">Refuser</button>
            <button id="cookie-accept" class="btn btn--primary">Accepter</button>
        </div>
    </div>
</aside>

<?php wp_footer(); ?>
</body>
</html>
