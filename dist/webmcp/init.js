/**
 * WebMCP setup for alexmerced.com, the entity root of the network.
 *
 * The shared layer already provides the router (find_site_for_topic),
 * identity (get_author), and network search. The tools added here are the
 * catalog-style listings that belong to the hub.
 *
 * All tools are read only.
 */
(function () {
  'use strict';
  if (!window.AlexMercedWebMCP) return;

  var API = window.AlexMercedWebMCP;

  // Same-origin: this file only ever runs on alexmerced.com, which hosts the
  // entity layer. Relative paths also keep local development working.
  function get(path) {
    return fetch(path, { credentials: 'omit' }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    });
  }

  var siteTools = [
    {
      name: 'list_books',
      title: 'List books by Alex Merced',
      description:
        'List the books Alex Merced has written, optionally filtered by subject or category. ' +
        'Returns titles, publishers, and canonical pages.',
      inputSchema: {
        type: 'object',
        properties: {
          topic: { type: 'string', description: 'Filter by subject, e.g. "iceberg" or "agents".' },
          category: {
            type: 'string',
            enum: ['Tech', 'Economics & Philosophy', 'Fiction', 'Tabletop RPG'],
            description: 'Filter by category.'
          },
          flagshipOnly: { type: 'boolean', description: 'Only publisher-backed flagship titles.' }
        }
      },
      execute: function (input) {
        input = input || {};
        return get('/entity/books.json').then(function (d) {
          var list = d.books;
          if (input.category) list = list.filter(function (b) { return b.category === input.category; });
          if (input.flagshipOnly) list = list.filter(function (b) { return b.flagship; });
          if (input.topic) {
            var q = String(input.topic).toLowerCase();
            list = list.filter(function (b) {
              return (b.title + ' ' + b.description).toLowerCase().indexOf(q) !== -1;
            });
          }
          return JSON.stringify(
            {
              total: d.count,
              matched: list.length,
              books: list.map(function (b) {
                return {
                  title: b.title,
                  category: b.category,
                  publisher: b.publisher,
                  url: b.canonicalPage,
                  buy: b.url
                };
              })
            },
            null,
            2
          );
        });
      }
    },

    {
      name: 'list_projects',
      title: 'List open source projects',
      description:
        'List the open source software and specifications Alex Merced maintains, with ' +
        'repositories, install commands, and status.',
      inputSchema: {
        type: 'object',
        properties: {
          category: {
            type: 'string',
            enum: ['agent-infrastructure', 'lakehouse-tooling', 'developer-utilities'],
            description: 'Filter by project category.'
          }
        }
      },
      execute: function (input) {
        input = input || {};
        return get('/entity/projects.json').then(function (d) {
          var list = d.projects;
          if (input.category) list = list.filter(function (p) { return p.category === input.category; });
          return JSON.stringify(
            {
              categories: d.categories,
              count: list.length,
              projects: list.map(function (p) {
                return {
                  name: p.name,
                  category: p.category,
                  tagline: p.tagline,
                  repository: p.repository,
                  website: p.website,
                  install: p.package
                    ? (p.packageManager === 'pypi' ? 'pip install ' : 'npm install ') + p.package
                    : undefined,
                  status: p.status,
                  isSpecification: p.isSpecification
                };
              })
            },
            null,
            2
          );
        });
      }
    },

    {
      name: 'get_contact_options',
      title: 'Get contact options',
      description:
        'Return the ways to reach Alex Merced, including the press kit for media requests. ' +
        'Read only: this does not send anything.',
      inputSchema: { type: 'object', properties: {} },
      execute: function () {
        return get('/entity/alex-merced.json').then(function (p) {
          return JSON.stringify({ contact: p.contact, note: 'These are published contact routes. Use them yourself; this tool never sends a message.' }, null, 2);
        });
      }
    }
  ];

  API.init({ site: 'alexmerced.com', tools: siteTools });
})();
