import Link from "next/link";
import { siteCopy } from "@/lib/copy";
import "./bloom.css";

export default function BloomPage() {
  return (
    <main className="bloom">
      <div className="bloom__frame" aria-hidden="true">
        {/* Wavy yellow border */}
        <svg className="bloom__border" viewBox="0 0 1000 1300" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M 50 80 Q 80 50, 120 70 Q 180 95, 250 65 Q 340 35, 430 70 Q 540 105, 650 70 Q 760 35, 850 70 Q 920 95, 950 80 L 950 1220 Q 920 1250, 870 1230 Q 780 1205, 690 1235 Q 580 1265, 470 1230 Q 360 1195, 250 1230 Q 140 1265, 80 1230 Q 60 1220, 50 1220 Z"
            fill="none"
            stroke="#d8a93a"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.85"
          />
        </svg>

        {/* Top-left botanical cluster */}
        <svg className="bloom__sprig bloom__sprig--tl" viewBox="0 0 200 280" aria-hidden="true">
          <path d="M 100 270 Q 95 220, 80 180 Q 65 140, 70 100 Q 75 60, 90 30" stroke="#3a5642" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <ellipse cx="60" cy="180" rx="6" ry="14" fill="#3a5642" opacity="0.85" transform="rotate(-30 60 180)"/>
          <ellipse cx="105" cy="160" rx="6" ry="14" fill="#3a5642" opacity="0.85" transform="rotate(20 105 160)"/>
          <ellipse cx="55" cy="135" rx="5" ry="12" fill="#3a5642" opacity="0.85" transform="rotate(-25 55 135)"/>
          <ellipse cx="100" cy="115" rx="5" ry="12" fill="#3a5642" opacity="0.85" transform="rotate(15 100 115)"/>
          <ellipse cx="60" cy="90" rx="5" ry="11" fill="#3a5642" opacity="0.85" transform="rotate(-20 60 90)"/>
          <ellipse cx="95" cy="65" rx="4" ry="10" fill="#3a5642" opacity="0.85" transform="rotate(10 95 65)"/>
          <circle cx="92" cy="32" r="3" fill="#3a5642"/>
        </svg>

        {/* Top-right botanical cluster */}
        <svg className="bloom__sprig bloom__sprig--tr" viewBox="0 0 200 280" aria-hidden="true">
          <path d="M 100 270 Q 105 220, 120 180 Q 135 140, 130 100 Q 125 60, 110 30" stroke="#3a5642" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <ellipse cx="140" cy="180" rx="6" ry="14" fill="#3a5642" opacity="0.85" transform="rotate(30 140 180)"/>
          <ellipse cx="95" cy="160" rx="6" ry="14" fill="#3a5642" opacity="0.85" transform="rotate(-20 95 160)"/>
          <ellipse cx="145" cy="135" rx="5" ry="12" fill="#3a5642" opacity="0.85" transform="rotate(25 145 135)"/>
          <ellipse cx="100" cy="115" rx="5" ry="12" fill="#3a5642" opacity="0.85" transform="rotate(-15 100 115)"/>
          <ellipse cx="140" cy="90" rx="5" ry="11" fill="#3a5642" opacity="0.85" transform="rotate(20 140 90)"/>
          <ellipse cx="105" cy="65" rx="4" ry="10" fill="#3a5642" opacity="0.85" transform="rotate(-10 105 65)"/>
          <circle cx="108" cy="32" r="3" fill="#3a5642"/>
        </svg>

        {/* Scattered small flowers */}
        <Daisy className="bloom__flower bloom__flower--1" color="#c98c75" />
        <Daisy className="bloom__flower bloom__flower--2" color="#d8a93a" />
        <Daisy className="bloom__flower bloom__flower--3" color="#a98ab4" />
        <Daisy className="bloom__flower bloom__flower--4" color="#c98c75" />
        <Daisy className="bloom__flower bloom__flower--5" color="#d8a93a" />
        <Daisy className="bloom__flower bloom__flower--6" color="#a98ab4" />
        <Hydrangea className="bloom__hydrangea" />
        <LilyOfTheValley className="bloom__lily" />
      </div>

      <div className="bloom__inner">
        <p className="bloom__intro">There&rsquo;s a</p>
        <h1 className="bloom__title">
          New Life
          <br />
          Arriving
        </h1>
        <p className="bloom__line">
          Please join us in
          <br /> celebrating <em>Brandon &amp; Shenika</em>
        </p>
        <p className="bloom__date">
          JUNE 28<sup>TH</sup>
          <br />
          2026
        </p>
        <p className="bloom__location">{siteCopy.eventCity}</p>

        <Link href="/join" className="bloom__cta">
          Join Our Guest List
        </Link>
      </div>
    </main>
  );
}

function Daisy({ className, color }: { className: string; color: string }) {
  return (
    <svg className={className} viewBox="0 0 60 60" aria-hidden="true">
      <g fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
        <ellipse cx="30" cy="14" rx="4" ry="9"/>
        <ellipse cx="44" cy="22" rx="4" ry="9" transform="rotate(45 44 22)"/>
        <ellipse cx="46" cy="38" rx="4" ry="9" transform="rotate(90 46 38)"/>
        <ellipse cx="38" cy="48" rx="4" ry="9" transform="rotate(135 38 48)"/>
        <ellipse cx="22" cy="48" rx="4" ry="9" transform="rotate(-135 22 48)"/>
        <ellipse cx="14" cy="38" rx="4" ry="9" transform="rotate(-90 14 38)"/>
        <ellipse cx="16" cy="22" rx="4" ry="9" transform="rotate(-45 16 22)"/>
      </g>
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.9"/>
    </svg>
  );
}

function Hydrangea({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 120 160" aria-hidden="true">
      <g stroke="#3a5642" strokeWidth="1.5" fill="none">
        {/* Cluster of small petals forming hydrangea */}
        <circle cx="60" cy="50" r="6"/>
        <circle cx="48" cy="44" r="5"/>
        <circle cx="72" cy="44" r="5"/>
        <circle cx="42" cy="56" r="5"/>
        <circle cx="78" cy="56" r="5"/>
        <circle cx="55" cy="38" r="5"/>
        <circle cx="65" cy="38" r="5"/>
        <circle cx="55" cy="62" r="5"/>
        <circle cx="65" cy="62" r="5"/>
        {/* Stem */}
        <path d="M 60 70 Q 58 100, 62 130 Q 65 155, 60 158" strokeLinecap="round"/>
        {/* Leaves */}
        <path d="M 62 100 Q 80 95, 95 110 Q 88 118, 75 118 Q 65 115, 62 100 Z"/>
        <path d="M 60 125 Q 42 122, 30 138 Q 38 145, 50 142 Q 58 138, 60 125 Z"/>
      </g>
    </svg>
  );
}

function LilyOfTheValley({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 100 200" aria-hidden="true">
      <g stroke="#3a5642" strokeWidth="1.8" fill="none" strokeLinecap="round">
        <path d="M 50 195 Q 48 150, 52 100 Q 55 60, 50 30"/>
        {/* Bell flowers */}
        <ellipse cx="38" cy="80" rx="6" ry="8"/>
        <ellipse cx="62" cy="90" rx="6" ry="8"/>
        <ellipse cx="38" cy="115" rx="6" ry="8"/>
        <ellipse cx="62" cy="125" rx="6" ry="8"/>
        <ellipse cx="42" cy="150" rx="6" ry="8"/>
        {/* Leaves */}
        <path d="M 50 170 Q 30 160, 18 175 Q 25 192, 45 188 Q 55 180, 50 170 Z"/>
        <path d="M 52 175 Q 72 168, 85 180 Q 78 195, 58 192 Q 50 188, 52 175 Z"/>
      </g>
    </svg>
  );
}
