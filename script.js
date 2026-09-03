document.addEventListener('DOMContentLoaded', () => {
  const progressBar = document.querySelector('.reading-progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      progressBar.style.width = scrolled + '%';
    });
  }

  const themeBtn = document.querySelector('.btn-theme-salon');
  const savedTheme = localStorage.getItem('tableandplate_theme');
  if (savedTheme === 'light') {
    document.body.classList.add('theme-salon-light');
    if (themeBtn) themeBtn.textContent = 'Salon Dark';
  }
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('theme-salon-light');
      themeBtn.textContent = isLight ? 'Salon Dark' : 'Salon Light';
      localStorage.setItem('tableandplate_theme', isLight ? 'light' : 'dark');
    });
  }

  const mobileToggle = document.querySelector('.mobile-toggle-plate');
  const navMenu = document.querySelector('.plate-nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.style.display === 'flex';
      navMenu.style.display = isOpen ? 'none' : 'flex';
      if (!isOpen) {
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.background = 'var(--bg-plate-surface)';
        navMenu.style.padding = '1.75rem';
        navMenu.style.boxShadow = 'var(--shadow-plate)';
        navMenu.style.borderBottom = '1px solid var(--border-plate)';
      }
    });
  }

  /* ==========================================================================
     1. TABLE SCENOGRAPHY WORKBENCH ENGINE
  ========================================================================== */
  let currentScenography = 'michelin';
  let currentGlaze = 'celadon';
  let currentScale = 'private';

  const scenographyCards = document.querySelectorAll('.wb-scenography-card');
  const glazeBtns = document.querySelectorAll('#glaze-pills .wb-pill-btn');
  const scaleBtns = document.querySelectorAll('#scale-pills .wb-pill-btn');

  const gDensityNum = document.getElementById('gauge-density-num');
  const gDensityBadge = document.getElementById('gauge-density-badge');
  const gDensityBar = document.getElementById('gauge-density-bar');
  const gDensityNote = document.getElementById('gauge-density-note');

  const gShockNum = document.getElementById('gauge-shock-num');
  const gShockBadge = document.getElementById('gauge-shock-badge');
  const gShockNote = document.getElementById('gauge-shock-note');
  const barPlatter = document.getElementById('bar-platter-val');
  const barDinner = document.getElementById('bar-dinner-val');
  const barCoupe = document.getElementById('bar-coupe-val');

  const gHarmonyNum = document.getElementById('gauge-harmony-num');
  const gHarmonyBadge = document.getElementById('gauge-harmony-badge');
  const gHarmonyBar = document.getElementById('gauge-harmony-bar');
  const gHarmonyNote = document.getElementById('gauge-harmony-note');

  const tFiring = document.getElementById('telem-firing');
  const tAcoustic = document.getElementById('telem-acoustic');
  const tCutlery = document.getElementById('telem-cutlery');
  const tPorosity = document.getElementById('telem-porosity');

  function updatePlateWorkbench() {
    if (!gDensityNum) return;

    let densityVal = 2.48;
    let densityBadge = 'Zero Porosity';
    let densityNote = 'Mullite Needle Crystallization: 99.8%';

    let shockNum = '220';
    let shockBadge = 'Thermal Shock Class A';
    let shockNote = 'Dishwasher & Salamander Safe';
    let bPlatter = '240Â°C Î”T';
    let bDinner = '220Â°C Î”T';
    let bCoupe = '200Â°C Î”T';

    let harmonyVal = 98.6;
    let harmonyBadge = 'Michelin Harmony';
    let harmonyNote = 'Negative Space Ratio: 62% Frame';

    let firing = '1,280Â°C High-Fire Kiln';
    let acoustic = 'Clear Crystal C# Tone';
    let cutlery = 'Forged 18/10 Matte Gold';
    let porosity = '< 0.05% Vitrified';

    if (currentScenography === 'minimalist') {
      densityVal = 2.45;
      densityBadge = 'Matte Vitrified';
      densityNote = 'Basalt Micro-Texture Grip';
      shockNum = '200';
      shockBadge = 'Thermal Safe';
      shockNote = 'Even Surface Heat Radiation';
      bPlatter = '210Â°C Î”T';
      bDinner = '200Â°C Î”T';
      bCoupe = '190Â°C Î”T';
      harmonyVal = 95.4;
      harmonyBadge = 'Minimal Pure';
      harmonyNote = 'Monochromatic Contrast: 98%';
      cutlery = 'Brushed Matte Black PVD';
      acoustic = 'Deep Resonant F Tone';
    } else if (currentScenography === 'rustic') {
      densityVal = 2.32;
      densityBadge = 'Stoneware Dense';
      densityNote = 'Iron-Speckled Clay Body';
      shockNum = '180';
      shockBadge = 'Handcrafted';
      shockNote = 'Warm Thermal Retention';
      bPlatter = '190Â°C Î”T';
      bDinner = '180Â°C Î”T';
      bCoupe = '170Â°C Î”T';
      harmonyVal = 93.8;
      harmonyBadge = 'Wabi-Sabi Organic';
      harmonyNote = 'Tactile Raw Rim Contrast';
      firing = '1,220Â°C Wood-Fired Kiln';
      cutlery = 'Vintage Stonewashed Pewter';
      acoustic = 'Earthen Baritone Ring';
    } else if (currentScenography === 'banquet') {
      densityVal = 2.52;
      densityBadge = 'Bone China Translucent';
      densityNote = 'Tricalcium Phosphate Vitrification';
      shockNum = '240';
      shockBadge = 'Gala Resilience';
      shockNote = 'Chip-Resistant Rolled Rim';
      bPlatter = '260Â°C Î”T';
      bDinner = '240Â°C Î”T';
      bCoupe = '220Â°C Î”T';
      harmonyVal = 99.2;
      harmonyBadge = 'Grand Salon';
      harmonyNote = '24k Gold Filigree Symmetry';
      firing = '1,300Â°C Gas Reduction Kiln';
      cutlery = 'Mirror-Polished 18/10 Silver';
      acoustic = 'High Bell-Soprano Tone';
      porosity = '0.01% Impervious';
    }

    if (currentGlaze === 'tenmoku') {
      densityNote = 'Iron Crystal Micro-Nucleation';
      densityBadge = 'Tenmoku Oil-Spot';
    } else if (currentGlaze === 'bone-china') {
      densityVal = 2.55;
      densityBadge = 'Translucent China';
      firing = '1,300Â°C Bone Ash High-Fire';
    }

    if (currentScale === 'grand') {
      harmonyVal = Math.min(99.9, harmonyVal + 0.8);
      harmonyBadge = 'Grand State Service';
    }

    gDensityNum.innerHTML = densityVal.toFixed(2);
    gDensityBadge.innerHTML = densityBadge;
    gDensityBar.style.width = ((densityVal / 2.6) * 100) + '%';
    gDensityNote.innerHTML = densityNote;

    gShockNum.innerHTML = shockNum;
    gShockBadge.innerHTML = shockBadge;
    gShockNote.innerHTML = shockNote;
    barPlatter.innerHTML = bPlatter;
    barDinner.innerHTML = bDinner;
    barCoupe.innerHTML = bCoupe;

    gHarmonyNum.innerHTML = harmonyVal.toFixed(1);
    gHarmonyBadge.innerHTML = harmonyBadge;
    gHarmonyBar.style.width = harmonyVal + '%';
    gHarmonyNote.innerHTML = harmonyNote;

    tFiring.innerHTML = firing;
    tAcoustic.innerHTML = acoustic;
    tCutlery.innerHTML = cutlery;
    tPorosity.innerHTML = porosity;
  }

  scenographyCards.forEach(card => {
    card.addEventListener('click', () => {
      scenographyCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      currentScenography = card.getAttribute('data-scene');
      updatePlateWorkbench();
    });
  });

  glazeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      glazeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentGlaze = btn.getAttribute('data-glaze');
      updatePlateWorkbench();
    });
  });

  scaleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      scaleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentScale = btn.getAttribute('data-scale');
      updatePlateWorkbench();
    });
  });

  updatePlateWorkbench();

  /* ==========================================================================
     2. 5-COURSE PLATING & GEOMETRY DIAGNOSTIC ENGINE
  ========================================================================== */
  const courseData = {
    "1": {
      tag: "Course 01: Amuse-Bouche",
      title: "Pedestal Coupe & Concentric Micro-Plating",
      desc: "An elevated ceramic pedestal coupe creates an architectural stage for single-bite culinary creations. The narrow 8cm focal dish directs visual gaze directly to texture and color without spatial dilution.",
      diameter: "8 cm Well â€¢ 14 cm Footprint",
      geometry: "Concave Pedestal Coupe",
      ratio: "80% Negative Framing Space",
      temp: "Chilled Porcelain (4Â°C Retained)",
      vessel: "Translucent Celadon Coupe",
      acoustics: "Dull Muffled Tap",
      cutlery: "Miniature Tasting Spoon (PVD Gold)",
      cue: "<strong>Gastronomy Scenography Cue:</strong> Center the amuse-bouche with vertical architectural height to create an immediate sculptural statement as guests take their seats."
    },
    "2": {
      tag: "Course 02: First Course",
      title: "Wide-Rimmed Deep Well Plate & Emulsion Pour",
      desc: "A wide 28cm flat brim surrounds a steep 12cm central well, framing delicate veloutÃ©s, tartares, or chilled broths. The wide rim allows tableside service pourings without spilling onto pristine tablecloth linens.",
      diameter: "12 cm Well â€¢ 28 cm Outer Brim",
      geometry: "Steep-Walled Rimmed Basin",
      ratio: "65% Negative Framing Space",
      temp: "Heated Thermal Core (55Â°C)",
      vessel: "Basalt Black Matte Stoneware",
      acoustics: "Bell-Tone Harmonic Ring",
      cutlery: "Forged 18/10 Fish Knife & Fork",
      cue: "<strong>Gastronomy Scenography Cue:</strong> Keep the wide porcelain rim immaculate; all herb oils and micro-greens must stay strictly within the central well basin."
    },
    "3": {
      tag: "Course 03: Main Course",
      title: "Flat Coupe Charger & Asymmetrical Geometry",
      desc: "A completely flat, rimless 30cm coupe plate offers a limitless culinary canvas. Chefs execute dynamic asymmetrical compositions, balancing roasted proteins with negative canvas arcs and concentric sauce reductions.",
      diameter: "30 cm Flat Coupe Canvas",
      geometry: "Rimless Zero-Lip Disc",
      ratio: "50% Balanced Canvas Space",
      temp: "Hot-Plate Salamander Retained (65Â°C)",
      vessel: "High-Fire White Feldspar Porcelain",
      acoustics: "Clear Crystal Resonant Tone",
      cutlery: "Ergonomic Forged Steak Knife",
      cue: "<strong>Gastronomy Scenography Cue:</strong> Use the rule of thirds; offset the primary protein toward the 4 o'clock quadrant and sweep reductions across the upper left arc."
    },
    "4": {
      tag: "Course 04: Pre-Dessert Palette",
      title: "Double-Walled Chilled Porcelain Bowl",
      desc: "Engineered with an internal thermal vacuum chamber, this double-walled vessel insulates sub-zero granitas and citrus sorbets from ambient room heat and warm hands during service.",
      diameter: "10 cm Insulated Chamber",
      geometry: "Spherical Thermal Vessel",
      ratio: "70% Negative Framing Space",
      temp: "Sub-Zero Chilled (-10Â°C Retention)",
      vessel: "Satin-Glazed Alabaster Ceramic",
      acoustics: "Muffled Double-Wall Thud",
      cutlery: "Chilled Silver Sorbet Shovel",
      cue: "<strong>Gastronomy Scenography Cue:</strong> The cold ceramic vessel cleanses the palate while condensation-free outer walls preserve table linen crispness."
    },
    "5": {
      tag: "Course 05: Grand Finale",
      title: "Tiered Platter & Petit Four Scenography",
      desc: "An architectural two-tiered porcelain stand featuring hand-turned brass pillars displays artisanal confectionery, single-origin chocolates, and fruit tarts, concluding the gastronomic journey with theatrical elegance.",
      diameter: "22 cm Lower / 15 cm Upper Tier",
      geometry: "Vertical Tiered Showcase",
      ratio: "40% Dense Luxurious Display",
      temp: "Ambient Room Temperature",
      vessel: "24k Gold Inlaid Bone China",
      acoustics: "Chiming Brass & Porcelain Harmony",
      cutlery: "Filigree Sugar Tongs & Dessert Fork",
      cue: "<strong>Gastronomy Scenography Cue:</strong> Verticality at the conclusion of a banquet creates a grand visual crescendo, inviting celebratory conversation."
    }
  };

  const courseStepBtns = document.querySelectorAll('.course-step-btn');
  const dTag = document.getElementById('course-display-tag');
  const dTitle = document.getElementById('course-display-title');
  const dDesc = document.getElementById('course-display-desc');
  const dDiam = document.getElementById('course-diam-val');
  const dGeom = document.getElementById('course-geom-val');
  const dRatio = document.getElementById('course-ratio-val');
  const dTemp = document.getElementById('course-temp-val');
  const dVessel = document.getElementById('course-vessel-val');
  const dAcous = document.getElementById('course-acous-val');
  const dCutlery = document.getElementById('course-cutlery-val');
  const dCue = document.getElementById('course-culinary-text');

  if (courseStepBtns.length > 0) {
    courseStepBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        courseStepBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const courseKey = btn.getAttribute('data-course');
        const data = courseData[courseKey];
        if (data && dTitle) {
          dTag.innerHTML = data.tag;
          dTitle.innerHTML = data.title;
          dDesc.innerHTML = data.desc;
          dDiam.innerHTML = data.diameter;
          dGeom.innerHTML = data.geometry;
          dRatio.innerHTML = data.ratio;
          dTemp.innerHTML = data.temp;
          dVessel.innerHTML = data.vessel;
          dAcous.innerHTML = data.acoustics;
          dCutlery.innerHTML = data.cutlery;
          dCue.innerHTML = data.cue;
        }
      });
    });
  }

  /* ==========================================================================
     3. FAQ & BLOG SEARCH
  ========================================================================== */
  const faqBtns = document.querySelectorAll('.faq-plate-btn');
  if (faqBtns.length > 0) {
    faqBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-plate-item').forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    });
  }

  const searchInput = document.getElementById('plate-search-input');
  const blogCards = document.querySelectorAll('.blog-plate-card');
  if (searchInput && blogCards.length > 0) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      blogCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = (q === '' || text.includes(q)) ? 'flex' : 'none';
      });
    });
  }
});