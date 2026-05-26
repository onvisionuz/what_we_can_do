const CASES = (globalThis.CV_CASES || []).map((item) => ({
  ...item,
  visual: visualByCaseId(item.id),
  sectors: item.industry.split("/").map((part) => part.trim()).filter(Boolean),
}));
const CASE_MEDIA = globalThis.CASE_MEDIA || {};

const state = {
  search: "",
  industry: "",
  complexity: "",
  roi: "",
};

const grid = document.querySelector("#case-grid");
const resultCount = document.querySelector("#result-count");
const searchInput = document.querySelector("#search-input");
const industryFilter = document.querySelector("#industry-filter");
const complexityFilter = document.querySelector("#complexity-filter");
const roiFilter = document.querySelector("#roi-filter");
const dialog = document.querySelector("#case-dialog");
const dialogClose = document.querySelector(".dialog-close");
const mediaTrack = document.querySelector("#media-track");
const mediaCaption = document.querySelector("#media-caption");
const sliderDots = document.querySelector("#slider-dots");
const slidePrev = document.querySelector("#slide-prev");
const slideNext = document.querySelector("#slide-next");
let dialogCase = null;
let activeMediaIndex = 0;
let activeMediaRatio = 16 / 10;

const paletteByVisual = {
  anomaly: ["#17332d", "#0c7c70", "#f05a48"],
  pcb: ["#12312e", "#16a085", "#f6c85f"],
  pharma: ["#24323d", "#4b9bd1", "#f05a48"],
  battery: ["#232c2b", "#7fb069", "#e6a23c"],
  waste: ["#26311f", "#5a9f4a", "#f0b83c"],
  food: ["#2e2c1d", "#8fbf50", "#d9573b"],
  ppe: ["#25302d", "#f2b63d", "#0f7c73"],
  fire: ["#2f211f", "#e05a3d", "#f5b342"],
  weapon: ["#221f24", "#e05a3d", "#56a0c8"],
  perimeter: ["#182b2e", "#1aa896", "#f2b63d"],
  reid: ["#202b2f", "#56a0c8", "#86c45a"],
  crowd: ["#272637", "#56a0c8", "#e05a3d"],
  fallCare: ["#25302f", "#7aa7d9", "#f05a48"],
  workplace: ["#2b3028", "#f2b63d", "#e05a3d"],
  anpr: ["#1f2a2c", "#56a0c8", "#f2b63d"],
  road: ["#252b28", "#7fb069", "#e05a3d"],
  driver: ["#222b31", "#56a0c8", "#f05a48"],
  shelf: ["#2d281f", "#d7952a", "#0c7c70"],
  footfall: ["#222d2a", "#0c7c70", "#e05a3d"],
  checkout: ["#2c271f", "#d7952a", "#56a0c8"],
  visualSearch: ["#222d31", "#56a0c8", "#d7952a"],
  queue: ["#282b2e", "#56a0c8", "#f2b63d"],
  plant: ["#20331f", "#69a64f", "#e05a3d"],
  weed: ["#22351f", "#72b64f", "#f2b63d"],
  yield: ["#2d321d", "#c99a2e", "#69a64f"],
  livestock: ["#283126", "#8fbf50", "#56a0c8"],
  radiology: ["#202933", "#7aa7d9", "#f2b63d"],
  dermatology: ["#342725", "#e29f7a", "#e05a3d"],
  pathology: ["#30253a", "#b96bd6", "#e05a3d"],
  surgery: ["#1e3431", "#18a999", "#f2b63d"],
  container: ["#2b2f30", "#e05a3d", "#56a0c8"],
  warehouse: ["#302d24", "#d7952a", "#0c7c70"],
  robot: ["#262b31", "#56a0c8", "#f2b63d"],
  construction: ["#302a23", "#f2b63d", "#e05a3d"],
  heavy: ["#302a23", "#d7952a", "#56a0c8"],
  droneEnergy: ["#1f3131", "#18a999", "#f2b63d"],
  thermalSolar: ["#1d2933", "#7aa7d9", "#e05a3d"],
  vehicleDamage: ["#252b2f", "#56a0c8", "#e05a3d"],
  kyc: ["#262c32", "#7aa7d9", "#f2b63d"],
  sports: ["#1f3327", "#69a64f", "#f2b63d"],
  ar: ["#252a32", "#56a0c8", "#e29f7a"],
  wildlife: ["#24321f", "#8fbf50", "#f2b63d"],
  ocr: ["#282d31", "#56a0c8", "#18a999"],
  docVlm: ["#2b2d31", "#7aa7d9", "#f2b63d"],
  agentInspection: ["#202f2d", "#18a999", "#e05a3d"],
  actionRecognition: ["#282d2a", "#f2b63d", "#18a999"],
  guiAgent: ["#252b31", "#56a0c8", "#e29f7a"],
};

const demoLabelByVisual = {
  anomaly: "defect map",
  pcb: "micro defect",
  pharma: "pack check",
  battery: "weld scan",
  waste: "material sort",
  food: "quality grade",
  ppe: "PPE control",
  fire: "smoke alert",
  weapon: "threat alert",
  perimeter: "zone breach",
  reid: "multi-cam ID",
  crowd: "density map",
  fallCare: "fall event",
  workplace: "risk zone",
  anpr: "plate OCR",
  road: "road defect",
  driver: "driver state",
  shelf: "planogram",
  footfall: "heatmap",
  checkout: "item taken",
  visualSearch: "similar items",
  queue: "wait time",
  plant: "leaf disease",
  weed: "spray target",
  yield: "yield count",
  livestock: "health track",
  radiology: "triage score",
  dermatology: "skin lesion",
  pathology: "cell region",
  surgery: "phase detect",
  container: "damage area",
  warehouse: "pallet count",
  robot: "grasp point",
  construction: "BIM compare",
  heavy: "idle time",
  droneEnergy: "drone inspect",
  thermalSolar: "hotspot",
  vehicleDamage: "damage cost",
  kyc: "ID verify",
  sports: "player track",
  ar: "AR fitting",
  wildlife: "species ID",
  ocr: "field extract",
  docVlm: "VLM answer",
  agentInspection: "agent review",
  actionRecognition: "action score",
  guiAgent: "task agent",
};

function visualByCaseId(id) {
  return {
    1: "anomaly",
    2: "pcb",
    3: "pharma",
    4: "battery",
    5: "waste",
    6: "food",
    7: "ppe",
    8: "fire",
    9: "weapon",
    10: "perimeter",
    11: "reid",
    12: "crowd",
    13: "fallCare",
    14: "workplace",
    15: "anpr",
    16: "road",
    17: "driver",
    18: "shelf",
    19: "footfall",
    20: "checkout",
    21: "visualSearch",
    22: "queue",
    23: "plant",
    24: "weed",
    25: "yield",
    26: "livestock",
    27: "radiology",
    28: "dermatology",
    29: "pathology",
    30: "surgery",
    31: "container",
    32: "warehouse",
    33: "robot",
    34: "construction",
    35: "heavy",
    36: "droneEnergy",
    37: "thermalSolar",
    38: "vehicleDamage",
    39: "kyc",
    40: "sports",
    41: "ar",
    42: "wildlife",
    43: "ocr",
    44: "docVlm",
    45: "agentInspection",
    46: "actionRecognition",
    47: "guiAgent",
  }[id] || "anomaly";
}

function initFilters() {
  const sectors = [...new Set(CASES.flatMap((item) => item.sectors))]
    .sort((a, b) => a.localeCompare(b, "ru"));
  const complexities = [...new Set(CASES.map((item) => item.complexity))]
    .sort((a, b) => ["Начальный", "Средний", "Продвинутый", "Эксперт"].indexOf(a) - ["Начальный", "Средний", "Продвинутый", "Эксперт"].indexOf(b));

  industryFilter.insertAdjacentHTML(
    "beforeend",
    sectors.map((sector) => `<option value="${escapeHtml(sector)}">${escapeHtml(sector)}</option>`).join("")
  );
  complexityFilter.insertAdjacentHTML(
    "beforeend",
    complexities.map((complexity) => `<option value="${escapeHtml(complexity)}">${escapeHtml(complexity)}</option>`).join("")
  );
}

function bindFilters() {
  searchInput.addEventListener("input", () => {
    state.search = searchInput.value.trim().toLowerCase();
    renderCases();
  });
  industryFilter.addEventListener("change", () => {
    state.industry = industryFilter.value;
    renderCases();
  });
  complexityFilter.addEventListener("change", () => {
    state.complexity = complexityFilter.value;
    renderCases();
  });
  roiFilter.addEventListener("change", () => {
    state.roi = roiFilter.value;
    renderCases();
  });
}

function filterCases() {
  return CASES.filter((item) => {
    const haystack = `${item.title} ${item.industry} ${item.description} ${item.links.join(" ")} ${item.datasets.join(" ")}`.toLowerCase();
    const matchesSearch = !state.search || haystack.includes(state.search);
    const matchesIndustry = !state.industry || item.sectors.includes(state.industry);
    const matchesComplexity = !state.complexity || item.complexity === state.complexity;
    const matchesRoi = !state.roi || item.roi >= Number(state.roi);
    return matchesSearch && matchesIndustry && matchesComplexity && matchesRoi;
  });
}

function renderCases() {
  const filtered = filterCases();
  resultCount.textContent = `${filtered.length} из ${CASES.length} кейсов`;

  if (!filtered.length) {
    grid.innerHTML = '<div class="empty-state">По этим фильтрам кейсы не найдены.</div>';
    return;
  }

  grid.innerHTML = filtered.map((item) => `
    <article class="case-card">
      <div class="demo-frame">
        <canvas class="demo-canvas" data-case-id="${item.id}" aria-label="Демо: ${escapeHtml(item.title)}"></canvas>
        <span class="demo-badge"><span class="live-dot" aria-hidden="true"></span>${escapeHtml(demoLabelByVisual[item.visual])}</span>
      </div>
      <div class="case-body">
        <div class="case-meta">
          <span class="pill">${escapeHtml(item.sectors[0] || item.industry)}</span>
          <span class="pill ${item.complexity === "Эксперт" ? "expert" : ""}">${escapeHtml(item.complexity)}</span>
          <span class="pill roi">ROI ${item.roi}/10</span>
        </div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.description)}</p>
        <button class="case-open" type="button" data-case-id="${item.id}">Смотреть кейс</button>
      </div>
    </article>
  `).join("");
}

grid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-case-id]");
  if (!button) return;
  const item = CASES.find((entry) => entry.id === Number(button.dataset.caseId));
  if (item) openCaseDialog(item);
});

dialogClose.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener("close", () => {
  dialogCase = null;
  mediaTrack.innerHTML = "";
});
slidePrev.addEventListener("click", () => setActiveSlide(activeMediaIndex - 1));
slideNext.addEventListener("click", () => setActiveSlide(activeMediaIndex + 1));
sliderDots.addEventListener("click", (event) => {
  const dot = event.target.closest("[data-slide-index]");
  if (!dot) return;
  setActiveSlide(Number(dot.dataset.slideIndex));
});

function openCaseDialog(item) {
  dialogCase = item;
  renderMediaSlider(item);
  document.querySelector("#dialog-industry").textContent = item.industry;
  document.querySelector("#dialog-title").textContent = item.title;
  document.querySelector("#dialog-description").textContent = item.description;
  document.querySelector("#dialog-complexity").textContent = item.complexity;
  document.querySelector("#dialog-roi").textContent = `${item.roi}/10`;
  document.querySelector("#dialog-points").innerHTML = buildImplementationPoints(item)
    .map((point) => `<li>${escapeHtml(point)}</li>`)
    .join("");
  document.querySelector("#dialog-tech").innerHTML = item.links.length
    ? item.links.map(linkToHtml).join(" · ")
    : "Подбирается под инфраструктуру клиента.";
  document.querySelector("#dialog-datasets").textContent = item.datasets.slice(0, 8).join(", ");

  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }
}

function renderMediaSlider(item) {
  const sources = CASE_MEDIA[item.id] || [];
  activeMediaIndex = 0;
  const slides = [
    `
      <div class="media-slide generated-slide" data-caption="Сгенерированное демо">
        <canvas id="dialog-generated-canvas" aria-label="Сгенерированное демо кейса"></canvas>
      </div>
    `,
    ...sources.map((source) => {
      if (source.youtubeId || source.type === "youtube") return youtubeSlide(source);
      if (source.type === "image" && source.src) return imageSlide(source);
      return sourceSlide(source);
    }),
  ];
  mediaTrack.innerHTML = slides.join("");
  sliderDots.innerHTML = slides
    .map((_, index) => `<button class="slider-dot" type="button" data-slide-index="${index}" aria-label="Слайд ${index + 1}"></button>`)
    .join("");
  mediaTrack.querySelectorAll("img").forEach((img) => {
    img.addEventListener("load", () => {
      const activeSlide = mediaTrack.querySelectorAll(".media-slide")[activeMediaIndex];
      if (activeSlide?.contains(img)) updateMediaAspect(activeSlide);
    });
  });
  slidePrev.hidden = slides.length < 2;
  slideNext.hidden = slides.length < 2;
  sliderDots.hidden = slides.length < 2;
  setActiveSlide(0);
}

function youtubeSlide(source) {
  const title = escapeHtml(source.title);
  const url = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(source.youtubeId)}`;
  return `
    <div class="media-slide" data-caption="${escapeHtml(source.kind)}">
      <iframe
        src="${url}"
        title="${title}"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
  `;
}

function imageSlide(source) {
  return `
    <div class="media-slide image-slide" data-caption="${escapeHtml(source.kind)}">
      <img src="${escapeHtml(source.src)}" alt="${escapeHtml(source.title)}" loading="lazy">
    </div>
  `;
}

function sourceSlide(source) {
  const url = source.sourceUrl || source.url || "#";
  return `
    <div class="media-slide source-slide" data-caption="${escapeHtml(source.kind)}">
      <div class="source-card">
        <p class="source-kind">${escapeHtml(source.kind)}</p>
        <h3>${escapeHtml(source.title)}</h3>
        <p>Откройте публичный пример с реальными кадрами, GIF, видео, датасетом или demo-страницей.</p>
        <a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">Открыть демо</a>
      </div>
    </div>
  `;
}

function setActiveSlide(index) {
  const slides = mediaTrack.querySelectorAll(".media-slide");
  if (!slides.length) return;
  activeMediaIndex = (index + slides.length) % slides.length;
  mediaTrack.style.transform = `translateX(${-activeMediaIndex * 100}%)`;
  sliderDots.querySelectorAll(".slider-dot").forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === activeMediaIndex);
  });
  mediaCaption.textContent = slides[activeMediaIndex].dataset.caption || "Демо-видео";
  updateMediaAspect(slides[activeMediaIndex]);
}

function updateMediaAspect(slide) {
  const panel = document.querySelector(".dialog-demo");
  const image = slide.querySelector("img");
  if (image?.naturalWidth && image?.naturalHeight) {
    activeMediaRatio = image.naturalWidth / image.naturalHeight;
  } else if (slide.querySelector("iframe")) {
    activeMediaRatio = 16 / 9;
  } else {
    activeMediaRatio = 16 / 10;
  }
  const panelWidth = Math.max(panel.clientWidth || 0, 360);
  const maxHeight = Math.max(340, Math.min(window.innerHeight - 72, 620));
  const minHeight = window.matchMedia("(max-width: 760px)").matches ? 300 : 360;
  const targetHeight = Math.round(Math.min(maxHeight, Math.max(minHeight, panelWidth / activeMediaRatio)));
  panel.style.setProperty("--media-height", `${targetHeight}px`);
}

window.addEventListener("resize", () => {
  if (!dialog.open) return;
  const slides = mediaTrack.querySelectorAll(".media-slide");
  if (slides[activeMediaIndex]) updateMediaAspect(slides[activeMediaIndex]);
});

function buildImplementationPoints(item) {
  const common = {
    anomaly: ["Подключаем камеры или фотоархивы линии контроля.", "Обучаем модель находить дефекты без ручной проверки каждого изделия.", "Выводим тревоги, карту дефекта и статистику брака."],
    pcb: ["Фиксируем микродефекты на платах, дорожках и компонентах.", "Строим пайплайн инспекции с высокой детализацией кадра.", "Передаем результат в систему качества или MES."],
    pharma: ["Проверяем наличие таблеток, блистеров, маркировки и повреждений.", "Отлавливаем пустоты, сколы, загрязнения и неверную упаковку.", "Формируем отчет для фармлинии и оператора смены."],
    battery: ["Инспектируем сварные швы, поверхность ячеек и электродные зоны.", "Находим визуальные дефекты до попадания партии в сборку.", "Собираем аналитику по линии и типам отклонений."],
    waste: ["Распознаем классы материалов на конвейере.", "Отправляем команды на сортировку или подсветку оператора.", "Считаем объемы фракций и качество отбора."],
    food: ["Оцениваем внешний вид, размер, цвет и дефекты продукции.", "Разделяем поток на классы качества.", "Снижаем ручную сортировку и возвраты."],
    ppe: ["Определяем каски, жилеты, перчатки и людей в кадре.", "Фиксируем нарушения в реальном времени.", "Отправляем уведомления ответственным за безопасность."],
    fire: ["Анализируем CCTV-потоки на ранние признаки дыма и огня.", "Фильтруем ложные срабатывания по зоне и динамике.", "Запускаем уведомления до критического развития события."],
    weapon: ["Выделяем опасные объекты в видеопотоке.", "Настраиваем зоны, сценарии тревоги и уровни уверенности.", "Интегрируем оповещения в систему охраны."],
    perimeter: ["Задаем запрещенные зоны и расписания доступа.", "Отслеживаем людей и транспорт в реальном времени.", "Фиксируем вторжения, остановки и подозрительное движение."],
    reid: ["Связываем события между несколькими камерами.", "Отслеживаем людей или транспорт без распознавания лиц.", "Строим маршруты движения и поиск по признакам."],
    crowd: ["Считаем плотность и поток людей в кадре.", "Выделяем перегруженные зоны и направления движения.", "Показываем тепловые карты для операционного управления."],
    fallCare: ["Определяем позу человека и резкое падение.", "Снижаем задержку реакции персонала.", "Формируем событие с кадром, временем и зоной."],
    workplace: ["Распознаем опасные действия и близость к оборудованию.", "Настраиваем правила для конкретных зон риска.", "Собираем статистику нарушений и простоев."],
    anpr: ["Считываем номерные знаки на въезде, парковке или дороге.", "Сопоставляем номер с базой доступа или платежей.", "Фиксируем события и снимки для истории."],
    road: ["Находим выбоины, трещины и повреждения покрытия.", "Работаем с камерами автомобилей, дронов или мобильных групп.", "Формируем карту дефектов и приоритет ремонта."],
    driver: ["Отслеживаем взгляд, голову, глаза и действия водителя.", "Распознаем усталость, отвлечение и телефон.", "Отправляем предупреждение водителю или диспетчеру."],
    shelf: ["Сравниваем полку с планограммой.", "Находим пустые места, неверную выкладку и out-of-stock.", "Даем отчет по SKU, магазину и периоду."],
    footfall: ["Считаем посетителей и маршруты движения.", "Строим тепловые карты зон интереса.", "Помогаем улучшить выкладку и расписание персонала."],
    checkout: ["Распознаем товары и действия покупателя.", "Связываем видеоаналитику с корзиной.", "Автоматизируем сценарии оплаты без кассира."],
    visualSearch: ["Индексируем каталог по визуальным признакам.", "Находим похожие товары по фотографии клиента.", "Подключаем поиск к сайту, приложению или CRM."],
    queue: ["Считаем людей в очереди и время ожидания.", "Показываем нагрузку по зонам обслуживания.", "Помогаем управлять персоналом в часы пик."],
    plant: ["Распознаем болезнь по фото листа.", "Выдаем вероятный диагноз и класс проблемы.", "Интегрируем модель в мобильное приложение или Telegram-бот."],
    weed: ["Отделяем сорняки от культур на поле.", "Формируем карту точечного опрыскивания.", "Снижаем расход химикатов и нагрузку на почву."],
    yield: ["Считаем плоды, колосья или коробочки с аэрофото.", "Привязываем результаты к участкам поля.", "Помогаем прогнозировать урожай до сбора."],
    livestock: ["Отслеживаем животных или рыбу по видео.", "Находим признаки болезни, роста и аномального поведения.", "Собираем динамику по группе и каждой зоне."],
    radiology: ["Приоритизируем исследования с подозрением на критические признаки.", "Подсвечиваем области интереса для врача.", "Интегрируемся с PACS/RIS и внутренними регламентами."],
    dermatology: ["Классифицируем поражения кожи по фото или дерматоскопии.", "Показываем вероятность классов и область анализа.", "Помогаем врачу быстрее сортировать обращения."],
    pathology: ["Анализируем большие изображения срезов по тайлам.", "Выделяем подозрительные клеточные области.", "Готовим рабочий процесс для патолога."],
    surgery: ["Распознаем фазу операции и инструменты.", "Строим таймлайн хирургического процесса.", "Помогаем анализировать качество и длительность этапов."],
    container: ["Находим повреждения контейнеров и грузов при приемке.", "Сравниваем состояние до и после перевозки.", "Формируем доказательную фотоисторию."],
    warehouse: ["Считаем паллеты, коробки и складские позиции.", "Работаем с фиксированными камерами, дронами или фотообходами.", "Передаем данные в WMS или отчет инвентаризации."],
    robot: ["Определяем предметы, ориентацию и точку захвата.", "Передаем координаты роботу-манипулятору.", "Повышаем стабильность комплектации товаров."],
    construction: ["Сравниваем фактический прогресс с BIM или планом.", "Находим отклонения, задержки и незавершенные зоны.", "Готовим визуальный отчет по объекту."],
    heavy: ["Отслеживаем тяжелую технику на объекте.", "Считаем рабочее время, простой и маршруты.", "Помогаем оптимизировать смены и загрузку."],
    droneEnergy: ["Анализируем съемку дронов по ветру, солнцу и ЛЭП.", "Находим дефекты, загрязнения и повреждения.", "Формируем карту инспекции и список работ."],
    thermalSolar: ["Обрабатываем ИК-съемку солнечных панелей.", "Находим горячие точки и неисправные ячейки.", "Приоритизируем ремонт по риску и потере мощности."],
    vehicleDamage: ["Определяем поврежденные зоны автомобиля по фото.", "Классифицируем тип и серьезность повреждений.", "Помогаем ускорить страховую или арендную оценку."],
    kyc: ["Распознаем документ и извлекаем ключевые поля.", "Проверяем признаки подделки и качество изображения.", "Встраиваем проверку в onboarding-процесс."],
    sports: ["Отслеживаем игроков, мяч и зоны поля.", "Строим события, траектории и тактические паттерны.", "Готовим данные для тренеров, медиа или трансляции."],
    ar: ["Определяем тело, объект или помещение через камеру.", "Накладываем одежду, мебель или 3D-объект.", "Подключаем сценарий к мобильному приложению."],
    wildlife: ["Распознаем виды, людей и события на фотоловушках.", "Фильтруем пустые кадры и повторные срабатывания.", "Помогаем мониторингу и защите территорий."],
    ocr: ["Извлекаем поля из счетов, чеков, договоров и форм.", "Сохраняем структуру документа и уверенность по полям.", "Передаем результат в учетные системы."],
    docVlm: ["Отвечаем на вопросы по сложным документам.", "Понимаем таблицы, графики, печати и многостраничную структуру.", "Готовим проверяемые ссылки на найденные фрагменты."],
    agentInspection: ["Комбинируем быстрый детектор и VLM-проверку.", "Разбираем неоднозначные визуальные случаи агентом.", "Передаем решение, объяснение и уровень уверенности."],
    actionRecognition: ["Распознаем действия работников и циклы операций.", "Считаем время этапов, простои и отклонения.", "Готовим аналитику производительности по зонам."],
    guiAgent: ["Распознаем элементы интерфейса на экране.", "Автоматизируем клики, ввод данных и проверки.", "Собираем историю действий для контроля качества."],
  };

  return common[item.visual] || [
    "Анализируем видео, фото или документы из текущего процесса.",
    "Обучаем модель под ваши объекты, правила и условия съемки.",
    "Интегрируем результат в рабочие системы и уведомления.",
  ];
}

function linkToHtml(source) {
  const clean = escapeHtml(source);
  if (/^(github\.com|arxiv\.org|developer\.apple\.com|anthropic\.com)/i.test(source)) {
    return `<a href="https://${clean}" target="_blank" rel="noreferrer">${clean}</a>`;
  }
  if (/^https?:\/\//i.test(source)) {
    return `<a href="${clean}" target="_blank" rel="noreferrer">${clean}</a>`;
  }
  return clean;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function drawHero(time) {
  const canvas = document.querySelector("#hero-canvas");
  const setup = setupCanvas(canvas);
  if (!setup) return;
  const { ctx, width, height } = setup;
  const t = time / 1000;

  const bg = ctx.createLinearGradient(0, 0, width, height);
  bg.addColorStop(0, "#111916");
  bg.addColorStop(0.52, "#21302a");
  bg.addColorStop(1, "#4c3424");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  drawGrid(ctx, width, height, "rgba(255,255,255,0.055)", 42);

  const tileW = Math.max(220, width * 0.22);
  const tileH = tileW * 0.62;
  const cases = [CASES[0], CASES[6], CASES[17], CASES[26], CASES[31], CASES[42]].filter(Boolean);
  cases.forEach((item, index) => {
    const col = index % 3;
    const row = Math.floor(index / 3);
    const x = width * 0.5 + col * (tileW * 0.48) + Math.sin(t * 0.4 + index) * 18;
    const y = 100 + row * (tileH * 0.9) + Math.cos(t * 0.36 + index) * 14;
    ctx.save();
    ctx.globalAlpha = 0.34 + index * 0.035;
    roundedRect(ctx, x, y, tileW, tileH, 8);
    ctx.clip();
    drawDemoScene(ctx, x, y, tileW, tileH, item, time, true);
    ctx.restore();
  });

  const scanX = width * (0.52 + Math.sin(t * 0.35) * 0.11);
  ctx.fillStyle = "rgba(24, 169, 153, 0.18)";
  ctx.fillRect(scanX, 0, 2, height);
}

function animate(time) {
  drawHero(time);

  document.querySelectorAll(".demo-canvas").forEach((canvas) => {
    const rect = canvas.getBoundingClientRect();
    if (rect.bottom < -80 || rect.top > window.innerHeight + 80) return;
    const item = CASES.find((entry) => entry.id === Number(canvas.dataset.caseId));
    if (!item) return;
    const setup = setupCanvas(canvas);
    if (!setup) return;
    drawDemoScene(setup.ctx, 0, 0, setup.width, setup.height, item, time, false);
  });

  if (dialog.open && dialogCase) {
    const dialogCanvas = document.querySelector("#dialog-generated-canvas");
    const setup = setupCanvas(dialogCanvas);
    if (setup) drawDemoScene(setup.ctx, 0, 0, setup.width, setup.height, dialogCase, time, true);
  }

  requestAnimationFrame(animate);
}

function setupCanvas(canvas) {
  if (!canvas) return null;
  const rect = canvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return null;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const pixelWidth = Math.floor(rect.width * dpr);
  const pixelHeight = Math.floor(rect.height * dpr);
  if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
    canvas.width = pixelWidth;
    canvas.height = pixelHeight;
  }
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, width: rect.width, height: rect.height };
}

function drawDemoScene(ctx, x, y, width, height, item, time, compact) {
  ctx.save();
  ctx.translate(x, y);
  const t = time / 1000;
  const colors = paletteByVisual[item.visual] || paletteByVisual.anomaly;

  const bg = ctx.createLinearGradient(0, 0, width, height);
  bg.addColorStop(0, colors[0]);
  bg.addColorStop(1, shade(colors[0], -18));
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  if (["anomaly", "battery", "agentInspection"].includes(item.visual)) drawFactoryInspection(ctx, width, height, item, t, colors);
  else if (item.visual === "pcb") drawPcbInspection(ctx, width, height, t, colors);
  else if (item.visual === "pharma") drawPharmaInspection(ctx, width, height, t, colors);
  else if (["waste", "food"].includes(item.visual)) drawSortingLine(ctx, width, height, item, t, colors);
  else if (["ppe", "fallCare", "workplace", "actionRecognition"].includes(item.visual)) drawPeopleSafety(ctx, width, height, item, t, colors);
  else if (["fire", "weapon", "perimeter", "reid", "crowd"].includes(item.visual)) drawSecurityScene(ctx, width, height, item, t, colors);
  else if (["anpr", "road", "driver", "vehicleDamage"].includes(item.visual)) drawTransportScene(ctx, width, height, item, t, colors);
  else if (["shelf", "footfall", "checkout", "visualSearch", "queue"].includes(item.visual)) drawRetailScene(ctx, width, height, item, t, colors);
  else if (["plant", "weed", "yield", "livestock"].includes(item.visual)) drawAgricultureScene(ctx, width, height, item, t, colors);
  else if (["radiology", "dermatology", "pathology", "surgery"].includes(item.visual)) drawMedicalScene(ctx, width, height, item, t, colors);
  else if (["container", "warehouse", "robot"].includes(item.visual)) drawLogisticsScene(ctx, width, height, item, t, colors);
  else if (["construction", "heavy", "droneEnergy", "thermalSolar"].includes(item.visual)) drawInfrastructureScene(ctx, width, height, item, t, colors);
  else if (["kyc", "ocr", "docVlm", "guiAgent"].includes(item.visual)) drawDocumentScene(ctx, width, height, item, t, colors);
  else drawMediaScene(ctx, width, height, item, t, colors);

  drawCameraHud(ctx, width, height, item, t, colors, compact);
  ctx.restore();
}

function drawFactoryInspection(ctx, width, height, item, t, colors) {
  drawGrid(ctx, width, height, "rgba(255,255,255,0.045)", 34);
  const beltY = height * 0.62;
  ctx.fillStyle = "rgba(255,255,255,0.08)";
  roundedFill(ctx, width * 0.05, beltY, width * 0.9, height * 0.18, 6);
  for (let i = 0; i < 5; i++) {
    const x = width * 0.12 + i * width * 0.17 + ((t * 34) % 38) - 20;
    const y = beltY + height * 0.04;
    const isAlert = i === 3 || item.visual === "agentInspection";
    ctx.fillStyle = isAlert ? "rgba(224,90,61,0.72)" : "rgba(255,255,255,0.72)";
    roundedFill(ctx, x, y, width * 0.1, height * 0.08, 5);
    drawBox(ctx, x - 4, y - 5, width * 0.1 + 8, height * 0.08 + 10, isAlert ? colors[2] : colors[1], isAlert ? "DEFECT" : "OK");
  }
  drawScanLine(ctx, width, height, t, colors[1]);
}

function drawPcbInspection(ctx, width, height, t, colors) {
  ctx.fillStyle = "rgba(13, 92, 82, 0.58)";
  roundedFill(ctx, width * 0.12, height * 0.16, width * 0.76, height * 0.66, 8);
  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 9; i++) {
    const x = width * 0.17 + i * width * 0.08;
    line(ctx, x, height * 0.2, x, height * 0.78);
  }
  for (let j = 0; j < 6; j++) {
    const y = height * 0.23 + j * height * 0.09;
    line(ctx, width * 0.16, y, width * 0.84, y);
  }
  for (let i = 0; i < 8; i++) {
    ctx.fillStyle = "rgba(18,31,28,0.72)";
    roundedFill(ctx, width * (0.2 + (i % 4) * 0.15), height * (0.26 + Math.floor(i / 4) * 0.24), width * 0.09, height * 0.1, 4);
  }
  drawBox(ctx, width * 0.62, height * 0.45, width * 0.12, height * 0.11, colors[2], "SHORT");
  drawScanLine(ctx, width, height, t, colors[1]);
}

function drawPharmaInspection(ctx, width, height, t, colors) {
  ctx.fillStyle = "rgba(255,255,255,0.17)";
  roundedFill(ctx, width * 0.19, height * 0.18, width * 0.62, height * 0.64, 9);
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      const cx = width * (0.29 + col * 0.14);
      const cy = height * (0.31 + row * 0.17);
      const broken = row === 1 && col === 2;
      ctx.fillStyle = broken ? "rgba(224,90,61,0.8)" : "rgba(245,248,252,0.9)";
      circle(ctx, cx, cy, Math.min(width, height) * 0.037);
      if (broken) drawBox(ctx, cx - 22, cy - 21, 44, 42, colors[2], "EMPTY");
    }
  }
  drawScanLine(ctx, width, height, t, colors[1]);
}

function drawSortingLine(ctx, width, height, item, t, colors) {
  ctx.fillStyle = "rgba(255,255,255,0.08)";
  roundedFill(ctx, width * 0.05, height * 0.58, width * 0.9, height * 0.2, 6);
  const labels = item.visual === "waste" ? ["PET", "metal", "paper", "glass"] : ["A", "B", "defect", "A"];
  const fills = item.visual === "waste" ? ["#5bb7d9", "#c8c8c8", "#d7b45a", "#6ec080"] : ["#8bc34a", "#e15b44", "#f1c857", "#78a95b"];
  labels.forEach((label, index) => {
    const x = width * 0.14 + index * width * 0.18 + Math.sin(t + index) * 7;
    const y = height * 0.64 + Math.cos(t * 0.8 + index) * 4;
    ctx.fillStyle = fills[index];
    if (index % 2) roundedFill(ctx, x, y, width * 0.08, height * 0.08, 5);
    else circle(ctx, x + width * 0.04, y + height * 0.04, width * 0.04);
    drawBox(ctx, x - 6, y - 7, width * 0.09, height * 0.1, label === "defect" ? colors[2] : colors[1], label);
  });
  line(ctx, width * 0.52, height * 0.52, width * 0.62, height * 0.35, colors[2], 3);
  drawScanLine(ctx, width, height, t, colors[1]);
}

function drawPeopleSafety(ctx, width, height, item, t, colors) {
  drawGrid(ctx, width, height, "rgba(255,255,255,0.04)", 36);
  for (let i = 0; i < 4; i++) {
    const x = width * (0.18 + i * 0.18);
    const y = height * (0.42 + Math.sin(t + i) * 0.02);
    const alert = (item.visual === "fallCare" && i === 2) || (item.visual === "ppe" && i === 1) || (item.visual === "workplace" && i === 3);
    drawPerson(ctx, x, y, height * 0.19, alert ? colors[2] : colors[1], item.visual === "fallCare" && i === 2);
    drawBox(ctx, x - width * 0.045, y - height * 0.11, width * 0.09, height * 0.27, alert ? colors[2] : colors[1], alert ? "ALERT" : "SAFE");
  }
  if (item.visual === "workplace") {
    ctx.strokeStyle = "rgba(224,90,61,0.65)";
    ctx.lineWidth = 2;
    roundedRect(ctx, width * 0.62, height * 0.32, width * 0.26, height * 0.38, 8);
  }
  drawScanLine(ctx, width, height, t, colors[1]);
}

function drawSecurityScene(ctx, width, height, item, t, colors) {
  drawGrid(ctx, width, height, "rgba(255,255,255,0.045)", 38);
  if (item.visual === "crowd") {
    for (let i = 0; i < 44; i++) {
      const x = width * (0.14 + ((i * 37) % 72) / 100);
      const y = height * (0.22 + ((i * 53) % 55) / 100);
      ctx.fillStyle = i % 7 === 0 ? "rgba(224,90,61,0.74)" : "rgba(86,160,200,0.78)";
      circle(ctx, x + Math.sin(t + i) * 3, y + Math.cos(t * 0.8 + i) * 3, 3.8);
    }
    drawBox(ctx, width * 0.45, height * 0.33, width * 0.25, height * 0.25, colors[2], "HIGH DENSITY");
    return;
  }
  ctx.strokeStyle = "rgba(255,255,255,0.16)";
  ctx.lineWidth = 2;
  roundedRect(ctx, width * 0.18, height * 0.18, width * 0.62, height * 0.56, 8);
  ctx.fillStyle = item.visual === "fire" ? "rgba(224,90,61,0.5)" : "rgba(255,255,255,0.12)";
  roundedFill(ctx, width * 0.48, height * 0.35, width * 0.16, height * 0.2, 4);
  if (item.visual === "fire") {
    ctx.fillStyle = "rgba(242,182,61,0.7)";
    circle(ctx, width * 0.56, height * 0.42 + Math.sin(t * 5) * 4, 22);
    drawBox(ctx, width * 0.48, height * 0.29, width * 0.18, height * 0.23, colors[2], "SMOKE");
  } else {
    drawPerson(ctx, width * 0.54, height * 0.45, height * 0.22, item.visual === "reid" ? colors[1] : colors[2], false);
    drawBox(ctx, width * 0.5, height * 0.31, width * 0.11, height * 0.28, item.visual === "reid" ? colors[1] : colors[2], item.visual === "reid" ? "ID 12" : "ALERT");
  }
  drawScanLine(ctx, width, height, t, colors[1]);
}

function drawTransportScene(ctx, width, height, item, t, colors) {
  ctx.fillStyle = "rgba(255,255,255,0.08)";
  ctx.beginPath();
  ctx.moveTo(width * 0.35, height);
  ctx.lineTo(width * 0.47, height * 0.25);
  ctx.lineTo(width * 0.56, height * 0.25);
  ctx.lineTo(width * 0.73, height);
  ctx.closePath();
  ctx.fill();
  for (let i = 0; i < 4; i++) {
    const x = width * (0.24 + i * 0.16);
    const y = height * (0.48 + i * 0.05);
    drawVehicle(ctx, x, y, width * 0.16, height * 0.11, colors[1]);
  }
  if (item.visual === "road") drawBox(ctx, width * 0.48, height * 0.66, width * 0.13, height * 0.08, colors[2], "POTHOLE");
  else if (item.visual === "driver") drawBox(ctx, width * 0.38, height * 0.3, width * 0.25, height * 0.24, colors[2], "DROWSY");
  else if (item.visual === "vehicleDamage") drawBox(ctx, width * 0.44, height * 0.51, width * 0.17, height * 0.12, colors[2], "DAMAGE");
  else drawBox(ctx, width * 0.42, height * 0.55, width * 0.19, height * 0.08, colors[2], "01 A 777");
  drawScanLine(ctx, width, height, t, colors[1]);
}

function drawRetailScene(ctx, width, height, item, t, colors) {
  ctx.fillStyle = "rgba(255,255,255,0.11)";
  for (let row = 0; row < 3; row++) {
    roundedFill(ctx, width * 0.12, height * (0.2 + row * 0.18), width * 0.76, height * 0.1, 4);
    for (let col = 0; col < 8; col++) {
      const empty = item.visual === "shelf" && row === 1 && col === 5;
      ctx.fillStyle = empty ? "rgba(224,90,61,0.18)" : ["#e05a3d", "#56a0c8", "#f2b63d", "#8fbf50"][col % 4];
      roundedFill(ctx, width * (0.15 + col * 0.085), height * (0.215 + row * 0.18), width * 0.045, height * 0.07, 3);
    }
  }
  if (["footfall", "queue"].includes(item.visual)) {
    for (let i = 0; i < 10; i++) drawPerson(ctx, width * (0.18 + i * 0.07), height * (0.72 + Math.sin(i) * 0.03), height * 0.1, colors[1], false);
  }
  const label = item.visual === "visualSearch" ? "MATCH 94%" : item.visual === "queue" ? "WAIT 6m" : item.visual === "checkout" ? "SKU +1" : "OOS";
  drawBox(ctx, width * 0.56, height * 0.36, width * 0.22, height * 0.17, colors[2], label);
  drawScanLine(ctx, width, height, t, colors[1]);
}

function drawAgricultureScene(ctx, width, height, item, t, colors) {
  ctx.fillStyle = "rgba(105,166,79,0.12)";
  for (let i = 0; i < 7; i++) {
    ctx.beginPath();
    ctx.moveTo(width * (0.08 + i * 0.14), height);
    ctx.quadraticCurveTo(width * (0.13 + i * 0.13), height * 0.58, width * (0.18 + i * 0.12), height * 0.2);
    ctx.strokeStyle = "rgba(143,191,80,0.45)";
    ctx.lineWidth = 8;
    ctx.stroke();
  }
  for (let i = 0; i < 12; i++) {
    const x = width * (0.12 + ((i * 23) % 76) / 100);
    const y = height * (0.32 + ((i * 37) % 52) / 100);
    ctx.fillStyle = item.visual === "weed" && i % 5 === 0 ? colors[2] : colors[1];
    leaf(ctx, x, y, 18 + (i % 3) * 4);
    if ((item.visual === "plant" && i === 4) || (item.visual === "weed" && i % 5 === 0) || (item.visual === "yield" && i === 7)) {
      drawBox(ctx, x - 22, y - 18, 44, 36, colors[2], item.visual === "yield" ? "COUNT" : "TARGET");
    }
  }
  if (item.visual === "livestock") {
    drawAnimal(ctx, width * 0.56, height * 0.52, colors[1]);
    drawBox(ctx, width * 0.49, height * 0.39, width * 0.18, height * 0.16, colors[2], "HEALTH");
  }
  drawScanLine(ctx, width, height, t, colors[1]);
}

function drawMedicalScene(ctx, width, height, item, t, colors) {
  ctx.fillStyle = "rgba(255,255,255,0.12)";
  roundedFill(ctx, width * 0.18, height * 0.14, width * 0.64, height * 0.7, 10);
  ctx.fillStyle = "rgba(15,24,27,0.8)";
  roundedFill(ctx, width * 0.23, height * 0.2, width * 0.54, height * 0.58, 8);
  if (item.visual === "radiology") {
    ctx.strokeStyle = "rgba(122,167,217,0.62)";
    ctx.lineWidth = 5;
    roundedRect(ctx, width * 0.38, height * 0.28, width * 0.22, height * 0.34, 30);
  } else if (item.visual === "surgery") {
    line(ctx, width * 0.34, height * 0.32, width * 0.63, height * 0.62, colors[1], 5);
    line(ctx, width * 0.64, height * 0.28, width * 0.38, height * 0.66, colors[2], 4);
  } else {
    for (let i = 0; i < 22; i++) {
      ctx.fillStyle = i % 6 === 0 ? colors[2] : "rgba(226,159,122,0.74)";
      circle(ctx, width * (0.28 + ((i * 29) % 45) / 100), height * (0.27 + ((i * 41) % 42) / 100), 6 + (i % 3));
    }
  }
  drawBox(ctx, width * 0.49, height * 0.42, width * 0.19, height * 0.16, colors[2], item.visual === "surgery" ? "PHASE" : "ROI");
  drawScanLine(ctx, width, height, t, colors[1]);
}

function drawLogisticsScene(ctx, width, height, item, t, colors) {
  drawGrid(ctx, width, height, "rgba(255,255,255,0.045)", 38);
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 5; col++) {
      const x = width * (0.14 + col * 0.13);
      const y = height * (0.24 + row * 0.16);
      ctx.fillStyle = ["#c95b3d", "#d7952a", "#56a0c8"][row % 3];
      roundedFill(ctx, x, y, width * 0.1, height * 0.1, 3);
    }
  }
  if (item.visual === "robot") {
    line(ctx, width * 0.72, height * 0.24, width * 0.6, height * 0.48, colors[1], 7);
    line(ctx, width * 0.6, height * 0.48, width * 0.7, height * 0.62, colors[1], 7);
    circle(ctx, width * 0.7, height * 0.62, 10);
  }
  drawBox(ctx, width * 0.49, height * 0.4, width * 0.2, height * 0.16, colors[2], item.visual === "container" ? "DENT" : item.visual === "robot" ? "GRASP" : "24 PALLETS");
  drawScanLine(ctx, width, height, t, colors[1]);
}

function drawInfrastructureScene(ctx, width, height, item, t, colors) {
  drawGrid(ctx, width, height, "rgba(255,255,255,0.04)", 42);
  if (["droneEnergy", "thermalSolar"].includes(item.visual)) {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 8; col++) {
        ctx.fillStyle = item.visual === "thermalSolar" && row === 2 && col === 5 ? colors[2] : "rgba(86,160,200,0.62)";
        roundedFill(ctx, width * (0.15 + col * 0.08), height * (0.34 + row * 0.09), width * 0.06, height * 0.06, 2);
      }
    }
    drawBox(ctx, width * 0.54, height * 0.49, width * 0.13, height * 0.11, colors[2], item.visual === "thermalSolar" ? "HOT" : "CRACK");
  } else {
    ctx.fillStyle = "rgba(242,182,61,0.45)";
    roundedFill(ctx, width * 0.2, height * 0.55, width * 0.18, height * 0.16, 3);
    roundedFill(ctx, width * 0.44, height * 0.42, width * 0.28, height * 0.3, 3);
    line(ctx, width * 0.12, height * 0.3, width * 0.58, height * 0.3, colors[1], 4);
    line(ctx, width * 0.2, height * 0.3, width * 0.2, height * 0.72, colors[1], 4);
    drawBox(ctx, width * 0.42, height * 0.42, width * 0.24, height * 0.18, colors[2], item.visual === "heavy" ? "IDLE" : "BIM 82%");
  }
  drawScanLine(ctx, width, height, t, colors[1]);
}

function drawDocumentScene(ctx, width, height, item, t, colors) {
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  roundedFill(ctx, width * 0.22, height * 0.12, width * 0.56, height * 0.72, 8);
  ctx.fillStyle = "rgba(32,37,34,0.13)";
  for (let i = 0; i < 8; i++) roundedFill(ctx, width * 0.29, height * (0.22 + i * 0.065), width * (0.36 + (i % 3) * 0.06), 6, 3);
  if (item.visual === "guiAgent") {
    ctx.fillStyle = "rgba(86,160,200,0.18)";
    roundedFill(ctx, width * 0.28, height * 0.58, width * 0.42, height * 0.12, 5);
    line(ctx, width * 0.58, height * 0.45, width * 0.68, height * 0.58, colors[2], 3);
  }
  drawBox(ctx, width * 0.28, height * 0.34, width * 0.42, height * 0.12, colors[1], item.visual === "kyc" ? "VERIFIED" : item.visual === "docVlm" ? "ANSWER" : item.visual === "guiAgent" ? "CLICK" : "TOTAL");
  drawScanLine(ctx, width, height, t, colors[1]);
}

function drawMediaScene(ctx, width, height, item, t, colors) {
  if (item.visual === "sports") {
    ctx.fillStyle = "rgba(105,166,79,0.26)";
    ctx.fillRect(0, 0, width, height);
    line(ctx, width * 0.5, height * 0.12, width * 0.5, height * 0.88, "rgba(255,255,255,0.35)", 2);
    for (let i = 0; i < 10; i++) {
      drawPerson(ctx, width * (0.12 + (i % 5) * 0.18), height * (0.28 + Math.floor(i / 5) * 0.34), height * 0.09, i % 2 ? colors[1] : colors[2], false);
    }
    drawBox(ctx, width * 0.46, height * 0.43, width * 0.12, height * 0.11, colors[2], "BALL");
  } else if (item.visual === "ar") {
    drawPerson(ctx, width * 0.5, height * 0.44, height * 0.3, colors[1], false);
    roundedRect(ctx, width * 0.3, height * 0.19, width * 0.4, height * 0.58, 10);
    drawBox(ctx, width * 0.36, height * 0.34, width * 0.28, height * 0.25, colors[2], "TRY ON");
  } else {
    ctx.fillStyle = "rgba(143,191,80,0.2)";
    ctx.fillRect(0, 0, width, height);
    drawAnimal(ctx, width * 0.5, height * 0.48, colors[1]);
    drawBox(ctx, width * 0.38, height * 0.34, width * 0.25, height * 0.18, colors[2], "SPECIES");
  }
  drawScanLine(ctx, width, height, t, colors[1]);
}

function drawCameraHud(ctx, width, height, item, t, colors, compact) {
  ctx.strokeStyle = "rgba(255,255,255,0.22)";
  ctx.lineWidth = 1;
  ctx.strokeRect(0.5, 0.5, width - 1, height - 1);
  const scanY = (height * (0.16 + ((t * 0.13 + item.id * 0.017) % 0.7)));
  ctx.fillStyle = "rgba(255,255,255,0.08)";
  ctx.fillRect(0, scanY, width, 1.5);
  ctx.fillStyle = "rgba(255,255,255,0.86)";
  ctx.font = `${compact ? 12 : 11}px Inter, sans-serif`;
  ctx.fillText(`CAM ${String(item.id).padStart(2, "0")}`, 14, height - 16);
  ctx.fillStyle = colors[2];
  ctx.fillText(`${Math.round(88 + Math.sin(t + item.id) * 6)}%`, width - 54, height - 16);
}

function drawScanLine(ctx, width, height, t, color) {
  const x = width * (0.12 + ((t * 0.18) % 0.76));
  ctx.fillStyle = hexToRgba(color, 0.22);
  ctx.fillRect(x, height * 0.12, 2, height * 0.76);
}

function drawGrid(ctx, width, height, color, step) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += step) line(ctx, x, 0, x, height);
  for (let y = 0; y < height; y += step) line(ctx, 0, y, width, y);
}

function drawBox(ctx, x, y, width, height, color, label) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  roundedRect(ctx, x, y, width, height, 4);
  ctx.fillStyle = hexToRgba(color, 0.9);
  roundedFill(ctx, x, Math.max(2, y - 22), Math.min(width + 28, 92), 20, 4);
  ctx.fillStyle = "#fff";
  ctx.font = "700 10px Inter, sans-serif";
  ctx.fillText(label, x + 7, Math.max(15, y - 8));
}

function drawPerson(ctx, x, y, size, color, falling) {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = Math.max(2, size * 0.08);
  if (falling) {
    circle(ctx, x + size * 0.2, y + size * 0.18, size * 0.12);
    line(ctx, x - size * 0.25, y + size * 0.3, x + size * 0.25, y + size * 0.3, color, ctx.lineWidth);
    line(ctx, x - size * 0.12, y + size * 0.3, x - size * 0.35, y + size * 0.45, color, ctx.lineWidth);
    line(ctx, x + size * 0.12, y + size * 0.3, x + size * 0.35, y + size * 0.45, color, ctx.lineWidth);
    return;
  }
  circle(ctx, x, y - size * 0.34, size * 0.12);
  line(ctx, x, y - size * 0.2, x, y + size * 0.2, color, ctx.lineWidth);
  line(ctx, x - size * 0.22, y, x + size * 0.22, y, color, ctx.lineWidth);
  line(ctx, x, y + size * 0.2, x - size * 0.18, y + size * 0.46, color, ctx.lineWidth);
  line(ctx, x, y + size * 0.2, x + size * 0.18, y + size * 0.46, color, ctx.lineWidth);
}

function drawVehicle(ctx, x, y, width, height, color) {
  ctx.fillStyle = hexToRgba(color, 0.78);
  roundedFill(ctx, x, y, width, height, 6);
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  roundedFill(ctx, x + width * 0.22, y + height * 0.18, width * 0.36, height * 0.26, 3);
  ctx.fillStyle = "#17211d";
  circle(ctx, x + width * 0.22, y + height, height * 0.16);
  circle(ctx, x + width * 0.78, y + height, height * 0.16);
}

function drawAnimal(ctx, x, y, color) {
  ctx.fillStyle = hexToRgba(color, 0.78);
  roundedFill(ctx, x - 42, y, 84, 38, 18);
  circle(ctx, x + 44, y + 7, 15);
  line(ctx, x - 24, y + 32, x - 30, y + 58, color, 4);
  line(ctx, x + 20, y + 32, x + 25, y + 58, color, 4);
}

function leaf(ctx, x, y, size) {
  ctx.beginPath();
  ctx.ellipse(x, y, size * 0.38, size * 0.78, Math.PI / 4, 0, Math.PI * 2);
  ctx.fill();
}

function roundedFill(ctx, x, y, width, height, radius) {
  roundedRect(ctx, x, y, width, height, radius);
  ctx.fill();
}

function roundedRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function circle(ctx, x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function line(ctx, x1, y1, x2, y2, color, width = 1) {
  if (color) ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function hexToRgba(hex, alpha) {
  const value = hex.replace("#", "");
  const full = value.length === 3 ? value.split("").map((char) => char + char).join("") : value;
  const num = Number.parseInt(full, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function shade(hex, amount) {
  const value = hex.replace("#", "");
  const num = Number.parseInt(value, 16);
  const r = Math.max(0, Math.min(255, ((num >> 16) & 255) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 255) + amount));
  const b = Math.max(0, Math.min(255, (num & 255) + amount));
  return `#${[r, g, b].map((part) => part.toString(16).padStart(2, "0")).join("")}`;
}

initFilters();
bindFilters();
renderCases();
requestAnimationFrame(animate);
