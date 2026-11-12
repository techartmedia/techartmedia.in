/**
 * TechArtMedia - Modern Agency Website JavaScript
 * Interactive functionality: Pricing toggles, dynamic ROI estimator,
 * portfolio filtering, WhatsApp booking generator, mobile navigation & contact handling.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
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
    mobileDrawer.classList.remove('translate-x-full');
    mobileOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileDrawer.classList.add('translate-x-full');
    mobileOverlay.classList.add('hidden');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
  if (mobileMenuCloseBtn) mobileMenuCloseBtn.addEventListener('click', closeMobileMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Sticky Navbar Scroll Effect
  const navbar = document.getElementById('mainNavbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('bg-zinc-950/90', 'backdrop-blur-md', 'border-b', 'border-white/10', 'py-3.5');
      navbar.classList.remove('bg-transparent', 'py-5');
    } else {
      navbar.classList.remove('bg-zinc-950/90', 'backdrop-blur-md', 'border-b', 'border-white/10', 'py-3.5');
      navbar.classList.add('bg-transparent', 'py-5');
    }
  });

  // Billing Toggle (Monthly vs Quarterly - 10% Savings)
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
      // 10% discount on quarterly billing (shown per month equivalent)
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

  // Interactive Project Cost & Package Estimator
  const estServiceSelect = document.getElementById('estService');
  const estReelsRange = document.getElementById('estReels');
  const estReelsCount = document.getElementById('estReelsCount');
  const estAdsCheck = document.getElementById('estAds');
  const estWebCheck = document.getElementById('estWeb');
  const estTotalDisplay = document.getElementById('estTotalDisplay');
  const estWhatsAppBtn = document.getElementById('estWhatsAppBtn');

  function calculateEstimate() {
    let base = 0;
    let serviceName = "Custom Growth Plan";

    if (estServiceSelect) {
      const selectedVal = estServiceSelect.value;
      if (selectedVal === 'starter') {
        base = 15000;
        serviceName = "Starter Presence Plan";
      } else if (selectedVal === 'growth') {
        base = 25000;
        serviceName = "Growth & Enquiries Plan";
      } else if (selectedVal === 'premium') {
        base = 35000;
        serviceName = "Premium Growth Plan";
      } else if (selectedVal === 'custom') {
        base = 10000;
        serviceName = "Bespoke Digital Marketing";
      }
    }

    const reels = estReelsRange ? parseInt(estReelsRange.value, 10) : 3;
    if (estReelsCount) estReelsCount.textContent = reels;

    // Additional reels cost (₹1,500 per extra reel beyond base)
    const extraReels = Math.max(0, reels - 3);
    const reelsAddon = extraReels * 1500;

    // Paid Ads addon (Setup & Management)
    const adsAddon = (estAdsCheck && estAdsCheck.checked) ? 8000 : 0;

    // Web landing page or revamp addon
    const webAddon = (estWebCheck && estWebCheck.checked) ? 12000 : 0;

    const grandTotal = base + reelsAddon + adsAddon + webAddon;

    if (estTotalDisplay) {
      estTotalDisplay.textContent = '₹' + grandTotal.toLocaleString('en-IN');
    }

    if (estWhatsAppBtn) {
      const message = encodeURIComponent(
        `Hi Durvesh & TechArtMedia team! I generated an estimate on techartmedia.in for:\n` +
        `• Base Package: ${serviceName}\n` +
        `• Short-form Reels: ${reels} per month\n` +
        `• Meta/Google Ads Included: ${estAdsCheck && estAdsCheck.checked ? 'Yes' : 'No'}\n` +
        `• Website Development/Revamp: ${estWebCheck && estWebCheck.checked ? 'Yes' : 'No'}\n` +
        `• Estimated Monthly Investment: ₹${grandTotal.toLocaleString('en-IN')}\n\n` +
        `I would like to discuss this and get started!`
      );
      estWhatsAppBtn.href = `https://wa.me/918087084597?text=${message}`;
    }
  }

  if (estServiceSelect) estServiceSelect.addEventListener('change', calculateEstimate);
  if (estReelsRange) estReelsRange.addEventListener('input', calculateEstimate);
  if (estAdsCheck) estAdsCheck.addEventListener('change', calculateEstimate);
  if (estWebCheck) estWebCheck.addEventListener('change', calculateEstimate);

  // Initial estimate calculation
  calculateEstimate();

  // Portfolio Filter System
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-brand-orange', 'text-white');
        b.classList.add('bg-zinc-800/80', 'text-zinc-400');
      });
      btn.classList.add('bg-brand-orange', 'text-white');
      btn.classList.remove('bg-zinc-800/80', 'text-zinc-400');

      const filter = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.classList.remove('hidden');
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.transition = 'opacity 0.3s ease';
            item.style.opacity = '1';
          }, 50);
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // FAQ Accordion
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

        // Toggle current FAQ
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
      const service = document.getElementById('contactService')?.value || 'Digital Marketing';
      const budget = document.getElementById('contactBudget')?.value || 'Flexible';
      const message = document.getElementById('contactMessage')?.value.trim() || '';

      if (!name || !phone) {
        alert('Please provide your name and WhatsApp/contact number.');
        return;
      }

      // Format WhatsApp Message
      const waText = encodeURIComponent(
        `*New Inquiry via techartmedia.in Website*\n` +
        `👤 *Name:* ${name}\n` +
        `📞 *Phone/WhatsApp:* ${phone}\n` +
        `✉️ *Email:* ${email || 'N/A'}\n` +
        `🎯 *Service Interested:* ${service}\n` +
        `💰 *Budget Range:* ${budget}\n` +
        `📝 *Project Overview:*\n${message || 'No additional notes provided.'}`
      );

      // Open WhatsApp in new tab for direct agency conversation
      const waUrl = `https://wa.me/918087084597?text=${waText}`;

      // Show confirmation modal
      if (formSuccessModal) {
        formSuccessModal.classList.remove('hidden');
        formSuccessModal.classList.add('flex');
      }

      // Store lead in localStorage for immediate backup
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
        console.warn('Local storage not accessible for lead caching');
      }

      // Trigger WhatsApp window after slight moment
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 600);

      contactForm.reset();
    });
  }

  if (closeSuccessModalBtn && formSuccessModal) {
    closeSuccessModalBtn.addEventListener('click', () => {
      formSuccessModal.classList.add('hidden');
      formSuccessModal.classList.remove('flex');
    });
  }

  // Copy to clipboard helper for Phone & Email
  window.copyToClipboard = function(text, label) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`${label} copied to clipboard!`);
      });
    } else {
      showToast(`${label}: ${text}`);
    }
  };

  function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-8 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-700 text-white px-5 py-2.5 rounded-full shadow-2xl z-50 text-sm font-medium flex items-center space-x-2 animate-bounce';
    toast.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-500"></span><span>${msg}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 2800);
  }
});
