const resumeData = {
    work: [
        {
            company: "Tahakom",
            position: "Senior Android Engineer",
            period: "Current",
            highlights: [
                "Building enterprise Android applications.",
                "Architecting scalable solutions with modern tech stacks.",
                "Modernizing legacy systems and leading refactoring efforts."
            ]
        },
        {
            company: "WeightWatchers (WW)",
            position: "Senior Android Engineer",
            period: "Feb 2025 — Present",
            highlights: [
                "Leading UI reskinning to the new Peak26 theme using Jetpack Compose.",
                "Implemented the Explore feature, a CMS-driven content delivery system.",
                "Introduced Mavericks architecture (MVI) and ADA accessibility standards.",
                "Tech-Stack: Compose, MVI, Coroutines, Dagger2, GitHub Actions."
            ]
        },
        {
            company: "Careem",
            position: "Senior Android Engineer II",
            period: "Apr 2024 — Dec 2024",
            highlights: [
                "Architected 'order-anything' feature enhancing scalability and usability.",
                "Utilized KMM (Kotlin Multiplatform Mobile) for shared logic.",
                "Collaborated with cross-functional teams for seamless feature integration.",
                "Tech-Stack: Compose, MVI, KMM, Dagger2, Coroutines, Bitrise."
            ]
        },
        {
            company: "Vodafone Shared Services (_VOIS)",
            position: "Senior Android SDK Developer",
            period: "Mar 2018 — Jul 2021",
            highlights: [
                "Developed and maintained 15+ reusable Android SDKs for global markets.",
                "Key contributor to the MVA10 (MyVodafone App 10) unified framework.",
                "Managed a team of 5 developers and supported global market integrations.",
                "Tech-Stack: SDK Design, Clean Architecture, MVVM, CI/CD."
            ]
        }
    ],
    projects: [
        {
            name: "WeightWatchers App",
            description: "A leading health and wellness app with advanced CMS and personalized programs.",
            url: "https://play.google.com/store/apps/details?id=com.weightwatchers.mobile",
            tags: ["Jetpack Compose", "MVI", "Modularization", "CMS"]
        },
        {
            name: "MyVodafone App (MVA10)",
            description: "A unified global framework providing reusable SDKs for Vodafone's markets.",
            url: "https://play.google.com/store/search?q=vodafone%20app&c=apps",
            tags: ["SDK Development", "Clean Architecture", "Kotlin", "Scalability"]
        },
        {
            name: "Careem 'Order Anything'",
            description: "Scalable feature for Captains to handle diverse delivery requests.",
            tags: ["KMM", "MVI", "Compose", "Architecture"]
        }
    ]
};

// State Management
let currentTheme = 'dark';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderContent();
    setupEventListeners();
    initScrollReveal();
    initStatsCounter();
    document.getElementById('year').textContent = new Date().getFullYear();
});

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
}

function setTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function setupEventListeners() {
    document.getElementById('theme-toggle').addEventListener('click', () => {
        setTheme(currentTheme === 'light' ? 'dark' : 'light');
    });

    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            formStatus.textContent = 'Sending...';
            formStatus.className = 'form-status';

            try {
                const response = await fetch('https://formspree.io/f/mqakaknr', {
                    method: 'POST',
                    body: JSON.stringify(Object.fromEntries(formData)),
                    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
                });

                if (response.ok) {
                    formStatus.textContent = 'Message sent successfully!';
                    formStatus.classList.add('success');
                    contactForm.reset();
                } else {
                    formStatus.textContent = 'Problem sending message.';
                    formStatus.classList.add('error');
                }
            } catch (error) {
                formStatus.textContent = 'Error sending message.';
                formStatus.classList.add('error');
            }
        });
    }
}

function renderContent() {
    renderExperience();
    renderProjects();
}

function renderExperience() {
    const container = document.getElementById('experience-list');
    if (!container) return;
    container.innerHTML = resumeData.work.map((job, index) => `
        <div class="timeline-item reveal delay-${Math.min(index, 3)}">
            <div class="timeline-meta">${job.period}</div>
            <div class="timeline-content">
                <h3>${job.company}</h3>
                <span class="position">${job.position}</span>
                <ul class="highlights">
                    ${job.highlights.map(h => `<li>${h}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');
}

function renderProjects() {
    const container = document.getElementById('projects-grid');
    if (!container) return;
    container.innerHTML = resumeData.projects.map((proj, index) => `
        <div class="project-card reveal delay-${Math.min(index, 3)}">
            <h3>${proj.name}</h3>
            <p>${proj.description}</p>
            <div class="skill-list">
                ${proj.tags.map(tag => `<span class="skill-tag">${tag}</span>`).join('')}
            </div>
            ${proj.url ? `<a href="${proj.url}" target="_blank" class="card-link">View Case Study</a>` : ''}
        </div>
    `).join('');
}


function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function initStatsCounter() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCount(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.stat-number').forEach(el => observer.observe(el));
}

function animateCount(el, target) {
    let current = 0;
    const increment = target / 50;
    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            el.textContent = target;
            clearInterval(interval);
        } else {
            el.textContent = Math.floor(current);
        }
    }, 30);
}
