/**
 * Generates each site's WebMCP init file and reports which layout files still
 * need the two script tags.
 *
 * Every site loads the same shared library and opts into tool packs by name,
 * so a site's own file stays three lines. Run after sync-webmcp.
 *
 * Run: npm run wire:webmcp
 */
import { writeFileSync, existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SIBLINGS = join(ROOT, '..');
const BLOG_ROOT = join(ROOT, '..', '..', '..', 'blog');

/**
 * repo, the static asset dir it serves from, the site's domain,
 * and which tool packs the site opts into.
 */
const SITES = [
  { repo: 'books-by-alex-merced', assets: '.', domain: 'books.alexmerced.com', packs: ['books'] },
  { repo: 'AlexMercedCoder2026', assets: 'public', domain: 'alexmercedcoder.dev', packs: ['projects'] },
  { repo: 'whoisalexmerced', assets: '.', domain: 'whoisalexmerced.com', packs: ['biography'] },
  { repo: 'alexmercedmediacom', assets: 'public', domain: 'alexmercedmedia.com', packs: ['biography'] },
  { repo: 'alexmerceddata', assets: 'public', domain: 'alexmerceddata.com', packs: ['knowledge'] },
  { repo: 'openlakehouse', assets: 'public', domain: 'opendatalakehouse.com', packs: ['knowledge'] },
  { repo: 'semanticlakehouse_com', assets: 'public', domain: 'semanticlakehouse.com', packs: ['knowledge'] },
  { repo: 'agenticlakehouse', assets: '.', domain: 'agenticlakehouse.com', packs: ['knowledge'] },
  { repo: 'dataengnr', assets: 'public', domain: 'dataengnr.com', packs: ['knowledge'] },
  { repo: 'datalakehousehelp', assets: 'public', domain: 'datalakehouse.help', packs: ['knowledge'] },
  { repo: 'dataaiwiki', assets: 'public', domain: 'dataaiwiki.com', packs: ['knowledge'] },
  { repo: 'amresources', assets: '.', domain: 'resources.alexmerced.com', packs: [] },
  { repo: 'weekofdata', assets: '.', domain: 'weekofdata.com', packs: [] },
  { repo: 'alexmercedlibertarian', assets: 'public', domain: 'alexmercedlibertarian.com', packs: [] },
  { repo: 'd6storyteller', assets: 'public', domain: 'd6storyteller.alexmerced.com', packs: ['books'] },
];

function initSource({ domain, packs }) {
  return `/**
 * WebMCP setup for ${domain}.
 *
 * Loads the shared Alex Merced tool layer and opts into the packs this site
 * needs. The library and its tools are read only, and do nothing in browsers
 * without WebMCP support.
 *
 * Do not edit the vendored alex-merced-webmcp.js beside this file: it is synced
 * from alexmerced.com. Change the packs here instead.
 */
(function () {
  'use strict';
  if (!window.AlexMercedWebMCP) return;
  window.AlexMercedWebMCP.init({
    site: '${domain}',
    packs: ${JSON.stringify(packs)}
  });
})();
`;
}

const SNIPPET_TAGS = [
  '<script src="/webmcp/alex-merced-webmcp.js" defer></script>',
  '<script src="/webmcp/init.js" defer></script>',
];

let written = 0;
const needsTags = [];

for (const site of SITES) {
  const base = existsSync(join(SIBLINGS, site.repo))
    ? join(SIBLINGS, site.repo)
    : join(BLOG_ROOT, site.repo);
  if (!existsSync(base)) {
    console.log(`  missing repo, skipped: ${site.repo}`);
    continue;
  }

  const dir = join(base, site.assets, 'webmcp');
  if (!existsSync(dir)) {
    console.log(`  no vendored library yet (run sync:webmcp first): ${site.repo}`);
    continue;
  }

  writeFileSync(join(dir, 'init.js'), initSource(site), 'utf-8');
  written++;

  // Report whether any served file already references the loader.
  const wired = ['index.html', 'src/layouts/BaseLayout.astro', 'src/layouts/Layout.astro']
    .map((f) => join(base, f))
    .filter((f) => existsSync(f))
    .some((f) => readFileSync(f, 'utf-8').includes('alex-merced-webmcp.js'));
  if (!wired) needsTags.push(`${site.repo} (${site.domain})`);
}

console.log(`\n${written} init file(s) written.`);
if (needsTags.length) {
  console.log('\nStill need the loader tags before </body>:');
  for (const s of needsTags) console.log('  - ' + s);
  console.log('\n' + SNIPPET_TAGS.map((t) => '  ' + t).join('\n'));
}
