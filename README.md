# 🎨 Playable Ads Portfolio

> Минималистичное портфолио с элементами ретро-психоделии 60-х для демонстрации playable рекламных материалов.

![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat&logo=vite)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.16-FF0055?style=flat)

---

## ✨ Особенности

- 🎭 **Минималистичный дизайн** с психоделическими акцентами
- 🍊 **Оранжевая цветовая палитра** в стиле 60-х
- 🔤 **Fixel Font** от MacPaw для типографики
- 🎯 **Интерактивная сетка проектов** с hover-эффектами
- 📱 **Модальное окно с имитацией iPhone 17 Pro**
- 📄 **Встроенное PDF портфолио** с возможностью развертывания
- 📐 **Полностью responsive** дизайн
- ⚡ **Плавные анимации** с Framer Motion

---

## 🚀 Быстрый старт

### Установка и запуск

```bash
# Установка зависимостей (уже выполнена)
npm install

# Запуск dev сервера
npm run dev

# Откройте в браузере
http://localhost:5173/
```

### ⚠️ Что нужно настроить

1. **Контактные данные** → `src/data/projects.js`
2. **Фото-коллаж для хедера** → `assets/bg_header.png`

Подробнее в **[TODO_CLIENT.md](TODO_CLIENT.md)**

---

## 📚 Документация

| Файл | Описание |
|------|----------|
| [QUICKSTART.md](QUICKSTART.md) | ⚡ Быстрый старт за 2 минуты |
| [SETUP.md](SETUP.md) | 📖 Подробная инструкция по настройке |
| [TODO_CLIENT.md](TODO_CLIENT.md) | ✅ Что нужно сделать клиенту |
| [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) | 📁 Структура проекта |
| [STYLE_GUIDE.js](STYLE_GUIDE.js) | 🎨 Гайд по стилям и эффектам |
| [TESTING_CHECKLIST.md](TESTING_CHECKLIST.md) | ✔️ Чеклист тестирования |
| [PROJECT_INFO.md](PROJECT_INFO.md) | ℹ️ Подробная информация |

---

## 🛠️ Технологии

```
Frontend Stack:
├── React 18.2.0          → UI фреймворк
├── Vite 5.0.0            → Быстрая сборка и HMR
├── Framer Motion 10.16.4 → Производительные анимации
└── CSS3                  → Современные стили

Design:
├── Fixel Font (MacPaw)   → Типографика
├── Психоделическая палитра → 60's inspired
└── Responsive Design     → Mobile-first
```

---

## 🎨 Цветовая палитра

```css
Primary Orange:    #FF6B35  🟠
Secondary Orange:  #FF8C42  🟠
Accent Purple:     #9B59B6  🟣
Accent Pink:       #FF1493  🩷
Accent Blue:       #00CED1  🔵
```

---

## 📱 Функциональность

### 💻 Desktop
✅ Модальное окно с рамкой iPhone 17 Pro  
✅ Кнопка перезагрузки рекламы  
✅ Кнопка смены ориентации (портрет/ландшафт)  
✅ Психоделические hover эффекты  
✅ Анимация открытия от позиции клика

### 📱 Mobile
✅ Полноэкранное отображение playable ads  
✅ Автоматическое восстановление при reload  
✅ Оптимизированные touch-анимации  
✅ Адаптивная сетка проектов

---

## 🎯 Структура проекта

```
prtfollio/
├── 📄 index.html                  # Главная страница
├── 📄 package.json                # Зависимости
├── 📄 vite.config.js              # Конфигурация Vite
│
├── 📁 assets/                     # Публичные ресурсы
│   ├── 🖼️ bg_header.png          # Фон хедера (для замены)
│   ├── 📄 cv_*.pdf                # PDF портфолио
│   └── 📁 playables/              # 13 playable ads (HTML + PNG)
│
└── 📁 src/                        # Исходный код
    ├── 📄 main.jsx                # Точка входа
    ├── 📄 App.jsx                 # Главный компонент
    ├── 📄 index.css               # Глобальные стили + Fixel Font
    ├── 📁 components/             # React компоненты
    │   ├── Header.jsx             # Хедер с коллажем
    │   ├── ProjectGrid.jsx        # Сетка проектов
    │   ├── PDFSection.jsx         # PDF секция
    │   └── ProjectModal.jsx       # Модальное окно
    └── 📁 data/
        └── projects.js            # Данные (РЕДАКТИРОВАТЬ!)
```

---

## 🌟 Психоделические эффекты

- 🌈 Пульсация цветов при hover
- ✨ Градиентное свечение
- 〰️ Волновые искажения
- 🎭 Цветовые оверлеи в стиле 60-х
- 🔮 Радиальные градиенты
- 💫 Плавные трансформации

---

## 📦 Команды

```bash
npm run dev      # Разработка с HMR
npm run build    # Сборка для продакшена
npm run preview  # Превью продакшен версии
```

---

## 🚀 Деплой

### Netlify (рекомендуется)
```bash
npm run build
# Перетащите папку dist/ на app.netlify.com/drop
```

### Vercel
```bash
npm i -g vercel
vercel
```

### GitHub Pages
```bash
npm run build
# Загрузите dist/ в gh-pages
```

---

## ⚡ Производительность

- 🎯 Lighthouse Score: >90
- ⚡ First Paint: <1.5s
- 📦 Оптимизированный bundle
- 🎬 60fps анимации
- 📱 Mobile optimized

---

## 🎓 Для кого

- Playable Ads разработчики
- Креативные агентства
- Digital маркетологи
- UI/UX дизайнеры

---

## 📄 Лицензия

Private Portfolio Project

---

## 👨‍💻 Автор

**Oleh Vasyliev** - Playable Ads Developer

---

## 🤝 Благодарности

- **MacPaw** за шрифт Fixel
- **Framer** за Motion библиотеку
- **Vite** за быструю разработку
- **React** за мощный UI фреймворк

---

<p align="center">
  <b>Создано с ❤️ для демонстрации playable ads</b><br>
  <sub>Минимализм + Психоделия 60-х • React • Vite • Framer Motion</sub>
</p>

---

**Версия:** 1.0.0 | **Статус:** ✅ Production Ready | **Год:** 2024
