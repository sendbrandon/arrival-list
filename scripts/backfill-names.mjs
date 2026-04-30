#!/usr/bin/env node
// One-shot backfill: normalize every contact's FNAME / LNAME in Mailchimp.
// Run with:
//   MAILCHIMP_API_KEY=xxx-us2 MAILCHIMP_AUDIENCE_ID=yyy node scripts/backfill-names.mjs
//
// Add --dry-run to preview without writing.

import crypto from "node:crypto";

function normalizeName(name) {
  if (!name) return "";
  return name
    .trim()
    .toLowerCase()
    .replace(/(^|\s)([a-z])/g, (_, sep, ch) => sep + ch.toUpperCase());
}

const apiKey = process.env.MAILCHIMP_API_KEY;
const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
const dryRun = process.argv.includes("--dry-run");

if (!apiKey || !audienceId) {
  console.error("Missing MAILCHIMP_API_KEY or MAILCHIMP_AUDIENCE_ID env var.");
  console.error("Run: MAILCHIMP_API_KEY=xxx-us2 MAILCHIMP_AUDIENCE_ID=yyy node scripts/backfill-names.mjs");
  process.exit(1);
}

const dc = apiKey.split("-")[1];
if (!dc) {
  console.error("Bad MAILCHIMP_API_KEY format — expected key-dcXX.");
  process.exit(1);
}

const auth = `Basic ${Buffer.from(`any:${apiKey}`).toString("base64")}`;
const base = `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}`;

console.log(`${dryRun ? "[DRY RUN] " : ""}Fetching members...`);

const listRes = await fetch(
  `${base}/members?count=500&fields=members.email_address,members.merge_fields.FNAME,members.merge_fields.LNAME`,
  { headers: { Authorization: auth } }
);

if (!listRes.ok) {
  console.error(`Failed to list members: ${listRes.status} ${await listRes.text()}`);
  process.exit(1);
}

const data = await listRes.json();
const members = data.members || [];
console.log(`Found ${members.length} contacts.`);

let toUpdate = [];
let unchanged = 0;

for (const m of members) {
  const oldFirst = (m.merge_fields?.FNAME || "").trim();
  const oldLast = (m.merge_fields?.LNAME || "").trim();
  const newFirst = normalizeName(oldFirst);
  const newLast = normalizeName(oldLast);
  if (newFirst === oldFirst && newLast === oldLast) {
    unchanged++;
    continue;
  }
  toUpdate.push({ email: m.email_address, oldFirst, newFirst, oldLast, newLast });
}

console.log(`${unchanged} already clean. ${toUpdate.length} to update.\n`);

if (toUpdate.length === 0) {
  console.log("Nothing to do.");
  process.exit(0);
}

for (const u of toUpdate) {
  const change = `${u.email}: "${u.oldFirst}" → "${u.newFirst}"${u.oldLast || u.newLast ? `, "${u.oldLast}" → "${u.newLast}"` : ""}`;
  if (dryRun) {
    console.log(`[DRY] ${change}`);
    continue;
  }
  const hash = crypto.createHash("md5").update(u.email.toLowerCase()).digest("hex");
  const patchRes = await fetch(`${base}/members/${hash}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: auth },
    body: JSON.stringify({ merge_fields: { FNAME: u.newFirst, LNAME: u.newLast } })
  });
  if (patchRes.ok) {
    console.log(`✓ ${change}`);
  } else {
    console.error(`✗ ${u.email} — ${patchRes.status} ${await patchRes.text()}`);
  }
}

console.log(`\n${dryRun ? "[DRY RUN] Would have updated" : "Updated"} ${toUpdate.length} contacts.`);
