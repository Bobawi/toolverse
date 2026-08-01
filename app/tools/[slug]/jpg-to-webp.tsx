import ImageFormatConverter from "@/components/tools/ImageFormatConverter";

export default function JpgToWebp() {
    return (
        <ImageFormatConverter
            fromLabel="JPG"
            toLabel="WebP"
            accept="image/jpeg"
            mimeType="image/webp"
            extension="webp"
            supportsQuality={true}
        />
    );
}

