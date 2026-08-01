import ImageFormatConverter from "@/components/tools/ImageFormatConverter";

export default function PngToWebp() {
    return (
        <ImageFormatConverter
            fromLabel="PNG"
            toLabel="WebP"
            accept="image/png"
            mimeType="image/webp"
            extension="webp"
            supportsQuality={true}
        />
    );
}

