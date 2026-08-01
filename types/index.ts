export interface FaqItem {
    question: string;
    answer: string;
}

export interface HowToStep {
    step: number;
    title: string;
    description: string;
}

export interface SeoData {
    title: string;
    description: string;
    ogImage?: string;
}

export interface Tool {
    slug: string;
    name: string;
    description: string;
    category: string;
    icon: string;
    color: string;
    bgColor: string;
    popular?: boolean;
    seo?: SeoData;
    faq?: FaqItem[];
    howToUse?: HowToStep[];
}

export interface Category {
    slug: string;
    name: string;
    icon: string;
    color: string;
    bgColor: string;
}

export interface BlogSection {
    heading?: string;
    paragraphs?: string[];
    list?: string[];
    tip?: string;
    toolCta?: {
        slug: string;
        text: string;
    };
    faq?: FaqItem[];
}

export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    readTime: string;
    category: string;
    icon: string;
    tags: string[];
    seo?: SeoData;
    sections: BlogSection[];
}
