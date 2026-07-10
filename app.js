const translations = {
    en: {
        heroTitle: "Building core Android experiences for global giants.",
        heroSubtitle: "Senior Android Engineer & App Architect specializing in high-impact mobile systems and unified frameworks.",
        ctaEmail: "Email Me",
        ctaLinkedin: "LinkedIn",
        ctaCV: "Download CV",
        titleExperience: "Professional Experience",
        titleProjects: "Key Projects",
        titleSkills: "Technical Mastery",
        present: "Present",
        viewProject: "View Project",
        langBtn: "AR"
    },
    ar: {
        heroTitle: "بناء التجارب الجوهرية لنظام أندرويد لكبرى الشركات العالمية.",
        heroSubtitle: "مهندس أندرويد أول ومعماري تطبيقات متخصص في الأنظمة المحمولة عالية التأثير والأطر الموحدة.",
        ctaEmail: "تواصل معي",
        ctaLinkedin: "لينكد إن",
        ctaCV: "تحميل السيرة الذاتية",
        titleExperience: "الخبرة المهنية",
        titleProjects: "المشاريع الرئيسية",
        titleSkills: "الإتقان التقني",
        present: "الحالي",
        viewProject: "عرض المشروع",
        langBtn: "EN"
    }
};

const resumeData = {
    work: [
        {
            company: "WeightWatchers (WW)",
            position: "Senior Android Engineer",
            period: "Feb 2025 — Present",
            highlights: [
                "Leading UI reskinning to the new Peak26 theme using Jetpack Compose.",
                "Implemented the Explore feature, a CMS-driven content delivery system.",
                "Architecture: MVI (Mavericks), Clean Architecture, Structured Concurrency."
            ]
        },
        {
            company: "Careem",
            position: "Senior Android Engineer II",
            period: "Apr 2024 — Dec 2024",
            highlights: [
                "Architected the 'order-anything' feature for the Captain application.",
                "Leveraged KMM (Kotlin Multiplatform Mobile) and MVI architecture.",
                "Collaborated on modularization and performance optimization."
            ]
        },
        {
            company: "Vodafone Shared Services (_VOIS)",
            position: "Senior Android SDK Developer",
            period: "Mar 2018 — Jul 2021",
            highlights: [
                "Developed 15+ reusable Android SDKs for global Vodafone markets.",
                "Key contributor to the MVA10 (MyVodafone App 10) framework.",
                "Managed a team of 5 developers for high-quality SDK delivery."
            ]
        }
    ],
    projects: [
        {
            name: "WeightWatchers App",
            description: "A leading health and wellness app with advanced CMS and personalized programs.",
            url: "https://play.google.com/store/apps/details?id=com.weightwatchers.mobile",
            tags: ["Jetpack Compose", "MVI", "Modularization"]
        },
        {
            name: "MyVodafone App (MVA10)",
            description: "A unified global framework providing reusable SDKs for Vodafone's markets.",
            url: "https://play.google.com/store/search?q=vodafone%20app&c=apps",
            tags: ["SDK Development", "Clean Architecture", "Kotlin"]
        },
        {
            name: "Tooli TV",
            description: "Interactive IPTV app for Android TV, Fire TV, and mobile devices.",
            url: "https://play.google.com/store/apps/details?id=com.sacaps.toolitv",
            tags: ["Android TV", "Streaming", "WebSockets"]
        }
    ],
    skills: [
        { category: "Languages", items: ["Kotlin", "Java", "TypeScript", "JavaScript"] },
        { category: "Mobile", items: ["Jetpack Compose", "KMM", "Custom Views", "Animations"] },
        { category: "Architecture", items: ["MVI (Mavericks)", "MVVM", "Clean Architecture", "Dagger/Hilt"] },
        { category: "Infrastructure", items: ["GitHub Actions", "Bitrise", "Gradle Automation", "CI/CD"] }
    ]
};

// State Management
let currentLang = 'en';
let currentTheme = 'light';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderContent();
    setupEventListeners();
    initScrollReveal();
    document.getElementById('year').textContent = new Date().getFullYear();
});

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
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

    document.getElementById('lang-toggle').addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        document.documentElement.setAttribute('lang', currentLang);
        renderContent();
    });
}

function renderContent() {
    const t = translations[currentLang];

    // Update Static Text
    document.getElementById('lang-toggle').textContent = t.langBtn;
    document.getElementById('hero-title').textContent = t.heroTitle;
    document.getElementById('hero-subtitle').textContent = t.heroSubtitle;
    document.getElementById('cta-email').textContent = t.ctaEmail;
    document.getElementById('cta-linkedin').textContent = t.ctaLinkedin;
    document.getElementById('cta-cv').textContent = t.ctaCV;
    document.getElementById('cta-cv').href = "Mohamed_Wael_CV.pdf"; // Point to a local copy
    document.getElementById('title-experience').textContent = t.titleExperience;
    document.getElementById('title-projects').textContent = t.titleProjects;
    document.getElementById('title-skills').textContent = t.titleSkills;

    // Render Lists
    renderExperience();
    renderProjects();
    renderSkills();
}

function renderExperience() {
    const container = document.getElementById('experience-list');
    container.innerHTML = resumeData.work.map(job => `
        <div class="timeline-item reveal">
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
    container.innerHTML = resumeData.projects.map(proj => `
        <div class="card reveal">
            <h3>${proj.name}</h3>
            <p>${proj.description}</p>
            <div class="skill-list" style="margin-bottom: 1.5rem">
                ${proj.tags.map(tag => `<span class="skill-tag">${tag}</span>`).join('')}
            </div>
            <a href="${proj.url}" target="_blank" class="card-link">${translations[currentLang].viewProject} ↗</a>
        </div>
    `).join('');
}

function renderSkills() {
    const container = document.getElementById('skills-container');
    container.innerHTML = resumeData.skills.map(cat => `
        <div class="skill-category reveal">
            <h4>${cat.category}</h4>
            <div class="skill-list">
                ${cat.items.map(item => `<span class="skill-tag">${item}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
