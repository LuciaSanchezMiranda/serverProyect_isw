// Animaciones DOM para CloudContacts
document.addEventListener('DOMContentLoaded', () => {
    
    // Animación de entrada para flash messages
    const flashMessages = document.querySelectorAll('.flash-message');
    flashMessages.forEach((msg, index) => {
        setTimeout(() => {
            msg.style.opacity = '1';
            msg.style.transform = 'translateY(0)';
        }, 100 + (index * 100));

        // Auto-cerrar después de 5 segundos
        setTimeout(() => {
            msg.style.opacity = '0';
            msg.style.transform = 'translateY(-20px)';
            setTimeout(() => msg.remove(), 300);
        }, 5000);
    });

    // Animación de entrada para el formulario
    const formContainer = document.querySelector('.form-container');
    if (formContainer) {
        setTimeout(() => {
            formContainer.style.opacity = '1';
            formContainer.style.transform = 'scale(1)';
        }, 150);
    }

    // Animación de entrada para el header de la tabla
    const headerFade = document.querySelector('.header-fade');
    if (headerFade) {
        setTimeout(() => {
            headerFade.style.opacity = '1';
        }, 100);
    }

    // Animación de entrada para la tabla
    const tableContainer = document.querySelector('.table-container');
    if (tableContainer) {
        setTimeout(() => {
            tableContainer.style.opacity = '1';
            tableContainer.style.transform = 'translateY(0)';
        }, 250);
    }

    // Animación escalonada para filas de la tabla
    const tableRows = document.querySelectorAll('.table-row');
    tableRows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            row.style.transition = 'all 0.4s ease';
            row.style.opacity = '1';
            row.style.transform = 'translateX(0)';
        }, 400 + (index * 80));
    });

    // Animación para grupos de formulario
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        setTimeout(() => {
            group.style.transition = 'all 0.5s ease';
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
        }, 300 + (index * 100));
    });

    // Efecto de hover mejorado para links de navegación
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Animación de focus para inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.3s ease';
        });
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });

    // Efecto de ripple para el botón submit
    const submitBtn = document.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    }

    // Animación de contador para el total de contactos
    const totalElement = document.querySelector('.text-blue-600');
    if (totalElement) {
        const targetNumber = parseInt(totalElement.textContent);
        let currentNumber = 0;
        const duration = 1000;
        const increment = targetNumber / (duration / 16);

        const counter = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= targetNumber) {
                totalElement.textContent = targetNumber;
                clearInterval(counter);
            } else {
                totalElement.textContent = Math.floor(currentNumber);
            }
        }, 16);
    }

    // Efecto parallax suave al scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const parallaxElements = document.querySelectorAll('.animate-blob');
                parallaxElements.forEach(el => {
                    el.style.transform = `translateY(${scrolled * 0.5}px)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    });
});

// Estilos CSS para el efecto ripple (agregar dinámicamente)
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .animate-blob {
        animation: blob 7s infinite;
    }

    .animation-delay-2000 {
        animation-delay: 2s;
    }

    .animate-bounce-slow {
        animation: bounce 3s infinite;
    }

    @keyframes blob {
        0%, 100% {
            transform: translate(0px, 0px) scale(1);
        }
        33% {
            transform: translate(30px, -50px) scale(1.1);
        }
        66% {
            transform: translate(-20px, 20px) scale(0.9);
        }
    }

    @keyframes bounce {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(style);