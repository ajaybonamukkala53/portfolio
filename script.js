document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     THEME TOGGLE SYSTEM
     ========================================================================== */
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleIcon = themeToggle.querySelector('i');
  
  // Load saved theme or default to dark
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let newTheme = theme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Update canvas particle colors on theme toggle if canvas is running
    if (window.updateParticleColors) {
      window.updateParticleColors(newTheme);
    }
  });

  function updateThemeIcon(theme) {
    if (theme === 'light') {
      themeToggleIcon.className = 'fa-solid fa-sun';
    } else {
      themeToggleIcon.className = 'fa-solid fa-moon';
    }
  }

  /* ==========================================================================
     MOBILE NAVIGATION MENU
     ========================================================================== */
  const menuBtn = document.getElementById('menu-btn');
  const menuBtnIcon = menuBtn.querySelector('i');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const isOpen = navMenu.classList.contains('open');
    menuBtnIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  });

  // Close menu when navigation link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      menuBtnIcon.className = 'fa-solid fa-bars';
    });
  });

  /* ==========================================================================
     INTERSECTION OBSERVER - SCROLL REVEAL & NAV HIGHLIGHTS
     ========================================================================== */
  const sections = document.querySelectorAll('section');
  const skillBars = document.querySelectorAll('.skill-bar');
  
  // Scroll Reveal Observer
  const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Specially animate skill bars when the skills section enters
        if (entry.target.id === 'skills') {
          animateSkillBars();
        }
        
        observer.unobserve(entry.target); // Trigger only once
      }
    });
  }, revealOptions);

  sections.forEach(section => {
    // Add scroll-reveal class if not hero section
    if (section.id !== 'home') {
      section.classList.add('scroll-reveal');
      revealObserver.observe(section);
    }
  });

  // Active Link Observer
  const navOptions = {
    threshold: 0.4,
    rootMargin: '-10% 0px -30% 0px'
  };

  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, navOptions);

  sections.forEach(section => navObserver.observe(section));

  // Function to trigger skill bar progress width loading
  function animateSkillBars() {
    skillBars.forEach(bar => {
      const targetWidth = bar.style.width;
      // Temporarily clear and re-apply width to force CSS transition
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.width = targetWidth;
      }, 100);
    });
  }

  /* ==========================================================================
     PROJECT CARDS FILTER
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle Active Class
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          // Smooth fade in animation trigger
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          // Wait for fade out to hide
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  /* ==========================================================================
     CERTIFICATES LIGHTBOX (MODAL)
     ========================================================================== */
  const certCards = document.querySelectorAll('.cert-card');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  certCards.forEach(card => {
    card.addEventListener('click', () => {
      const src = card.getAttribute('data-cert');
      lightboxImg.setAttribute('src', src);
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden'; // Stop scrolling background
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = ''; // Restore scrolling
    setTimeout(() => {
      lightboxImg.setAttribute('src', '');
    }, 300);
  };

  lightboxClose.addEventListener('click', closeLightbox);
  
  // Close on clicking outside the image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });

  /* ==========================================================================
     CONTACT FORM VALIDATION
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const formStatus = document.getElementById('form-status');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isFormValid = true;

    // Validate Name
    if (nameInput.value.trim() === '') {
      setErrorFor(nameInput, 'Please enter your name');
      isFormValid = false;
    } else {
      setSuccessFor(nameInput);
    }

    // Validate Email
    if (emailInput.value.trim() === '') {
      setErrorFor(emailInput, 'Please enter your email');
      isFormValid = false;
    } else if (!isEmailValid(emailInput.value.trim())) {
      setErrorFor(emailInput, 'Please enter a valid email address');
      isFormValid = false;
    } else {
      setSuccessFor(emailInput);
    }

    // Validate Message
    if (messageInput.value.trim() === '') {
      setErrorFor(messageInput, 'Message cannot be empty');
      isFormValid = false;
    } else {
      setSuccessFor(messageInput);
    }

    // If Form Valid, simulate API submit
    if (isFormValid) {
      const submitBtn = contactForm.querySelector('.btn-submit');
      const originalText = submitBtn.innerHTML;
      
      // Loading State
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
      
      // Simulate network request delays
      setTimeout(() => {
        // Show Success Feedback
        formStatus.textContent = 'Message sent successfully! Ajay will contact you shortly.';
        formStatus.className = 'form-status success';
        
        // Reset Inputs
        contactForm.reset();
        document.querySelectorAll('.form-group').forEach(group => group.classList.remove('success'));
        
        // Restore Button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        // Fade status out after 5 seconds
        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 5000);
      }, 1500);
    }
  });

  function setErrorFor(input, message) {
    const formGroup = input.closest('.form-group');
    const errorSpan = formGroup.querySelector('.error-msg');
    formGroup.className = 'form-group error';
    errorSpan.textContent = message;
  }

  function setSuccessFor(input) {
    const formGroup = input.closest('.form-group');
    formGroup.className = 'form-group success';
  }

  function isEmailValid(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  /* ==========================================================================
     RESUME DOWNLOAD TRIGGER
     ========================================================================== */
  const cvDownloadBtn = document.getElementById('cv-download-btn');
  if (cvDownloadBtn) {
    cvDownloadBtn.addEventListener('click', () => {
      const resumeText = `AJAY BONAMUKKALA
Email: ajaybonamukkala53@gmail.com | Phone: +91-7207039202
LinkedIn: linkedin.com/in/ajaybonamukkala | GitHub: github.com/ajaybonamukkala

CAREER OBJECTIVE
Computer Science (Data Science) student with strong skills in Java, Python, SQL, Machine Learning, Cloud Computing, and Full Stack Development. Passionate about building scalable AI-powered applications, solving real-world engineering problems, and contributing to innovative software solutions.

EDUCATION
- B.Tech in Computer Science and Engineering (Data Science)
  RVR & JC College of Engineering | Aug 2023 - Present
  CGPA: 9.34/10
- Intermediate (MPC)
  Krishna Chaitanya Junior College | Jun 2021 - Mar 2023
  Score: 979/1000

EXPERIENCE
- MERN Full Stack Developer Intern
  AICTE (Remote) | Jan 2026 - Present
  * Designed and developed ShopSphere, a full-stack e-commerce platform using MongoDB, Express.js, React.js, and Node.js.
  * Implemented secure JWT Authentication, Role-Based Authorization, Redux Toolkit, RESTful APIs, and MongoDB database integration.
  * Built responsive user interfaces using React.js and Tailwind CSS.
  * Deployed the application using Render and MongoDB Atlas.
- Artificial Intelligence / Data Science Intern
  Edu Tantr (Remote) | May 2025 - Jul 2025
  * Completed a 3-month internship focused on Artificial Intelligence, Machine Learning, and Data Science.
  * Worked with Python, Pandas, NumPy, and Scikit-learn for data preprocessing, predictive modeling, and data visualization.
- Python Full Stack Developer Virtual Intern
  AICTE (Remote) | Apr 2025 - Jun 2025
  * Developed responsive full-stack web applications using Python, HTML, CSS, JavaScript, SQL, and Flask.

PROJECTS
- Crime Intelligence Monitoring System
  * Developed an AI-powered crime monitoring platform using Python, Flask, NLP, and News APIs.
  * Implemented district-wise crime classification, multilingual processing, keyword extraction, and PDF report generation.
  * Designed an automated dashboard for real-time crime analytics and visualization.
- ShopSphere - MERN Stack E-Commerce Platform
  * Developed a scalable e-commerce application using MongoDB, Express.js, React.js, and Node.js.
  * Implemented JWT Authentication, Redux Toolkit, secure REST APIs, product management, and responsive UI.

TECHNICAL SKILLS
- Languages: Java, Python, SQL, JavaScript
- Frontend: HTML5, CSS3, React.js, Tailwind CSS
- Backend & Databases: Node.js, Express.js, Flask, MongoDB, MySQL
- Libraries: NumPy, Pandas, Matplotlib, Scikit-learn
- Tools: Git, GitHub, VS Code, Postman, Power BI
- Core Subjects: Data Structures & Algorithms, OOP, DBMS, OS, Computer Networks

CERTIFICATIONS
- NPTEL Elite + Gold (Top 5%) - Data Mining (Score: 92%)
- Oracle Certified Data Science Professional
- Python Full Stack Developer Virtual Internship (AICTE)
- Artificial Intelligence & Data Science Internship (Edu Tantr)

ACHIEVEMENTS
- Achieved Elite + Gold (Top 5%) in NPTEL Data Mining with 92%.
- Solved 150+ LeetCode coding problems covering DSA concepts.
- Built multiple full-stack and AI-based projects using MERN Stack, Python, and Machine Learning.
`;
      const blob = new Blob([resumeText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Ajay_Bonamukkala_Resume.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  /* ==========================================================================
     INTERACTIVE CANVAS PARTICLES SYSTEM
     ========================================================================== */
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');

  let particlesArray = [];
  let numberOfParticles = 65;

  // Set size
  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  setCanvasSize();

  // Resize handler
  window.addEventListener('resize', () => {
    setCanvasSize();
    initParticles();
  });

  // Track Theme color adjustments
  let themeColor = 'rgba(6, 182, 212, '; // Default dark cyan particle color
  let theme = document.documentElement.getAttribute('data-theme');
  updateParticleThemeColor(theme);

  function updateParticleThemeColor(currentTheme) {
    if (currentTheme === 'light') {
      themeColor = 'rgba(79, 70, 229, '; // Indigo particles in light mode
    } else {
      themeColor = 'rgba(6, 182, 212, '; // Cyan particles in dark mode
    }
  }

  // Bind function globally to update colors on theme changes
  window.updateParticleColors = (newTheme) => {
    updateParticleThemeColor(newTheme);
  };

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2.5 + 0.5;
      this.speedX = Math.random() * 0.4 - 0.2;
      this.speedY = Math.random() * 0.4 - 0.2;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Wrap around bounds
      if (this.x > canvas.width) this.x = 0;
      else if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      else if (this.y < 0) this.y = canvas.height;
    }

    draw() {
      ctx.fillStyle = themeColor + '0.45)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    particlesArray = [];
    // Adjust density based on screen size
    if (window.innerWidth < 768) {
      numberOfParticles = 30;
    } else {
      numberOfParticles = 75;
    }
    
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw and connect particles
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();

      for (let j = i + 1; j < particlesArray.length; j++) {
        const dx = particlesArray[i].x - particlesArray[j].x;
        const dy = particlesArray[i].y - particlesArray[j].y;
        const distance = Math.hypot(dx, dy);

        // Connect if close enough
        if (distance < 120) {
          const alpha = (1 - (distance / 120)) * 0.15;
          ctx.strokeStyle = themeColor + alpha + ')';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
          ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }

  initParticles();
  animate();
});
