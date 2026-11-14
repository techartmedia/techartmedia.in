/**
 * TechArtMedia Studio — Official Interactive Engine
 * Handles: Multi-page active navigation, scroll progress, scroll reveal animations,
 * high-res lightbox, pricing toggle, interactive WhatsApp proposal calculator,
 * contact funnel dispatch, floating actions, and mobile drawer.
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
      (currentPath.includes('pricing') && hrefClean.includes('pricing')) ||
      (currentPath.includes('contact') && hrefClean.includes('contact'));

    if (isCurrent && !href.startsWith('#')) {
      link.classList.add('active');
    }
  });

  // 3. Scroll Progress Bar
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${progress}%`;
    }

    // Toggle Back-to-Top Button
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
      if (window.scrollY > 320) {
        backToTopBtn.classList.add('is-visible');
      } else {
        backToTopBtn.classList.remove('is-visible');
      }
    }
  });

  // Back-to-top click handler
  const backToTopBtn = document.getElementById('backToTopBtn');
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

  // 5. High-Resolution Image Lightbox System
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

  // 6. Mobile Menu Navigation Drawer
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

  // 7. Billing Toggle for Packages (Monthly vs Quarterly - 10% Savings)
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

  // 8. Interactive Custom Quote / Package Calculator
  const calcReels = document.getElementById('calcReels');
  const calcPosts = document.getElementById('calcPosts');
  const calcWeb = document.getElementById('calcWeb');
  const calcAds = document.getElementById('calcAds');
  const calcEstimatedTotal = document.getElementById('calcEstimatedTotal');
  const calcWhatsAppBtn = document.getElementById('calcWhatsAppBtn');

  function calculateCustomQuote() {
    if (!calcEstimatedTotal) return;

    let total = 0;
    const reelsVal = parseInt(calcReels?.value || '0', 10);
    const postsVal = parseInt(calcPosts?.value || '0', 10);
    const webVal = parseInt(calcWeb?.value || '0', 10);
    const adsVal = parseInt(calcAds?.value || '0', 10);

    total += reelsVal * 2500; // ~₹2,500 per produced reel with model
    total += postsVal * 750;  // ~₹750 per graphic design post
    total += webVal;          // web dev tier
    total += adsVal;          // ads management

    calcEstimatedTotal.textContent = '₹' + total.toLocaleString('en-IN');

    // Update WhatsApp link
    if (calcWhatsAppBtn) {
      const reelsText = calcReels?.options[calcReels.selectedIndex]?.text || '0';
      const postsText = calcPosts?.options[calcPosts.selectedIndex]?.text || '0';
      const webText = calcWeb?.options[calcWeb.selectedIndex]?.text || 'None';
      const adsText = calcAds?.options[calcAds.selectedIndex]?.text || 'No';

      const customMsg = encodeURIComponent(
        `*Custom Scope Estimate from techartmedia.in*\n\n` +
        `🎬 *Reels Production:* ${reelsText}\n` +
        `🎨 *Graphic Design Posts:* ${postsText}\n` +
        `💻 *Web / Tech Development:* ${webText}\n` +
        `📈 *Meta Ads Management:* ${adsText}\n` +
        `💵 *Estimated Investment:* ₹${total.toLocaleString('en-IN')}\n\n` +
        `Hi Durvesh, I customized this plan on your website and would like to finalize terms with TechArtMedia.`
      );
      calcWhatsAppBtn.href = `https://wa.me/918087084597?text=${customMsg}`;
    }
  }

  if (calcReels) calcReels.addEventListener('change', calculateCustomQuote);
  if (calcPosts) calcPosts.addEventListener('change', calculateCustomQuote);
  if (calcWeb) calcWeb.addEventListener('change', calculateCustomQuote);
  if (calcAds) calcAds.addEventListener('change', calculateCustomQuote);
  calculateCustomQuote();

  // 9. Interactive FAQ Accordion
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

  // 10. Interactive WhatsApp Consultation Form Handler
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
