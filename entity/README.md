# Entity layer

Canonical facts about Alex Merced. Every site in the network resolves author
identity back to the stable identifier `https://alexmerced.com/#alexmerced`.

## Editing

Edit the files in this directory. Everything under `public/entity/`,
plus `public/entity.json`, `public/entity.jsonld`, and `public/about.json`,
is **generated** by `scripts/build-entity.mjs` and runs as part of `npm run build`.

| File | Holds |
|---|---|
| `alex-merced.json` | Person facts, bios at four lengths, career timeline, social handles |
| `books.json` | Full bibliography, generated from books.alexmerced.com `list.md` |
| `projects.json` | Open source software and specifications |
| `sites.json` | Network registry with each site's semantic purpose |
| `topics.json` | Topic-to-site routing that powers `find_site_for_topic` |

## Rules

**Never hardcode the book count in site copy.** Read it from
`entity/books.json` or `/about.json`. Before this layer existed the network
carried six different counts (61+, 51+, 50+, 48+, 35+, 30) for the same fact.

**Bios are generated, not retyped.** Use `bio.oneLine`, `bio.short`,
`bio.medium`, or `bio.speaker` rather than writing a new variant per site.

**Apache project names are subject matter, never branding.** Apache Iceberg,
Polaris, Parquet, and Arrow are ASF trademarks. Use them to describe what a page
covers; never as a site name, masthead, or wordmark. `sites.json` carries the
non-affiliation notice.

## Consistency checks

The build fails rather than publishing contradictory facts. It verifies that:

- the book count in `alex-merced.json` matches the actual entries in `books.json`
- every site referenced in `topics.json` exists in `sites.json`
- every book and project referenced in `topics.json` exists by exact title

## Regenerating books.json

`books.json` derives from `list.md` in the books-by-alex-merced repo, applying
that repo's `PUBLISHER_OVERRIDES` (`list.md` under-credits the three
publisher-backed titles as self-published). If books are added there, regenerate
rather than hand-editing.
