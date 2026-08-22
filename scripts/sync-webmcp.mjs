/**
 * Copies the shared WebMCP layer from its canonical source here into every
 * sibling site repo, so all sites run the same implementation.
 *
 * Section 13 of the network strategy: one shared layer beats fifteen
 * independent implementations that drift apart.
 *
 * Each site loads its vendored copy and calls AlexMercedWebMCP.init({...}) with
 * its own domain and any site-specific tools. Do not edit the vendored copies.
 *
 * Run: npm run sync:webmcp
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SIBLINGS = join(ROOT, '..');
const SOURCE = join(ROOT, 'webmcp', 'alex-merced-webmcp.js');

/** repo -> directory that the site serves static assets from. */
const TARGETS = {
  AlexMercedCoder2026: 'public',
  'books-by-alex-merced': '.',
  whoisalexmerced: '.',
  alexmercedmediacom: 'public',
  alexmerceddata: 'public',
  amresources: '.',
  openlakehouse: 'public',
  semanticlakehouse_com: 'public',
  agenticlakehouse: '.',
  dataengnr: 'public',
  datalakehousehelp: 'public',
  dataaiwiki: 'public',
  weekofdata: '.',
  alexmercedlibertarian: 'public',
  d6storyteller: 'public',
};

const src = readFileSync(SOURCE, 'utf-8');
let copied = 0;
const skipped = [];

for (const [repo, assetDir] of Object.entries(TARGETS)) {
  const base = join(SIBLINGS, repo);
  if (!existsSync(base)) {
    skipped.push(repo);
    continue;
  }
  const dir = join(base, assetDir, 'webmcp');
  mkdirSync(dir, { recursive: true });
  const dest = join(dir, 'alex-merced-webmcp.js');
  const existing = existsSync(dest) ? readFileSync(dest, 'utf-8') : null;
  if (existing === src) {
    console.log(`  unchanged  ${repo}`);
    continue;
  }
  writeFileSync(dest, src, 'utf-8');
  console.log(`  synced     ${repo}/${assetDir}/webmcp/`);
  copied++;
}

console.log(`\n${copied} site(s) updated${skipped.length ? `, skipped (not found): ${skipped.join(', ')}` : ''}`);
