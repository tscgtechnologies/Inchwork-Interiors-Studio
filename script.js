/**
 * Inchwork Interiors Studio - script.js
 * Interactive frontend logic, transitions, and conversions.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // MOBILE MENU TOGGLE
  // ==========================================
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-item');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }

  // ==========================================
  // STICKY HEADER & BACK-TO-TOP SCROLL EFFECTS
  // ==========================================
  const header = document.getElementById('header');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    // Header shadow on scroll
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Show/hide back to top button
    if (window.scrollY > 500) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  // Smooth scroll to top when clicking back-to-top button
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================
  // ACTIVE NAVIGATION LINK HIGHLIGHT ON SCROLL
  // ==========================================
  const sections = document.querySelectorAll('section, header, footer');
  const navItems = document.querySelectorAll('.nav-item');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px', // Trigger when section occupies main center screen
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        if (id) {
          navItems.forEach(item => {
            if (item.getAttribute('href') === `#${id}`) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // ==========================================
  // PORTFOLIO FILTER WITH PREMIUM FADE ANIMATION
  // ==========================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active filter button style
      filterButtons.forEach(button => button.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      // Step 1: Fade out all items
      portfolioItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';
      });

      // Step 2: After fade out transition (300ms), toggle visibility and fade in matched items
      setTimeout(() => {
        portfolioItems.forEach(item => {
          const itemCategory = item.getAttribute('data-category');
          
          if (filterValue === 'all' || itemCategory === filterValue) {
            item.classList.remove('hide');
            // Force a reflow/repaint to trigger the CSS transition
            void item.offsetWidth; 
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          } else {
            item.classList.add('hide');
          }
        });
      }, 300);
    });
  });

  // Apply initial styles for portfolio animation transitions
  portfolioItems.forEach(item => {
    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    item.style.opacity = '1';
    item.style.transform = 'scale(1)';
  });

  // ==========================================
  // CONTACT FORM VALIDATION & WHATSAPP REDIRECT
  // ==========================================
  const form = document.getElementById('enquiry-form');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Retrieve form inputs
      const nameField = document.getElementById('name');
      const phoneField = document.getElementById('phone');
      const locationField = document.getElementById('location');
      const serviceField = document.getElementById('service');
      const budgetField = document.getElementById('budget');
      const messageField = document.getElementById('message');

      const name = nameField.value.trim();
      const phone = phoneField.value.trim();
      const location = locationField.value.trim();
      const service = serviceField.value;
      const budget = budgetField.value;
      const message = messageField.value.trim();

      // Reset previous error classes
      [nameField, phoneField, locationField, serviceField, budgetField].forEach(field => {
        field.style.borderColor = '';
        field.style.boxShadow = '';
      });

      let isValid = true;
      let errorMsgs = [];

      // Validate Name
      if (name.length < 2) {
        nameField.style.borderColor = '#ea4335';
        nameField.style.boxShadow = '0 0 0 3px rgba(234, 67, 53, 0.15)';
        errorMsgs.push('Please enter a valid name (at least 2 letters).');
        isValid = false;
      }

      // Validate Phone (10-digit Indian standard format check)
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(phone)) {
        phoneField.style.borderColor = '#ea4335';
        phoneField.style.boxShadow = '0 0 0 3px rgba(234, 67, 53, 0.15)';
        errorMsgs.push('Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.');
        isValid = false;
      }

      // Validate Location
      if (location.length < 3) {
        locationField.style.borderColor = '#ea4335';
        locationField.style.boxShadow = '0 0 0 3px rgba(234, 67, 53, 0.15)';
        errorMsgs.push('Please enter your property area or location in Hyderabad.');
        isValid = false;
      }

      // Validate Service selection
      if (!service) {
        serviceField.style.borderColor = '#ea4335';
        serviceField.style.boxShadow = '0 0 0 3px rgba(234, 67, 53, 0.15)';
        errorMsgs.push('Please select the interior service required.');
        isValid = false;
      }

      // Validate Budget selection
      if (!budget) {
        budgetField.style.borderColor = '#ea4335';
        budgetField.style.boxShadow = '0 0 0 3px rgba(234, 67, 53, 0.15)';
        errorMsgs.push('Please select a budget range.');
        isValid = false;
      }

      // If validation fails, alert details and stop redirect
      if (!isValid) {
        alert(errorMsgs.join('\n'));
        return;
      }

      // Compile WhatsApp text structure
      // Format: Hello Inchwork Interiors Studio, my name is [Name]. I am from [Location]. I need help with [Service Required]. My budget range is [Budget Range]. Message: [Message]
      const whatsappBaseUrl = 'https://wa.me/918885585899';
      const detailMsg = message ? message : 'None provided';
      const formattedMessage = `Hello Inchwork Interiors Studio, my name is ${name}. I am from ${location}. I need help with ${service}. My budget range is ${budget}. Message: ${detailMsg}`;
      
      const whatsappUrl = `${whatsappBaseUrl}?text=${encodeURIComponent(formattedMessage)}`;

      // Redirect user to WhatsApp chat link in a new window tab
      window.open(whatsappUrl, '_blank');
      
      // Optionally reset the form fields
      form.reset();
    });
  }

  // ==========================================
  // SCROLL REVEAL OBSERVER
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserverOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px', // Trigger slightly before element enters view
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target); // Trigger animation only once
      }
    });
  }, revealObserverOptions);

  revealElements.forEach(el => revealObserver.observe(el));
});
