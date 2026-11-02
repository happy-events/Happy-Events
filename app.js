/**
 * Happy Events Surat — Master Web Application
 * All 19 Services, Full Canvas Particle Animation,
 * Interactive Budget Estimator, Modal System & WhatsApp Integration
 */

import { firebaseConfig, firebaseReady, cloudinaryLogoUrl } from './firebase-config.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js';
import { getFirestore, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js';

const PHONE_NUMBER = '918141463007';

/* ==========================================================================
   19 SERVICES COMPREHENSIVE DATA SPECIFICATION (WITH GENERATED IMAGES)
   ========================================================================== */
const SERVICES_DATA = [
  {
    id: 1,
    name: "Flower Decoration",
    nameGu: "ફ્લાવર ડેકોરેશન",
    category: "parties wedding",
    image: "./images/flower-decoration.jpg",
    desc: "Exquisite fresh flowers (Roses, Orchids, Lilies, Carnations) and luxury artificial floral setups for entrance arches, stage backdrops, dining centerpieces, and mandap elegance in Surat.",
    inclusions: [
      "Custom Entrance Floral Arch & Welcome Signage",
      "Stage Floral Backdrop with Fresh / High-Grade Imported Flowers",
      "Dining Table Floral Centerpieces & Pathway Standees",
      "Fragrant natural florals tailored to your colour palette"
    ]
  },
  {
    id: 2,
    name: "Balloon Decoration",
    nameGu: "બલૂન ડેકોરેશન",
    category: "parties",
    image: "./images/balloon-decoration.png",
    desc: "Modern organic balloon garlands, circular arch frames, pastel & chrome metallic finishes, custom balloon columns, and LED marquee lights for high-impact celebrations.",
    inclusions: [
      "Organic High-Grade Latex & Chrome Balloon Arch",
      "Metallic Ring / Circular Backdrop Frame",
      "Custom Neon / Acrylic Name Signage",
      "Color themes: Pastel, Rose Gold, Metallic, Jungle, Vintage"
    ]
  },
  {
    id: 3,
    name: "Surprise Party",
    nameGu: "સરપ્રાઈઝ પાર્ટી ડેકોરેશન",
    category: "parties",
    image: "./images/surprise-party.jpg",
    desc: "Secret room makeovers for home, hotel, or cafe with glowing neon signs, rose petal pathways, romantic candles, balloons, and personalized photo strings.",
    inclusions: [
      "Secret venue setup before the guest of honour arrives",
      "Rose petal entrance pathway & aromatic candles",
      "Glowing LED Neon Sign ('Happy Birthday', 'Marry Me', etc.)",
      "Helium / Ceiling Balloons with hanging couple photos"
    ]
  },
  {
    id: 4,
    name: "Selfie Point",
    nameGu: "સેલ્ફી પોઇન્ટ & ફોટો બૂથ",
    category: "family parties",
    image: "./images/selfie-point.jpg",
    desc: "Instagram-ready aesthetic photo corner with angel neon wings, floral frames, personalized neon names, vanity ring lights, and fun celebration props for all guests.",
    inclusions: [
      "Thematic Instagrammable Backdrop & Neon Angel Wings",
      "Custom Couple / Birthday Star Name Board",
      "Vanity Ring Light & Ambient Spotlights",
      "Quirky handheld celebration photo props"
    ]
  },
  {
    id: 5,
    name: "Engagement Decoration",
    nameGu: "સગાઈ ડેકોરેશન (રીંગ સેરેમની)",
    category: "wedding",
    image: "./images/engagement-decoration.jpg",
    desc: "Majestic engagement stage styling with luxury couple sofa, grand floral backdrop, crystal chandeliers, warm fairy lighting, and decorative ring tray setups.",
    inclusions: [
      "Royal Floral Ring Ceremony Stage Backdrop",
      "Designer Couple Sofa / Royal Seating",
      "Chandelier & Warm Ambient Fairy Light Rigging",
      "Artistic Ring Platter & Exchange Corner"
    ]
  },
  {
    id: 6,
    name: "Vana Rasam Decoration",
    nameGu: "વાણા રસમ ડેકોરેશન",
    category: "wedding",
    image: "./images/vana-rasam.jpg",
    desc: "Authentic Gujarati traditional Vana ritual setting with decorative Bajot, wooden Patla, traditional marigold drapes, brass urlis, auspicious torans, and puja corners.",
    inclusions: [
      "Decorated Bajot and wooden Patla for bride/groom",
      "Auspicious Marigold & Bandhani Drape Backdrop",
      "Traditional Brass Urlis with Rose Petals & Diyas",
      "Complete ritual puja seating setup"
    ]
  },
  {
    id: 7,
    name: "Couple Entry",
    nameGu: "કપલ એન્ટ્રી કોન્સેપ્ટ",
    category: "entries",
    image: "./images/couple-entry.jpg",
    desc: "Step into your reception like heaven on earth. Low-lying dry-ice fog clouds, rose petal cannons, cold-pyro fountains, and customized romantic background music sync.",
    inclusions: [
      "Heavy Dry-Ice Low Fog Clouds (Walking on Clouds)",
      "Flower Petal Gun Blasters & Confetti Showers",
      "Synchronized Cold Pyro Sparkler Fountains",
      "Romantic LED Pathway Pillars"
    ]
  },
  {
    id: 8,
    name: "Anniversary Decoration",
    nameGu: "એનિવર્સરી ડેકોરેશન",
    category: "parties",
    image: "./images/anniversary-decoration.jpg",
    desc: "Romantic 1st, 10th, 25th Silver or 50th Golden Jubilee setups with glowing heart arches, memory timeline photo walls, candlelight dining styling, and ambient music.",
    inclusions: [
      "Glowing Heart / Anniversary Arch Backdrop",
      "Memory Timeline Photo Wall from marriage to today",
      "Candlelight Dining Table / Cake Table Styling",
      "Golden / Silver Jubilee themed balloons & lights"
    ]
  },
  {
    id: 9,
    name: "Haldi Setup",
    nameGu: "હળદી સેરેમની સેટઅપ",
    category: "wedding",
    image: "./images/haldi-setup.jpg",
    desc: "Sunny yellow marigolds, giant brass urli filled with fresh rose petals, kaleeras, customized yellow drapes, quirky sunglass props, and cheerful photo backdrops.",
    inclusions: [
      "Large Decorative Brass Urli for Bride / Groom sitting",
      "Dense Yellow & Orange Marigold Floral Backdrop",
      "Quirky Haldi Photo Props (Chashma, Fun Quotes)",
      "Traditional Matkas, Kaleeras & Drapes"
    ]
  },
  {
    id: 10,
    name: "Mehndi Setup",
    nameGu: "મહેંદી ફંક્શન સેટઅપ",
    category: "wedding",
    image: "./images/mehndi-setup.jpg",
    desc: "Enchanting decorated jhula (swing) with marigold & bougainvillea vines, colorful Rajasthani umbrellas, cozy floor cushions, vibrant drapes, and dreamcatcher styling.",
    inclusions: [
      "Beautifully Decorated Bridal Swing (Jhula)",
      "Colorful Rajasthani Umbrellas & Boho Dreamcatchers",
      "Festive Floor Seating with Ethnic Cushions",
      "Photogenic Mehndi Corner for friends & family"
    ]
  },
  {
    id: 11,
    name: "Bride-Groom Entry",
    nameGu: "દુલ્હા-દુલ્હન ગ્રાન્ડ એન્ટ્રી",
    category: "entries",
    image: "./images/bride-groom-entry.jpg",
    desc: "Royal bridal entry under illuminated flower chadar (phoolon ki chadar), royal palkhi (palanquin), groom royal chariot, smoke blasts, and majestic dhol-tasha pathway.",
    inclusions: [
      "Illuminated Phoolon Ki Chadar (Floral Canopy) with Fairy Lights",
      "Royal Palkhi (Palanquin) Entry Option",
      "Handheld Colored Smoke Flares",
      "Royal entry props & coordinated entry choreography guidance"
    ]
  },
  {
    id: 12,
    name: "Kalpa Entry",
    nameGu: "કલ્પા એન્ટ્રી (કળશ/મંગળ પ્રવેશ)",
    category: "entries",
    image: "./images/kalpa-entry.jpg",
    desc: "Sacred Kalash and Kalpa ritual entry procession with beautifully decorated brass kalash, traditional lamps/diyas, rose petal shower, and auspicious Vedic floral carpet.",
    inclusions: [
      "Artistically Decorated Ceremonial Brass Kalash / Kalpa",
      "Auspicious Fresh Flower Petal Pathway",
      "Traditional Akhand Diya & Lighting Standees",
      "Sacred Vedic entry setup for spiritual sanctity"
    ]
  },
  {
    id: 13,
    name: "Varmala Decoration",
    nameGu: "વરમાળા સ્ટેજ & થીમ",
    category: "wedding",
    image: "./images/varmala-decoration.jpg",
    desc: "Unforgettable garland exchange setups featuring revolving stages, hydraulic blooming lotus, cascading flower drops, CO2 jet blasts, and cinematic romantic lighting.",
    inclusions: [
      "Grand Revolving Stage / Hydraulic Lotus mechanism",
      "Automatic Petal Rain Drop from above",
      "Dual CO2 Cold Jet Blasts on Varmala Moment",
      "Cinematic Follow-Spotlight & Ambient Lighting"
    ]
  },
  {
    id: 14,
    name: "Cold-pyro Entry",
    nameGu: "કોલ્ડ પાયરો એન્ટ્રી (સ્પાર્કલર્સ)",
    category: "entries",
    image: "./images/cold-pyro-entry.jpg",
    desc: "100% smokeless, non-hazardous cold fire sparkler fountains that ignite safely indoors or outdoors. Includes handheld pyro guns and synchronized stage waterfall sparklers.",
    inclusions: [
      "100% Safe, Non-Burn Cold Pyrotechnic Sparkler Fountains",
      "Synchronized electronic firing console",
      "Stage Waterfall Sparkler cascade option",
      "Handheld Cold-Pyro Guns for friends & family"
    ]
  },
  {
    id: 15,
    name: "Bed Decoration",
    nameGu: "બેડ ડેકોરેશન (સુહાગરાત / ફર્સ્ટ નાઇટ)",
    category: "family",
    image: "./images/bed-decoration.jpg",
    desc: "Exquisite honeymoon suite and wedding night bedroom styling with natural red roses, towel swans, aromatic candles, warm fairy light canopies, and petal pathways.",
    inclusions: [
      "Heart & Swan Motifs crafted with fresh red rose petals",
      "Aromatic Scented Candles & Tealights",
      "Warm Fairy Light Bed Canopy Styling",
      "Flower petal pathway leading from entrance to bed"
    ]
  },
  {
    id: 16,
    name: "Semant Decoration",
    nameGu: "સીમંત ડેકોરેશન (ખોળો ભરવો / શ્રીમંત)",
    category: "family",
    image: "./images/semant-decoration.jpg",
    desc: "Honoring motherhood with traditional Gujarati Shrimant decor. Features floral swing (jhula), pastel backdrops, customized Mom-to-Be photo frame, and blessing accessories.",
    inclusions: [
      "Delicately Styled Swing (Jhula) for Mother-to-Be",
      "Pastel Balloon & Floral Arch Backdrop",
      "'Mom to Be' & 'Welcome Baby' Custom Neon / Cutouts",
      "Auspicious coconut, thali & blessing corner setup"
    ]
  },
  {
    id: 17,
    name: "Birthday Decoration",
    nameGu: "બર્થડે ડેકોરેશન (૧લી થી ૫૦મી બર્થડે)",
    category: "parties",
    image: "./images/birthday-decoration.png",
    desc: "From 1st birthday theme wonderlands (Jungle, Boss Baby, Cocomelon, Unicorn, Space) to elegant milestone adult birthdays (18th, 25th, 50th) with LED numbers.",
    inclusions: [
      "Complete Theme Backdrop (Jungle, Boss Baby, Princess, etc.)",
      "LED Marquee Number Lights (1, 18, 25, 50, etc.)",
      "Tiered Cake Table Plinths & Cylinder Stands",
      "Welcome Standee & Balloon Clusters"
    ]
  },
  {
    id: 18,
    name: "Chhathi Decoration",
    nameGu: "છઠ્ઠી પૂજન ડેકોરેશન (૬ઠ્ઠા દિવસની વિધિ)",
    category: "family",
    image: "./images/chhathi-decoration.jpg",
    desc: "Sacred 6th day baby ceremony styling with beautifully decorated baby cradle (parnu / ghodiya), Vidhata pen-paper ritual table, fresh floral garlands, and traditional lamps.",
    inclusions: [
      "Special Decoration of the Newborn Cradle (Parnu / Ghodiya)",
      "Traditional Vidhata Ritual Desk with Pen, Paper & Diya",
      "Fresh Marigold & Jasmine Floral Garlands",
      "Divine, pure & peaceful ambience for family blessings"
    ]
  },
  {
    id: 19,
    name: "Ladwa Decoration",
    nameGu: "લાડવા ડેકોરેશન (લગ્ન રસમ)",
    category: "wedding",
    image: "./images/ladwa-decoration.jpg",
    desc: "Heartfelt Gujarati wedding ritual decoration for the Ladwa tradition. Features artistically garnished silver/brass sweet thalis, floral presentation baskets, and ethnic decor.",
    inclusions: [
      "Artistically Garnished Brass / Silver Ladwa Thalis",
      "Traditional Floral Presentation Baskets & Trays",
      "Auspicious Ritual Seating & Bajot Styling",
      "Ethnic embroidery cloths, bandhani fabrics & torans"
    ]
  }
];

/* ==========================================================================
   PARTICLES / CONFETTI CANVAS ANIMATION (OPTIMIZED 60FPS)
   ========================================================================== */
function initParticlesCanvas() {
  const canvas = document.getElementById('particlesCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const PARTICLE_COUNT = Math.min(45, Math.floor(width / 28));
  const particles = [];
  const colors = ['#ffd20a', '#f5ab00', '#ffffff', '#ffe58f', '#ff9f1c'];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.8 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 0.45,
      vy: -(Math.random() * 0.55 + 0.25),
      alpha: Math.random() * 0.6 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.008,
      shape: Math.random() > 0.55 ? 'circle' : 'star'
    });
  }

  let mouseX = -1000;
  let mouseY = -1000;
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;
      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.005;

      // Wrap around screen
      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      // Mouse gentle repel
      const dx = p.x - mouseX;
      const dy = p.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 80) {
        p.x += (dx / dist) * 1.5;
        p.y += (dy / dist) * 1.5;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0.1, Math.min(0.85, p.alpha));
      ctx.fillStyle = p.color;

      if (p.shape === 'star') {
        drawStar(p.x, p.y, 4, p.radius * 2, p.radius);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   NAVIGATION, STICKY & MOBILE MENU
   ========================================================================== */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
      backToTop?.classList.add('visible');
    } else {
      navbar?.classList.remove('scrolled');
      backToTop?.classList.remove('visible');
    }
  });

  menuToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('open');
  });

  navMenu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  });

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Set current year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ==========================================================================
   SCROLL REVEAL OBSERVER & ANIMATED NUMBER COUNTERS
   ========================================================================== */
function initScrollObserver() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  const counters = document.querySelectorAll('.counter');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;
    counters.forEach((counter) => {
      const target = +counter.getAttribute('data-target');
      let current = 0;
      const step = Math.max(1, Math.floor(target / 40));
      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(interval);
        } else {
          counter.textContent = current;
        }
      }, 35);
    });
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('stat-box') || entry.target.closest('.stats-section')) {
              animateCounters();
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
  } else {
    elements.forEach((el) => el.classList.add('visible'));
    animateCounters();
  }
}

/* ==========================================================================
   SERVICE SEARCH & CATEGORY FILTERING
   ========================================================================== */
function initServiceFilters() {
  const searchInput = document.getElementById('serviceSearch');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.service-card');

  function applyFilter() {
    const activeBtn = document.querySelector('.filter-btn.active');
    const filterValue = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    cards.forEach((card) => {
      const category = card.getAttribute('data-category') || '';
      const name = (card.getAttribute('data-name') || '').toLowerCase();

      const matchesFilter = filterValue === 'all' || category.includes(filterValue);
      const matchesSearch = !query || name.includes(query);

      if (matchesFilter && matchesSearch) {
        card.style.display = 'flex';
        card.style.opacity = '1';
      } else {
        card.style.display = 'none';
        card.style.opacity = '0';
      }
    });
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter();
    });
  });

  searchInput?.addEventListener('input', applyFilter);
}

/* ==========================================================================
   SERVICE DETAILS MODAL POPUP
   ========================================================================== */
function initServiceModal() {
  const modal = document.getElementById('serviceModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const doneBtn = document.getElementById('modalDoneBtn');
  const modalHeroImg = document.getElementById('modalHeroImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalTitleGu = document.getElementById('modalTitleGu');
  const modalDesc = document.getElementById('modalDesc');
  const modalInclusions = document.getElementById('modalInclusions');
  const modalWaBtn = document.getElementById('modalWaBtn');

  function openModal(serviceIdx) {
    const s = SERVICES_DATA[serviceIdx];
    if (!s) return;

    modalHeroImg.src = s.image;
    modalTitle.textContent = s.name;
    modalTitleGu.textContent = s.nameGu;
    modalDesc.textContent = s.desc;

    modalInclusions.innerHTML = '';
    s.inclusions.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      modalInclusions.appendChild(li);
    });

    const msg = encodeURIComponent(`Hello Happy Events, I am interested in ${s.name} (${s.nameGu}) in Surat. Please share package details and available dates.`);
    modalWaBtn.href = `https://wa.me/${PHONE_NUMBER}?text=${msg}`;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.btn-service-details').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const idx = e.currentTarget.getAttribute('data-service-idx');
      openModal(parseInt(idx, 10));
    });
  });

  closeBtn?.addEventListener('click', closeModal);
  doneBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

/* ==========================================================================
   INTERACTIVE BUDGET ESTIMATOR & QUOTE CALCULATOR
   ========================================================================== */
function initCalculator() {
  const eventChips = document.querySelectorAll('#calcEventType .calc-chip');
  const venueChips = document.querySelectorAll('#calcVenueType .calc-chip');
  const serviceCheckboxes = document.querySelectorAll('#calcServicesList input[type="checkbox"]');
  const priceDisplay = document.getElementById('calcPriceDisplay');
  const btnShare = document.getElementById('btnShareEstimate');

  let currentMultiplier = 1.0;
  let currentVenueCost = 0;
  let currentEventName = "Birthday / Party";
  let currentVenueName = "Home / Flat";

  function calculate() {
    let baseServicesTotal = 0;
    const selectedServices = [];

    serviceCheckboxes.forEach((cb) => {
      if (cb.checked) {
        baseServicesTotal += parseInt(cb.getAttribute('data-price') || '0', 10);
        selectedServices.push(cb.value);
      }
    });

    const total = Math.round(baseServicesTotal * currentMultiplier + currentVenueCost);
    const formatted = '₹ ' + total.toLocaleString('en-IN');
    if (priceDisplay) priceDisplay.textContent = formatted;

    return { total, formatted, selectedServices };
  }

  eventChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      eventChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      currentMultiplier = parseFloat(chip.getAttribute('data-multiplier') || '1.0');
      currentEventName = chip.textContent.trim();
      calculate();
    });
  });

  venueChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      venueChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      currentVenueCost = parseInt(chip.getAttribute('data-cost') || '0', 10);
      currentVenueName = chip.textContent.trim();
      calculate();
    });
  });

  serviceCheckboxes.forEach((cb) => {
    cb.addEventListener('change', calculate);
  });

  btnShare?.addEventListener('click', () => {
    const { formatted, selectedServices } = calculate();
    const serviceListText = selectedServices.length > 0 ? selectedServices.join(', ') : 'None selected';
    const text = `Hello Happy Events, I used your website price estimator for an event in Surat:%0A%0A` +
      `🎉 Event Type: ${encodeURIComponent(currentEventName)}%0A` +
      `📍 Venue: ${encodeURIComponent(currentVenueName)}%0A` +
      `✨ Selected Services: ${encodeURIComponent(serviceListText)}%0A` +
      `💰 Estimated Total: ${encodeURIComponent(formatted)}%0A%0A` +
      `Please let me know your availability and package customizations.`;

    window.open(`https://wa.me/${PHONE_NUMBER}?text=${text}`, '_blank');
  });

  calculate();
}

/* ==========================================================================
   GALLERY LIGHTBOX
   ========================================================================== */
function initGalleryLightbox() {
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxCloseBtn');

  document.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-img');
      const caption = item.getAttribute('data-caption') || '';
      if (!src) return;

      lightboxImg.src = src;
      lightboxCaption.textContent = caption;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

/* ==========================================================================
   FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    question?.addEventListener('click', () => {
      const wasActive = item.classList.contains('active');
      faqItems.forEach((i) => i.classList.remove('active'));
      if (!wasActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   BOOKING ENQUIRY FORM (WHATSAPP + FIREBASE)
   ========================================================================== */
function initBookingForm() {
  const form = document.getElementById('bookingEnquiryForm');
  const status = document.getElementById('enquiryStatus');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('custName')?.value.trim();
    const phone = document.getElementById('custPhone')?.value.trim();
    const service = document.getElementById('custService')?.value;
    const date = document.getElementById('custDate')?.value;
    const location = document.getElementById('custLocation')?.value.trim();
    const notes = document.getElementById('custNotes')?.value.trim();

    if (!name || !phone || !service || !date) {
      if (status) {
        status.style.color = '#ff6b6b';
        status.textContent = 'Please fill out all required fields.';
      }
      return;
    }

    if (status) {
      status.style.color = '#ffd20a';
      status.textContent = 'Opening WhatsApp...';
    }

    // Attempt to store in Firebase Firestore if configured
    if (firebaseReady) {
      try {
        const app = initializeApp(firebaseConfig, 'enquiry-app-' + Date.now());
        const db = getFirestore(app);
        await addDoc(collection(db, 'orders'), {
          customerName: name,
          phone: phone,
          service: service,
          eventDate: date,
          location: location || 'Surat',
          message: notes || '',
          status: 'new',
          createdAt: serverTimestamp()
        });
      } catch (err) {
        console.warn('Firebase store skipped:', err);
      }
    }

    // Build formatted WhatsApp message
    const waText = `Hello Happy Events, I would like to book a celebration in Surat:%0A%0A` +
      `👤 Name: ${encodeURIComponent(name)}%0A` +
      `📞 Phone: ${encodeURIComponent(phone)}%0A` +
      `🎉 Service: ${encodeURIComponent(service)}%0A` +
      `📅 Event Date: ${encodeURIComponent(date)}%0A` +
      (location ? `📍 Location: ${encodeURIComponent(location)}%0A` : '') +
      (notes ? `📝 Details: ${encodeURIComponent(notes)}%0A` : '') +
      `%0APlease share your quotation and photos.`;

    // Open WhatsApp
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${waText}`, '_blank');

    form.reset();
    if (status) {
      status.style.color = '#25d366';
      status.textContent = 'Thank you! We will connect with you on WhatsApp.';
    }
  });
}

/* ==========================================================================
   INITIALIZATION TRIGGER
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initParticlesCanvas();
  initNavigation();
  initScrollObserver();
  initServiceFilters();
  initServiceModal();
  initCalculator();
  initGalleryLightbox();
  initFaqAccordion();
  initBookingForm();
});
