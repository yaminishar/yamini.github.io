// ===== Sidebar toggle (mobile) =====
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
const navLinks = document.getElementById('nav-links');

if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
        const isOpen = sidebar.classList.toggle('open');
        sidebarToggle.classList.toggle('active', isOpen);
        sidebarToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('open');
            sidebarToggle.classList.remove('active');
            sidebarToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('#nav-links a');

function setActiveLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
}

window.addEventListener('scroll', setActiveLink);
setActiveLink();

// ===== Typing effect for sidebar role =====
const roleTarget = document.getElementById('role-target');
const roles = [
    'Placeholder Role One',
    'Placeholder Role Two',
    'Placeholder Role Three'
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
    if (!roleTarget) return;

    const current = roles[roleIndex];

    if (!deleting) {
        charIndex++;
        roleTarget.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
            deleting = true;
            setTimeout(typeLoop, 1600);
            return;
        }
    } else {
        charIndex--;
        roleTarget.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(typeLoop, deleting ? 40 : 80);
}

typeLoop();

// ===== Scroll reveal animations =====
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// ===== Animated stat counters =====
const counters = document.querySelectorAll('[data-count]');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10) || 0;
        let count = 0;
        const step = Math.max(1, Math.ceil(target / 40));

        const tick = () => {
            count += step;
            if (count >= target) {
                el.textContent = `${target}+`;
            } else {
                el.textContent = count;
                requestAnimationFrame(tick);
            }
        };

        requestAnimationFrame(tick);
        counterObserver.unobserve(el);
    });
}, { threshold: 0.4 });

counters.forEach(el => counterObserver.observe(el));

// ===== Back to top button =====
const backToTop = document.getElementById('back-to-top');

if (backToTop) {
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('show', window.scrollY > 500);
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
