#!/usr/bin/env node
/**
 * Writes the shared network plumbing into every Alex Merced network site repo.
 *
 * Sources (edit these, never the generated copies):
 *   entity/alex-merced.json  canonical Person facts
 *   entity/sites.json        the registry (tiers, titles, URLs)
 *   entity/network.json      analytics ID, footer tiers, calls to action
 *
 * For each site it writes two files into <repo>/network/:
 *   network.json       footer groups, CTA strip, twitter handle, Person JSON-LD
 *   network-head.html  GA4 tag, CTA click tracking, Person JSON-LD, ready for <head>
 *
 * Each site's templates read those files, so the Person block, analytics tag,
 * footer, and CTA strip cannot drift between sites.
 *
 *   node scripts/build-network-shared.mjs          write all sites
 *   node scripts/build-network-shared.mjs --check  fail if any copy is stale
 *
 * It writes into sibling repos through relative paths, so it expects the usual
 * ~/development tree. Missing repos are reported and skipped.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ENTITY = join(HERE, '..', 'entity');
/** content-and-media/website/2026/alexmercedcom -> ~/development */
const DEV = resolve(HERE, '..', '..', '..', '..', '..');
const CHECK = process.argv.includes('--check');

const read = (name) => JSON.parse(readFileSync(join(ENTITY, name), 'utf8'));
const person = read('alex-merced.json');
const registry = read('sites.json');
const network = read('network.json');

/** Where each site's repo lives, relative to ~/development. */
const REPOS = {
  'alexmerced.com': 'content-and-media/website/2026/alexmercedcom',
  'whoisalexmerced.com': 'content-and-media/website/2026/whoisalexmerced',
  'alexmercedmedia.com': 'content-and-media/website/2026/alexmercedmediacom',
  'books.alexmerced.com': 'content-and-media/website/2026/books-by-alex-merced',
  'branding.alexmerced.com': 'content-and-media/website/2026/branding_alexmerced_com',
  'alexmercedcoder.dev': 'content-and-media/website/2026/AlexMercedCoder2026',
  'alexmercedai.com': 'apps-and-tools/app/2026/AlexMercedAI',
  'alexmerceddata.com': 'content-and-media/website/2026/alexmerceddata',
  'resources.alexmerced.com': 'content-and-media/website/2026/amresources',
  'opendatalakehouse.com': 'content-and-media/website/2026/openlakehouse',
  'openlakehouse.alexmerced.com': 'content-and-media/website/2026/openlakehouse-alexmerced',
  'semanticlakehouse.com': 'content-and-media/website/2026/semanticlakehouse_com',
  'agenticlakehouse.com': 'content-and-media/website/2026/agenticlakehouse',
  'agenticanalyticsnow.com': 'content-and-media/website/2026/agenticanalyticsnow',
  'openagenticplatform.com': 'apps-and-tools/app/2026/OpenAgenticPlatform',
  'dataengnr.com': 'content-and-media/website/2026/dataengnr',
  'datalakehouse.help': 'content-and-media/website/2026/datalakehousehelp',
  'dataaiwiki.com': 'content-and-media/website/2026/dataaiwiki',
  'iceberglakehouse.com': 'content-and-media/blog/2024/lakehouse-iceberg-blog',
  'datalakehousehub.com': 'content-and-media/blog/2024/datalakehousehub',
  'tuts.alexmercedcoder.dev': 'content-and-media/blog/gatsblog',
  'weekofdata.com': 'content-and-media/website/2026/weekofdata',
  'alexmerced.blog': 'content-and-media/blog/2026/AlexMercedBlog2026',
  'ingestthis.com': 'content-and-media/blog/2022/ingest_this',
  'grokoverflow.com': 'content-and-media/blog/2022/grokoverflow',
  'alexmercedlibertarian.com': 'content-and-media/website/2026/alexmercedlibertarian',
  'alexmercedmusic.com': 'content-and-media/website/2026/alexmercedmusic',
  'd6storyteller.alexmerced.com': 'content-and-media/website/2026/d6storyteller',
};

const errors = [];
const sites = new Map(registry.sites.map((s) => [s.domain, s]));
for (const domain of sites.keys()) if (!REPOS[domain]) errors.push(`sites.json lists ${domain} but REPOS has no path for it.`);
for (const domain of Object.keys(REPOS)) if (!sites.has(domain)) errors.push(`REPOS lists ${domain} but sites.json does not.`);

const groupsFor = (key) =>
  network.footer[key].map((g) => ({
    title: g.title,
    domains: g.domains.map((d) => {
      if (!sites.has(d)) errors.push(`network.json footer "${g.title}" references unknown site ${d}.`);
      return d;
    }),
  }));
const technicalGroups = groupsFor('technical');
const personalGroups = groupsFor('personal');
for (const d of Object.keys(network.cta.personal)) {
  if (sites.get(d)?.tier !== 'personal') errors.push(`network.json has a personal CTA for ${d}, which is not a personal-tier site.`);
}

if (errors.length) {
  console.error(errors.map((e) => `  - ${e}`).join('\n'));
  process.exit(1);
}

const link = (d) => ({ title: sites.get(d).title, url: sites.get(d).url });

/** alexmerced.com keeps the full directory, grouped by tier. */
function fullDirectory() {
  const live = [...sites.values()].filter((s) => s.status !== 'retired' && s.domain !== 'alexmerced.com');
  const by = (pred) => live.filter(pred).map((s) => ({ title: s.title, url: s.url }));
  return [
    { title: 'About Alex', links: by((s) => s.tier === 'person-facet') },
    { title: 'Learn and reference', links: by((s) => s.tier === 'topic-authority') },
    { title: 'Personal projects', links: by((s) => s.tier === 'personal') },
  ];
}

function footerFor(site) {
  if (site.domain === 'alexmerced.com') return fullDirectory();
  const groups = site.tier === 'personal' ? personalGroups : technicalGroups;
  return groups
    .map((g) => ({ title: g.title, links: g.domains.filter((d) => d !== site.domain).map(link) }))
    .filter((g) => g.links.length);
}

const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': person.id,
  name: person.name,
  url: person.url,
  image: person.image,
  jobTitle: person.jobTitle,
  worksFor: { '@type': 'Organization', name: person.worksFor.name, url: person.worksFor.url },
  sameAs: person.sameAs,
  knowsAbout: person.knowsAbout,
};

const esc = (s) => String(s).replaceAll('<', '\\u003c');
const { measurementId, legacyMeasurementIds } = network.analytics;

function headHtml(site) {
  const ids = [measurementId, legacyMeasurementIds[site.domain]].filter(Boolean);
  return `<!-- Generated by alexmercedcom/scripts/build-network-shared.mjs from entity/*.json. Do not edit by hand. -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
${ids.map((id) => `gtag('config', '${id}');`).join('\n')}
document.addEventListener('click', function (e) {
  var a = e.target && e.target.closest ? e.target.closest('[data-network-event]') : null;
  if (a) gtag('event', a.getAttribute('data-network-event'), { link_url: a.href, link_text: (a.textContent || '').trim(), site: location.hostname });
});
</script>
<script type="application/ld+json">${esc(JSON.stringify(personLd))}</script>
`;
}

function dataFor(site) {
  const coding = network.twitter.codingSites.includes(site.domain);
  const cta =
    site.tier === 'personal' ? network.cta.personal[site.domain] ?? null : site.status === 'retired' ? null : network.cta.technical;
  return {
    '//': 'Generated by alexmercedcom/scripts/build-network-shared.mjs from entity/*.json. Do not edit by hand.',
    site: site.domain,
    title: site.title,
    tier: site.tier,
    status: site.status ?? 'live',
    analytics: { measurementId, legacyMeasurementId: legacyMeasurementIds[site.domain] ?? null },
    twitterSite: coding ? network.twitter.coding : network.twitter.default,
    person: personLd,
    footer: { groups: footerFor(site), allSitesUrl: network.allSitesUrl, allSitesLabel: "All of Alex's sites" },
    cta,
  };
}

let stale = 0;
let written = 0;
for (const [domain, rel] of Object.entries(REPOS)) {
  const repo = join(DEV, rel);
  if (!existsSync(repo)) {
    console.warn(`skip ${domain}: ${rel} not found`);
    continue;
  }
  const site = sites.get(domain);
  const outDir = join(repo, 'network');
  const files = {
    'network.json': JSON.stringify(dataFor(site), null, 2) + '\n',
    'network-head.html': headHtml(site),
  };
  for (const [name, body] of Object.entries(files)) {
    const path = join(outDir, name);
    const current = existsSync(path) ? readFileSync(path, 'utf8') : null;
    if (current === body) continue;
    if (CHECK) {
      console.error(`stale: ${rel}/network/${name}`);
      stale++;
      continue;
    }
    mkdirSync(outDir, { recursive: true });
    writeFileSync(path, body);
    written++;
  }
}

if (CHECK && stale) process.exit(1);
console.log(CHECK ? 'All network copies are current.' : `Wrote ${written} file(s) across ${Object.keys(REPOS).length} sites.`);
