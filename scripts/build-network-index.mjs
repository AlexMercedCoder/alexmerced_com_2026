/**
 * Builds entity/network-index.json: a single searchable index across every
 * property in the Alex Merced network. Powers search_alex_merced_network.
 *
 * Sources, in order of reliability:
 *   1. The entity layer itself (books, projects, sites, topics) - always available.
 *   2. Each sibling site repo's curated llms.txt, when the repos are checked out
 *      next to this one. These give real page titles and URLs.
 *
 * Sibling repos are optional. When they are missing the index still builds from
 * the entity layer, so a deploy never depends on another checkout being present.
 *
 * Run: npm run build:index
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SIBLINGS = join(ROOT, '..');
// Some properties live under the blog tree rather than beside this repo.
const BLOG_ROOT = join(ROOT, '..', '..', '..', 'blog');
const SRC = join(ROOT, 'entity');

const read = (f) => JSON.parse(readFileSync(join(SRC, f), 'utf-8'));
const books = read('books.json');
const projects = read('projects.json');
const sites = read('sites.json');
const topics = read('topics.json');

/** Map a network domain to the sibling repo folder that builds it. */
const REPO_FOR_DOMAIN = {
  'alexmerced.com': 'alexmercedcom',
  'whoisalexmerced.com': 'whoisalexmerced',
  'alexmercedmedia.com': 'alexmercedmediacom',
  'books.alexmerced.com': 'books-by-alex-merced',
  'alexmercedcoder.dev': 'AlexMercedCoder2026',
  'alexmerceddata.com': 'alexmerceddata',
  'resources.alexmerced.com': 'amresources',
  'opendatalakehouse.com': 'openlakehouse',
  'semanticlakehouse.com': 'semanticlakehouse_com',
  'agenticlakehouse.com': 'agenticlakehouse',
  'dataengnr.com': 'dataengnr',
  'datalakehouse.help': 'datalakehousehelp',
  'dataaiwiki.com': 'dataaiwiki',
  'weekofdata.com': 'weekofdata',
  'alexmercedlibertarian.com': 'alexmercedlibertarian',
  'd6storyteller.alexmerced.com': 'd6storyteller',
};

/** Properties that live under personal/Personal/blog rather than website/2026. */
const BLOG_REPO_FOR_DOMAIN = {
  'alexmerced.blog': '2026/AlexMercedBlog2026',
  'ingestthis.com': '2022/ingest_this',
  'grokoverflow.com': '2022/grokoverflow',
  'datalakehousehub.com': '2024/datalakehousehub',
  'iceberglakehouse.com': '2024/lakehouse-iceberg-blog',
  'tuts.alexmercedcoder.dev': 'gatsblog',
};

const entries = [];
const seen = new Set();

/** Domains that belong to the network. Page entries pointing elsewhere are
 *  dropped: outbound links are other people's pages, and the book and project
 *  entries already carry the canonical Amazon and GitHub URLs. */
const NETWORK_HOSTS = new Set([
  ...Object.keys(REPO_FOR_DOMAIN),
  ...Object.keys(BLOG_REPO_FOR_DOMAIN),
]);

function inNetwork(url) {
  try {
    return NETWORK_HOSTS.has(new URL(url).hostname.replace(/^www\./, ''));
  } catch {
    return false;
  }
}

/** Keep summaries short: this file is fetched by browser agents. */
function trim(s, n = 180) {
  s = (s || '').replace(/\s+/g, ' ').trim();
  return s.length > n ? s.slice(0, n - 1).trimEnd() + '\u2026' : s;
}

function add(entry) {
  const key = entry.url || `${entry.type}:${entry.title}`;
  if (seen.has(key)) return;
  seen.add(key);
  entry.summary = trim(entry.summary);
  if (!entry.summary) delete entry.summary;
  if (!entry.keywords || !entry.keywords.length) delete entry.keywords;
  entries.push(entry);
}

// --- 1. Entity-derived entries -------------------------------------------

for (const s of sites.sites) {
  add({
    type: 'site',
    site: s.domain,
    title: s.title,
    url: s.url,
    summary: s.role,
    keywords: s.topics || [],
  });
}

for (const t of topics.topics) {
  add({
    type: 'topic',
    site: t.primary,
    title: t.label,
    url: `https://alexmerced.com/entity/topics#${t.id}`,
    readMoreAt: `https://${t.primary}`,
    summary: t.summary,
    keywords: t.aliases || [],
  });
}

for (const b of books.books) {
  add({
    type: 'book',
    site: 'books.alexmerced.com',
    title: b.title,
    url: b.canonicalPage,
    summary: b.description,
    keywords: [b.category, b.publisher].filter(Boolean),
  });
}

for (const p of projects.projects) {
  add({
    type: 'project',
    site: 'alexmercedcoder.dev',
    title: p.name,
    url: p.repository,
    summary: p.tagline,
    keywords: p.topics || [],
  });
}

// --- 2. Page-level entries from each site's curated llms.txt ---------------

const LINK = /^\s*-\s*\[([^\]]+)\]\(([^)]+)\)\s*:?\s*(.*)$/;
let harvested = 0;
const missing = [];

const ALL_REPOS = [
  ...Object.entries(REPO_FOR_DOMAIN).map(([d, r]) => [d, join(SIBLINGS, r)]),
  ...Object.entries(BLOG_REPO_FOR_DOMAIN).map(([d, r]) => [d, join(BLOG_ROOT, r)]),
];

for (const [domain, repoPath] of ALL_REPOS) {
  const repo = repoPath;
  const candidates = [
    join(repo, 'public', 'llms.txt'),
    join(repo, 'llms.txt'),
    // Some sites generate llms.txt at build time rather than shipping it in source.
    join(repo, 'dist', 'llms.txt'),
    join(repo, 'static', 'llms.txt'),
  ];
  const path = candidates.find((p) => existsSync(p));
  if (!path) {
    missing.push(domain);
    continue;
  }

  const text = readFileSync(path, 'utf-8');
  for (const line of text.split('\n')) {
    const m = line.match(LINK);
    if (!m) continue;
    let [, title, url, summary] = m;
    if (url.startsWith('/')) url = `https://${domain}${url}`;
    if (!/^https?:\/\//.test(url)) continue;
    // Skip links that leave the network; those are other people's pages.
    if (!inNetwork(url)) continue;
    // Page entries carry title + url only. Summaries are dropped here because
    // they tripled the file size for a document browser agents fetch at query
    // time; the title and URL are what routing needs, and the page itself has
    // the detail. Entity entries (site, topic, book, project) keep summaries.
    add({
      type: 'page',
      site: domain,
      title: title.trim(),
      url: url.trim(),
    });
    harvested++;
  }
}

// --- 3. Write -------------------------------------------------------------

const byType = entries.reduce((acc, e) => {
  acc[e.type] = (acc[e.type] || 0) + 1;
  return acc;
}, {});

const index = {
  $schema: 'https://alexmerced.com/entity/schema/network-index.schema.json',
  description:
    'Searchable index across every property in the Alex Merced network. ' +
    'Powers search_alex_merced_network.',
  canonicalEntity: 'https://alexmerced.com/#alexmerced',
  counts: { total: entries.length, ...byType },
  entries,
};

// Minified: this file is fetched by browser agents on every network search and
// is never hand-edited. Regenerate with `npm run build:index`.
writeFileSync(join(SRC, 'network-index.json'), JSON.stringify(index) + '\n', 'utf-8');

console.log(
  `network index: ${entries.length} entries (${Object.entries(byType)
    .map(([k, v]) => `${v} ${k}`)
    .join(', ')}), ${harvested} harvested from sibling llms.txt`
);
if (missing.length) {
  console.log(`  sibling repos not found (skipped): ${missing.join(', ')}`);
}
