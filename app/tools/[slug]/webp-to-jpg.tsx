import ImageFormatConverter from "@/components/tools/ImageFormatConverter";

export default function WebpToJpg() {
    return (
        <ImageFormatConverter
            fromLabel="WebP"
            toLabel="JPG"
            accept="image/webp"
            mimeType="image/jpeg"
            extension="jpg"
            supportsQuality={true}
            needsWhiteBackground={true}
        />
    );
}

