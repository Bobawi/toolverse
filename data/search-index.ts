// Lightweight search index — only the fields SearchTools needs.
// This keeps the homepage JS bundle tiny instead of importing the
// full tools.ts (SEO/FAQ/howToUse data) into client components.

export interface SearchTool {
    slug: string;
    name: string;
    description: string;
    category: string;
    icon: string;
}

export const searchIndex: SearchTool[] = [
    { slug: "qr-generator", name: "QR Code Generator", description: "Generate custom QR codes for URLs, text, and more. Download as PNG instantly.", category: "developer", icon: "📱" },
    { slug: "password-generator", name: "Password Generator", description: "Create strong, secure passwords with customizable length and character types.", category: "security", icon: "🔑" },
    { slug: "json-formatter", name: "JSON Formatter", description: "Format, validate, and beautify JSON data with syntax highlighting.", category: "developer", icon: "📋" },
    { slug: "age-calculator", name: "Age Calculator", description: "Calculate exact age in years, months, days, hours, and minutes from any date.", category: "calculators", icon: "🎂" },
    { slug: "loan-calculator", name: "Loan Calculator", description: "Calculate monthly payments, total interest, and amortization schedule for loans.", category: "calculators", icon: "💰" },
    { slug: "image-compressor", name: "Image Compressor", description: "Compress JPEG, PNG, and WebP images online for free. Reduce file size while maintaining quality.", category: "image", icon: "📷" },
    { slug: "merge-pdf", name: "Merge PDF", description: "Combine multiple PDF files into a single PDF document quickly.", category: "pdf", icon: "📄" },
    { slug: "split-pdf", name: "Split PDF", description: "Split PDF files into separate pages or page ranges. Extract pages with custom ranges.", category: "pdf", icon: "📑" },
    { slug: "compress-pdf", name: "Compress PDF", description: "Reduce PDF file size online for free. Compress PDFs to make them easier to share.", category: "pdf", icon: "🗜️" },
    { slug: "pdf-to-image", name: "PDF to Image", description: "Convert PDF pages to high-quality PNG or JPG images. Extract pages as images.", category: "pdf", icon: "🖼️" },
    { slug: "image-to-pdf", name: "Image to PDF", description: "Convert JPG, PNG, WebP, and other images to PDF. Create PDF from multiple images.", category: "pdf", icon: "📸" },
    { slug: "base64-encoder", name: "Base64 Encoder/Decoder", description: "Encode or decode text and files to/from Base64 format instantly.", category: "developer", icon: "🔤" },
    { slug: "color-converter", name: "Color Converter", description: "Convert colors between HEX, RGB, HSL, and CMYK formats.", category: "developer", icon: "🎨" },
    { slug: "character-counter", name: "Character Counter", description: "Count characters, words, sentences, and paragraphs in your text.", category: "text", icon: "📊" },
    { slug: "uuid-generator", name: "UUID Generator", description: "Generate random UUIDs (v4) for use in databases and distributed systems.", category: "developer", icon: "🆔" },
    { slug: "text-to-speech", name: "Text to Speech", description: "Convert text into natural-sounding speech using browser TTS API.", category: "ai", icon: "🔊" },
    { slug: "unit-converter", name: "Unit Converter", description: "Convert between different units of length, weight, temperature, and more.", category: "converter", icon: "📏" },
    { slug: "markdown-editor", name: "Markdown Editor", description: "Write and preview Markdown with live rendering and syntax highlighting.", category: "developer", icon: "📝" },
    { slug: "hash-generator", name: "Hash Generator", description: "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes for any text.", category: "security", icon: "🔐" },
    { slug: "date-calculator", name: "Date Calculator", description: "Add or subtract days from a date, or calculate the difference between two dates.", category: "calculators", icon: "📅" },
    { slug: "case-converter", name: "Case Converter", description: "Convert text between uppercase, lowercase, title case, and camelCase.", category: "text", icon: "🔠" },
    { slug: "html-encoder", name: "HTML Encoder/Decoder", description: "Encode or decode HTML entities for safe web formatting.", category: "developer", icon: "🌐" },
    { slug: "slug-generator", name: "Slug Generator", description: "Generate SEO-friendly URL slugs from any text instantly.", category: "text", icon: "🔗" },
    { slug: "lorem-ipsum", name: "Lorem Ipsum Generator", description: "Generate placeholder text for your design and layout projects.", category: "text", icon: "📝" },
    { slug: "bmi-calculator", name: "BMI Calculator", description: "Calculate your Body Mass Index and check your weight category (underweight, normal, overweight, obese).", category: "calculators", icon: "⚖️" },
    { slug: "percentage-calculator", name: "Percentage Calculator", description: "Calculate percentages - find what % A is of B, percentage change, and value from percentage.", category: "calculators", icon: "💯" },
    { slug: "vat-calculator", name: "VAT Calculator", description: "Add or remove VAT from amounts with customizable VAT rates (5%, 10%, 13%, 20%, 27%).", category: "calculators", icon: "🧾" },
    { slug: "image-resizer", name: "Image Resizer", description: "Resize images to any dimensions with aspect ratio lock. Choose from presets like Instagram, Twitter, YouTube sizes.", category: "image", icon: "📐" },
    { slug: "image-cropper", name: "Image Cropper", description: "Crop images with free-form or preset aspect ratios (1:1, 4:3, 16:9, 3:4, 9:16). Download in JPEG, PNG or WebP.", category: "image", icon: "✂️" },
    { slug: "jpg-to-png", name: "JPG to PNG", description: "Convert JPG images to PNG format online for free. Perfect for transparent backgrounds and lossless quality.", category: "image", icon: "🖼" },
    { slug: "png-to-jpg", name: "PNG to JPG", description: "Convert PNG images to JPG format online for free. Smaller file size with adjustable quality.", category: "image", icon: "🌄" },
    { slug: "png-to-webp", name: "PNG to WebP", description: "Convert PNG images to WebP format online for free. Modern format with excellent compression.", category: "image", icon: "🌐" },
    { slug: "jpg-to-webp", name: "JPG to WebP", description: "Convert JPG images to WebP format online for free. Modern format with superior compression for faster loading.", category: "image", icon: "⚡" },
    { slug: "webp-to-png", name: "WebP to PNG", description: "Convert WebP images to PNG format online for free. Lossless quality with transparent background support.", category: "image", icon: "🖼️" },
    { slug: "webp-to-jpg", name: "WebP to JPG", description: "Convert WebP images to JPG format online for free. Smaller files with adjustable quality.", category: "image", icon: "🖼" },
    { slug: "image-rotator", name: "Image Rotator", description: "Rotate images 90°, 180°, or 270° clockwise or counterclockwise. Download in JPEG, PNG or WebP.", category: "image", icon: "🔄" },
    { slug: "image-flipper", name: "Image Flipper", description: "Flip images horizontally, vertically, or both directions. Download in JPEG, PNG or WebP.", category: "image", icon: "🪞" },
    { slug: "image-to-base64", name: "Image to Base64", description: "Convert images to Base64 string for embedding in HTML, CSS, or JSON. Copy or download instantly.", category: "developer", icon: "🔢" },
    { slug: "url-encoder", name: "URL Encoder/Decoder", description: "Encode or decode URLs and text to/from URL-safe format instantly.", category: "developer", icon: "🔗" },
    { slug: "jwt-decoder", name: "JWT Decoder", description: "Decode JWT tokens and view the header and payload in readable JSON format.", category: "developer", icon: "🔐" },
    { slug: "password-strength", name: "Password Strength Checker", description: "Check how strong your password is with real-time analysis and improvement tips.", category: "security", icon: "🛡️" },
];

