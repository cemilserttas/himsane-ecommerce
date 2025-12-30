/**
 * HIMSANE E-COMMERCE
 * Main JavaScript - Menu Mobile, Slider & Interactions
 * =====================================================
 */

document.addEventListener('DOMContentLoaded', function () {

    // ==========================================
    // MOBILE MENU
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        // Open menu
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // Close menu
        closeMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close on link click
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ==========================================
    // HEADER SCROLL EFFECT
    // ==========================================
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('shadow-lg');
            header.classList.add('bg-cream');
        } else {
            header.classList.remove('shadow-lg');
        }

        lastScroll = currentScroll;
    });

    // ==========================================
    // HERO SLIDER (Auto-play with arrows)
    // ==========================================
    const sliderTrack = document.getElementById('slider-track');
    const slides = sliderTrack ? sliderTrack.querySelectorAll('.slide') : [];
    const sliderDots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    let currentSlide = 0;
    let slideInterval;

    function goToSlide(index) {
        if (sliderTrack && slides.length > 0) {
            // Handle wrap-around
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;

            currentSlide = index;
            sliderTrack.style.transform = `translateX(-${index * 100}%)`;

            // Update dots
            sliderDots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('bg-secondary');
                    dot.classList.remove('bg-white/50');
                } else {
                    dot.classList.remove('bg-secondary');
                    dot.classList.add('bg-white/50');
                }
            });
        }
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    function startAutoPlay() {
        if (slides.length > 1) {
            slideInterval = setInterval(nextSlide, 5000);
        }
    }

    function stopAutoPlay() {
        clearInterval(slideInterval);
    }

    // Auto-play slider
    if (slides.length > 1) {
        startAutoPlay();

        // Pause on hover
        if (sliderTrack) {
            sliderTrack.addEventListener('mouseenter', stopAutoPlay);
            sliderTrack.addEventListener('mouseleave', startAutoPlay);
        }
    }

    // Arrow navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        });
    }

    // Dot navigation
    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            stopAutoPlay();
            startAutoPlay();
        });
    });

    // ==========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ==========================================
    // PRODUCT PAGE FUNCTIONALITY
    // ==========================================

    // Image Gallery
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.product-thumbnail');

    if (thumbnails.length > 0) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                const newSrc = thumb.dataset.image;
                if (mainImage && newSrc) {
                    mainImage.src = newSrc;
                    thumbnails.forEach(t => t.classList.remove('ring-2', 'ring-secondary'));
                    thumb.classList.add('ring-2', 'ring-secondary');
                }
            });
        });
    }

    // Size Selection
    const sizeButtons = document.querySelectorAll('.size-btn');
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            sizeButtons.forEach(b => {
                b.classList.remove('bg-primary', 'text-white', 'border-primary');
                b.classList.add('border-gray-300', 'text-primary');
            });
            btn.classList.add('bg-primary', 'text-white', 'border-primary');
            btn.classList.remove('border-gray-300');
        });
    });

    // Color Selection
    const colorButtons = document.querySelectorAll('.color-btn');
    colorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            colorButtons.forEach(b => b.classList.remove('ring-2', 'ring-offset-2', 'ring-secondary'));
            btn.classList.add('ring-2', 'ring-offset-2', 'ring-secondary');
        });
    });

    // Quantity
    const quantityInput = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('decrease-qty');
    const increaseBtn = document.getElementById('increase-qty');

    if (quantityInput && decreaseBtn && increaseBtn) {
        decreaseBtn.addEventListener('click', () => {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });

        increaseBtn.addEventListener('click', () => {
            let value = parseInt(quantityInput.value);
            if (value < 10) {
                quantityInput.value = value + 1;
            }
        });
    }

    // Add to Cart (simulated)
    const addToCartBtn = document.getElementById('add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            addToCartBtn.innerHTML = '<i class="fa-solid fa-check mr-2"></i>Ajouté au panier';
            addToCartBtn.classList.remove('bg-primary');
            addToCartBtn.classList.add('bg-green-600');

            setTimeout(() => {
                addToCartBtn.innerHTML = '<i class="fa-solid fa-bag-shopping mr-2"></i>Ajouter au panier';
                addToCartBtn.classList.add('bg-primary');
                addToCartBtn.classList.remove('bg-green-600');
            }, 2000);
        });
    }

    // ==========================================
    // NEWSLETTER FORM
    // ==========================================
    const newsletterForm = document.querySelector('form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input[type="email"]');
            const btn = newsletterForm.querySelector('button');

            if (input && input.value) {
                btn.innerHTML = '<i class="fa-solid fa-check"></i>';
                btn.disabled = true;

                setTimeout(() => {
                    btn.innerHTML = 'Merci !';
                    input.value = '';
                }, 500);

                setTimeout(() => {
                    btn.innerHTML = "S'inscrire";
                    btn.disabled = false;
                }, 3000);
            }
        });
    }

    // ==========================================
    // ANIMATIONS ON SCROLL (Intersection Observer)
    // ==========================================
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeInUp');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => observer.observe(el));
    }

    console.log('✨ HIMSANE E-Commerce initialized successfully');
});
