#!/usr/bin/env node
/**
 * Builds the per-site book lists used by the books page on each Alex Merced
 * network site.
 *
 * The canonical facts live in entity/books.json. Topic tags live in
 * entity/book-topics.json. This script joins the two, filters per site, and
 * writes a small books.json into each site repo.
 *
 * Run it from this repo after books.json changes:
 *
 *   node scripts/build-network-booklists.mjs
 *
 * It writes into sibling repos through relative paths, so it expects the usual
 * ~/development tree layout. Sites whose directory is missing are reported and
 * skipped rather than failing the run, so a partial checkout still works.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ENTITY = join(HERE, '..', 'entity');
/** content-and-media/website/2026/alexmercedcom -> content-and-media */
const CONTENT = resolve(HERE, '..', '..', '..', '..');

const books = JSON.parse(readFileSync(join(ENTITY, 'books.json'), 'utf8'));
const topics = JSON.parse(readFileSync(join(ENTITY, 'book-topics.json'), 'utf8'));

const errors = [];
const bySlug = new Map(books.books.map((b) => [b.slug, b]));

for (const slug of Object.keys(topics.books)) {
  if (!bySlug.has(slug)) errors.push(`book-topics.json tags unknown book "${slug}".`);
}
for (const slug of bySlug.keys()) {
  if (!topics.books[slug]) errors.push(`books.json entry "${slug}" has no topic tags.`);
}
const known = new Set(Object.keys(topics.tagDefinitions));
for (const [slug, tags] of Object.entries(topics.books)) {
  for (const t of tags) if (!known.has(t)) errors.push(`"${slug}" uses undefined tag "${t}".`);
}

/**
 * Each site declares the tags it covers, plus an intro written for that site's
 * audience. `order` puts the most on-topic tag first so the page leads with the
 * books a reader of that site actually came for.
 */
const SITES = [
  {
    dir: 'website/2026/openlakehouse',
    out: 'src/data/books.json',
    tags: ['lakehouse', 'iceberg', 'catalogs', 'semantic', 'data-engineering', 'agentic'],
    order: ['lakehouse', 'iceberg', 'catalogs', 'semantic', 'data-engineering', 'agentic'],
    intro: 'Books on open lakehouse architecture: table formats, catalogs, engines, semantic layers, and the agentic workloads now reading these tables.',
  },
  {
    dir: 'website/2026/dataengnr',
    out: 'src/data/books.json',
    tags: ['data-engineering', 'lakehouse', 'iceberg', 'catalogs', 'agentic'],
    order: ['data-engineering', 'lakehouse', 'iceberg', 'catalogs', 'agentic'],
    intro: 'Longer-form treatments of the terms in the knowledge base: Apache Iceberg, lakehouse architecture, catalogs, semantic layers, and agentic analytics.',
  },
  {
    dir: 'website/2026/alexmerceddata',
    out: 'src/data/books.json',
    tags: null,
    order: ['data-engineering', 'lakehouse', 'iceberg', 'semantic', 'agentic', 'ai-engineering', 'ai-productivity', 'catalogs', 'devrel', 'economics', 'fiction', 'ttrpg'],
    intro: 'Every book Alex Merced has written, across data engineering and the lakehouse, AI and agents, economics, fiction, and tabletop roleplaying.',
  },
  {
    dir: 'website/2026/alexmercedmediacom',
    out: 'src/data/books.json',
    tags: null,
    order: ['lakehouse', 'iceberg', 'agentic', 'ai-engineering', 'ai-productivity', 'semantic', 'data-engineering', 'catalogs', 'devrel', 'economics', 'fiction', 'ttrpg'],
    intro: 'The complete bibliography: technical books on data and AI, economics and philosophy, novels, and tabletop roleplaying rulebooks.',
  },
  {
    dir: 'website/2026/semanticlakehouse_com',
    out: 'src/data/books.json',
    tags: ['semantic', 'lakehouse', 'agentic', 'ai-engineering', 'iceberg'],
    order: ['semantic', 'lakehouse', 'iceberg', 'agentic', 'ai-engineering'],
    intro: 'Books on the semantic layer and what sits either side of it: the lakehouse underneath, and the agents and AI systems that depend on shared meaning.',
  },
  {
    dir: 'website/2026/agenticlakehouse',
    out: 'data/books.json',
    tags: ['agentic', 'semantic', 'lakehouse'],
    order: ['agentic', 'semantic', 'lakehouse'],
    intro: 'Longer-form treatments of agentic analytics: how AI agents discover, query, and reason over governed lakehouse data, and the architecture underneath that.',
  },
  {
    dir: 'website/2026/AlexMercedCoder2026',
    out: 'data/books.json',
    tags: ['agentic', 'ai-engineering', 'ai-productivity', 'devrel'],
    order: ['agentic', 'ai-engineering', 'ai-productivity', 'devrel'],
    intro: 'Books on the software and agent infrastructure covered here: building agents, shipping AI systems, and working well with AI tooling day to day.',
  },
  {
    dir: 'website/2026/dataaiwiki',
    out: 'src/data/books.json',
    tags: ['lakehouse', 'iceberg', 'catalogs', 'semantic', 'data-engineering', 'agentic', 'ai-engineering'],
    order: ['data-engineering', 'lakehouse', 'iceberg', 'semantic', 'agentic', 'ai-engineering', 'catalogs'],
    intro: 'The wiki gives you a definition. These books give you the full treatment of the same territory across data and AI.',
  },
  {
    dir: 'website/2026/datalakehousehelp',
    out: 'src/data/books.json',
    tags: ['lakehouse', 'iceberg', 'catalogs', 'data-engineering'],
    order: ['lakehouse', 'iceberg', 'catalogs', 'data-engineering'],
    intro: 'The docs here are reference material. These books are the long-form versions: lakehouse architecture, Apache Iceberg, catalogs, and the engineering practice around them.',
  },
  {
    dir: 'website/2026/weekofdata',
    out: 'data/books.json',
    tags: ['data-engineering', 'lakehouse', 'iceberg', 'agentic'],
    order: ['data-engineering', 'lakehouse', 'iceberg', 'agentic'],
    intro: 'Books by Alex Merced on the topics the sessions cover: data engineering, lakehouse architecture, Apache Iceberg, and agentic analytics.',
  },
  {
    dir: 'website/2026/whoisalexmerced',
    out: 'data/books.json',
    tags: null,
    order: ['lakehouse', 'iceberg', 'agentic', 'ai-engineering', 'ai-productivity', 'semantic', 'data-engineering', 'catalogs', 'devrel', 'economics', 'fiction', 'ttrpg'],
    intro: 'The complete bibliography, spanning technical books on data and AI, writing on economics and philosophy, novels, and tabletop roleplaying rulebooks.',
  },
  {
    dir: 'website/2026/alexmercedlibertarian',
    out: 'src/data/books.json',
    tags: ['economics'],
    order: ['economics'],
    intro: 'Books on economics, liberty, and political thought, written in the same voice as the writing on this site.',
  },
  {
    dir: 'blog/2022/grokoverflow',
    out: 'data/books.json',
    tags: ['ai-engineering', 'ai-productivity', 'agentic', 'data-engineering'],
    order: ['ai-engineering', 'agentic', 'ai-productivity', 'data-engineering'],
    intro: 'Books covering the same ground as the posts here: building and shipping AI systems, working with agents, and the engineering practice around both.',
  },
  {
    dir: 'blog/2022/ingest_this',
    out: 'data/books.json',
    tags: ['data-engineering', 'lakehouse', 'iceberg', 'catalogs', 'agentic'],
    order: ['data-engineering', 'lakehouse', 'iceberg', 'catalogs', 'agentic'],
    intro: 'Books on data engineering and the lakehouse: ingestion, table formats, catalogs, and the agentic layer arriving on top of them.',
  },
  {
    dir: 'blog/2024/datalakehousehub',
    out: 'src/data/books.json',
    tags: ['lakehouse', 'iceberg', 'catalogs', 'semantic', 'agentic', 'data-engineering'],
    order: ['lakehouse', 'iceberg', 'catalogs', 'agentic', 'semantic', 'data-engineering'],
    intro: 'Books by Alex Merced on lakehouse architecture, Apache Iceberg, catalogs, and agentic analytics. Several are free.',
  },
  {
    dir: 'blog/2024/lakehouse-iceberg-blog',
    out: 'src/data/books.json',
    tags: ['iceberg', 'lakehouse', 'catalogs', 'agentic'],
    order: ['iceberg', 'catalogs', 'lakehouse', 'agentic'],
    intro: 'Books on Apache Iceberg and the lakehouse built around it: table format internals, catalogs, architecture, and the agentic workloads now reading these tables.',
  },
  {
    dir: 'blog/2026/AlexMercedBlog2026',
    out: 'data/books.json',
    tags: null,
    order: ['agentic', 'ai-engineering', 'lakehouse', 'iceberg', 'semantic', 'data-engineering', 'ai-productivity', 'catalogs', 'devrel', 'economics', 'fiction', 'ttrpg'],
    intro: 'Every book Alex Merced has written, from lakehouse architecture and agentic AI through to economics, fiction, and tabletop roleplaying.',
  },
  {
    dir: 'blog/gatsblog',
    out: 'src/data/books.json',
    tags: ['ai-productivity', 'ai-engineering', 'agentic', 'data-engineering'],
    order: ['ai-productivity', 'ai-engineering', 'agentic', 'data-engineering'],
    intro: 'Books that go further than a tutorial: working productively with AI tooling, building agents, and shipping AI systems.',
  },
];

if (errors.length) {
  console.error('Book topic data is inconsistent:\n');
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

/** Sort by the site's tag priority, then flagship first, then title. */
function sortFor(order) {
  const rank = (b) => {
    const tags = topics.books[b.slug];
    let best = order.length;
    for (const t of tags) {
      const i = order.indexOf(t);
      if (i !== -1 && i < best) best = i;
    }
    return best;
  };
  return (a, b) =>
    rank(a) - rank(b) ||
    Number(Boolean(b.flagship)) - Number(Boolean(a.flagship)) ||
    a.title.localeCompare(b.title);
}

let written = 0;
const missing = [];

for (const site of SITES) {
  const root = join(CONTENT, site.dir);
  if (!existsSync(root)) {
    missing.push(site.dir);
    continue;
  }

  const selected = books.books
    .filter((b) => (site.tags === null ? true : topics.books[b.slug].some((t) => site.tags.includes(t))))
    .sort(sortFor(site.order))
    .map((b) => ({
      title: b.title,
      slug: b.slug,
      description: b.description,
      category: b.category,
      categorySlug: {
        'Tech': 'tech',
        'Fiction': 'fiction',
        'Economics & Philosophy': 'economics',
        'Tabletop RPG': 'tabletop',
      }[b.category] || 'tech',
      topics: topics.books[b.slug],
      // Only surface a publisher when it is a real one; 62 of 65 are self-published.
      publisher: b.publisher && b.publisher !== 'Self-published' ? b.publisher : null,
      flagship: Boolean(b.flagship),
      cover: b.cover,
      canonicalPage: b.canonicalPage,
      amazon: b.url,
    }));

  const payload = {
    note: 'Generated by alexmercedcom/scripts/build-network-booklists.mjs from the entity layer. Do not edit by hand; rerun the script instead.',
    source: 'https://alexmerced.com/entity/books.json',
    catalog: 'https://books.alexmerced.com/',
    intro: site.intro,
    totalInCatalog: books.count,
    count: selected.length,
    books: selected,
  };

  const outPath = join(root, site.out);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(`  ${String(selected.length).padStart(2)} books -> ${site.dir}/${site.out}`);
  written += 1;
}

console.log(`\nwrote ${written} site book lists from ${books.count} catalog titles`);
if (missing.length) {
  console.log(`skipped (directory not found): ${missing.join(', ')}`);
}
