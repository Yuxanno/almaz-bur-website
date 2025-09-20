# Almaz Bur Website

Professional olmosli burg'ulash va beton kesish xizmatlari uchun veb-sayt.

## Texnologiyalar

- **React 18** - JavaScript kutubxonasi
- **Vite** - Tez development server va build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible UI komponentlar
- **Lucide React** - Icon kutubxonasi

## O'rnatish

1. Dependencelarni o'rnating:
```bash
npm install
```

2. Development serverni ishga tushiring:
```bash
npm run dev
```

3. Brauzerda `http://localhost:3000` ni oching

## Build qilish

Production uchun build qilish:
```bash
npm run build
```

Build fayllar `dist` papkasida yaratiladi.

## Scripts

- `npm run dev` - Development server (port 3000)
- `npm run build` - Production build
- `npm run preview` - Build preview
- `npm run start` - Build preview (alias)

## Struktura

```
src/
├── components/          # React komponentlar
│   ├── layout/         # Layout komponentlar
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── ThemeProvider.jsx
│   ├── sections/       # Sahifa bo'limlari
│   │   ├── HeroSection.jsx
│   │   ├── AboutSection.jsx
│   │   ├── ServicesSection.jsx
│   │   └── ContactMapSection.jsx
│   ├── forms/          # Form komponentlar
│   │   └── OrderSection.jsx
│   ├── ui/             # UI komponentlar
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Label.jsx
│   │   └── Textarea.jsx
│   └── index.js        # Barcha komponentlarni eksport qilish
├── constants/          # Konstanta fayllar
│   ├── navigation.js
│   ├── services.js
│   └── advantages.js
├── utils/              # Utility funksiyalar
│   └── utils.js
├── App.jsx             # Asosiy App komponent
├── main.jsx           # React entry point
└── index.css          # Global CSS va Tailwind
```

## Xususiyatlar

- ✅ Responsive dizayn
- ✅ Dark theme
- ✅ Animatsiyalar va effektlar
- ✅ Form validation
- ✅ Google Maps integratsiyasi
- ✅ Modern UI/UX
- ✅ SEO optimizatsiya
- ✅ Yaxshi tashkil etilgan kod struktura
- ✅ Modulli arxitektura
- ✅ Vibrant va jozibali ranglar

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
