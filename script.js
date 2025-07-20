// Global Variables
let currentSection = "home";
let isLoading = true;
let mousePosition = { x: 0, y: 0 };

// DOM Elements
const loadingScreen = document.getElementById("loading-screen");
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const menuIcon = document.getElementById("menu-icon");
const sections = document.querySelectorAll(".section");
const navButtons = document.querySelectorAll(".nav-btn, .nav-item");
const particlesContainer = document.querySelector(".particles-container");

// Initialize
document.addEventListener("DOMContentLoaded", function () {
    initializeApp();
});

function initializeApp() {
    // Loading screen
    setTimeout(() => {
        hideLoadingScreen();
    }, 2000);

    // Event listeners
    setupEventListeners();

    // Initialize particles
    createParticles();

    // Initialize skill bars
    initializeSkillBars();

    // Mouse tracking
    trackMouse();
}

function hideLoadingScreen() {
    loadingScreen.classList.add("hidden");
    isLoading = false;

    // Animate first section
    setTimeout(() => {
        showSection("home");
    }, 500);
}

function setupEventListeners() {
    // Mobile menu toggle
    mobileMenuBtn.addEventListener("click", toggleMobileMenu);

    // Mobile menu overlay
    const overlay = document.querySelector(".mobile-menu-overlay");
    overlay.addEventListener("click", closeMobileMenu);

    // Navigation buttons
    navButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const section = e.currentTarget.getAttribute("data-section");
            if (section) {
                navigateToSection(section);
                closeMobileMenu();
            }
        });
    });

    // Hero buttons
    const heroButtons = document.querySelectorAll("[data-section]");
    heroButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const section = e.currentTarget.getAttribute("data-section");
            if (section) {
                navigateToSection(section);
            }
        });
    });

    // Contact form
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", handleContactForm);
    }

    // Scroll indicator
    const scrollIndicator = document.querySelector(".scroll-indicator");
    if (scrollIndicator) {
        scrollIndicator.addEventListener("click", () => {
            navigateToSection("projects");
        });
    }

    // Logo click
    const logo = document.querySelector(".logo");
    if (logo) {
        logo.addEventListener("click", () => {
            navigateToSection("home");
        });
    }
}

function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.contains("active");

    if (isOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    mobileMenu.classList.add("active");
    menuIcon.className = "fas fa-times";
    document.body.style.overflow = "hidden";
}

function closeMobileMenu() {
    mobileMenu.classList.remove("active");
    menuIcon.className = "fas fa-bars";
    document.body.style.overflow = "";
}

function navigateToSection(sectionId) {
    if (sectionId === currentSection) return;

    // Hide current section
    const currentSectionEl = document.getElementById(currentSection);
    if (currentSectionEl) {
        currentSectionEl.classList.remove("active");
    }

    // Update current section
    currentSection = sectionId;

    // Show new section
    setTimeout(() => {
        showSection(sectionId);
    }, 300);

    // Update navigation
    updateNavigation(sectionId);
}

function showSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add("active");

        // Trigger animations for skills section
        if (sectionId === "skills") {
            animateSkillBars();
        }
    }
}

function updateNavigation(activeSection) {
    // Update desktop navigation
    const desktopNavBtns = document.querySelectorAll(".nav-btn");
    desktopNavBtns.forEach((btn) => {
        const section = btn.getAttribute("data-section");
        if (section === activeSection) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    // Update mobile navigation
    const mobileNavBtns = document.querySelectorAll(".nav-item");
    mobileNavBtns.forEach((btn) => {
        const section = btn.getAttribute("data-section");
        if (section === activeSection) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
}

function createParticles() {
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
}

function createParticle() {
    const particle = document.createElement("div");
    particle.className = "particle";

    // Random position
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 4 + "s";
    particle.style.animationDuration = Math.random() * 3 + 2 + "s";

    particlesContainer.appendChild(particle);

    // Remove and recreate particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
            createParticle();
        }
    }, 5000);
}

function trackMouse() {
    document.addEventListener("mousemove", (e) => {
        mousePosition.x = e.clientX;
        mousePosition.y = e.clientY;

        // Update background blur positions
        updateBackgroundBlurs();
    });
}

function updateBackgroundBlurs() {
    const blur1 = document.querySelector(".bg-blur-1");
    const blur2 = document.querySelector(".bg-blur-2");

    if (blur1) {
        const x1 = mousePosition.x * 0.02;
        const y1 = mousePosition.y * 0.02;
        blur1.style.transform = `translate(${x1}px, ${y1}px)`;
    }

    if (blur2) {
        const x2 = mousePosition.x * -0.02;
        const y2 = mousePosition.y * -0.02;
        blur2.style.transform = `translate(${x2}px, ${y2}px)`;
    }
}

function initializeSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress");
    skillBars.forEach((bar) => {
        bar.style.width = "0%";
    });
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress");

    skillBars.forEach((bar, index) => {
        const targetWidth = bar.getAttribute("data-width");

        setTimeout(() => {
            bar.style.width = targetWidth + "%";
        }, index * 100);
    });
}

function handleContactForm(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(e.target);
    const name =
        formData.get("name") || e.target.querySelector('input[type="text"]').value;
    const email =
        formData.get("email") ||
        e.target.querySelector('input[type="email"]').value;
    const message =
        formData.get("message") || e.target.querySelector("textarea").value;

    // Simple validation
    if (!name || !email || !message) {
        showNotification("Mohon lengkapi semua field!", "error");
        return;
    }

    // Simulate form submission
    const submitBtn = e.target.querySelector(".btn-primary");
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Reset form
        e.target.reset();

        showNotification("Pesan berhasil dikirim! Terima kasih.", "success");
    }, 2000);
}

function showNotification(message, type = "info") {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === "success"
            ? "check-circle"
            : type === "error"
                ? "exclamation-circle"
                : "info-circle"
        }"></i>
            <span>${message}</span>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: ${type === "success"
            ? "rgba(16, 185, 129, 0.9)"
            : type === "error"
                ? "rgba(239, 68, 68, 0.9)"
                : "rgba(59, 130, 246, 0.9)"
        };
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        backdrop-filter: blur(16px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    `;

    notification.querySelector(".notification-content").style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = "translateX(0)";
    }, 100);

    // Remove after delay
    setTimeout(() => {
        notification.style.transform = "translateX(100%)";
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Smooth scrolling for better UX
function smoothScrollTo(element) {
    if (element) {
        element.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }
}

// Add intersection observer for animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate-in");
            }
        });
    }, observerOptions);

    // Observe elements that should animate
    const animateElements = document.querySelectorAll(
        ".project-card, .skill-card, .specialization-card, .achievement-item"
    );
    animateElements.forEach((el) => observer.observe(el));
}

// Initialize intersection observer when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(setupIntersectionObserver, 3000);
});

// Add keyboard navigation
document.addEventListener("keydown", (e) => {
    if (isLoading) return;

    const sections = ["home", "projects", "skills", "contact"];
    const currentIndex = sections.indexOf(currentSection);

    switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
            e.preventDefault();
            if (currentIndex < sections.length - 1) {
                navigateToSection(sections[currentIndex + 1]);
            }
            break;
        case "ArrowLeft":
        case "ArrowUp":
            e.preventDefault();
            if (currentIndex > 0) {
                navigateToSection(sections[currentIndex - 1]);
            }
            break;
        case "Home":
            e.preventDefault();
            navigateToSection("home");
            break;
        case "Escape":
            e.preventDefault();
            closeMobileMenu();
            break;
    }
});

// Add touch gestures for mobile
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener("touchend", (e) => {
    if (isLoading) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    // Only trigger if swipe is significant
    if (Math.abs(deltaX) > 50 || Math.abs(deltaY) > 50) {
        const sections = ["home", "projects", "skills", "contact"];
        const currentIndex = sections.indexOf(currentSection);

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Horizontal swipe
            if (deltaX > 0 && currentIndex > 0) {
                // Swipe right - go to previous section
                navigateToSection(sections[currentIndex - 1]);
            } else if (deltaX < 0 && currentIndex < sections.length - 1) {
                // Swipe left - go to next section
                navigateToSection(sections[currentIndex + 1]);
            }
        } else {
            // Vertical swipe
            if (deltaY < 0 && currentIndex < sections.length - 1) {
                // Swipe up - go to next section
                navigateToSection(sections[currentIndex + 1]);
            } else if (deltaY > 0 && currentIndex > 0) {
                // Swipe down - go to previous section
                navigateToSection(sections[currentIndex - 1]);
            }
        }
    }
});

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced mouse tracking
const debouncedMouseTracking = debounce(updateBackgroundBlurs, 16);

document.addEventListener("mousemove", (e) => {
    mousePosition.x = e.clientX;
    mousePosition.y = e.clientY;
    debouncedMouseTracking();
});

// Add loading states for images
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
        img.addEventListener("load", () => {
            img.classList.add("loaded");
        });

        // Add loading placeholder
        if (!img.complete) {
            img.style.opacity = "0";
            img.addEventListener("load", () => {
                img.style.transition = "opacity 0.3s ease";
                img.style.opacity = "1";
            });
        }
    });
});

// Add error handling
window.addEventListener("error", (e) => {
    console.error("An error occurred:", e.error);
});

// Add resize handler
window.addEventListener(
    "resize",
    debounce(() => {
        // Close mobile menu on resize
        if (window.innerWidth >= 768) {
            closeMobileMenu();
        }
    }, 250)
);
