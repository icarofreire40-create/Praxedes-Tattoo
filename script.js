  // ======= CONFIG =======
  // Número do estúdio para os links de WhatsApp (formato: 55 + DDD + número, só dígitos)
  const WHATSAPP_NUMBER = '556284762039';

  // Fotos reais do portfólio — troque/adicione arquivos em /images e ajuste esta lista.
  // "style" precisa bater com os data-filter dos botões: realismo | lettering | tematico | oriental
  const PORTFOLIO_ITEMS = [
    { src: 'images/portfolio-01.jpg', style: 'realismo', label: 'Realismo · Olho e Águia' },
    { src: 'images/portfolio-07.jpg', style: 'realismo', label: 'Realismo · Rei e Lobo' },
    { src: 'images/portfolio-06.jpg', style: 'realismo', label: 'Realismo · Retratos' },
    { src: 'images/portfolio-02.jpg', style: 'lettering', label: 'Lettering · Pescoço' },
    { src: 'images/portfolio-03.jpg', style: 'tematico',  label: 'Temático · Palhaço' },
    { src: 'images/portfolio-04.jpg', style: 'tematico',  label: 'Temático · Manga Fechada' },
    { src: 'images/portfolio-08.jpg', style: 'tematico',  label: 'Temático · Peitoral' },
    { src: 'images/portfolio-05.jpg', style: 'oriental',  label: 'Oriental · Dragão' },
  ];

  // ======= HEADER SCROLL STATE =======
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });

  // ======= MOBILE MENU =======
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  burger.addEventListener('click', () => mobileMenu.classList.add('open'));
  mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

  // ======= PORTFOLIO GRID =======
  const grid = document.getElementById('portGrid');
  PORTFOLIO_ITEMS.forEach(it => {
    const div = document.createElement('div');
    div.className = 'port-item';
    div.dataset.style = it.style;
    div.innerHTML = `<img src="${it.src}" alt="${it.label}" loading="lazy"><span class="tag">${it.label}</span>`;
    div.addEventListener('click', () => openLightbox(it.src, it.label));
    grid.appendChild(div);
  });

  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.port-item').forEach(item => {
        item.style.display = (f === 'all' || item.dataset.style === f) ? 'flex' : 'none';
      });
    });
  });

  // ======= LIGHTBOX =======
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  function openLightbox(src, alt){
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('open');
  }
  function closeLightbox(){
    lightbox.classList.remove('open');
    lightboxImg.src = '';
  }
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  // ======= INSTAGRAM PREVIEW GRID (reaproveita as fotos do portfólio) =======
  const instaGrid = document.getElementById('instaGrid');
  if (instaGrid) {
    PORTFOLIO_ITEMS.slice(0, 6).forEach(it => {
      const a = document.createElement('a');
      a.className = 'insta-item';
      a.href = 'https://instagram.com/praxedestattoo_';
      a.target = '_blank';
      a.rel = 'noopener';
      a.innerHTML = `<img src="${it.src}" alt="${it.label}" loading="lazy">`;
      instaGrid.appendChild(a);
    });
  }

  // ======= TESTIMONIAL CAROUSEL =======
  const slides = document.querySelectorAll('.t-slide');
  const dotsWrap = document.getElementById('tDots');
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => showSlide(i));
    dotsWrap.appendChild(dot);
  });
  let current = 0;
  function showSlide(i){
    slides[current].classList.remove('active');
    dotsWrap.children[current].classList.remove('active');
    current = i;
    slides[current].classList.add('active');
    dotsWrap.children[current].classList.add('active');
  }
  setInterval(() => { showSlide((current + 1) % slides.length); }, 5500);

  // ======= ACCORDION (cuidados) =======
  document.querySelectorAll('.acc-item').forEach(item => {
    const head = item.querySelector('.acc-head');
    const body = item.querySelector('.acc-body');
    if (item.classList.contains('open')) body.style.maxHeight = body.scrollHeight + 'px';
    head.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.acc-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.acc-body').style.maxHeight = null;
      });
      if (!isOpen){
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // ======= ESTIMADOR DE ORÇAMENTO =======
  // Baseado nos preços reais do catálogo:
  //  - "Fechamento (30cm)"              -> R$ 899   (peça grande, estilo temático/lettering)
  //  - "Fechamento Externo ou Interno"  -> R$ 1.499 (manga fechada, estilo oriental/realismo)
  // Ajuste os valores abaixo (min/max) sempre que atualizar a tabela de preços real.
  const SIZE_PRICES = {
    pequena:    { min: 250,  max: 350  }, // até 10cm
    media:      { min: 500,  max: 700  }, // 10–20cm
    grande:     { min: 800,  max: 950  }, // 20–30cm — ancorado em "Fechamento (30cm)" R$899
    fechamento: { min: 1400, max: 1650 }, // manga/perna inteira — ancorado em R$1.499
  };
  const SIZE_LABELS = {
    pequena: 'peça pequena (até 10cm)',
    media: 'peça média (10–20cm)',
    grande: 'peça grande (20–30cm)',
    fechamento: 'fechamento (manga/perna inteira)',
  };
  // Multiplicador por estilo: lettering é mais rápido de executar; realismo e oriental
  // exigem mais tempo de sombreado/detalhe, então custam um pouco mais.
  const STYLE_MULTIPLIER = {
    lettering: 0.85,
    tematico: 1.0,
    realismo: 1.15,
    oriental: 1.15,
  };
  const STYLE_LABELS = {
    lettering: 'Lettering',
    tematico: 'Temático autoral',
    realismo: 'Realismo P&B',
    oriental: 'Oriental',
  };

  const estResultValue = document.getElementById('estResultValue');
  const estWhatsapp = document.getElementById('estWhatsapp');
  const sizeOptions = document.getElementById('sizeOptions');
  const styleOptions = document.getElementById('styleOptions');

  let selectedSize = 'pequena';
  let selectedStyle = 'lettering';

  function formatBRL(n){
    return 'R$ ' + Math.round(n).toLocaleString('pt-BR');
  }

  function updateEstimate(){
    const base = SIZE_PRICES[selectedSize];
    const mult = STYLE_MULTIPLIER[selectedStyle];
    const min = base.min * mult;
    const max = base.max * mult;
    estResultValue.textContent = `${formatBRL(min)} – ${formatBRL(max)}`;

    let msg = `Olá! Fiz uma simulação de orçamento no site da Praxedes Tattoo.\n\n`;
    msg += `*Tamanho:* ${SIZE_LABELS[selectedSize]}\n`;
    msg += `*Estilo:* ${STYLE_LABELS[selectedStyle]}\n`;
    msg += `*Estimativa:* ${formatBRL(min)} – ${formatBRL(max)}\n\n`;
    msg += `Gostaria de confirmar o valor exato e agendar uma consulta.`;
    estWhatsapp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }

  if (sizeOptions && styleOptions) {
    sizeOptions.querySelectorAll('.est-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        sizeOptions.querySelectorAll('.est-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        selectedSize = chip.dataset.value;
        updateEstimate();
      });
    });
    styleOptions.querySelectorAll('.est-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        styleOptions.querySelectorAll('.est-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        selectedStyle = chip.dataset.value;
        updateEstimate();
      });
    });
    updateEstimate();
  }

  // ======= FORMULÁRIO -> ENVIA PARA O WHATSAPP =======
  // Monta uma mensagem a partir dos campos preenchidos e abre o WhatsApp
  // já com o texto pronto para o cliente só confirmar o envio.
  document.getElementById('bookingForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = this.nome.value.trim();
    const tel = this.tel.value.trim();
    const estilo = this.estilo.value;
    const regiao = this.regiao.value.trim();
    const ideia = this.ideia.value.trim();

    let msg = `Olá! Gostaria de agendar uma sessão na Praxedes Tattoo.\n\n`;
    msg += `*Nome:* ${nome}\n`;
    msg += `*Meu WhatsApp:* ${tel}\n`;
    msg += `*Estilo desejado:* ${estilo}\n`;
    if (regiao) msg += `*Região do corpo:* ${regiao}\n`;
    if (ideia) msg += `*Ideia:* ${ideia}\n`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

    const btn = this.querySelector('.submit-btn');
    btn.textContent = 'Abrindo WhatsApp…';
    window.open(url, '_blank', 'noopener');
    setTimeout(() => { btn.textContent = 'Enviar pelo WhatsApp'; }, 2000);
  });
