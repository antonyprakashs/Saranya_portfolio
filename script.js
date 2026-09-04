/**
 * T. Saranya — UI/UX Designer Portfolio
 * Modern Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Dark / Light Mode)
  initTheme();

  // 2. Navigation & Mobile Menu
  initNavigation();

  // 3. Email Copy with Toast Feedback
  initEmailCopy();

  // 4. Skills Category Filtering
  initSkillsFilter();

  // 5. Case Study Modal
  initCaseStudyModal();

  // 6. Contact Form Validation & Interaction
  initContactForm();

  // 7. Scroll Header Effects
  initScrollEffects();

  // 8. Scroll Reveal Animations
  initScrollReveal();

  // 9. Interactive Card Hover Micro-Animations
  initCardTilt();
});

/* --------------------------------------------------------------------------
   1. Theme Management
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  // Retrieve saved preference or default to dark
  const savedTheme = localStorage.getItem('saranya_theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('saranya_theme', newTheme);

      showToast(`Switched to ${newTheme.toUpperCase()} theme`);
    });
  }
}

/* --------------------------------------------------------------------------
   2. Navigation & Mobile Menu
   -------------------------------------------------------------------------- */
function initNavigation() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileMenuBtn.classList.toggle('active');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking outside or clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Scrollspy to highlight active nav link
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (targetNavLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          targetNavLink.classList.add('active');
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. Email Copy Functionality & Toast Notification
   -------------------------------------------------------------------------- */
function initEmailCopy() {
  const copyButtons = document.querySelectorAll('.copy-email-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'saranyat5723@gmail.com';

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email)
          .then(() => {
            showToast(`Copied ${email} to clipboard!`);
          })
          .catch(() => {
            fallbackCopy(email);
          });
      } else {
        fallbackCopy(email);
      }
    });
  });
}

function fallbackCopy(text) {
  const tempInput = document.createElement('input');
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  try {
    document.execCommand('copy');
    showToast(`Copied ${text} to clipboard!`);
  } catch (err) {
    showToast(`Contact: ${text}`);
  }
  document.body.removeChild(tempInput);
}

let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');

  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);

  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* --------------------------------------------------------------------------
   4. Skills Category Filtering
   -------------------------------------------------------------------------- */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 20);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. Case Study Modal Details
   -------------------------------------------------------------------------- */
const projectCaseStudies = {
  'farmers-market': {
    title: "Farmer's Market App (Direct-to-Consumer)",
    subtitle: "Mobile Application Design • High-Fidelity Interactive Flow",
    image: "assets/farmers_market.jpg",
    role: "End-to-End UI/UX Designer (User Research, Wireframes, UI, Prototyping)",
    figmaLink: "https://www.figma.com/proto/vwuZeeGIDOZQnzNbLYD56X/sweets?node-id=69-133&p=f&t=VWzfDO6OPXDsxlv4-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=168%3A977&show-proto-sidebar=1",
    sections: [
      {
        heading: "The Core Problem & Context",
        content: "Traditional agricultural trade relies on multiple layers of intermediaries, taking substantial margins from farmers while consumers pay high retail markups. Farmers lack a direct digital channel to showcase produce freshness, determine honest prices, and track orders directly."
      },
      {
        heading: "UX Research & Target Personas",
        content: "We identified two distinct persona groups: (1) Local farmers who require an ultra-simple, legible mobile interface with minimal textual friction, and (2) Health-conscious household shoppers looking for authentic harvest-date transparency and direct farmer contact."
      },
      {
        heading: "Key Design Solutions",
        points: [
          "<strong>Direct Marketplace:</strong> Browse local harvest by categories (Vegetables, Fruits, Dairy, Meats) with farmer distance indicators.",
          "<strong>Accessible Visual UI:</strong> High-contrast color hierarchy, large tap targets (minimum 48px), and clean visual feedback.",
          "<strong>Streamlined Produce Upload:</strong> 3-step listing workflow allowing farmers to set daily harvest quantities in seconds."
        ]
      },
      {
        heading: "Deliverables & Artifacts",
        chips: ["Empathy Maps", "Information Architecture", "Low-Fidelity Wireframes", "Interactive High-Fi Figma Prototype", "Design System Components"]
      }
    ]
  }
};

function initCaseStudyModal() {
  const modal = document.getElementById('caseStudyModal');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const openButtons = document.querySelectorAll('.open-case-study-modal');

  if (!modal || !modalBody) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectKey = btn.getAttribute('data-project');
      const data = projectCaseStudies[projectKey];

      if (!data) return;

      let sectionsHtml = '';
      data.sections.forEach(sec => {
        sectionsHtml += `
          <div style="margin-top: 24px;">
            <h4 style="font-size: 1.1rem; color: var(--accent-purple-light); margin-bottom: 8px;">${sec.heading}</h4>
            ${sec.content ? `<p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7;">${sec.content}</p>` : ''}
            ${sec.points ? `
              <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; margin-top: 8px;">
                ${sec.points.map(pt => `<li style="padding-left: 20px; position: relative; font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6;"><span style="position: absolute; left: 0; color: var(--accent-cyan);">▹</span>${pt}</li>`).join('')}
              </ul>
            ` : ''}
            ${sec.chips ? `
              <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">
                ${sec.chips.map(chip => `<span style="font-size: 0.78rem; padding: 4px 10px; border-radius: var(--radius-pill); background: rgba(168, 85, 247, 0.12); border: 1px solid rgba(168, 85, 247, 0.25); color: var(--accent-purple-light);">${chip}</span>`).join('')}
              </div>
            ` : ''}
          </div>
        `;
      });

      modalBody.innerHTML = `
        <div style="margin-bottom: 20px;">
          <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-cyan); text-transform: uppercase;">CASE STUDY OVERVIEW</span>
          <h2 style="font-size: 1.8rem; margin: 4px 0 6px;">${data.title}</h2>
          <p style="color: var(--text-muted); font-size: 0.95rem;">${data.subtitle}</p>
        </div>

        <div style="border-radius: var(--radius-md); overflow: hidden; margin-bottom: 24px; border: 1px solid var(--border-glass);">
          <img src="${data.image}" alt="${data.title}" style="width: 100%; height: auto; max-height: 380px; object-fit: cover;">
        </div>

        <div style="background: rgba(255, 255, 255, 0.03); border-left: 3px solid var(--accent-purple); padding: 12px 16px; border-radius: var(--radius-sm); font-size: 0.92rem; color: var(--text-secondary);">
          <strong>Role &amp; Contribution:</strong> ${data.role}
        </div>

        ${sectionsHtml}

        <div style="margin-top: 32px; display: flex; gap: 14px; flex-wrap: wrap;">
          <a href="${data.figmaLink}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
            <span>Open in Figma Prototype</span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
          <button class="btn btn-secondary" onclick="document.getElementById('caseStudyModal').classList.remove('open')">Close</button>
        </div>
      `;

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   6. Contact Form Handling
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccessState');
  const resetBtn = document.getElementById('resetFormBtn');

  if (!form) return;

  const nameInput = document.getElementById('userName');
  const emailInput = document.getElementById('userEmail');
  const messageInput = document.getElementById('userMessage');
  const projectTypeSelect = document.getElementById('projectType');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Reset error messages
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';

    // Validate Name
    if (!nameInput.value.trim()) {
      nameError.textContent = 'Please enter your name.';
      isValid = false;
    }

    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      emailError.textContent = 'Please provide an email address.';
      isValid = false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
      emailError.textContent = 'Please enter a valid email address format.';
      isValid = false;
    }

    // Validate Message
    if (!messageInput.value.trim()) {
      messageError.textContent = 'Please enter a brief message.';
      isValid = false;
    }

    if (!isValid) return;

    // Construct Mailto link for seamless direct submission
    const subject = encodeURIComponent(`Portfolio Inquiry: ${projectTypeSelect.value} from ${nameInput.value.trim()}`);
    const body = encodeURIComponent(`Hi Saranya,\n\nName: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\nOpportunity / Topic: ${projectTypeSelect.value}\n\nMessage:\n${messageInput.value.trim()}\n\nBest regards,\n${nameInput.value.trim()}`);

    const mailtoUri = `mailto:saranyat5723@gmail.com?subject=${subject}&body=${body}`;

    // Open mail client
    window.location.href = mailtoUri;

    // Show on-page success feedback
    form.style.display = 'none';
    formSuccess.style.display = 'block';
    showToast("Opening email client with your message!");
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      form.style.display = 'block';
      formSuccess.style.display = 'none';
    });
  }
}

/* --------------------------------------------------------------------------
   7. Scroll Effects (Header Glass & Back to Top)
   -------------------------------------------------------------------------- */
function initScrollEffects() {
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.padding = '4px 0';
      header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
    } else {
      header.style.padding = '0';
      header.style.boxShadow = 'none';
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* --------------------------------------------------------------------------
   8. Scroll Reveal Animations (Intersection Observer)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  if (!revealElements.length) return;

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Graceful fallback
    revealElements.forEach(el => el.classList.add('is-visible'));
  }
}

/* --------------------------------------------------------------------------
   9. Interactive 3D Card Hover Micro-Animations (Desktop only)
   -------------------------------------------------------------------------- */
function initCardTilt() {
  // Only apply tilt effect on devices with fine pointer (mouse)
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const tiltCards = document.querySelectorAll('.visual-card-glass, .featured-case-study, .about-bio-card');

  tiltCards.forEach(card => {
    let ticking = false;

    card.addEventListener('mousemove', (e) => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -3.5;
        const rotateY = ((x - centerX) / centerX) * 3.5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
        ticking = false;
      });
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
