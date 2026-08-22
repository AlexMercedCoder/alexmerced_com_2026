/**
 * Exercises the shared WebMCP tools against the local entity layer.
 * Stubs the browser globals the library expects, and records every tool
 * registered through a fake document.modelContext.
 *
 * Run: npm run test:webmcp
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const registered = [];

// --- browser stubs --------------------------------------------------------
const g = globalThis;

g.window = g;
g.location = { href: 'https://opendatalakehouse.com/kb/apache-iceberg/', hostname: 'opendatalakehouse.com' };
g.document = {
  querySelector: (sel) =>
    sel.includes('canonical') ? { href: 'https://opendatalakehouse.com/kb/apache-iceberg/' } : null,
  querySelectorAll: () => [],
  modelContext: {
    registerTool: async (tool) => {
      registered.push(tool);
    },
  },
};
g.URL = URL;

// Serve entity fetches from the local files the build just produced.
g.fetch = async (url) => {
  const path = new URL(url).pathname;
  try {
    const body = readFileSync(join(ROOT, 'public', path), 'utf-8');
    return { ok: true, status: 200, json: async () => JSON.parse(body) };
  } catch {
    return { ok: false, status: 404, json: async () => ({}) };
  }
};

// --- load library ---------------------------------------------------------
const src = readFileSync(join(ROOT, 'webmcp', 'alex-merced-webmcp.js'), 'utf-8');
new Function(src).call(g);

const API = g.AlexMercedWebMCP;

// The network index lives under /entity/, which the build copies into public/.
const res = await API.init({
  site: 'opendatalakehouse.com',
  packs: ['books', 'projects', 'biography', 'knowledge'],
});

let failures = 0;
const pass = (label, cond, detail) => {
  if (!cond) failures++;
  console.log(`${cond ? 'ok  ' : 'FAIL'}  ${label}${detail ? ' -> ' + detail : ''}`);
};

console.log(`\nregistration: ${res.registered}/${API.tools.length} tools, supported=${res.supported}\n`);
pass('all tools registered', res.registered === API.tools.length);
pass('every tool has a name and description', API.tools.every((t) => t.name && t.description));
pass('every tool has an execute function', API.tools.every((t) => typeof t.execute === 'function'));

const call = async (name, input) => {
  const tool = registered.find((t) => t.name === name);
  if (!tool) throw new Error('tool not registered: ' + name);
  return JSON.parse(await tool.execute(input, {}));
};

console.log('\n--- tool behaviour ---');

const author = await call('get_author', { bioLength: 'speaker' });
pass('get_author returns canonical id', author.entityId === 'https://alexmerced.com/#alexmerced');
pass('get_author reports 63 books', author.books === 63, String(author.books));
pass('get_author returns speaker bio', /Head of Developer Relations/.test(author.bio || ''));

const routed = await call('find_site_for_topic', { topic: 'Apache Polaris credential vending' });
pass('routes Polaris query', routed.matched === true);
pass('  -> opendatalakehouse.com', routed.recommendedSite?.domain === 'opendatalakehouse.com', routed.recommendedSite?.domain);
pass('  -> cites the Polaris book', (routed.relatedBooks || []).some((b) => /Polaris/.test(b)));
pass('  -> carries trademark note', Boolean(routed.trademarkNote));

const sem = await call('find_site_for_topic', { topic: 'semantic layer' });
pass('routes semantic layer', sem.recommendedSite?.domain === 'semanticlakehouse.com', sem.recommendedSite?.domain);

const agents = await call('find_site_for_topic', { topic: 'agent harness with memory' });
pass('routes agent harness', agents.recommendedSite?.domain === 'alexmercedcoder.dev', agents.recommendedSite?.domain);
pass('  -> lists Loro/MagGraph', (agents.relatedProjects || []).length > 0, (agents.relatedProjects || []).join(', '));

const nomatch = await call('find_site_for_topic', { topic: 'quantum basket weaving' });
pass('unmatched topic degrades gracefully', nomatch.matched === false && Array.isArray(nomatch.availableTopics));

const canon = await call('get_canonical_url', {});
pass('canonical url detected', canon.isCanonicalHome === true, canon.canonicalUrl);

const related = await call('get_related_sites', { tier: 'topic-authority' });
pass('site registry filters by tier', related.count > 0 && related.sites.every((s) => s.tier === 'topic-authority'), String(related.count));

const resource = await call('find_resource', { goal: 'learn Apache Iceberg with Python' });
pass('finds Iceberg books', resource.books.length > 0, resource.books.map((b) => b.title).slice(0, 2).join(' | '));

const proj = await call('find_resource', { goal: 'iceberg catalog in rust', type: 'project' });
pass('finds Pangolin', proj.projects.some((p) => p.name === 'Pangolin'), proj.projects.map((p) => p.name).join(', '));

const net = await call('search_alex_merced_network', { query: 'iceberg catalog' });
pass('network search returns hits', net.count > 0, `${net.count} results`);
pass('  -> results carry site + url', net.results.every((r) => r.site && r.url));

const netBooks = await call('search_alex_merced_network', { query: 'agentic analytics', contentType: 'book' });
pass('network search filters by type', netBooks.results.every((r) => r.type === 'book'), `${netBooks.count} books`);

const topic = await call('get_topic', { topic: 'open lakehouse' });
pass('get_topic defines open lakehouse', /open file and table formats/.test(topic.definition || ''));

console.log('\n--- tool packs ---');
for (const n of ['search_books', 'get_book', 'find_book_for_reader', 'search_projects',
                 'get_installation_instructions', 'list_specs', 'get_biography',
                 'get_career_timeline', 'get_definition']) {
  pass(`pack tool present: ${n}`, registered.some((t) => t.name === n));
}

const rec = await call('find_book_for_reader', { goal: 'learn iceberg catalogs and governance' });
pass('recommends a book', rec.recommendations.length > 0, rec.recommendations[0]?.title);

const inst = await call('get_installation_instructions', { project: 'Loro' });
pass('install command for Loro', inst.install === 'pip install loro-agent', inst.install);

const specs = await call('list_specs');
pass('lists AGS spec', specs.specifications.some((s) => s.abbreviation === 'AGS'), `${specs.count} spec(s)`);

const bio = await call('get_biography', { length: 'speaker' });
pass('speaker bio available', /63 books/.test(bio.biography || ''));

const def = await call('get_definition', { term: 'apache iceberg' });
pass('defines a term', /open table format/.test(def.definition || ''), def.source);

console.log('\n--- read-only guarantee ---');
const mutating = /\b(document\.write|localStorage|sessionStorage|\.submit\(|\.click\(|XMLHttpRequest|method:\s*['"]POST)/;
pass('library contains no mutating calls', !mutating.test(src));
pass('manifest marks tools read-only', API.manifest().readOnly === true);

console.log(`\n${failures ? failures + ' FAILURE(S)' : 'all checks passed'}\n`);
process.exit(failures ? 1 : 0);
