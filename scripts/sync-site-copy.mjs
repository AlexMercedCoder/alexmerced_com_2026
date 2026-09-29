import { readFileSync, writeFileSync } from 'node:fs';

const books = JSON.parse(readFileSync(new URL('../entity/books.json', import.meta.url), 'utf8'));
const person = JSON.parse(readFileSync(new URL('../entity/alex-merced.json', import.meta.url), 'utf8'));
const flagship = books.books.filter(book => book.flagship);
if (flagship.length !== 4 || books.count !== books.books.length || person.stats.books !== books.count) {
  throw new Error('Book catalog and person statistics disagree');
}

const escapeHtml = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const names = [flagship[0], flagship[2], flagship[1], flagship[3]].map(book => book.title);
const role = `${person.jobTitle} at ${person.worksFor.name}`;
const facts = {
  'expert-summary': `${role}. Author of ${books.count} books including four flagship O'Reilly, Manning, and Packt titles: ${names.slice(0, -1).join(', ')}, and ${names.at(-1)}. Leading voice in data lakehouses, Apache Iceberg, and AI.`,
  'career-summary': `${person.jobTitle}. 2025 CEO Award Winner. Author of ${names.slice(0, -1).join(', ')}, and ${names.at(-1)}. Global conference speaker.`,
  'book-count': books.count,
  'book-heading': `Author of ${books.count} Books`,
  'book-badge': `${books.count} Books`,
  'book-credential': `${books.count} titles on data engineering, AI, economics, philosophy, fiction, and tabletop RPGs`,
  'speaking-lead': `Alex Merced is ${role} and an author and educator on open data architecture. He speaks with data teams, developers, and business audiences about building useful systems and helping people understand them.`,
  'professional-summary': `Alex Merced is the ${role}, an O'Reilly, Manning, and Packt author of ${books.count} books, and a leading educator on data lakehouse architecture, Apache Iceberg, Apache Polaris, and agentic analytics.`,
  'press-role': `${role} · O'Reilly, Manning & Packt Author · Data Lakehouse Expert`
};

const picks = [
  ['For data builders', 'apache-iceberg-the-definitive-guide', 'Understand the open table format behind modern lakehouses.'],
  ['For AI beginners', 'ai-and-agents-for-normal-people', 'Get started with everyday AI tools and agents.'],
  ['For fiction readers', 'embers-of-claim', 'Begin an epic fantasy trilogy.'],
  ['For tabletop storytellers', 'd6-storyteller-the-core-rulebook', 'Build characters and worlds with a fiction-first RPG.']
];
const pickMarkup = `<div class="book-picks">\n${picks.map(([label, slug, description]) => {
  const book = books.books.find(item => item.slug === slug);
  if (!book?.canonicalPage) throw new Error(`Missing catalog pick: ${slug}`);
  return `        <a class="book-pick" href="${escapeHtml(book.canonicalPage)}" target="_blank" rel="noopener"><span class="book-pick__label">${escapeHtml(label)}</span><strong>${escapeHtml(book.title)}</strong><span>${escapeHtml(description)}</span><span class="book-pick__arrow">Explore book ↗</span></a>`;
}).join('\n')}\n      </div>`;

for (const name of ['index.html', 'bio.html', 'professional.html', 'press_kit.html', 'speaking.html']) {
  const path = new URL(`../${name}`, import.meta.url);
  let html = readFileSync(path, 'utf8');
  html = html.replace(/(<([a-z][\w-]*)\b[^>]*data-site-fact="([\w-]+)"[^>]*>)[\s\S]*?(<\/\2>)/g, (full, open, tag, key, close) => {
    if (!(key in facts)) throw new Error(`Unknown site fact: ${key}`);
    return `${open}${escapeHtml(facts[key])}${close}`;
  });
  if (name === 'index.html' || name === 'bio.html') {
    html = html.replace(/(<!-- site-book-picks:start -->)[\s\S]*?(<!-- site-book-picks:end -->)/, `$1\n      ${pickMarkup}\n      $2`);
  }
  writeFileSync(path, html);
}
