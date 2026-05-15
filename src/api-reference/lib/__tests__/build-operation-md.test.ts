import { test } from 'node:test';
import assert from 'node:assert/strict';
import yaml from 'js-yaml';
import {
  buildOperationMarkdown,
  buildComponentClosure,
  findOperationById,
} from '../build-operation-md.ts';

const fakeSpec = {
  openapi: '3.1.0',
  info: { title: 'Test API', version: '1.0' },
  servers: [{ url: 'https://api.example.com' }],
  security: [{ apiKey: [] }],
  tags: [{ name: 'Profile' }, { name: 'Other' }],
  paths: {
    '/profile/{id}': {
      parameters: [{ $ref: '#/components/parameters/IdParam' }],
      get: {
        operationId: 'getProfile',
        summary: 'Get profile',
        description: 'Returns the profile.\n\nMulti-paragraph.',
        tags: ['Profile'],
        security: [{ apiKey: [] }],
        responses: {
          '200': {
            description: 'OK',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Profile' } } },
          },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
      post: {
        operationId: 'updateProfile',
        summary: 'Update profile',
      },
    },
    '/unrelated': {
      get: { operationId: 'unrelated', summary: 'Unrelated' },
    },
  },
  components: {
    parameters: {
      IdParam: { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      UnusedParam: { name: 'foo', in: 'query', schema: { type: 'string' } },
    },
    schemas: {
      Profile: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          settings: { $ref: '#/components/schemas/Settings' },
        },
      },
      Settings: { type: 'object', properties: { theme: { type: 'string' } } },
      Unused: { type: 'object' },
    },
    responses: {
      NotFound: { description: 'Not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
    },
    securitySchemes: {
      apiKey: { type: 'apiKey', name: 'X-API-Key', in: 'header' },
    },
  },
};

// Add Error schema referenced by the NotFound response (defined after the
// fact to keep the spec object literal readable above)
(fakeSpec.components.schemas as any).Error = { type: 'object', properties: { message: { type: 'string' } } };

test('findOperationById locates path/method pair', () => {
  const found = findOperationById(fakeSpec, 'getProfile');
  assert.equal(found?.path, '/profile/{id}');
  assert.equal(found?.method, 'get');

  const missing = findOperationById(fakeSpec, 'doesNotExist');
  assert.equal(missing, null);
});

test('buildComponentClosure pulls only transitively-referenced components', () => {
  const found = findOperationById(fakeSpec, 'getProfile')!;
  // Walk closure starting from a sliced path item, mirroring what the markdown
  // builder does (path-level params count too).
  const slicedPathItem = {
    parameters: fakeSpec.paths['/profile/{id}'].parameters,
    get: found.op,
  };
  const closure = buildComponentClosure(fakeSpec, slicedPathItem);

  assert.deepEqual(Object.keys(closure.parameters ?? {}), ['IdParam']);
  // Profile + transitively Settings + Error (reachable via NotFound response)
  assert.deepEqual(
    new Set(Object.keys(closure.schemas ?? {})),
    new Set(['Profile', 'Settings', 'Error']),
  );
  assert.deepEqual(Object.keys(closure.responses ?? {}), ['NotFound']);
  // Unused components must NOT appear
  assert.ok(!('UnusedParam' in (closure.parameters ?? {})));
  assert.ok(!('Unused' in (closure.schemas ?? {})));

  // Security schemes are always preserved (referenced by name, not by $ref)
  assert.ok('apiKey' in closure.securitySchemes);
});

test('buildOperationMarkdown produces context7-style doc with sliced spec', () => {
  const md = buildOperationMarkdown(fakeSpec, 'web-api.yaml', 'getProfile');
  assert.ok(md, 'markdown should be produced');

  // H1 = summary
  assert.match(md!, /^# Get profile\n/);

  // Description rendered as multi-line blockquote with empty-line bridge
  assert.match(md!, /\n> Returns the profile\.\n>\n> Multi-paragraph\.\n/);

  // ## OpenAPI fence with the path/method header line
  assert.match(md!, /## OpenAPI\n\n```yaml\n\/api-specs\/web-api\.yaml get \/profile\/\{id\}\n/);

  // YAML payload is parseable and contains exactly one path/method
  const fenceMatch = md!.match(/```yaml\n([\s\S]*?)```/);
  assert.ok(fenceMatch, 'expected a yaml code fence');
  // Strip the header line to get just the YAML
  const body = fenceMatch![1].split('\n').slice(1).join('\n');
  const reparsed = yaml.load(body) as any;

  assert.equal(reparsed.info?.title, 'Test API');
  assert.deepEqual(Object.keys(reparsed.paths), ['/profile/{id}']);
  assert.deepEqual(Object.keys(reparsed.paths['/profile/{id}']).sort(), ['get', 'parameters']);
  // The unrelated POST must be excluded
  assert.ok(!('post' in reparsed.paths['/profile/{id}']));

  // Components are filtered to closure
  assert.ok(reparsed.components?.schemas?.Profile);
  assert.ok(!reparsed.components?.schemas?.Unused);
});

test('buildOperationMarkdown preserves $refs verbatim (does not deref)', () => {
  const md = buildOperationMarkdown(fakeSpec, 'web-api.yaml', 'getProfile')!;
  assert.match(md, /\$ref: "?#\/components\/schemas\/Profile/);
  assert.match(md, /\$ref: "?#\/components\/parameters\/IdParam/);
});

test('buildOperationMarkdown returns null for unknown operationId', () => {
  const md = buildOperationMarkdown(fakeSpec, 'web-api.yaml', 'nope');
  assert.equal(md, null);
});

test('buildOperationMarkdown handles operations with no description', () => {
  const md = buildOperationMarkdown(fakeSpec, 'web-api.yaml', 'updateProfile')!;
  assert.match(md, /^# Update profile\n\n## OpenAPI\n/);
  // No blockquote when description is missing
  assert.doesNotMatch(md, /^>/m);
});
