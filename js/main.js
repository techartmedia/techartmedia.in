/**
 * TechArtMedia Studio — Official Interactive Engine
 * Handles: Multi-page active navigation, scroll progress, scroll reveal animations,
 * contact funnel WhatsApp dispatch, floating actions, and mobile drawer.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Highlight Active Page in Navbar
  const currentPath = window.location.pathname.toLowerCase();
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    const hrefClean = href.split('#')[0].toLowerCase();
    const isCurrent = 
      (currentPath.endsWith(hrefClean) && hrefClean !== '') ||
      (currentPath.endsWith('/') && (hrefClean === 'index.html' || hrefClean === './' || hrefClean === 'index.html#hero')) ||
      (currentPath.includes('about') && hrefClean.includes('about')) ||
      (currentPath.includes('services') && hrefClean.includes('services')) ||
      (currentPath.includes('packages') && hrefClean.includes('packages')) ||
      (currentPath.includes('contact') && hrefClean.includes('contact'));

    if (isCurrent && !href.startsWith('#')) {
      link.classList.add('active');
    }
  });

  // 3. Scroll Progress Bar & Floating Back to Top
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${progress}%`;
    }

    // Toggle Back-to-Top Button
    if (backToTopBtn) {
      if (window.scrollY > 320) {
        backToTopBtn.classList.add('is-visible');
      } else {
        backToTopBtn.classList.remove('is-visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 4. IntersectionObserver for Fluid Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // 5. Mobile Menu Navigation Drawer
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenuCloseBtn = document.getElementById('mobileMenuCloseBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    if (mobileDrawer) mobileDrawer.classList.remove('translate-x-full');
    if (mobileOverlay) mobileOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (mobileDrawer) mobileDrawer.classList.add('translate-x-full');
    if (mobileOverlay) mobileOverlay.classList.add('hidden');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
  if (mobileMenuCloseBtn) mobileMenuCloseBtn.addEventListener('click', closeMobileMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

  // 6. Interactive FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const answer = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');

    if (trigger && answer) {
      trigger.addEventListener('click', () => {
        const isOpen = !answer.classList.contains('hidden');

        // Close other FAQs
        faqItems.forEach(other => {
          const otherAnswer = other.querySelector('.faq-content');
          const otherIcon = other.querySelector('.faq-icon');
          if (otherAnswer && otherAnswer !== answer) {
            otherAnswer.classList.add('hidden');
            if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
          }
        });

        // Toggle clicked FAQ
        if (isOpen) {
          answer.classList.add('hidden');
          if (icon) icon.style.transform = 'rotate(0deg)';
        } else {
          answer.classList.remove('hidden');
          if (icon) icon.style.transform = 'rotate(180deg)';
        }
      });
    }
  });

  // 7. Interactive WhatsApp Consultation Form Handler
  const contactForm = document.getElementById('contactForm');
  const formSuccessModal = document.getElementById('formSuccessModal');
  const closeSuccessModalBtn = document.getElementById('closeSuccessModalBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contactName')?.value.trim() || '';
      const phone = document.getElementById('contactPhone')?.value.trim() || '';
      const email = document.getElementById('contactEmail')?.value.trim() || '';
      const service = document.getElementById('contactService')?.value || 'Growth & Enquiries SMM Package';
      const budget = document.getElementById('contactBudget')?.value || 'Ready to Start Immediately';
      const message = document.getElementById('contactMessage')?.value.trim() || '';

      if (!name || !phone) {
        alert('Please provide your name and WhatsApp/contact number.');
        return;
      }

      // Format WhatsApp Message directly to Founder Durvesh Bhavsar
      const waText = encodeURIComponent(
        `*New Inquiry via techartmedia.in Website*\n\n` +
        `👤 *Client Name:* ${name}\n` +
        `📞 *WhatsApp / Phone:* ${phone}\n` +
        `✉️ *Email:* ${email || 'Not provided'}\n` +
        `🎯 *Selected Package / Service:* ${service}\n` +
        `⏱️ *Target Timeline:* ${budget}\n\n` +
        `📝 *Project Overview / Notes:*\n${message || 'Ready to discuss requirements.'}\n\n` +
        `_Directed to Durvesh Bhavsar, Founder & CEO, TechArtMedia_`
      );

      const waUrl = `https://wa.me/918087084597?text=${waText}`;

      // Show Confirmation Modal if present
      if (formSuccessModal) {
        formSuccessModal.classList.remove('hidden');
        formSuccessModal.classList.add('flex');
      }

      // Store lead backup
      try {
        const stored = JSON.parse(localStorage.getItem('tam_leads') || '[]');
        stored.unshift({ name, phone, email, service, budget, message, date: new Date().toISOString() });
        localStorage.setItem('tam_leads', JSON.stringify(stored));
      } catch (err) {}

      // Trigger WhatsApp window
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 400);

      contactForm.reset();
    });
  }

  if (closeSuccessModalBtn && formSuccessModal) {
    closeSuccessModalBtn.addEventListener('click', () => {
      formSuccessModal.classList.add('hidden');
      formSuccessModal.classList.remove('flex');
    });
  }
});
