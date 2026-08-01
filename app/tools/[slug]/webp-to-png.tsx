import ImageFormatConverter from "@/components/tools/ImageFormatConverter";

export default function WebpToPng() {
    return (
        <ImageFormatConverter
            fromLabel="WebP"
            toLabel="PNG"
            accept="image/webp"
            mimeType="image/png"
            extension="png"
            supportsQuality={false}
        />
    );
}

