document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle icon structure if needed, or just animate CSS
            const icon = menuBtn.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // Smooth Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Auth Dropdown Toggle
    const authBtn = document.querySelector('.auth-btn');
    const authDropdown = document.querySelector('.auth-dropdown');

    if (authBtn && authDropdown) {
        authBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            authDropdown.classList.toggle('visible');
            authBtn.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!authBtn.contains(e.target) && !authDropdown.contains(e.target)) {
                authDropdown.classList.remove('visible');
                authBtn.classList.remove('active');
            }
        });

        // Auth Modal Logic
        const authModal = document.getElementById('authModal');
        const loginTrigger = document.querySelector('.trigger-login');
        const registerTrigger = document.querySelector('.trigger-register');
        const closeModal = document.querySelector('.close-auth');
        const tabs = document.querySelectorAll('.auth-tab');
        const forms = document.querySelectorAll('.auth-form');

        function openModal(tabIndex) {
            if (!authModal) return;
            authModal.classList.add('active');
            authDropdown.classList.remove('visible');
            authBtn.classList.remove('active');

            // Switch tab
            tabs.forEach(t => t.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));

            tabs[tabIndex].classList.add('active');
            forms[tabIndex].classList.add('active');
        }

        if (loginTrigger) loginTrigger.addEventListener('click', () => openModal(0)); // 0 for Login
        if (registerTrigger) registerTrigger.addEventListener('click', () => openModal(1)); // 1 for Register

        // Tab Switching
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                forms.forEach(f => f.classList.remove('active'));
                tab.classList.add('active');
                forms[index].classList.add('active');
            });
        });

        // Close Logic
        if (closeModal) closeModal.addEventListener('click', () => authModal.classList.remove('active'));
        if (authModal) {
            authModal.addEventListener('click', (e) => {
                if (e.target === authModal) authModal.classList.remove('active');
            });
        }
    }
});
