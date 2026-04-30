import { ImageResponse } from "next/og";
import { promises as fs } from "node:fs";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PAPER = "#efe7d0";
const INK = "#1c1a17";
const INK_SOFT = "#2f3d33";
const MUTED = "#88907f";
const BURGUNDY = "#6b2820";

async function loadFont(file: string) {
  const fontPath = path.join(process.cwd(), "public", "fonts", file);
  const data = await fs.readFile(fontPath);
  return data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength) as ArrayBuffer;
}

function padNumber(n: number) {
  return String(n).padStart(6, "0");
}

function buildBarcode(seedText: string) {
  let hash = 0;
  for (let i = 0; i < seedText.length; i++) {
    hash = (hash * 31 + seedText.charCodeAt(i)) >>> 0;
  }
  const widths = [1, 2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 1, 2, 1, 4, 2, 1, 2, 3, 1, 2, 1, 3, 4, 1, 2, 1, 3, 2, 1, 4, 1, 2, 3, 1, 2, 1, 4, 1, 2, 3, 1, 2, 1, 3, 2, 4, 1];
  const bars: { w: number; gap: number }[] = [];
  let h = hash || 1;
  for (let i = 0; i < 56; i++) {
    h = (h * 1664525 + 1013904223) >>> 0;
    const w = widths[(h >>> 8) % widths.length];
    const gap = (h & 1) ? 1 : 2;
    bars.push({ w, gap });
  }
  return bars;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = (searchParams.get("name") || "Guest").trim();
  const prev1 = (searchParams.get("prev1") || "").trim();
  const prev2 = (searchParams.get("prev2") || "").trim();
  const numRaw = parseInt(searchParams.get("num") || "0", 10) || 0;
  const num = padNumber(numRaw);

  const [fraunces, frauncesItalic, inter] = await Promise.all([
    loadFont("Fraunces-Regular.ttf"),
    loadFont("Fraunces-Italic.ttf"),
    loadFont("Inter-Medium.ttf")
  ]);

  const bars = buildBarcode(`${num}-${name}`);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: PAPER,
          padding: 0,
          fontFamily: "Fraunces"
        }}
      >
        <div style={{ height: 6, background: BURGUNDY, width: "100%" }} />

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: "56px 56px 40px"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "Inter",
              fontSize: 14,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: INK,
              fontWeight: 500
            }}
          >
            <span>Baby in Bloom</span>
            <span>Baby Shower &rsquo;26</span>
            <span>Vol. I</span>
          </div>

          <div style={{ height: 60 }} />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12
            }}
          >
            <div
              style={{
                fontFamily: "Fraunces",
                fontStyle: "italic",
                fontSize: 32,
                color: INK,
                letterSpacing: -0.4
              }}
            >
              The Arrival List
            </div>
            <div style={{ height: 1, background: INK, opacity: 0.85 }} />
          </div>

          <div style={{ height: 56 }} />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18
            }}
          >
            {prev2 ? (
              <div
                style={{
                  fontFamily: "Fraunces",
                  fontStyle: "italic",
                  fontSize: 28,
                  color: INK_SOFT
                }}
              >
                {prev2}
              </div>
            ) : null}
            <div
              style={{
                fontFamily: "Fraunces",
                fontWeight: 700,
                fontSize: 64,
                color: BURGUNDY,
                letterSpacing: -1,
                textTransform: "uppercase",
                lineHeight: 1.05,
                display: "flex",
                flexWrap: "wrap"
              }}
            >
              {name.toUpperCase()}
            </div>
            {prev1 ? (
              <div
                style={{
                  fontFamily: "Fraunces",
                  fontStyle: "italic",
                  fontSize: 28,
                  color: INK_SOFT
                }}
              >
                {prev1}
              </div>
            ) : null}
          </div>

          <div style={{ flex: 1 }} />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              marginTop: 24
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                height: 70,
                gap: 0
              }}
            >
              {bars.map((b, i) => (
                <div key={i} style={{ display: "flex" }}>
                  <div style={{ width: b.w, height: 70, background: INK }} />
                  <div style={{ width: b.gap }} />
                </div>
              ))}
            </div>
            <div
              style={{
                fontFamily: "Inter",
                fontSize: 12,
                letterSpacing: 6,
                color: INK,
                marginTop: 4
              }}
            >
              {num.split("").join(" ")}
            </div>
          </div>

          <div style={{ height: 16 }} />
          <div style={{ height: 1, background: INK, opacity: 0.8 }} />
          <div style={{ height: 14 }} />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "Inter",
              fontSize: 13,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: INK,
              fontWeight: 500
            }}
          >
            <span>N&deg; {num}</span>
            <span>Take a Seat</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 640,
      height: 1100,
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 400, style: "normal" },
        { name: "Fraunces", data: frauncesItalic, weight: 400, style: "italic" },
        { name: "Fraunces", data: fraunces, weight: 700, style: "normal" },
        { name: "Inter", data: inter, weight: 500, style: "normal" }
      ],
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    }
  );
}
