const resumeData = {
    work: [
        {
            company: "Tahakom",
            position: "Senior Android Engineer",
            period: "2024 — Present",
            mission: "Scaling enterprise-grade mobility and traffic safety solutions for the Saudi Ministry of Interior.",
            challenges: "Managing complex real-time data streams and ensuring 99.9% uptime for mission-critical services.",
            impact: [
                "Architecting scalable Android solutions for enterprise-level traffic management systems.",
                "Leading the modernization of legacy internal tools to Jetpack Compose, reducing UI code by 40%.",
                "Establishing engineering standards for code reviews and modular architecture."
            ],
            tech: ["Kotlin", "Compose", "Clean Architecture", "Coroutines", "Dagger Hilt"]
        },
        {
            company: "WeightWatchers (WW)",
            position: "Senior Android Engineer",
            period: "2021 — 2024",
            mission: "Transforming the global digital experience for millions of users on their wellness journey.",
            challenges: "Migrating a massive legacy XML codebase to Jetpack Compose while maintaining feature parity and stability.",
            impact: [
                "Led the UI reskinning of the global app to the 'Peak26' theme using Jetpack Compose.",
                "Designed and implemented the 'Explore' feature: a dynamic, CMS-driven content delivery engine.",
                "Championed the adoption of MVI (Mavericks) and ADA accessibility standards, reaching 100% compliance.",
                "Optimized build times and CI/CD pipelines using GitHub Actions."
            ],
            tech: ["Jetpack Compose", "MVI", "Mavericks", "Dagger2", "Coroutines", "GitHub Actions"]
        },
        {
            company: "Careem",
            position: "Senior Android Engineer II",
            period: "2024",
            mission: "Enhancing the 'Everything App' ecosystem for the MENA region's leading ride-hailing and delivery platform.",
            challenges: "Building highly modular and reusable components that function across diverse product verticals.",
            impact: [
                "Architected the 'Order Anything' feature, enabling flexible delivery workflows for thousands of Captains.",
                "Implemented shared business logic using Kotlin Multiplatform (KMP), reducing cross-platform development overhead.",
                "Led performance optimization initiatives, improving app launch time by 15%."
            ],
            tech: ["KMP", "MVI", "Compose", "Coroutines", "Bitrise"]
        },
        {
            company: "Vodafone Shared Services (_VOIS)",
            position: "Senior Android SDK Developer",
            period: "2018 — 2021",
            mission: "Creating a unified mobile foundation for 15+ global markets under the MVA10 framework.",
            challenges: "Designing highly generic, robust SDKs that satisfy diverse market requirements without codebase fragmentation.",
            impact: [
                "Developed and maintained a suite of 15+ reusable Android SDKs powering global Vodafone apps.",
                "Key architect of the MVA10 (MyVodafone App) unified framework, used by millions of customers.",
                "Mentored a team of 5 developers and managed technical onboarding for new market integrations.",
                "Scaled testing infrastructure, achieving 85% code coverage for core libraries."
            ],
            tech: ["SDK Design", "Clean Architecture", "MVVM", "CI/CD", "JUnit/Espresso"]
        }
    ],
    projects: [
        {
            name: "WeightWatchers Global App",
            description: "High-impact wellness platform serving millions of users. Focused on scalable UI architecture and accessibility.",
            impact: "Successfully migrated 60% of core screens to Compose, improving developer velocity.",
            contribution: "Lead UI Engineer for the Peak26 redesign and CMS integration.",
            tech: ["Compose", "MVI", "Accessibility"],
            url: "https://play.google.com/store/apps/details?id=com.weightwatchers.mobile"
        },
        {
            name: "MVA10 Unified Framework",
            description: "A global SDK-first architecture powering Vodafone's mobile ecosystem across multiple continents.",
            impact: "Reduced time-to-market for new market launches by 30%.",
            contribution: "Core SDK Developer focusing on networking and authentication modules.",
            tech: ["SDK Design", "Kotlin", "Clean Architecture"],
            url: "https://play.google.com/store/search?q=vodafone%20app&c=apps"
        },
        {
            name: "Careem 'Order Anything'",
            description: "A flexible logistics engine designed for the Careem Captain app to handle any delivery request.",
            impact: "Enabled rapid scaling of delivery services across 10+ countries.",
            contribution: "Architected the MVI state management and KMP integration.",
            tech: ["KMP", "MVI", "Compose"]
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
                <div class="job-header">
                    <h3>${job.company}</h3>
                    <span class="position">${job.position}</span>
                </div>
                <div class="job-body">
                    <p class="mission"><strong>Mission:</strong> ${job.mission}</p>
                    <p class="challenges"><strong>Challenge:</strong> ${job.challenges}</p>
                    <ul class="highlights">
                        ${job.impact.map(h => `<li>${h}</li>`).join('')}
                    </ul>
                    <div class="tech-stack">
                        ${job.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                    </div>
                </div>
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
            <div class="project-details">
                <p><strong>Impact:</strong> ${proj.impact}</p>
                <p><strong>Contribution:</strong> ${proj.contribution}</p>
            </div>
            <div class="skill-list">
                ${proj.tech.map(tag => `<span class="skill-tag">${tag}</span>`).join('')}
            </div>
            ${proj.url ? `<a href="${proj.url}" target="_blank" class="card-link">View Case Study</a>` : '<span class="nda-badge">Confidential NDA</span>'}
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

