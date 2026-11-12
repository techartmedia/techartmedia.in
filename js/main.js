/**
 * TechArtMedia Studio — Minimalist & Architectural Agency Website
 * Precision client-side logic: Billing recalculations, mobile navigation,
 * form submission formatting with WhatsApp redirection, and subtle scroll dynamics.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide vector icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Mobile Navigation Drawer Toggle
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

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Sticky Navbar Blur Dynamics
  const navbar = document.getElementById('mainNavbar');
  window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add('border-white/[0.12]', 'shadow-2xl');
    } else {
      navbar.classList.remove('border-white/[0.12]', 'shadow-2xl');
    }
  });

  // Billing Toggle (Monthly vs Quarterly - 10% Retainer Savings)
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
      
      billingPeriodLabels.forEach(el => el.textContent = '/month (quarterly contract)');
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

  // Contact Form Submission Handler with WhatsApp integration
  const contactForm = document.getElementById('contactForm');
  const formSuccessModal = document.getElementById('formSuccessModal');
  const closeSuccessModalBtn = document.getElementById('closeSuccessModalBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contactName')?.value.trim() || '';
      const phone = document.getElementById('contactPhone')?.value.trim() || '';
      const email = document.getElementById('contactEmail')?.value.trim() || '';
      const service = document.getElementById('contactService')?.value || 'Social Media Retainer';
      const budget = document.getElementById('contactBudget')?.value || 'Flexible';
      const message = document.getElementById('contactMessage')?.value.trim() || '';

      if (!name || !phone) {
        alert('Please provide your name and WhatsApp/contact number.');
        return;
      }

      // Format Executive WhatsApp Message
      const waText = encodeURIComponent(
        `*TechArtMedia Studio — Engagement Inquiry*\n\n` +
        `• Client: ${name}\n` +
        `• WhatsApp: ${phone}\n` +
        `• Email: ${email || 'Not provided'}\n` +
        `• Service: ${service}\n` +
        `• Budget Range: ${budget}\n\n` +
        `• Project Brief:\n${message || 'Standard agency audit requested.'}\n\n` +
        `Sent via techartmedia.in`
      );

      const waUrl = `https://wa.me/918087084597?text=${waText}`;

      // Open Modal
      if (formSuccessModal) {
        formSuccessModal.classList.remove('hidden');
        formSuccessModal.classList.add('flex');
      }

      // Backup lead to localStorage
      try {
        const existingLeads = JSON.parse(localStorage.getItem('tam_leads') || '[]');
        existingLeads.unshift({
          name,
          phone,
          email,
          service,
          budget,
          message,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('tam_leads', JSON.stringify(existingLeads));
      } catch (err) {
        // silent fail
      }

      // Open WhatsApp chat in background
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
