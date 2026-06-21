import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c0e0d",
          borderRadius: 32,
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontStyle: "italic",
            fontWeight: 700,
            color: "#1fd97e",
            fontFamily: "Georgia, serif",
          }}
        >
          A
        </div>
      </div>
    ),
    { ...size }
  );
}
