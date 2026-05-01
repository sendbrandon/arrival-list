import { ImageResponse } from "next/og";
import { promises as fs } from "node:fs";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PAPER = "#efe7d0";
const INK = "#1c1a17";
const INK_SOFT = "#2f3d33";
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

function partyLabel(party: string) {
  const p = party.toLowerCase();
  if (p === "1") return "Party of 1";
  if (p === "2") return "Party of 2";
  if (p === "family") return "Family";
  return "Party of 1";
}

function admitLabel(attending: string) {
  const a = attending.toLowerCase();
  if (a === "maybe") return "Saving Your Seat";
  if (a === "no") return "Not Attending";
  return "Confirmed Guest";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = (searchParams.get("name") || "Guest").trim();
  const numRaw = parseInt(searchParams.get("num") || "0", 10) || 0;
  const num = padNumber(numRaw);
  const party = searchParams.get("party") || "1";
  const attending = searchParams.get("attending") || "yes";

  const [fraunces, frauncesItalic, inter] = await Promise.all([
    loadFont("Fraunces-Regular.ttf"),
    loadFont("Fraunces-Italic.ttf"),
    loadFont("Inter-Medium.ttf")
  ]);

  // Barcode is deterministic on num+name so the on-screen number and the
  // visual code reference the same record.
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
            padding: "44px 56px 32px"
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

          <div style={{ height: 48 }} />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10
            }}
          >
            <div
              style={{
                fontFamily: "Fraunces",
                fontStyle: "italic",
                fontSize: 30,
                color: INK,
                letterSpacing: -0.4
              }}
            >
              The Guest List
            </div>
            <div style={{ height: 1, background: INK, opacity: 0.85 }} />
          </div>

          <div style={{ height: 40 }} />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14
            }}
          >
            <div
              style={{
                fontFamily: "Fraunces",
                fontStyle: "italic",
                fontSize: 26,
                color: INK_SOFT
              }}
            >
              {admitLabel(attending)}
            </div>
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
            <div
              style={{
                fontFamily: "Fraunces",
                fontStyle: "italic",
                fontSize: 26,
                color: INK_SOFT
              }}
            >
              {partyLabel(party)}
            </div>
          </div>

          <div style={{ flex: 1 }} />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              marginTop: 0
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                height: 60,
                gap: 0
              }}
            >
              {bars.map((b, i) => (
                <div key={i} style={{ display: "flex" }}>
                  <div style={{ width: b.w, height: 60, background: INK }} />
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

          <div style={{ height: 14 }} />
          <div style={{ height: 1, background: INK, opacity: 0.8 }} />
          <div style={{ height: 12 }} />

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
      height: 940,
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
