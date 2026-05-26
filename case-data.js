globalThis.CV_CASES = [
  {
    "id": 1,
    "title": "Промышленная визуальная аномалия",
    "industry": "Производство",
    "description": "Обнаружение любых визуальных отклонений без предварительной разметки дефектов — универсальный фреймворк",
    "links": [
      "github.com/openvinotoolkit/anomalib",
      "github.com/Continual-Intelligence/EfficientAD"
    ],
    "datasets": [
      "MVTec AD (15 categories)",
      "MVTec LOCO",
      "VisA (12 classes)",
      "BTAD",
      "MTD"
    ],
    "complexity": "Средний",
    "roi": 10
  },
  {
    "id": 2,
    "title": "Проверка на наличие дефектов в полупроводниковых пластинах/печатных платах (PCB)",
    "industry": "Производство",
    "description": "Обнаружение микродефектов на полупроводниковых пластинах и печатных платах с точностью выше человеческой",
    "links": [
      "Roboflow semiconductor wafer guide (RF-DETR)",
      "github.com/JeffersonQin/yet-another-applied-llm-benchmark"
    ],
    "datasets": [
      "DeepPCB (~1500 imgs)",
      "MIxed-WM38",
      "KolektorSDD",
      "in-house line data"
    ],
    "complexity": "Продвинутый",
    "roi": 10
  },
  {
    "id": 3,
    "title": "Инспекция медикаментов — таблетки / блистерная упаковка",
    "industry": "Производство / Здравоохранение",
    "description": "Контроль целостности таблеток, блистеров, отсутствия пустот, маркировки на фармацевтических линиях",
    "links": [
      "github.com/openvinotoolkit/anomalib",
      "github.com/amazon-science/patchcore-inspection"
    ],
    "datasets": [
      "MVTec AD 'pill' category",
      "NIH NLM Pill Image Recognition Challenge",
      "RxImage"
    ],
    "complexity": "Продвинутый",
    "roi": 9
  },
  {
    "id": 4,
    "title": "Инспекция аккумуляторных ячеек электромобилей (EV)",
    "industry": "Производство / Энергетика",
    "description": "Визуальный контроль поверхностных дефектов ячеек, сварных швов и электродов аккумуляторов EV",
    "links": [
      "github.com/openvinotoolkit/anomalib",
      "github.com/Megvii-BaseDetection",
      "EV Battery Surface Defect (ArXiv 2024-2025)"
    ],
    "datasets": [
      "MVTec LOCO-AD (logical defects)",
      "Kaggle 'Battery Cell Image'",
      "mostly proprietary"
    ],
    "complexity": "Эксперт",
    "roi": 10
  },
  {
    "id": 5,
    "title": "Сортировка мусора и отходов (MRF)",
    "industry": "Производство / Умный город / Логистика",
    "description": "Автоматическая сортировка перерабатываемых материалов на заводах по переработке отходов",
    "links": [
      "github.com/pedropro/TACO",
      "github.com/AgaMiko/waste-datasets-review",
      "github.com/dbpprt/pytorch-mask-rcnn-samples"
    ],
    "datasets": [
      "TACO (Trash Annotations in Context)",
      "TrashNet",
      "ZeroWaste",
      "WasteNet",
      "UAVVaste"
    ],
    "complexity": "Продвинутый",
    "roi": 8
  },
  {
    "id": 6,
    "title": "Классификация качества продуктов питания/продукции",
    "industry": "Сельское хозяйство / Производство",
    "description": "Автоматическая сортировка фруктов, овощей и пищевых продуктов по качеству и дефектам на конвейере",
    "links": [
      "Roboflow Universe produce datasets (hundreds)",
      "github.com/whitelok/Vegetable-Detection"
    ],
    "datasets": [
      "Fruits-360",
      "DeepFruits",
      "MinneApple",
      "custom belt imagery",
      "PubAg datasets"
    ],
    "complexity": "Средний",
    "roi": 9
  },
  {
    "id": 7,
    "title": "Контроль за соблюдением требований к средствам индивидуальной защиты (строительство/промышленность)",
    "industry": "Строительство / Производство / Безопасность",
    "description": "Автоматическое обнаружение нарушений СИЗ (каски, жилеты, перчатки) в реальном времени",
    "links": [
      "github.com/VoxDroid/Construction-Site-Safety-PPE-Detection",
      "github.com/Ansarimajid/Construction-PPE-Detection"
    ],
    "datasets": [
      "Roboflow Construction Site Safety (2801 imgs)",
      "SODA",
      "MOCS",
      "Pictor-PPE"
    ],
    "complexity": "Начальный",
    "roi": 7
  },
  {
    "id": 8,
    "title": "Раннее обнаружение пожара/дыма (визуальное)",
    "industry": "Безопасность / Нефть и газ / Производство",
    "description": "Раннее визуальное обнаружение огня и дыма через CCTV до срабатывания традиционных датчиков",
    "links": [
      "github.com/gaiasd/DFireDataset",
      "github.com/spacewalk01/yolov8-fire-and-smoke-detection",
      "github.com/abg3/Smoke-Detection-using-Tensorflow-2.2"
    ],
    "datasets": [
      "D-Fire dataset",
      "FireNet",
      "FLAME (UAV wildfire)",
      "VisiFire",
      "BoWFire",
      "Furg-Fire-Dataset"
    ],
    "complexity": "Средний",
    "roi": 9
  },
  {
    "id": 9,
    "title": "Обнаружение оружия/огнестрельного оружия на камерах видеонаблюдения",
    "industry": "Безопасность / Умный город",
    "description": "Автоматическое обнаружение оружия на видеозаписях с CCTV для немедленного оповещения охраны",
    "links": [
      "github.com/dhvani-k/Firearm_Detection_In_CCTVs_Using_YOLOv5",
      "Scaled-YOLOv4 weapon detector (92.1 mAP)"
    ],
    "datasets": [
      "Roboflow weapon-detection-cctv-v3 (11 classes)",
      "Sohas Weapon Detection",
      "ImFA",
      "Dataset Ninja Guns"
    ],
    "complexity": "Средний",
    "roi": 6
  },
  {
    "id": 10,
    "title": "Обнаружение вторжений/аномалий в зоне (охрана периметра)",
    "industry": "Безопасность / Производство / Строительство",
    "description": "Оповещение при несанкционированном входе в ограниченные зоны или обнаружении подозрительного поведения",
    "links": [
      "ultralytics docs/guides/region-counting",
      "Roboflow Workflows zone-monitoring templates"
    ],
    "datasets": [
      "COCO person/vehicle",
      "AVA-Kinetics for action",
      "OpenImages"
    ],
    "complexity": "Начальный",
    "roi": 7
  },
  {
    "id": 11,
    "title": "Многокамерная идентификация людей/транспортных средств",
    "industry": "Безопасность / Ритейл / Умный город",
    "description": "Отслеживание конкретных людей или транспортных средств на множестве камер без распознавания лиц",
    "links": [
      "github.com/NirAharon/BoT-SORT (BoT-SORT-ReID)",
      "github.com/Geekgineer/motcpp (C++ prod)",
      "github.com/JDAI-CV/fast-reid (FastReID)"
    ],
    "datasets": [
      "MOT17/MOT20",
      "Market1501",
      "MSMT17",
      "DukeMTMC-reID",
      "CityFlow (vehicles)",
      "MTMC AI City Challenge"
    ],
    "complexity": "Продвинутый",
    "roi": 9
  },
  {
    "id": 12,
    "title": "Анализ плотности толпы/движения",
    "industry": "Безопасность / Умный город / Медиа",
    "description": "Мониторинг скоплений людей, плотности и потоков в публичных местах для управления безопасностью",
    "links": [
      "github.com/CommissarMa/CSRNet-pytorch",
      "github.com/leeyeehoo/CSRNet-pytorch",
      "JHU-CROWD++ baseline repos"
    ],
    "datasets": [
      "ShanghaiTech CrowdCounting",
      "UCF-QNRF",
      "JHU-CROWD++",
      "NWPU-Crowd",
      "GCC"
    ],
    "complexity": "Продвинутый",
    "roi": 7
  },
  {
    "id": 13,
    "title": "Обнаружение падений на основе положения тела (уход за пожилыми людьми, больницы)",
    "industry": "Безопасность / Здравоохранение",
    "description": "Автоматическое обнаружение падений людей по анализу позы тела с немедленным оповещением персонала",
    "links": [
      "github.com/rhafaelc/Fall-Detection-YOLO-MediaPipe",
      "github.com/EikeSan/video-fall-detection",
      "ElderFallGuard arxiv paper"
    ],
    "datasets": [
      "UR Fall Detection (URFD)",
      "Multiple Cameras Fall Dataset (MCFD)",
      "Le2i",
      "FDD"
    ],
    "complexity": "Начальный",
    "roi": 7
  },
  {
    "id": 14,
    "title": "Падения и безопасность на рабочем месте, выходящие за рамки СИЗ",
    "industry": "Строительство / Производство / Логистика",
    "description": "Обнаружение опасных ситуаций: падений, опасной близости к машинам, зон риска на рабочем месте",
    "links": [
      "github.com/open-mmlab/mmaction2",
      "github.com/PJLallen/OSFormer",
      "github.com/MCG-NJU/VideoMAE"
    ],
    "datasets": [
      "AVA-Actions",
      "Kinetics-700",
      "MEVA",
      "Charades",
      "custom EHS recordings (often proprietary)"
    ],
    "complexity": "Продвинутый",
    "roi": 8
  },
  {
    "id": 15,
    "title": "Распознавание номерных знаков с помощью ANPR + интеллектуальная парковка",
    "industry": "Транспорт / Умный город",
    "description": "Автоматическое считывание номерных знаков для управления парковкой, въездом и мониторинга ТС",
    "links": [
      "github.com/ankandrew/fast-plate-ocr",
      "github.com/sergiomsilva/alpr-unconstrained",
      "github.com/parkpow/deep-license-plate-recognition"
    ],
    "datasets": [
      "OpenALPR Benchmark",
      "CCPD (Chinese)",
      "AOLP (Taiwan)",
      "UFPR-ALPR",
      "custom regional plates"
    ],
    "complexity": "Начальный",
    "roi": 8
  },
  {
    "id": 16,
    "title": "Обнаружение выбоин / повреждений дорожного покрытия",
    "industry": "Транспорт / Умный город",
    "description": "Автоматическое обнаружение ям и повреждений дорожного покрытия через камеры и дроны",
    "links": [
      "github.com/sekilab/RoadDamageDetector",
      "github.com/oguzhansari/PotholeDetectionYolov5",
      "IEEE Big Data Cup datasets"
    ],
    "datasets": [
      "RDD2022 (47K images",
      "6 countries)",
      "Pothole Image Dataset (Kaggle)",
      "Crack500"
    ],
    "complexity": "Начальный",
    "roi": 7
  },
  {
    "id": 17,
    "title": "Система мониторинга водителя (DMS) — сонливость, отвлечение внимания",
    "industry": "Транспорт / Логистика",
    "description": "Обнаружение признаков усталости водителя, использования телефона за рулем через внутреннюю камеру",
    "links": [
      "github.com/Ahmednull/L2CS-Net",
      "github.com/google/mediapipe",
      "github.com/akanametov/yolo-face"
    ],
    "datasets": [
      "DriverMVT",
      "DAD (Distracted Activities Driver)",
      "DROZY",
      "StateFarm Distracted Driver Detection (Kaggle)",
      "YawDD"
    ],
    "complexity": "Продвинутый",
    "roi": 8
  },
  {
    "id": 18,
    "title": "Соответствие полок / планограммам в розничной торговле",
    "industry": "Ритейл",
    "description": "Автоматическая проверка выкладки товаров на полках, обнаружение пустых мест и нарушений планограмм",
    "links": [
      "github.com/eg4000/SKU110K_CVPR19",
      "Roboflow tutorial: planogram compliance with shelf empty-space detection"
    ],
    "datasets": [
      "SKU110K (>1M instances)",
      "RPC",
      "Trax (semi-public)",
      "Grocery-117",
      "custom retailer/brand datasets"
    ],
    "complexity": "Средний",
    "roi": 9
  },
  {
    "id": 19,
    "title": "Посещаемость магазинов + тепловая карта + аналитика времени ожидания",
    "industry": "Ритейл",
    "description": "Подсчёт покупателей, анализ маршрутов и зон интереса в магазине для оптимизации выкладки",
    "links": [
      "github.com/mikel-brostrom/yolo_tracking",
      "Roboflow Workflows footfall templates"
    ],
    "datasets": [
      "MOT17/MOT20",
      "CrowdHuman",
      "WiderPerson",
      "your own store footage"
    ],
    "complexity": "Средний",
    "roi": 8
  },
  {
    "id": 20,
    "title": "Безкассовая / интеллектуальная система оформления покупок",
    "industry": "Ритейл",
    "description": "Автоматическое распознавание товаров, взятых покупателем, для бесконтактной оплаты без кассира",
    "links": [
      "Limited open source; Mashgin's 3D camera approach is more startup-feasible than full ceiling array"
    ],
    "datasets": [
      "RPC",
      "GroceryStore",
      "custom multi-camera datasets (very rare publicly)"
    ],
    "complexity": "Эксперт",
    "roi": 8
  },
  {
    "id": 21,
    "title": "Визуальный поиск / обратный поиск изображений для электронной коммерции",
    "industry": "Ритейл / E-commerce",
    "description": "Поиск товаров по фотографии — пользователь загружает фото и находит похожие товары в каталоге",
    "links": [
      "github.com/marqo-ai/marqo",
      "github.com/qdrant/qdrant",
      "github.com/openai/CLIP",
      "github.com/QwenLM/Qwen3-VL"
    ],
    "datasets": [
      "DeepFashion2",
      "Stanford Online Products",
      "Amazon Berkeley Objects (ABO)",
      "In-shop Clothes Retrieval"
    ],
    "complexity": "Продвинутый",
    "roi": 7
  },
  {
    "id": 22,
    "title": "Аналитика очередей / времени ожидания для ресторанов быстрого питания и быстрого обслуживания",
    "industry": "Ритейл / Общепит",
    "description": "Автоматическое измерение длины очередей и времени ожидания для оптимизации обслуживания в кафе",
    "links": [
      "github.com/ifzhang/ByteTrack",
      "github.com/NirAharon/BoT-SORT",
      "github.com/roboflow/supervision"
    ],
    "datasets": [
      "MOT17/20",
      "CrowdHuman",
      "custom QSR footage",
      "OpenImages 'person' subset"
    ],
    "complexity": "Средний",
    "roi": 7
  },
  {
    "id": 23,
    "title": "Мобильный классификатор болезней сельскохозяйственных культур",
    "industry": "Сельское хозяйство",
    "description": "Мобильное приложение: фотография листа → мгновенная диагностика болезни + рекомендация лечения",
    "links": [
      "github.com/spMohanty/PlantVillage-Dataset",
      "HuggingFace plant disease classifiers",
      "github.com/oarriaga/keras_for_plantvillage"
    ],
    "datasets": [
      "PlantVillage (54K images",
      "38 classes)",
      "PlantDoc",
      "RiceLeafDisease",
      "FieldPlant",
      "custom per-region"
    ],
    "complexity": "Начальный",
    "roi": 7
  },
  {
    "id": 24,
    "title": "Точное обнаружение сорняков + выборочное опрыскивание",
    "industry": "Сельское хозяйство / Роботехника",
    "description": "Обнаружение сорняков среди культур для точного нанесения гербицидов и сокращения химикатов на 80-95%",
    "links": [
      "github.com/AlexOlsen/DeepWeeds",
      "Roboflow drone weed detection guides",
      "Omdena weed-detection project"
    ],
    "datasets": [
      "DeepWeeds",
      "Weeds-CoCo",
      "Agriculture-Vision",
      "CropAndWeed",
      "CWFID",
      "custom field datasets"
    ],
    "complexity": "Средний",
    "roi": 9
  },
  {
    "id": 25,
    "title": "Аэрофотосъемка для оценки урожайности сельскохозяйственных культур (подсчет плодов/кочанов/коробочек)",
    "industry": "Сельское хозяйство",
    "description": "Подсчёт плодов, колосьев и коробочек с дронов для прогнозирования урожая до сбора",
    "links": [
      "github.com/obss/sahi",
      "github.com/visipedia/iwildcam_comp",
      "github.com/AgriThinking/Awesome-Agriculture-Computer-Vision"
    ],
    "datasets": [
      "MinneApple",
      "GlobalWheat (head detection)",
      "CottonBoll",
      "MangoYOLO",
      "Agriculture-Vision",
      "Sentinel-2 + drone fusion"
    ],
    "complexity": "Продвинутый",
    "roi": 7
  },
  {
    "id": 26,
    "title": "Мониторинг здоровья скота и аквакультуры",
    "industry": "Сельское хозяйство / Аквакультура",
    "description": "Мониторинг состояния животных и рыб: обнаружение болезней, отслеживание роста, аномального поведения",
    "links": [
      "github.com/HKU-BAL/dairy-cow-recognition",
      "Roboflow Universe cattle/sheep detectors"
    ],
    "datasets": [
      "DairyCattleBehaviorDataset",
      "CowBehavior",
      "AnimalKingdom",
      "custom essential for production"
    ],
    "complexity": "Средний",
    "roi": 8
  },
  {
    "id": 27,
    "title": "Сортировка медицинских изображений (радиология с использованием ИИ)",
    "industry": "Здравоохранение",
    "description": "Анализ рентгеновских снимков и КТ для автоматического приоритета критических случаев и поддержки врача",
    "links": [
      "github.com/MICCAI-2020 challenges",
      "MONAI framework",
      "github.com/Project-MONAI/MONAI",
      "nnU-Net segmentation baselines"
    ],
    "datasets": [
      "NIH ChestX-ray14",
      "MIMIC-CXR",
      "RSNA Pneumonia/Brain/Spine",
      "BraTS",
      "LIDC-IDRI",
      "ISIC for derm"
    ],
    "complexity": "Эксперт",
    "roi": 10
  },
  {
    "id": 28,
    "title": "Дерматология / Анализ поражений кожи",
    "industry": "Здравоохранение",
    "description": "Анализ фотографий кожи для классификации новообразований: меланома, базалиома, доброкачественные",
    "links": [
      "github.com/udacity/dermatologist-ai",
      "ISIC challenge baseline repos",
      "github.com/uci-cbcl/MelaNet"
    ],
    "datasets": [
      "ISIC Archive (~70K dermoscopy images)",
      "HAM10000",
      "BCN20000",
      "PH2",
      "PAD-UFES-20 (smartphone)"
    ],
    "complexity": "Продвинутый",
    "roi": 8
  },
  {
    "id": 29,
    "title": "Цифровая патология (анализ изображений целых срезов)",
    "industry": "Здравоохранение",
    "description": "AI-анализ гистопатологических слайдов для обнаружения раковых клеток с точностью патолога",
    "links": [
      "CAMELYON16/17 challenge baselines",
      "github.com/computationalpathologygroup"
    ],
    "datasets": [
      "CAMELYON16/17 (breast metastasis)",
      "TCGA-Pan-Cancer",
      "PatchCamelyon (PCam)",
      "BACH",
      "GlaS",
      "MoNuSeg"
    ],
    "complexity": "Эксперт",
    "roi": 9
  },
  {
    "id": 30,
    "title": "Искусственный интеллект для хирургических процессов (обнаружение фазы, отслеживание инструментов)",
    "industry": "Здравоохранение",
    "description": "Автоматическое распознавание фаз операции, отслеживание хирургических инструментов в реальном времени",
    "links": [
      "EndoVis challenge repos",
      "Cholec80 dataset baselines",
      "github.com/openendovis"
    ],
    "datasets": [
      "Cholec80",
      "EndoVis (various challenges)",
      "AutoLaparo",
      "M2CAI",
      "Heichole",
      "CATARACTS"
    ],
    "complexity": "Эксперт",
    "roi": 9
  },
  {
    "id": 31,
    "title": "Обнаружение повреждений контейнеров/грузов (логистика)",
    "industry": "Логистика",
    "description": "Автоматическая инспекция повреждений контейнеров и грузов при приёмке/отправке в портах",
    "links": [
      "github.com/yangboz/container-detection",
      "arxiv.org/pdf/2506.22517 (YOLOv11/12/RF-DETR container damage comparison)"
    ],
    "datasets": [
      "Container damage datasets on Kaggle",
      "Roboflow Universe shipping container collections",
      "custom port footage"
    ],
    "complexity": "Средний",
    "roi": 8
  },
  {
    "id": 32,
    "title": "Подсчет паллет / Инвентаризация склада (в стиле перевалки)",
    "industry": "Логистика",
    "description": "Автоматический подсчёт паллет, коробок и единиц товара на складах через дроны и фиксированные камеры",
    "links": [
      "github.com/ultralytics/ultralytics (pallet datasets)",
      "github.com/SKU110K/SKU110K_CVPR19",
      "github.com/roboflow/notebooks (pallet detection)"
    ],
    "datasets": [
      "SKU-110K",
      "Pallet Detection in Warehouse",
      "Open Logistics Vision Dataset",
      "custom RGB+depth scans"
    ],
    "complexity": "Средний",
    "roi": 8
  },
  {
    "id": 33,
    "title": "Роботизированный комплектовщик / Комплектация товаров по принципу «товар к человеку»",
    "industry": "Логистика / Роботехника",
    "description": "Визуальная система для роботов-манипуляторов: захват и сортировка хаотично расположенных товаров",
    "links": [
      "Physical Intelligence π0.5 paper",
      "OpenVLA repo",
      "AnyGrasp benchmark",
      "github.com/google-research/robotics_transformer (RT-1/RT-2)"
    ],
    "datasets": [
      "YCB-Video",
      "GraspNet-1Billion",
      "REAL250",
      "ContactDB",
      "sim2real via NVIDIA Isaac Sim"
    ],
    "complexity": "Эксперт",
    "roi": 9
  },
  {
    "id": 34,
    "title": "Мониторинг хода строительства + соответствие BIM-модели",
    "industry": "Строительство",
    "description": "Сравнение фактического прогресса стройки с BIM-моделью, обнаружение отклонений и задержек",
    "links": [
      "Pillar-based progress tracking from 360 video",
      "github.com/microsoft/OpenInsetMap-style projects for BIM matching"
    ],
    "datasets": [
      "SODA (Site Object Detection)",
      "MOCS",
      "ACID",
      "BUSI",
      "custom 360-camera site captures"
    ],
    "complexity": "Средний",
    "roi": 9
  },
  {
    "id": 35,
    "title": "Обнаружение тяжелой техники + анализ времени простоя",
    "industry": "Строительство / Горнодобывающая / Логистика",
    "description": "Отслеживание тяжёлой техники на объектах, измерение времени простоя и оптимизация операций",
    "links": [
      "github.com/ultralytics/ultralytics (heavy equipment fine-tunes)",
      "github.com/roboflow/notebooks construction",
      "github.com/ifzhang/ByteTrack"
    ],
    "datasets": [
      "ACID (Autonomous Construction Industry Dataset)",
      "SODA10M",
      "MOCS (Moving Object in Construction Site)"
    ],
    "complexity": "Средний",
    "roi": 8
  },
  {
    "id": 36,
    "title": "Инспекция возобновляемых источников энергии (ветер, солнечная энергия, линии электропередач) с помощью дронов",
    "industry": "Энергетика",
    "description": "Автоматическая инспекция ветряных турбин, солнечных панелей и ЛЭП через дроны с CV-анализом",
    "links": [
      "Roboflow drone defect-detection guides",
      "DJI Enterprise inspection workflows",
      "github.com/edmBernard/yolov5-rust (embedded)"
    ],
    "datasets": [
      "WindCrack",
      "DTU Solar PV",
      "MicroBlading wind blade dataset",
      "custom drone footage essential"
    ],
    "complexity": "Продвинутый",
    "roi": 9
  },
  {
    "id": 37,
    "title": "Обнаружение тепловых аномалий солнечных панелей (ИК-инспекция с помощью дронов)",
    "industry": "Энергетика",
    "description": "Тепловизионная инспекция солнечных панелей дроном для обнаружения неисправных ячеек и горячих точек",
    "links": [
      "github.com/RaptorMaps datasets",
      "github.com/zhangjr-gaoyx/Photovoltaic-Thermal-Image-Dataset",
      "github.com/ultralytics/ultralytics (thermal fine-tunes)"
    ],
    "datasets": [
      "InfraredSolarModules (Raptor Maps)",
      "PVF-10 (photovoltaic fault dataset)",
      "DJI Mavic 3T sample sets",
      "IRIS dataset"
    ],
    "complexity": "Средний",
    "roi": 8
  },
  {
    "id": 38,
    "title": "Оценка повреждений транспортных средств (Страхование/Аренда)",
    "industry": "Страхование / Транспорт",
    "description": "Автоматическая классификация и оценка повреждений кузова автомобиля по фотографиям для страховых выплат",
    "links": [
      "github.com/Helias/Car-Model-Recognition",
      "github.com/sridhar245/Car-Damage-Detection-using-deep-learning",
      "Tractable case studies"
    ],
    "datasets": [
      "CarDD (CVPR21)",
      "VehicleX",
      "Pinetti VehicleDamage",
      "COCO car class"
    ],
    "complexity": "Средний",
    "roi": 10
  },
  {
    "id": 39,
    "title": "Проверка личности (KYC) / Идентификация личности + Выявление подделки документов",
    "industry": "Финансы / Безопасность / Страхование",
    "description": "Автоматическая проверка документов удостоверяющих личность и обнаружение подделок при онбординге",
    "links": [
      "MIDV-500/MIDV-2020 dataset baselines",
      "github.com/HzFu/IDCard (older)",
      "Surya OCR for IDs"
    ],
    "datasets": [
      "MIDV-500/MIDV-2020 (synthetic IDs)",
      "IDNet",
      "real-world is proprietary by vendors"
    ],
    "complexity": "Продвинутый",
    "roi": 9
  },
  {
    "id": 40,
    "title": "Отслеживание спортсменов и анализ их производительности",
    "industry": "Спорт / Медиа",
    "description": "Отслеживание игроков, мяча и тактических паттернов для тренерского анализа и трансляций",
    "links": [
      "github.com/SoccerNet",
      "github.com/roboflow/sports",
      "github.com/yastrebksv/TennisProject",
      "github.com/qubvel/segmentation_models.pytorch"
    ],
    "datasets": [
      "SoccerNet (huge)",
      "SportsMOT",
      "DeepSportRadar",
      "TrackNetV3 (ball)",
      "BasketballSeq",
      "Tennis-Tracking datasets"
    ],
    "complexity": "Продвинутый",
    "roi": 7
  },
  {
    "id": 41,
    "title": "Виртуальная примерка с дополненной реальностью / Расстановка мебели",
    "industry": "Ритейл / Медиа",
    "description": "AR-приложение: примерить одежду или расставить мебель виртуально до покупки через камеру смартфона",
    "links": [
      "github.com/levihsu/OOTDiffusion",
      "github.com/yisol/IDM-VTON",
      "github.com/google/mediapipe",
      "developer.apple.com/augmented-reality"
    ],
    "datasets": [
      "VITON-HD",
      "DressCode",
      "FashionIQ",
      "IKEA 3D Furniture",
      "ScanNet",
      "custom product 3D scans"
    ],
    "complexity": "Продвинутый",
    "roi": 6
  },
  {
    "id": 42,
    "title": "Фотоловушки для диких животных / Борьба с браконьерством",
    "industry": "Экология / Безопасность",
    "description": "Автоматическое распознавание видов животных и людей на фотоловушках для защиты дикой природы",
    "links": [
      "github.com/microsoft/CameraTraps (MegaDetector)",
      "github.com/Imageomics/BioCLIP",
      "github.com/visipedia/iwildcam_comp"
    ],
    "datasets": [
      "iWildCam (Caltech)",
      "Snapshot Serengeti",
      "NACTI",
      "Wildlife Conservation Society datasets",
      "BIOSCAN-1M"
    ],
    "complexity": "Средний",
    "roi": 6
  },
  {
    "id": 43,
    "title": "Интеллектуальная обработка документов (счета / квитанции / контракты)",
    "industry": "Финансы / Логистика / Страхование",
    "description": "Автоматическое извлечение данных из счетов, чеков и договоров с помощью CV + OCR",
    "links": [
      "github.com/clovaai/donut (Donut)",
      "github.com/PaddlePaddle/PaddleOCR",
      "github.com/microsoft/unilm/tree/master/layoutlmv3",
      "Surya OCR"
    ],
    "datasets": [
      "FUNSD",
      "CORD",
      "SROIE",
      "DocLayNet",
      "RVL-CDIP",
      "PubLayNet",
      "custom invoice datasets"
    ],
    "complexity": "Средний",
    "roi": 9
  },
  {
    "id": 44,
    "title": "Интеллектуальная обработка документов VLM для юридических / медицинских / финансовых целей",
    "industry": "Финансы / Здравоохранение / Страхование",
    "description": "VLM-системы для понимания сложных документов: юридических договоров, медкарт, финансовых отчётов",
    "links": [
      "github.com/illuin-tech/colpali",
      "github.com/microsoft/markitdown",
      "github.com/clovaai/donut",
      "github.com/microsoft/unilm/tree/master/layoutlmv3"
    ],
    "datasets": [
      "PubLayNet",
      "DocVQA",
      "ChartQA",
      "FUNSD",
      "SROIE",
      "RVL-CDIP",
      "RP-Cases (legal)",
      "MIMIC-IV-NOTE (medical)"
    ],
    "complexity": "Эксперт",
    "roi": 10
  },
  {
    "id": 45,
    "title": "Визуальная агентная инспекция (гибрид RF-DETR + Frontier VLM)",
    "industry": "Производство / Безопасность / Энергетика",
    "description": "Агентная система: RF-DETR как fast pass → VLM (Qwen3-VL / Claude) для глубокой классификации и решений",
    "links": [
      "github.com/roboflow/inference",
      "github.com/QwenLM/Qwen3-VL",
      "github.com/microsoft/Magma",
      "anthropic.com/news/claude-3-7-sonnet (vision)"
    ],
    "datasets": [
      "MVTec AD/LOCO для бенчмарков",
      "Roboflow Universe",
      "custom product lines",
      "bring-your-own"
    ],
    "complexity": "Эксперт",
    "roi": 9
  },
  {
    "id": 46,
    "title": "Повышение производительности труда / Распознавание действий (в стиле Optifye)",
    "industry": "Производство / Ритейл / Логистика",
    "description": "Распознавание действий работников, измерение цикличности операций, обнаружение простоев на производстве",
    "links": [
      "github.com/open-mmlab/mmaction2",
      "github.com/MCG-NJU/VideoMAE",
      "github.com/SwinTransformer/Video-Swin-Transformer"
    ],
    "datasets": [
      "Kinetics-700",
      "AVA Actions",
      "MEVA",
      "Charades",
      "Something-Something v2",
      "custom factory-floor recordings"
    ],
    "complexity": "Продвинутый",
    "roi": 8
  },
  {
    "id": 47,
    "title": "Графический интерфейс пользователя / Агент использования компьютера для офисных рабочих процессов",
    "industry": "Финансы / Здравоохранение / Страхование / Образование",
    "description": "AI-агент управляет интерфейсами приложений (кликает, вводит данные) вместо человека-оператора",
    "links": [
      "github.com/bytedance/UI-TARS",
      "github.com/microsoft/Magma",
      "github.com/browser-use/browser-use",
      "github.com/anthropics/anthropic-quickstarts/tree/main/computer-use-demo"
    ],
    "datasets": [
      "AITW (Android in the Wild)",
      "Mind2Web",
      "WebArena",
      "OSWorld",
      "ScreenAgent",
      "custom enterprise workflow recordings"
    ],
    "complexity": "Эксперт",
    "roi": 10
  }
];
