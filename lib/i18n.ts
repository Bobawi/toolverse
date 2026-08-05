import { LOCALES, DEFAULT_LOCALE } from "@/lib/site";

export type Locale = (typeof LOCALES)[number]["code"];

/**
 * Simple client-side UI dictionary used for the language switcher.
 * Scope: homepage, navigation, footer, key Moroccan tools.
 * The rest of the app remains in English for now.
 */
export const translations: Record<
    Locale,
    Record<string, string>
> = {
    en: {
        // Nav
        "nav.home": "Home",
        "nav.tools": "Tools",
        "nav.blog": "Blog",
        "nav.about": "About",
        "nav.contact": "Contact",
        "nav.search": "Search tools...",

        // Hero
        "hero.badge": "Free Online Tools",
        "hero.title1": "Free Online",
        "hero.title2": "Tools",
        "hero.title3": "That Actually Work",
        "hero.subtitle": "No ads. No sign-ups. Just fast, reliable tools for developers, designers, and everyone.",
        "hero.cta.tools": "Explore Tools",
        "hero.cta.categories": "Browse Categories",
        "hero.popular": "Popular:",
        "stat.freeTools": "Free Tools",
        "stat.categories": "Categories",
        "stat.100free": "100% Free",
        "stat.noSignup": "No Sign-up Required",
        "stat.articles": "Blog Articles",

        // Popular
        "popular.badge": "Most Used",
        "popular.title": "🔥 Popular Tools",
        "popular.subtitle": "Most used tools by our community",
        "popular.viewAll": "View all tools →",

        // Categories
        "categories.badge": "Categories",
        "categories.title": "Browse Categories",
        "categories.subtitle": "Find the right tool for your task",

        // CTA
        "cta.title": "Ready to Get Started?",
        "cta.subtitle": "All our tools are free, fast, and private. No sign-up, no uploads to servers — everything runs in your browser.",
        "cta.browse": "Browse All Tools →",
        "cta.blog": "Read Our Blog",

        // Tools page
        "tools.title": "All Tools",
        "tools.subtitle": "Free online tools for images, PDFs, developers, text, AI, and everyday tasks. Fast, secure, and privacy-friendly.",
        "tools.available": "Tools Available",
        "tools.all": "All",
        "tools.search": "Search tools by name or category...",
        "tools.noResults": "No tools found. Try a different search or category.",
        "tools.noCategory": "No tools found in this category.",

        // Homepage sections
        "home.popularBadge": "Most Used",
        "home.popularTitle": "🔥 Popular Tools",
        "home.popularSubtitle": "Most used tools by our community",
        "home.viewAll": "View all tools →",
        "home.categoriesBadge": "Categories",
        "home.categoriesTitle": "Browse Categories",
        "home.categoriesSubtitle": "Find the right tool for your task",
        "home.ctaTitle": "Ready to Get Started?",
        "home.ctaSubtitle": "All our tools are free, fast, and private. No sign-up, no uploads to servers — everything runs in your browser.",
        "home.ctaBrowse": "Browse All Tools →",
        "home.ctaBlog": "Read Our Blog",

        // Categories
        "cat.image": "Image",
        "cat.pdf": "PDF",
        "cat.developer": "Developer",
        "cat.calculators": "Calculators",
        "cat.ai": "AI",
        "cat.text": "Text",
        "cat.security": "Security",
        "cat.converter": "Converter",

        // Tool card badges & tags
        "badge.popular": "⭐ Most Popular",
        "badge.new": "🆕 New",
        "badge.trending": "🔥 Trending",
        "card.browserBased": "🖥 Browser-based",
        "card.free": "🆓 Free",
        "card.instant": "⚡ Instant",

        // Tool detail sections
        "tool.features": "Features",
        "tool.howToUse": "How to Use",
        "tool.faq": "Frequently Asked Questions",
        "tool.relatedTools": "Related Tools",
        "tool.comingSoon": "This tool is coming soon...",
        "related.subtitle": "More useful tools in the {cat} category",

        // Share buttons
        "share.title": "Share this tool",
        "share.copy": "Copy",
        "share.copied": "✅ Copied!",
        "share.on": "Share on {name}",

        // Search dropdown
        "search.viewAll": "View all {n} results",
        "search.noFound": "No tools found for \"{q}\"",

        // Footer
        "footer.tagline": "Free online tools for images, PDFs, developers, text, AI, and everyday tasks. Fast, secure, and privacy-friendly.",
        "footer.nav": "Navigation",
        "footer.categories": "Categories",
        "footer.legal": "Legal",
        "footer.privacy": "Privacy Policy",
        "footer.terms": "Terms of Service",
        "footer.about": "About Us",
        "footer.contact": "Contact",
        "footer.rights": "All rights reserved.",
    },
    fr: {
        // Nav
        "nav.home": "Accueil",
        "nav.tools": "Outils",
        "nav.blog": "Blog",
        "nav.about": "À propos",
        "nav.contact": "Contact",
        "nav.search": "Rechercher des outils...",

        // Hero
        "hero.badge": "Outils gratuits en ligne",
        "hero.title1": "Des outils",
        "hero.title2": "gratuits",
        "hero.title3": "qui fonctionnent vraiment",
        "hero.subtitle": "Pas de pubs. Pas d'inscription. Juste des outils rapides et fiables pour développeurs, designers et tous.",
        "hero.cta.tools": "Explorer les outils",
        "hero.cta.categories": "Voir les catégories",
        "hero.popular": "Populaires :",
        "stat.freeTools": "Outils gratuits",
        "stat.categories": "Catégories",
        "stat.100free": "100% Gratuit",
        "stat.noSignup": "Sans inscription",
        "stat.articles": "Articles de blog",

        // Popular
        "popular.badge": "Les plus utilisés",
        "popular.title": "🔥 Outils populaires",
        "popular.subtitle": "Les outils les plus utilisés par notre communauté",
        "popular.viewAll": "Voir tous les outils →",

        // Categories
        "categories.badge": "Catégories",
        "categories.title": "Parcourir les catégories",
        "categories.subtitle": "Trouvez l'outil adapté à votre tâche",

        // CTA
        "cta.title": "Prêt à commencer ?",
        "cta.subtitle": "Tous nos outils sont gratuits, rapides et privés. Pas d'inscription, pas d'upload sur des serveurs — tout fonctionne dans votre navigateur.",
        "cta.browse": "Voir tous les outils →",
        "cta.blog": "Lire notre blog",

        // Tools page
        "tools.title": "Tous les outils",
        "tools.subtitle": "Outils gratuits pour images, PDF, développeurs, texte, IA et tâches quotidiennes. Rapides, sécurisés et respectueux de la vie privée.",
        "tools.available": "Outils disponibles",
        "tools.all": "Tous",
        "tools.search": "Rechercher un outil par nom ou catégorie...",
        "tools.noResults": "Aucun outil trouvé. Essayez une autre recherche ou catégorie.",
        "tools.noCategory": "Aucun outil trouvé dans cette catégorie.",

        // Homepage sections
        "home.popularBadge": "Les plus utilisés",
        "home.popularTitle": "🔥 Outils populaires",
        "home.popularSubtitle": "Les outils les plus utilisés par notre communauté",
        "home.viewAll": "Voir tous les outils →",
        "home.categoriesBadge": "Catégories",
        "home.categoriesTitle": "Parcourir les catégories",
        "home.categoriesSubtitle": "Trouvez l'outil adapté à votre tâche",
        "home.ctaTitle": "Prêt à commencer ?",
        "home.ctaSubtitle": "Tous nos outils sont gratuits, rapides et privés. Pas d'inscription, pas d'upload sur des serveurs — tout fonctionne dans votre navigateur.",
        "home.ctaBrowse": "Voir tous les outils →",
        "home.ctaBlog": "Lire notre blog",

        // Categories
        "cat.image": "Image",
        "cat.pdf": "PDF",
        "cat.developer": "Développeur",
        "cat.calculators": "Calculatrices",
        "cat.ai": "IA",
        "cat.text": "Texte",
        "cat.security": "Sécurité",
        "cat.converter": "Convertisseur",

        // Tool card badges & tags
        "badge.popular": "⭐ Les plus populaires",
        "badge.new": "🆕 Nouveau",
        "badge.trending": "🔥 Tendance",
        "card.browserBased": "🖥 Navigateur",
        "card.free": "🆓 Gratuit",
        "card.instant": "⚡ Instantané",

        // Tool detail sections
        "tool.features": "Caractéristiques",
        "tool.howToUse": "Comment utiliser",
        "tool.faq": "Questions fréquentes",
        "tool.relatedTools": "Outils similaires",
        "tool.comingSoon": "Cet outil arrive bientôt...",
        "related.subtitle": "Plus d'outils utiles dans la catégorie {cat}",

        // Share buttons
        "share.title": "Partager cet outil",
        "share.copy": "Copier",
        "share.copied": "✅ Copié !",
        "share.on": "Partager sur {name}",

        // Search dropdown
        "search.viewAll": "Voir tous les {n} résultats",
        "search.noFound": "Aucun outil trouvé pour « {q} »",

        // Footer
        "footer.tagline": "Outils gratuits en ligne pour images, PDF, développeurs, texte, IA et tâches quotidiennes. Rapides, sécurisés et privés.",
        "footer.nav": "Navigation",
        "footer.categories": "Catégories",
        "footer.legal": "Légal",
        "footer.privacy": "Politique de confidentialité",
        "footer.terms": "Conditions d'utilisation",
        "footer.about": "À propos",
        "footer.contact": "Contact",
        "footer.rights": "Tous droits réservés.",
    },
    ar: {
        // Nav
        "nav.home": "الرئيسية",
        "nav.tools": "الأدوات",
        "nav.blog": "المدونة",
        "nav.about": "من نحن",
        "nav.contact": "اتصل بنا",
        "nav.search": "ابحث عن أدوات...",

        // Hero
        "hero.badge": "أدوات مجانية على الإنترنت",
        "hero.title1": "أدوات مجانية",
        "hero.title2": "على الإنترنت",
        "hero.title3": "تعمل فعلاً",
        "hero.subtitle": "بدون إعلانات، بدون تسجيل. فقط أدوات سريعة وموثوقة للمطورين والمصممين وللجميع.",
        "hero.cta.tools": "استكشف الأدوات",
        "hero.cta.categories": "تصفح الفئات",
        "hero.popular": "الأكثر استخداماً:",
        "stat.freeTools": "أداة مجانية",
        "stat.categories": "فئة",
        "stat.100free": "مجاني 100%",
        "stat.noSignup": "بدون تسجيل",
        "stat.articles": "مقالات المدونة",

        // Popular
        "popular.badge": "الأكثر استخداماً",
        "popular.title": "🔥 الأدوات الشائعة",
        "popular.subtitle": "الأدوات الأكثر استخداماً من قبل مجتمعنا",
        "popular.viewAll": "عرض كل الأدوات ←",

        // Categories
        "categories.badge": "الفئات",
        "categories.title": "تصفح الفئات",
        "categories.subtitle": "ابحث عن الأداة المناسبة لمهمتك",

        // CTA
        "cta.title": "مستعد للبدء؟",
        "cta.subtitle": "جميع أدواتنا مجانية وسريعة وآمنة. بدون تسجيل، بدون رفع للملفات إلى الخوادم — كل شيء يعمل في متصفحك.",
        "cta.browse": "تصفح كل الأدوات ←",
        "cta.blog": "اقرأ مدونتنا",

        // Tools page
        "tools.title": "كل الأدوات",
        "tools.subtitle": "أدوات مجانية للصور، PDF، المطورين، النصوص، الذكاء الاصطناعي والمهام اليومية. سريعة وآمنة.",
        "tools.available": "أداة متاحة",
        "tools.all": "الكل",
        "tools.search": "ابحث عن أداة بالاسم أو الفئة...",
        "tools.noResults": "لا توجد أدوات. جرب بحثاً أو فئة أخرى.",
        "tools.noCategory": "لا توجد أدوات في هذه الفئة.",

        // Homepage sections
        "home.popularBadge": "الأكثر استخداماً",
        "home.popularTitle": "🔥 الأدوات الشائعة",
        "home.popularSubtitle": "الأدوات الأكثر استخداماً من قبل مجتمعنا",
        "home.viewAll": "عرض كل الأدوات ←",
        "home.categoriesBadge": "الفئات",
        "home.categoriesTitle": "تصفح الفئات",
        "home.categoriesSubtitle": "ابحث عن الأداة المناسبة لمهمتك",
        "home.ctaTitle": "مستعد للبدء؟",
        "home.ctaSubtitle": "جميع أدواتنا مجانية وسريعة وآمنة. بدون تسجيل، بدون رفع للملفات إلى الخوادم — كل شيء يعمل في متصفحك.",
        "home.ctaBrowse": "تصفح كل الأدوات ←",
        "home.ctaBlog": "اقرأ مدونتنا",

        // Categories
        "cat.image": "الصور",
        "cat.pdf": "PDF",
        "cat.developer": "المطورون",
        "cat.calculators": "الآلات الحاسبة",
        "cat.ai": "الذكاء الاصطناعي",
        "cat.text": "النصوص",
        "cat.security": "الأمان",
        "cat.converter": "المحول",

        // Tool card badges & tags
        "badge.popular": "⭐ الأكثر شهرة",
        "badge.new": "🆕 جديد",
        "badge.trending": "🔥 رائج",
        "card.browserBased": "🖥 يعمل في المتصفح",
        "card.free": "🆓 مجاني",
        "card.instant": "⚡ فوري",

        // Tool detail sections
        "tool.features": "المميزات",
        "tool.howToUse": "طريقة الاستخدام",
        "tool.faq": "الأسئلة الشائعة",
        "tool.relatedTools": "أدوات ذات صلة",
        "tool.comingSoon": "هذه الأداة قريباً...",
        "related.subtitle": "أدوات مفيدة أخرى في فئة {cat}",

        // Share buttons
        "share.title": "شارك هذه الأداة",
        "share.copy": "نسخ",
        "share.copied": "✅ تم النسخ!",
        "share.on": "شارك على {name}",

        // Search dropdown
        "search.viewAll": "عرض كل النتائج ({n})",
        "search.noFound": "لا توجد أدوات مطابقة لـ « {q} »",

        // Footer
        "footer.tagline": "أدوات مجانية للصور، PDF، المطورين، النصوص، الذكاء الاصطناعي والمهام اليومية. سريعة وآمنة وخاصة.",
        "footer.nav": "التنقل",
        "footer.categories": "الفئات",
        "footer.legal": "قانوني",
        "footer.privacy": "سياسة الخصوصية",
        "footer.terms": "شروط الاستخدام",
        "footer.about": "من نحن",
        "footer.contact": "اتصل بنا",
        "footer.rights": "جميع الحقوق محفوظة.",
    },
};

export function translate(locale: Locale, key: string): string {
    return translations[locale]?.[key] ?? translations[DEFAULT_LOCALE]?.[key] ?? key;
}
