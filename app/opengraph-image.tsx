import { ImageResponse } from "next/og";

export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

export default function OpengraphImage() {
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
                    background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)",
                    fontFamily: "sans-serif",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 120,
                        height: 120,
                        borderRadius: 28,
                        background: "rgba(255,255,255,0.15)",
                        fontSize: 64,
                        fontWeight: 700,
                        color: "#ffffff",
                    }}
                >
                    T
                </div>
                <div
                    style={{
                        marginTop: 32,
                        fontSize: 72,
                        fontWeight: 800,
                        color: "#ffffff",
                        letterSpacing: -2,
                    }}
                >
                    ToolVerse
                </div>
                <div
                    style={{
                        marginTop: 16,
                        fontSize: 30,
                        color: "#dbeafe",
                        textAlign: "center",
                        padding: "0 80px",
                    }}
                >
                    Free Online Tools for Images, PDFs, Developers &amp; More
                </div>
                <div
                    style={{
                        marginTop: 40,
                        display: "flex",
                        gap: 12,
                    }}
                >
                    {["Fast", "Free", "Private"].map((tag) => (
                        <div
                            key={tag}
                            style={{
                                padding: "10px 24px",
                                borderRadius: 999,
                                background: "rgba(255,255,255,0.15)",
                                fontSize: 22,
                                color: "#ffffff",
                            }}
                        >
                            {tag}
                        </div>
                    ))}
                </div>
            </div>
        ),
        size
    );
}

