// js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // Menu Responsivo (Hambúrguer)
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            menuToggle.querySelector('i').classList.toggle('fa-bars');
            menuToggle.querySelector('i').classList.toggle('fa-times'); // Muda para ícone de X
        });

        // Fechar menu ao clicar em um link (útil para mobile)
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }

    // Rolagem suave para âncoras (links internos)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Evita o salto instantâneo

            const targetId = this.getAttribute('href').substring(1); // Pega o ID sem o '#'
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Calcula o offset para compensar o cabeçalho fixo
                const headerOffset = document.querySelector('.main-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20; // -20px para um pequeno padding extra

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Animação de fade-in ao rolar
    const fadeInElements = document.querySelectorAll('.hero-section, .featured-products-section, .about-promo-section, .testimonials-section, .order-section, .product-card, .testimonial-card');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // 10% do elemento visível
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Para de observar depois de animar
            }
        });
    }, observerOptions);

    fadeInElements.forEach(element => {
        observer.observe(element);
    });
});