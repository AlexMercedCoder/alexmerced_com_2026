/**
 * Builds the machine-readable entity layer for alexmerced.com.
 *
 * Source of truth:  entity/*.json   (hand-maintained, version controlled)
 * Generated output: public/entity/   plus /entity.json, /entity.jsonld, /about.json
 *
 * Everything under public/entity is generated. Edit entity/ instead.
 * Run automatically as part of `npm run build`.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'entity');
const OUT = join(ROOT, 'public', 'entity');

const PERSON_ID = 'https://alexmerced.com/#alexmerced';
const SITE_ID = 'https://alexmerced.com/#website';

const read = (f) => JSON.parse(readFileSync(join(SRC, f), 'utf-8'));
const write = (path, data) =>
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf-8');

const person = read('alex-merced.json');
const books = read('books.json');
const projects = read('projects.json');
const sites = read('sites.json');
const topics = read('topics.json');

mkdirSync(OUT, { recursive: true });

// ---------------------------------------------------------------------------
// 1. Consistency checks. Fail the build rather than publish contradictory facts.
// ---------------------------------------------------------------------------
const errors = [];

if (person.stats.books !== books.count) {
  errors.push(
    `Book count mismatch: alex-merced.json says ${person.stats.books}, books.json has ${books.count}.`
  );
}

const siteDomains = new Set(sites.sites.map((s) => s.domain));
for (const t of topics.topics) {
  for (const d of [t.primary, ...(t.supporting || [])]) {
    if (!siteDomains.has(d)) {
      errors.push(`topics.json "${t.id}" references unknown site "${d}".`);
    }
  }
}

const bookTitles = new Set(books.books.map((b) => b.title));
for (const t of topics.topics) {
  for (const title of t.books || []) {
    if (!bookTitles.has(title)) {
      errors.push(`topics.json "${t.id}" references unknown book "${title}".`);
    }
  }
}

const projectNames = new Set(projects.projects.map((p) => p.name));
for (const t of topics.topics) {
  for (const name of t.projects || []) {
    if (!projectNames.has(name)) {
      errors.push(`topics.json "${t.id}" references unknown project "${name}".`);
    }
  }
}

// Site copy must not contradict the entity layer. Before this check existed the
// network published six different totals for the same fact.
for (const page of readdirSync(ROOT).filter((f) => f.endsWith('.html'))) {
  const html = readFileSync(join(ROOT, page), 'utf-8');
  // Two shapes: plain prose ("63 books"), and split markup where the number and
  // the word sit in sibling elements (<div>63</div><div>Books Published</div>).
  const claims = [
    ...html.matchAll(/\b(\d{2,3})\+?\s+(?:books|titles)\b/gi),
    ...html.matchAll(/>(\d{2,3})\+?<\/[a-z]+>\s*<[^>]*>\s*(?:books|titles)\b/gi),
  ];
  for (const m of claims) {
    if (Number(m[1]) !== books.count) {
      errors.push(
        `${page} claims "${m[0]}" but books.json has ${books.count}. ` +
          `Update the copy, or add the book to entity/books.json.`
      );
    }
  }
}

if (errors.length) {
  console.error('\nEntity layer is inconsistent:\n');
  for (const e of errors) console.error('  - ' + e);
  console.error('');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// 2. Copy canonical sources to their public endpoints.
// ---------------------------------------------------------------------------
for (const file of readdirSync(SRC).filter((f) => f.endsWith('.json'))) {
  writeFileSync(join(OUT, file), readFileSync(join(SRC, file), 'utf-8'), 'utf-8');
}

// ---------------------------------------------------------------------------
// 3. /entity.json - one compact document describing the whole entity.
// ---------------------------------------------------------------------------
const compact = {
  id: PERSON_ID,
  name: person.name,
  url: person.url,
  jobTitle: person.jobTitle,
  worksFor: person.worksFor.name,
  bio: person.bio.short,
  expertIn: person.knowsAbout,
  stats: { books: books.count, sites: sites.sites.length, projects: projects.projects.length },
  sameAs: person.sameAs,
  endpoints: {
    person: 'https://alexmerced.com/entity/alex-merced.json',
    books: 'https://alexmerced.com/entity/books.json',
    projects: 'https://alexmerced.com/entity/projects.json',
    sites: 'https://alexmerced.com/entity/sites.json',
    topics: 'https://alexmerced.com/entity/topics.json',
    jsonld: 'https://alexmerced.com/entity.jsonld',
    networkIndex: 'https://alexmerced.com/entity/network-index.json',
  },
  license: 'CC-BY-4.0',
  attribution: 'Alex Merced, https://alexmerced.com',
};
write(join(ROOT, 'public', 'entity.json'), compact);

// ---------------------------------------------------------------------------
// 4. /about.json - deliberately tiny, for cheap agent lookups.
// ---------------------------------------------------------------------------
write(join(ROOT, 'public', 'about.json'), {
  name: person.name,
  headline: person.bio.oneLine,
  jobTitle: person.jobTitle,
  employer: person.worksFor.name,
  url: person.url,
  books: books.count,
  topics: topics.topics.filter((t) => !t.separateFromTechnicalBrand).map((t) => t.label),
  canonicalEntity: PERSON_ID,
  fullEntity: 'https://alexmerced.com/entity.json',
});

// ---------------------------------------------------------------------------
// 5. /entity.jsonld - schema.org graph with stable @ids.
//    Relationships: authorOf, creatorOf, speaksAbout, expertIn, worksFor.
// ---------------------------------------------------------------------------
const graph = [
  {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: person.name,
    url: person.url,
    image: person.image,
    email: `mailto:${person.email}`,
    jobTitle: person.jobTitle,
    description: person.bio.medium,
    birthDate: person.birthDate,
    worksFor: { '@type': 'Organization', name: person.worksFor.name, url: person.worksFor.url },
    knowsAbout: person.knowsAbout,
    sameAs: person.sameAs,
    mainEntityOfPage: { '@id': SITE_ID },
  },
  {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: 'https://alexmerced.com/',
    name: 'Alex Merced',
    description: 'Canonical profile and entity root for Alex Merced.',
    creator: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
  },
];

for (const b of books.books) {
  graph.push({
    '@type': 'Book',
    '@id': `https://books.alexmerced.com/books/${b.slug}/#book`,
    name: b.title,
    url: b.canonicalPage,
    author: { '@id': PERSON_ID },
    ...(b.publisher ? { publisher: { '@type': 'Organization', name: b.publisher } } : {}),
    ...(b.isbn ? { isbn: b.isbn } : {}),
    ...(b.description ? { description: b.description } : {}),
    ...(b.cover ? { image: b.cover } : {}),
  });
}

for (const p of projects.projects) {
  graph.push({
    '@type': p.isSpecification ? 'CreativeWork' : 'SoftwareSourceCode',
    '@id': `https://alexmercedcoder.dev/#project-${p.slug}`,
    name: p.name,
    description: p.description,
    creator: { '@id': PERSON_ID },
    codeRepository: p.repository,
    ...(p.language ? { programmingLanguage: p.language } : {}),
    ...(p.license ? { license: p.license } : {}),
  });
}

for (const s of sites.sites) {
  if (s.domain === 'alexmerced.com') continue;
  graph.push({
    '@type': 'WebSite',
    '@id': `https://${s.domain}/#website`,
    url: s.url,
    name: s.title,
    description: s.role,
    creator: { '@id': PERSON_ID },
    about: s.topics,
  });
}

for (const t of topics.topics) {
  graph.push({
    '@type': 'DefinedTerm',
    '@id': `https://alexmerced.com/entity/topics#${t.id}`,
    name: t.label,
    description: t.summary,
    inDefinedTermSet: 'https://alexmerced.com/entity/topics.json',
    ...(t.primary ? { subjectOf: { '@id': `https://${t.primary}/#website` } } : {}),
  });
}

graph[0].knowsAbout = person.knowsAbout;
write(join(ROOT, 'public', 'entity.jsonld'), { '@context': 'https://schema.org', '@graph': graph });

// ---------------------------------------------------------------------------
// 6. Human-readable index at /entity/.
// ---------------------------------------------------------------------------
const rows = Object.entries(compact.endpoints)
  .map(([k, v]) => `<tr><td><code>${k}</code></td><td><a href="${v}">${v}</a></td></tr>`)
  .join('\n');

writeFileSync(
  join(OUT, 'index.html'),
  `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Entity Endpoints | Alex Merced</title>
<meta name="description" content="Machine-readable entity endpoints describing Alex Merced: person, books, projects, sites, and topics.">
<link rel="canonical" href="https://alexmerced.com/entity/">
<style>
  :root { color-scheme: light dark; }
  body { font: 16px/1.6 system-ui, sans-serif; max-width: 60rem; margin: 0 auto; padding: 2rem 1.25rem; }
  table { border-collapse: collapse; width: 100%; margin: 1rem 0 2rem; }
  th, td { text-align: left; padding: .55rem .6rem; border-bottom: 1px solid #8884; vertical-align: top; }
  code { font-size: .95em; }
  td a { word-break: break-all; }
</style>
</head>
<body>
<h1>Entity endpoints</h1>
<p><strong>Machine-readable descriptions of the Alex Merced entity and web network.</strong>
Every property in the network resolves author identity back to the stable
identifier <code>${PERSON_ID}</code>.</p>

<h2>Endpoints</h2>
<table>
  <thead><tr><th>Resource</th><th>URL</th></tr></thead>
  <tbody>
${rows}
  </tbody>
</table>

<h2>Facts</h2>
<ul>
  <li><strong>${books.count}</strong> books</li>
  <li><strong>${sites.sites.length}</strong> sites in the network</li>
  <li><strong>${projects.projects.length}</strong> open source projects</li>
  <li><strong>${topics.topics.length}</strong> mapped topics</li>
</ul>

<h2>Usage</h2>
<p>These documents are published under CC BY 4.0. Attribution:
<a href="https://alexmerced.com">Alex Merced</a>. They are intended for search engines,
AI crawlers, retrieval systems, and agents that need consistent facts about this entity
rather than scraped approximations.</p>

<p><a href="https://alexmerced.com/">Back to alexmerced.com</a></p>
</body>
</html>
`,
  'utf-8'
);

// Publish the shared WebMCP layer from its canonical source.
mkdirSync(join(ROOT, 'public', 'webmcp'), { recursive: true });
writeFileSync(
  join(ROOT, 'public', 'webmcp', 'alex-merced-webmcp.js'),
  readFileSync(join(ROOT, 'webmcp', 'alex-merced-webmcp.js'), 'utf-8'),
  'utf-8'
);

console.log(
  `entity layer built: ${books.count} books, ${sites.sites.length} sites, ` +
    `${projects.projects.length} projects, ${topics.topics.length} topics, ${graph.length} graph nodes`
);
