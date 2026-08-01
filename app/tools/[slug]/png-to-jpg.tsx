import ImageFormatConverter from "@/components/tools/ImageFormatConverter";

export default function PngToJpg() {
    return (
        <ImageFormatConverter
            fromLabel="PNG"
            toLabel="JPG"
            accept="image/png"
            mimeType="image/jpeg"
            extension="jpg"
            supportsQuality={true}
            needsWhiteBackground={true}
        />
    );
}

