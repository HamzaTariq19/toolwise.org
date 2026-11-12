export interface Category {
  slug: string;
  name: string;
  /** Short label for chips and nav */
  short: string;
  icon: string;
  /** Tailwind-independent accent key, styles live in global.css (.cat-<slug>) */
  intro: string;
  metaDescription: string;
}

export const categories: Category[] = [
  {
    slug: 'pdf', name: 'PDF tools', short: 'PDF', icon: 'FileText',
    intro: 'Merge, split, compress, convert and sign PDF files. Everything runs in your browser, so your documents are never uploaded anywhere.',
    metaDescription: 'Free online PDF tools: merge, split, compress, convert, rotate and sign PDFs in your browser. No signup, files never leave your device.',
  },
  {
    slug: 'image', name: 'Image tools', short: 'Image', icon: 'Image',
    intro: 'Compress, resize, crop and convert photos, make passport photos and more. Images are processed on your device and never uploaded.',
    metaDescription: 'Free online image tools: compress, resize, crop and convert photos, HEIC to JPG, passport photos and more. Private and no signup.',
  },
  {
    slug: 'text', name: 'Text tools', short: 'Text', icon: 'Type',
    intro: 'Count words, change case, clean up lists, compare texts and generate fancy fonts. Paste your text and get results instantly.',
    metaDescription: 'Free online text tools: word counter, case converter, remove duplicate lines, text compare, fancy text and more. Fast and private.',
  },
  {
    slug: 'finance', name: 'Finance calculators', short: 'Finance', icon: 'Landmark',
    intro: 'Plan loans, mortgages, savings and budgets with clear calculators that update as you type. Results are estimates to help you plan.',
    metaDescription: 'Free finance calculators: mortgage, loan, compound interest, retirement, savings, tip, discount and sales tax. Instant, easy results.',
  },
  {
    slug: 'health', name: 'Health calculators', short: 'Health', icon: 'HeartPulse',
    intro: 'Check your BMI, daily calorie needs, due date and more. These calculators give general estimates and are not medical advice.',
    metaDescription: 'Free health calculators: BMI, calories, body fat, pregnancy due date, ovulation, water intake and sleep cycles.',
  },
  {
    slug: 'math', name: 'Math and date calculators', short: 'Math & Dates', icon: 'Calculator',
    intro: 'Percentages, ages, date differences, GPA, fractions and a full scientific calculator, all in plain language.',
    metaDescription: 'Free math and date calculators: percentage, age, GPA, grades, date difference, fractions and a scientific calculator.',
  },
  {
    slug: 'converters', name: 'Unit converters', short: 'Converters', icon: 'ArrowLeftRight',
    intro: 'Convert length, weight, temperature, cooking measurements, time zones, shoe sizes and more in a single step.',
    metaDescription: 'Free unit converters: length, weight, temperature, cooking measurements, time zones, shoe sizes, Roman numerals and more.',
  },
  {
    slug: 'developer', name: 'Developer tools', short: 'Developer', icon: 'Code',
    intro: 'Format JSON, encode Base64 and URLs, generate QR codes, passwords, UUIDs and hashes. Your data stays in your browser.',
    metaDescription: 'Free developer tools: JSON formatter, Base64, URL encoder, QR codes, regex tester, hash and password generators.',
  },
  {
    slug: 'seo', name: 'SEO and social media tools', short: 'SEO & Social', icon: 'Search',
    intro: 'Create meta tags, robots.txt and favicons, build UTM links and check titles and captions before you publish.',
    metaDescription: 'Free SEO and social media tools: meta tags, robots.txt, sitemap, favicon generator, UTM builder and caption tools.',
  },
  {
    slug: 'student', name: 'Student tools', short: 'Student', icon: 'GraduationCap',
    intro: 'Citations, flashcards, a Pomodoro timer, typing tests and study helpers that make homework a little easier.',
    metaDescription: 'Free student tools: citation generator, flashcards, Pomodoro timer, typing speed test, equation solver and periodic table.',
  },
  {
    slug: 'everyday', name: 'Everyday tools', short: 'Everyday', icon: 'Sparkles',
    intro: 'Timers, stopwatches, random pickers, a notepad and device tests for the little jobs that come up every day.',
    metaDescription: 'Free everyday tools: stopwatch, timer, random name picker, spin the wheel, coin flip, notepad and mic and webcam test.',
  },
  {
    slug: 'audio-video', name: 'Audio and video tools', short: 'Audio & Video', icon: 'Clapperboard',
    intro: 'Record your voice or screen right in the browser. Recordings stay on your device until you choose to download them.',
    metaDescription: 'Free audio and video tools: voice recorder and screen recorder that work in your browser with no uploads.',
  },
];

export const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c])) as Record<string, Category>;
