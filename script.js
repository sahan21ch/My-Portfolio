let sections = document.querySelectorAll('section');
let navbar = document.querySelector('.navbar');
let menuIcon = document.querySelector('#menu-icon');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
};

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navbar.querySelectorAll('a').forEach(link => {
                link.classList.remove('active');
                document.querySelector('.navbar a[href*=' + id + ']').classList.add('active');
            });
        };
    });
}

// Mobile menu toggle
document.querySelectorAll('.navbar a').forEach(link => {
    link.onclick = () => {
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
    };
});
// Close menu when a nav link is clicked
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('fa-xmark');
        navbar.classList.remove('active');
    });
});

// Close menu when scrolling
window.addEventListener('scroll', () => {
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');

    let current = "";
    document.querySelectorAll("section").forEach(sec => {
        if (scrollY >= sec.offsetTop - 80) {
            current = sec.id;
        }
    });

    document.querySelectorAll(".navbar a").forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${current}`
        );
    });
});
window.addEventListener("scroll", () => {
    let current = "";

    document.querySelectorAll("section").forEach(sec => {
        if (scrollY >= sec.offsetTop - 80) {
            current = sec.id;
        }
    });

    document.querySelectorAll(".navbar a").forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${current}`
        );
    });
});

var types = new Typed(".multiple-text", {
    strings: ["Software Developer", "Web Developer", "Mobile App Developer",
        "Database Developer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
})

// Skill bar animation on scroll into view
const skillBars = document.querySelectorAll('.skill-bar .bar span');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'none';         // reset first
            entry.target.offsetHeight;                      // force reflow
            entry.target.style.animation = '';             // re-trigger
        }
    });
}, { threshold: 0.3 });

skillBars.forEach(bar => skillObserver.observe(bar));


// Generate circle dots once on load
const circles = document.querySelectorAll('.circle');
circles.forEach(elem => {
    const dots = elem.getAttribute('data-dots');
    const marked = elem.getAttribute('data-percent');
    const percent = Math.floor(dots * marked / 100);
    const rotate = 360 / dots;

    let points = '';
    for (let i = 0; i < dots; i++) {
        points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
    }
    elem.innerHTML = points;
});

// Animate circles when skills section enters view
const skillSection = document.querySelector('.skills');

const circleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {

            // Remove all marked classes first
            document.querySelectorAll('.points').forEach(point => {
                point.classList.remove('marked');
            });

            // Re-add marked classes with delay to trigger animation
            setTimeout(() => {
                circles.forEach(elem => {
                    const dots = elem.getAttribute('data-dots');
                    const marked = elem.getAttribute('data-percent');
                    const percent = Math.floor(dots * marked / 100);
                    const pointsMarked = elem.querySelectorAll('.points');

                    pointsMarked.forEach((point, j) => {
                        if (j < percent) {
                            setTimeout(() => {
                                point.classList.add('marked');
                            }, j * 50); // stagger each dot
                        }
                    });
                });
            }, 200);
        }
    });
}, { threshold: 0.2 });

circleObserver.observe(skillSection);

ScrollReveal({ 
    reset: true,
    distance: '80px',
    duration:2000,
    delay:200
 });

 ScrollReveal().reveal('.home-content, .heading, .about-content h2, .contact-text , main-text h2', { origin: 'top' });
 ScrollReveal().reveal('.home-img, .about-content, .project-box, .contact form, .timeline-items', { origin: 'bottom' });
ScrollReveal().reveal('.social-media, .about-image img , .skill-left', { origin: 'left' });
ScrollReveal().reveal('.btn, .btn-box, .skill-right', { origin: 'right' });

// Click ripple animation
document.addEventListener('click', function(e) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(0, 238, 255, 0.35);
        border: 2px solid #0ef;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 9999;
        animation: clickRipple 0.7s ease-out forwards;
    `;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
});
// Always scroll to top / home on page load
window.addEventListener('load', function() {
    window.scrollTo(0, 0);
    history.replaceState(null, null, '#home');
});