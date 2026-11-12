/**
 * TechArtMedia Studio — Interactive Concept & Animations Engine
 * Handles: Scroll progress bar, IntersectionObserver animations, high-res Lightbox modal,
 * pricing toggles, interactive service explorer, WhatsApp pre-fill formatting, and mobile drawer.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 1. Scroll Progress Bar
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${progress}%`;
    }
  });

  // 2. IntersectionObserver for Fluid Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 3. High-Resolution Image Lightbox System
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxTriggers = document.querySelectorAll('[data-lightbox-src]');

  function openLightbox(src, caption) {
    if (!lightboxModal || !lightboxImage) return;
    lightboxImage.src = src;
    if (lightboxCaption) lightboxCaption.textContent = caption || 'TechArtMedia Official Document';
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  lightboxTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const src = trigger.getAttribute('data-lightbox-src');
      const caption = trigger.getAttribute('data-lightbox-caption');
      openLightbox(src, caption);
    });
  });

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });

  // 4. Mobile Menu Navigation Drawer
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

  // 5. Billing Toggle for Packages (Monthly vs Quarterly - 10% Savings)
  const billingToggle = document.getElementById('billingToggle');
  const starterPrice = document.getElementById('starterPrice');
  const growthPrice = document.getElementById('growthPrice');
  const premiumPrice = document.getElementById('premiumPrice');
  const billingPeriodLabels = document.querySelectorAll('.billing-period-label');

  const basePrices = {
    starter: 15000,
    growth: 25000,
    premium: 35000
  };

  function updatePricing() {
    const isQuarterly = billingToggle && billingToggle.checked;
    
    if (isQuarterly) {
      const starterDiscounted = Math.round(basePrices.starter * 0.9);
      const growthDiscounted = Math.round(basePrices.growth * 0.9);
      const premiumDiscounted = Math.round(basePrices.premium * 0.9);

      if (starterPrice) starterPrice.textContent = '₹' + starterDiscounted.toLocaleString('en-IN');
      if (growthPrice) growthPrice.textContent = '₹' + growthDiscounted.toLocaleString('en-IN');
      if (premiumPrice) premiumPrice.textContent = '₹' + premiumDiscounted.toLocaleString('en-IN');
      
      billingPeriodLabels.forEach(el => el.textContent = '/month (billed quarterly)');
    } else {
      if (starterPrice) starterPrice.textContent = '₹' + basePrices.starter.toLocaleString('en-IN');
      if (growthPrice) growthPrice.textContent = '₹' + basePrices.growth.toLocaleString('en-IN');
      if (premiumPrice) premiumPrice.textContent = '₹' + basePrices.premium.toLocaleString('en-IN');
      
      billingPeriodLabels.forEach(el => el.textContent = '/month');
    }
  }

  if (billingToggle) {
    billingToggle.addEventListener('change', updatePricing);
  }

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
      const service = document.getElementById('contactService')?.value || 'Growth & Enquiries Retainer';
      const budget = document.getElementById('contactBudget')?.value || '₹25,000 / month';
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
        `🎯 *Selected Scope:* ${service}\n` +
        `💰 *Budget Range:* ${budget}\n\n` +
        `📝 *Project Overview / Notes:*\n${message || 'Ready to discuss requirements.'}\n\n` +
        `_Directed to Durvesh Bhavsar, Founder & CEO, TechArtMedia_`
      );

      const waUrl = `https://wa.me/918087084597?text=${waText}`;

      // Show Confirmation Modal
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
      }, 500);

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
