<?php
/**
 * Contact Block Template
 *
 * @param array    $attributes Block attributes
 * @param string   $content    Block content
 * @param WP_Block $block      Block instance
 */

if (!defined('ABSPATH')) {
    exit;
}

$section_title = $attributes['sectionTitle'] ?? 'La vôtre commence maintenant';
$section_subtitle = $attributes['sectionSubtitle'] ?? 'Réponse sous 48h · Premier échange offert';
$quote = $attributes['quote'] ?? 'Toutes les bonnes histoires méritent d\'être racontées.';
$form_shortcode = $attributes['formShortcode'] ?? '';
$bg_color = $attributes['backgroundColor'] ?? '#f8f9fa';

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'contact',
    'style' => 'background-color: ' . esc_attr($bg_color),
]);
?>

<section <?php echo $wrapper_attributes; ?> id="contact" aria-labelledby="contact-title">
    <div class="container">
        <div class="contact__layout">
            <!-- Left Side - Visual & Quote -->
            <div class="contact__visual">
                <div class="contact__visual-bg"></div>
                <?php if ($quote): ?>
                    <blockquote class="contact__quote">
                        <?php echo esc_html($quote); ?>
                    </blockquote>
                <?php endif; ?>
                <div class="contact__decoration"></div>
            </div>

            <!-- Right Side - Form -->
            <div class="contact__form-container">
                <header class="contact__header">
                    <?php if ($section_title): ?>
                        <h2 class="contact__title" id="contact-title"><?php echo esc_html($section_title); ?></h2>
                    <?php endif; ?>
                    <?php if ($section_subtitle): ?>
                        <p class="contact__subtitle"><?php echo esc_html($section_subtitle); ?></p>
                    <?php endif; ?>
                </header>

                <div class="contact__form">
                    <?php if ($form_shortcode): ?>
                        <?php echo do_shortcode($form_shortcode); ?>
                    <?php else: ?>
                        <!-- Fallback form -->
                        <form class="contact__form-fallback" method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>" id="contact-form">
                            <input type="hidden" name="action" value="efsvp_contact_form">
                            <?php wp_nonce_field('efsvp_contact_form', 'efsvp_contact_nonce'); ?>

                            <div class="form__group">
                                <label for="nom" class="form__label"><?php esc_html_e('Prénom Nom *', 'efsvp'); ?></label>
                                <input type="text" id="nom" name="nom" class="form__input" required aria-required="true" autocomplete="name" />
                            </div>

                            <div class="form__group">
                                <label for="email" class="form__label"><?php esc_html_e('Email professionnel *', 'efsvp'); ?></label>
                                <input type="email" id="email" name="email" class="form__input" required aria-required="true" autocomplete="email" />
                            </div>

                            <div class="form__group">
                                <label for="organisation" class="form__label"><?php esc_html_e('Organisation *', 'efsvp'); ?></label>
                                <input type="text" id="organisation" name="organisation" class="form__input" required aria-required="true" autocomplete="organization" />
                            </div>

                            <div class="form__group">
                                <label for="message" class="form__label"><?php esc_html_e('Message *', 'efsvp'); ?></label>
                                <textarea id="message" name="message" class="form__input" rows="5" required aria-required="true"></textarea>
                            </div>

                            <button type="submit" class="btn btn--primary">
                                <?php esc_html_e('Envoyer', 'efsvp'); ?>
                                <svg class="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
                        </form>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>

    <!-- Success Modal -->
    <div
        class="modal"
        id="success-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
    >
        <div class="modal__overlay"></div>
        <div class="modal__content">
            <div class="modal__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h3 class="modal__title" id="modal-title">Message envoyé !</h3>
            <p class="modal__text">Merci <span id="modal-name"></span> ! On vous répond sous 48h.</p>
            <button class="btn btn--primary" id="modal-close">Continuer</button>
        </div>
    </div>
</section>
