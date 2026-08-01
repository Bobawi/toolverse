import ImageFormatConverter from "@/components/tools/ImageFormatConverter";

export default function JpgToPng() {
    return (
        <ImageFormatConverter
            fromLabel="JPG"
            toLabel="PNG"
            accept="image/jpeg"
            mimeType="image/png"
            extension="png"
            supportsQuality={false}
        />
    );
}

