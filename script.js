// Simple logo setup - no complex interactions
function setupLogo() {
    const logo = document.getElementById('logoText');
    if (!logo) return;
    
    // Simple fade in animation only
    setTimeout(() => {
        logo.style.opacity = '1';
        logo.style.transform = 'translateY(0)';
    }, 800);
}

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    mobileNav.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            navToggle.classList.remove('active');
            mobileNav.classList.remove('active');
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !mobileNav.contains(e.target)) {
            navToggle.classList.remove('active');
            mobileNav.classList.remove('active');
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header background on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.borderBottom = '1px solid rgba(0, 0, 0, 0.2)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
    }
});

// Layout Image Popup
document.addEventListener('DOMContentLoaded', function() {
    const layoutImage = document.getElementById('layoutImage');
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.querySelector('.image-modal-close');
    
    // Image click event
    if (layoutImage) {
        layoutImage.addEventListener('click', function() {
            modalImage.src = this.src;
            modalImage.alt = this.alt;
            imageModal.style.display = 'block';
        });
    }
    
    // Close modal events
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            imageModal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside image
    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            imageModal.style.display = 'none';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imageModal.style.display === 'block') {
            imageModal.style.display = 'none';
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Special animation for flow section
            if (entry.target.classList.contains('flow-section')) {
                const steps = entry.target.querySelectorAll('.step-card');
                const arrows = entry.target.querySelectorAll('.flow-arrow');
                
                steps.forEach((step, index) => {
                    setTimeout(() => {
                        step.style.animationDelay = `${index * 0.2}s`;
                        step.style.animation = 'slideInStep 0.6s ease forwards';
                    }, index * 200);
                });
                
                arrows.forEach((arrow, index) => {
                    setTimeout(() => {
                        arrow.style.opacity = '0';
                        arrow.style.animation = 'arrowFadeIn 0.4s ease forwards';
                    }, (index + 1) * 200 + 300);
                });
            } else {
                // Animate other cards in sequence
                const cards = entry.target.querySelectorAll('.content-card, .circle-card, .info-item');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(30px)';
                        card.style.transition = 'all 0.6s ease';
                        
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Arrow fade in animation
const arrowFadeInKeyframes = `
    @keyframes arrowFadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Add the keyframes to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = arrowFadeInKeyframes;
document.head.appendChild(styleSheet);

// Observe all sections
document.querySelectorAll('.hero2, .main-content-section, .sajinoki-section, .content-section, .info-section, .flow-section, .circles-section, .layout-section').forEach(section => {
    observer.observe(section);
});


// Page loading animation with logo entrance
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        
        // Setup simple logo
        setupLogo();
        
    }, 200);
});

// Parallax scroll indicator
window.addEventListener('scroll', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    if (scrollIndicator) {
        const opacity = Math.max(0, 1 - (scrolled / (windowHeight * 0.5)));
        scrollIndicator.style.opacity = opacity;
    }
});

// Smooth page transitions
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
        // Only for external links or non-anchor links
        if (this.hostname !== window.location.hostname && !this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            
            document.body.style.transition = 'opacity 0.3s ease';
            document.body.style.opacity = '0';
            
            setTimeout(() => {
                window.location.href = this.href;
            }, 300);
        }
    });
});