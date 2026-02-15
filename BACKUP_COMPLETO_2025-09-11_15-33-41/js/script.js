// js/script.js - Funcionalidades Interativas para Confeitaria

// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    
    // === MENU MOBILE ===
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Alterna o ícone do menu
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
        
        // Fecha o menu ao clicar em um link
        const navLinks = navList.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                menuToggle.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }
    
    // === SCROLL SUAVE MELHORADO ===
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // === ANIMAÇÕES NO SCROLL ===
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observa elementos para animação
    const animateElements = document.querySelectorAll('.product-card, .testimonial-card, .hero-content, .container h2');
    animateElements.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
    
    // === EFEITOS VISUAIS AVANÇADOS ===
    
    // Parallax no hero
    const hero = document.querySelector('.hero-section');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Efeito hover nos cards de produto
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // === LOADING E OTIMIZAÇÕES ===
    
    // Melhoria das imagens com fallbacks
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
        img.classList.add('loaded');
        
        // URLs de fallback para cada produto
        const fallbackUrls = [
            'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80', // Bolo chocolate
            'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80', // Cupcakes
            'https://images.unsplash.com/photo-1517636094471-205a25516c0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80'  // Pudim atualizado
        ];
        
        // Se a imagem falhar, tenta o fallback
        img.addEventListener('error', function() {
            if (this.src.includes('unsplash')) {
                console.log('Tentando fallback para:', this.alt);
                this.src = fallbackUrls[index] || 'https://picsum.photos/400/250?random=1';
            } else {
                // Se o fallback também falhar, usa SVG personalizado
                this.style.display = 'none';
                const placeholder = document.createElement('div');
                placeholder.className = 'image-placeholder';
                
                // SVGs personalizados para cada produto
                const svgImages = [
                    // Bolo de chocolate
                    `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="cakeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:#8B4513;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#654321;stop-opacity:1" />
                            </linearGradient>
                        </defs>
                        <rect width="400" height="250" fill="#F8BBD9"/>
                        <ellipse cx="200" cy="200" rx="120" ry="30" fill="#8B4513"/>
                        <rect x="80" y="150" width="240" height="50" rx="10" fill="url(#cakeGrad)"/>
                        <ellipse cx="200" cy="150" rx="120" ry="15" fill="#A0522D"/>
                        <text x="200" y="100" text-anchor="middle" fill="#E91E63" font-size="24" font-weight="bold">🍰 Bolo de Chocolate</text>
                    </svg>`,
                    // Cupcakes
                    `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
                        <rect width="400" height="250" fill="#F8BBD9"/>
                        <rect x="80" y="180" width="60" height="40" fill="#D2691E" rx="5"/>
                        <ellipse cx="110" cy="175" rx="35" ry="20" fill="#FFB6C1"/>
                        <rect x="170" y="180" width="60" height="40" fill="#D2691E" rx="5"/>
                        <ellipse cx="200" cy="175" rx="35" ry="20" fill="#FFB6C1"/>
                        <rect x="260" y="180" width="60" height="40" fill="#D2691E" rx="5"/>
                        <ellipse cx="290" cy="175" rx="35" ry="20" fill="#FFB6C1"/>
                        <text x="200" y="100" text-anchor="middle" fill="#E91E63" font-size="24" font-weight="bold">🧁 Cupcakes Red Velvet</text>
                    </svg>`,
                    // Pudim
                    `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="pudimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#FFA500;stop-opacity:1" />
                            </linearGradient>
                        </defs>
                        <rect width="400" height="250" fill="#F8BBD9"/>
                        <ellipse cx="200" cy="210" rx="80" ry="15" fill="#B8860B"/>
                        <path d="M 140 210 Q 200 150 260 210 Q 200 200 140 210" fill="url(#pudimGrad)"/>
                        <ellipse cx="200" cy="170" rx="60" ry="10" fill="#FFD700"/>
                        <text x="200" y="100" text-anchor="middle" fill="#E91E63" font-size="24" font-weight="bold">🍮 Pudim Caseiro</text>
                    </svg>`
                ];
                
                placeholder.innerHTML = svgImages[index] || svgImages[0];
                placeholder.style.cssText = `
                    width: 100%;
                    height: 250px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--bg-light);
                    border-bottom: 5px solid var(--primary-color);
                    border-radius: 10px 10px 0 0;
                `;
                placeholder.querySelector('svg').style.cssText = `
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                `;
                this.parentNode.insertBefore(placeholder, this);
            }
        });
    });
    
    // === FUNCIONALIDADES DE PEDIDO ===
    
    // Melhora os botões de pedido
    const orderButtons = document.querySelectorAll('.btn-small');
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Adiciona feedback visual
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Opcional: tracking de cliques
            const productName = this.closest('.product-card').querySelector('h3').textContent;
            console.log(`Pedido iniciado para: ${productName}`);
        });
    });
    
    // === MELHORIAS DE ACESSIBILIDADE ===
    
    // Navegação por teclado
    document.addEventListener('keydown', function(e) {
        // ESC fecha o menu mobile
        if (e.key === 'Escape' && navList && navList.classList.contains('active')) {
            navList.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
    
    // === NOTIFICAÇÕES E FEEDBACK ===
    
    // Sistema simples de notificação
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Anima a entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove após 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // === ANALYTICS E TRACKING (OPCIONAL) ===
    
    // Tracking de scroll
    let scrollPosition = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Header com efeito de transparência
        const header = document.querySelector('.main-header');
        if (header) {
            if (currentScroll > 100) {
                header.style.background = 'rgba(142, 36, 170, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'var(--header-footer-bg)';
                header.style.backdropFilter = 'none';
            }
        }
        
        scrollPosition = currentScroll;
    });
    
    console.log('🍰 Doçuras & Sabores - Site carregado com sucesso!');
});

// === FUNÇÕES UTILITÁRIAS ===

// Função para formatar números de telefone
function formatPhone(phone) {
    return phone.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}

// Função para validar e-mail
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Função para criar mensagem do WhatsApp
function createWhatsAppMessage(productName) {
    const message = `Olá! Gostaria de fazer um pedido do ${productName}. Poderia me dar mais informações?`;
    return encodeURIComponent(message);
}
