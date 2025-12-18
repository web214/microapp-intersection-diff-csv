#!/usr/bin/env node

/**
 * Updates the inline script hash in the CSP meta tag of index.html.
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const FILE = path.join(__dirname, "index.html");

function main() {
  const html = fs.readFileSync(FILE, "utf8");
  const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
  if (!scriptMatch) {
    console.error("Unable to locate inline <script> block in index.html");
    process.exit(1);
  }

  const scriptContent = scriptMatch[1];
  const hash = crypto.createHash("sha256").update(scriptContent, "utf8").digest("base64");
  const newDirective = `'sha256-${hash}'`;

  const metaRegex = /(script-src[^;]*?)'sha256-[^']+'([^;]*;)/;
  if (!metaRegex.test(html)) {
    console.error("Unable to find existing sha256 hash in CSP meta tag.");
    process.exit(1);
  }

  const updated = html.replace(metaRegex, `$1${newDirective}$2`);
  fs.writeFileSync(FILE, updated, "utf8");
  console.log(`Updated CSP hash to ${newDirective}`);
}

main();
