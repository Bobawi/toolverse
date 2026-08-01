import { notFound } from "next/navigation";
import { use } from "react";
import type { Metadata } from "next";
import { tools, getToolBySlug } from "@/data/tools";
import ToolLayout from "@/components/ui/ToolLayout";
import ToolFAQ from "@/components/tool-layout/ToolFAQ";
import ToolHowToUse from "@/components/tool-layout/ToolHowToUse";
import ToolRelatedTools from "@/components/tool-layout/ToolRelatedTools";
import QRGenerator from "./qr-generator";
import PasswordGenerator from "./password-generator";
import JsonFormatter from "./json-formatter";
import AgeCalculator from "./age-calculator";
import LoanCalculator from "./loan-calculator";
import CharacterCounter from "./character-counter";
import Base64Tool from "./base64-tool";
import CaseConverter from "./case-converter";
import ColorConverter from "./color-converter";
import HashGenerator from "./hash-generator";
import TextToSpeech from "./text-to-speech";
import UnitConverter from "./unit-converter";
import MarkdownEditor from "./markdown-editor";
import UuidGenerator from "./uuid-generator";
import ImageCompressor from "./image-compressor";
import ImageResizer from "./image-resizer";
import ImageCropper from "./image-cropper";
import HtmlEncoder from "./html-encoder";
import DateCalculator from "./date-calculator";
import SlugGenerator from "./slug-generator";
import LoremIpsum from "./lorem-ipsum";
import BmiCalculator from "./bmi-calculator";
import PercentageCalculator from "./percentage-calculator";
import VatCalculator from "./vat-calculator";
import JpgToPng from "./jpg-to-png";
import PngToJpg from "./png-to-jpg";
import PngToWebp from "./png-to-webp";
import JpgToWebp from "./jpg-to-webp";
import WebpToPng from "./webp-to-png";
import WebpToJpg from "./webp-to-jpg";
import ImageRotator from "./image-rotator";
import ImageFlipper from "./image-flipper";
import ImageToBase64 from "./image-to-base64";
import MergePdf from "./merge-pdf";
import SplitPdf from "./split-pdf";
import CompressPdf from "./compress-pdf";
import PdfToImage from "./pdf-to-image";
import ImageToPdf from "./image-to-pdf";
import UrlEncoder from "./url-encoder";
import JwtDecoder from "./jwt-decoder";
import PasswordStrength from "./password-strength";

const toolComponents: Record<string, React.ComponentType> = {
    "qr-generator": QRGenerator,
    "password-generator": PasswordGenerator,
    "json-formatter": JsonFormatter,
    "age-calculator": AgeCalculator,
    "loan-calculator": LoanCalculator,
    "character-counter": CharacterCounter,
    "base64-encoder": Base64Tool,
    "case-converter": CaseConverter,
    "color-converter": ColorConverter,
    "hash-generator": HashGenerator,
    "text-to-speech": TextToSpeech,
    "unit-converter": UnitConverter,
    "markdown-editor": MarkdownEditor,
    "uuid-generator": UuidGenerator,
    "image-compressor": ImageCompressor,
    "image-resizer": ImageResizer,
    "image-cropper": ImageCropper,
    "html-encoder": HtmlEncoder,
    "date-calculator": DateCalculator,
    "slug-generator": SlugGenerator,
    "lorem-ipsum": LoremIpsum,
    "bmi-calculator": BmiCalculator,
    "percentage-calculator": PercentageCalculator,
    "vat-calculator": VatCalculator,
    "jpg-to-png": JpgToPng,
    "png-to-jpg": PngToJpg,
    "png-to-webp": PngToWebp,
    "jpg-to-webp": JpgToWebp,
    "webp-to-png": WebpToPng,
    "webp-to-jpg": WebpToJpg,
    "image-rotator": ImageRotator,
    "image-flipper": ImageFlipper,
    "image-to-base64": ImageToBase64,
    "merge-pdf": MergePdf,
    "split-pdf": SplitPdf,
    "compress-pdf": CompressPdf,
    "pdf-to-image": PdfToImage,
"image-to-pdf": ImageToPdf,
    "url-encoder": UrlEncoder,
    "jwt-decoder": JwtDecoder,
    "password-strength": PasswordStrength,
};

export function generateStaticParams() {
    return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const tool = getToolBySlug(slug);
    if (!tool) return {};

    return {
        title: tool.seo?.title ?? `${tool.name} - Free Online Tool | ToolVerse`,
        description:
            tool.seo?.description ??
            `${tool.name} - ${tool.description} Free, fast, no sign-up required.`,
        alternates: {
            canonical: `https://toolverse.app/tools/${tool.slug}`,
        },
        openGraph: {
            title: tool.seo?.title ?? `${tool.name} - Free Online Tool`,
            description:
                tool.seo?.description ?? `${tool.description} No sign-up required.`,
            type: "website",
            url: `https://toolverse.app/tools/${tool.slug}`,
        },
        twitter: {
            card: "summary",
            title: tool.seo?.title ?? `${tool.name} - Free Online Tool`,
            description:
                tool.seo?.description ?? `${tool.description} Free and fast.`,
        },
    };
}

export default function ToolPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = use(params);
    const tool = getToolBySlug(slug);
    if (!tool) notFound();

    const ToolComponent = toolComponents[slug];

    return (
        <ToolLayout
            name={tool.name}
            slug={tool.slug}
            description={tool.description}
            icon={tool.icon}
            bgColor={tool.bgColor}
        >
            {ToolComponent ? (
                <ToolComponent />
            ) : (
                <div className="py-12 text-center">
                    <p className="text-lg text-muted">This tool is coming soon...</p>
                </div>
            )}

            {tool.howToUse && <ToolHowToUse steps={tool.howToUse} />}
            {tool.faq && <ToolFAQ faq={tool.faq} />}

            <ToolRelatedTools slug={slug} />
        </ToolLayout>
    );
}

