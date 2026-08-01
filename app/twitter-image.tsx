import { ImageResponse } from "next/og";

export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

export const alt = "ToolVerse - Free Online Tools";

export default function TwitterImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #0b1121 0%, #1e3a8a 100%)",
                    fontFamily: "sans-serif",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 96,
                        height: 96,
                        borderRadius: 24,
                        background: "#2563eb",
                        fontSize: 52,
                        fontWeight: 700,
                        color: "#ffffff",
                    }}
                >
                    T
                </div>
                <div
                    style={{
                        marginTop: 28,
                        fontSize: 64,
                        fontWeight: 800,
                        color: "#ffffff",
                        letterSpacing: -2,
                    }}
                >
                    ToolVerse
                </div>
                <div
                    style={{
                        marginTop: 12,
                        fontSize: 26,
                        color: "#93c5fd",
                    }}
                >
                    Fast • Free • Privacy-first
                </div>
            </div>
        ),
        size
    );
}

