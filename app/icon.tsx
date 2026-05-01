import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#efe7d0",
          color: "#d35d3a",
          fontSize: 28,
          fontWeight: 400,
          lineHeight: 1
        }}
      >
        ✿
      </div>
    ),
    { ...size }
  );
}
