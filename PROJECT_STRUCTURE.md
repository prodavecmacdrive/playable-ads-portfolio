# 📁 Структура проекта

```
prtfollio/
│
├── 📄 index.html                      # Главная HTML страница
├── 📄 package.json                    # Зависимости и скрипты
├── 📄 vite.config.js                  # Конфигурация Vite
├── 📄 README.md                       # Основная документация
├── 📄 SETUP.md                        # Детальная инструкция по настройке
├── 📄 TODO_CLIENT.md                  # Быстрый список задач для клиента
├── 📄 CONTACTS_EXAMPLE.js             # Пример обновления контактов
├── 📄 .gitignore                      # Git исключения
│
├── 📁 assets/                         # Публичные ресурсы (доступны напрямую)
│   ├── 📄 bg_header.png              # 🔴 ДЛЯ ЗАМЕНЫ: Фон хедера с коллажем
│   ├── 📄 bg.png                     # Дополнительный фон
│   ├── 📄 cv_Oleh_Vasyliev_js_playable_ads.pdf  # PDF портфолио
│   │
│   └── 📁 playables/                 # Playable ads проекты
│       ├── 📄 11.html                # HTML файлы playable ads
│       ├── 📄 11.png                 # Скриншоты для превью
│       ├── 📄 LI_Playable_Ads_2_en_green.html
│       ├── 📄 LI_Playable_Ads_2_en_green.png
│       ├── 📄 LI_Playable_Ads_area_7_en_green.html
│       ├── 📄 LI_Playable_Ads_area_7_en_green.png
│       ├── 📄 LOT9117.html
│       ├── 📄 LOT9117.png
│       ├── 📄 MatchTree(test).html
│       ├── 📄 MatchTree(test).png
│       ├── 📄 p009_02_en_FashionBattle_UnityAds.html
│       ├── 📄 p009_02_en_FashionBattle_UnityAds.png
│       ├── 📄 p011_01_en_ZodiacSignStyle_UnityAds.html
│       ├── 📄 p011_01_en_ZodiacSignStyle_UnityAds.png
│       ├── 📄 PocketChamps_mario.html
│       ├── 📄 PocketChamps_mario.png
│       ├── 📄 PocketChamps_upgrade.html
│       ├── 📄 PocketChamps_upgrade.png
│       ├── 📄 RaidMPl_fb_Ad_19.11.19_en_red.html
│       ├── 📄 RaidMPl_fb_Ad_19.11.19_en_red.png
│       ├── 📄 rfce_plbl_rembo_bin_ron_2_clk_video_size_test.html
│       ├── 📄 rfce_plbl_rembo_bin_ron_2_clk_video_size_test.png
│       ├── 📄 skyd.html
│       ├── 📄 skyd.png
│       ├── 📄 UNS_Oleg_Google_quest_cards_ENG_4463.html
│       └── 📄 UNS_Oleg_Google_quest_cards_ENG_4463.png
│
└── 📁 src/                           # Исходный код React приложения
    ├── 📄 main.jsx                   # Точка входа React
    ├── 📄 App.jsx                    # Главный компонент приложения
    ├── 📄 App.css                    # Стили главного компонента
    ├── 📄 index.css                  # Глобальные стили + Fixel Font
    │
    ├── 📁 components/                # React компоненты
    │   ├── 📄 Header.jsx            # Хедер с психоделическим коллажем
    │   ├── 📄 Header.css            # Стили хедера
    │   ├── 📄 ProjectGrid.jsx       # Сетка проектов
    │   ├── 📄 ProjectGrid.css       # Стили сетки + hover эффекты
    │   ├── 📄 PDFSection.jsx        # Секция с PDF портфолио
    │   ├── 📄 PDFSection.css        # Стили PDF секции
    │   ├── 📄 ProjectModal.jsx      # Модальное окно с iPhone
    │   └── 📄 ProjectModal.css      # Стили модального окна + iPhone рамка
    │
    └── 📁 data/                      # Данные приложения
        └── 📄 projects.js            # 🔴 ДЛЯ РЕДАКТИРОВАНИЯ: Данные проектов + контакты


🔴 = ФАЙЛЫ ДЛЯ РЕДАКТИРОВАНИЯ КЛИЕНТОМ
```

---

## 🎯 Ключевые файлы для настройки

### Для клиента (ОБЯЗАТЕЛЬНО):
1. **`src/data/projects.js`** - контактные данные
2. **`assets/bg_header.png`** - фото-коллаж для хедера

### Для кастомизации (опционально):
- **`src/index.css`** - цветовая палитра, шрифты, анимации
- **`src/components/*.css`** - детальная настройка стилей компонентов

---

## 📦 Папка dist/ (после сборки)

После команды `npm run build` создается папка `dist/`:
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   ├── playables/...
│   ├── bg_header.png
│   └── cv_Oleh_Vasyliev_js_playable_ads.pdf
```

Эту папку загружаете на хостинг!

---

## 🔧 Важные технические детали

- **Vite** - использует ES модули, hot module replacement
- **React 18** - современные хуки и concurrent features
- **Framer Motion** - производительные GPU-анимации
- **CSS3** - современные анимации, grid, flexbox
- **Public assets** - файлы из `assets/` копируются как есть

---

## 📱 Responsive breakpoints

```css
/* Mobile */
@media (max-width: 480px) { ... }

/* Tablet */
@media (max-width: 768px) { ... }

/* Desktop */
@media (max-width: 1200px) { ... }
```
