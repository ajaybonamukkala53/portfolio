/* ==========================================
   LOADER
========================================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    loader.style.opacity = "0";

    setTimeout(() => {

        loader.style.display = "none";

    }, 500);

});

/* ==========================================
   TYPING EFFECT
========================================== */

const typingElement = document.getElementById("typing-text");

const words = [

    "Software Engineer",

    "MERN Stack Developer",

    "Python Full Stack Developer",

    "AI & Data Science Enthusiast"

];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingElement.textContent =
            currentWord.substring(0, charIndex++);

        if (charIndex > currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;

        }

    } else {

        typingElement.textContent =
            currentWord.substring(0, charIndex--);

        if (charIndex < 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length)

                wordIndex = 0;

        }

    }

    setTimeout(typeEffect, deleting ? 50 : 100);

}

typeEffect();

/* ==========================================
   BACK TO TOP
========================================== */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        backToTop.style.display = "block";

    } else {

        backToTop.style.display = "none";

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

/* ==========================================
   ACTIVE NAVIGATION
========================================== */

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (pageYOffset >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

/* ==========================================
   SMOOTH NAVIGATION
========================================== */

navLinks.forEach(link => {

    link.addEventListener("click", e => {

        e.preventDefault();

        const target = document.querySelector(

            link.getAttribute("href")

        );

        target.scrollIntoView({

            behavior: "smooth"

        });

    });

});
/* ==========================================
   DARK / LIGHT MODE
========================================== */

const themeBtn = document.getElementById("theme-toggle");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    const icon = themeBtn.querySelector("i");

    if (document.body.classList.contains("light-mode")) {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

    } else {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

    }

});

/* ==========================================
   MOBILE MENU
========================================== */

const menuBtn = document.getElementById("menu-btn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {

    navbar.classList.toggle("show-menu");

    const icon = menuBtn.querySelector("i");

    if (navbar.classList.contains("show-menu")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("show-menu");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});

/* ==========================================
   HEADER SCROLL EFFECT
========================================== */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.background = "rgba(15,23,42,.97)";
        header.style.boxShadow = "0 10px 25px rgba(0,0,0,.25)";

    } else {

        header.style.background = "rgba(15,23,42,.85)";
        header.style.boxShadow = "none";

    }

});

/* ==========================================
   SCROLL REVEAL ANIMATION
========================================== */

const revealElements = document.querySelectorAll(
    ".section,.project-card,.skill-card,.certificate-card,.achievement-card,.about-card,.timeline-item"
);

const revealOnScroll = () => {

    revealElements.forEach(element => {

        const top = element.getBoundingClientRect().top;

        if (top < window.innerHeight - 120) {

            element.classList.add("show");

        }

    });

};

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();

/* ==========================================
   CONTACT FORM
========================================== */
/* ==========================================
   CONTACT FORM - EMAILJS
========================================== */

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const status = document.getElementById("status");

    status.style.color = "#2563eb";
    status.innerHTML = "Sending message...";

    emailjs.sendForm(

        "service_ezjxzlk",

        "template_540cqsb",

        this

    )

    .then(function () {

        status.style.color = "green";
        status.innerHTML = "✅ Message Sent Successfully.";

        contactForm.reset();

    })

    .catch(function (error) {

        console.log(error);

        status.style.color = "red";
        status.innerHTML = "❌ " + error.text;

    });

});




/* ==========================================
   CURRENT YEAR IN FOOTER
========================================== */

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}

/* ==========================================
   CONSOLE MESSAGE
========================================== */

console.log("%cWelcome to Ajay Bonamukkala's Portfolio 🚀",
"color:#4F46E5;font-size:18px;font-weight:bold;");
