// src/api-reference/lib/model.ts
import { renderMarkdown, renderMarkdownInline } from './render-markdown.ts';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiSpec {
  slug: string;
  name: string;
  version: string;
  descriptionHtml: string;
  servers: ApiServer[];
  securitySchemes: Record<string, ApiSecurityScheme>;
  operations: ApiOperation[];
  tags: ApiTag[];
  defaultAuth: Record<string, string>;
  specFileUrl: string;
}

export interface ApiServer {
  url: string;
  descriptionHtml?: string;
}

export interface ApiSecurityScheme {
  type: 'apiKey' | 'http' | 'oauth2' | 'openIdConnect';
  in?: 'header' | 'query' | 'cookie';
  name?: string;
  scheme?: string;
  descriptionHtml?: string;
}

export interface ApiTag {
  name: string;
  descriptionHtml?: string;
  operationIds: string[];
}

export interface ApiOperation {
  operationId: string;
  method: HttpMethod;
  path: string;
  summary: string;
  descriptionHtml: string;
  tag?: string;
  deprecated: boolean;
  parameters: ApiParameter[];
  requestBody?: ApiRequestBody;
  responses: ApiResponse[];
  security: string[];
  serverUrl: string;
}

export interface ApiParameter {
  name: string;
  in: 'path' | 'query' | 'header' | 'cookie';
  required: boolean;
  descriptionHtml: string;
  schema: ApiSchema;
  example?: unknown;
}

export interface ApiRequestBody {
  required: boolean;
  descriptionHtml: string;
  contentType: string;
  schema: ApiSchema;
  examples: ApiExample[];
}

export interface ApiResponse {
  statusCode: string;
  descriptionHtml: string;
  contentType?: string;
  schema?: ApiSchema;
  examples: ApiExample[];
}

export interface ApiExample {
  name: string;
  summary?: string;
  value: unknown;
}

export interface ApiSchema {
  type?: 'object' | 'array' | 'string' | 'number' | 'integer' | 'boolean' | 'null';
  format?: string;
  descriptionHtml?: string;
  required?: string[];
  properties?: Record<string, ApiSchema>;
  items?: ApiSchema;
  enum?: unknown[];
  example?: unknown;
  nullable?: boolean;
  oneOf?: ApiSchema[];
  anyOf?: ApiSchema[];
  allOf?: ApiSchema[];
  default?: unknown;
}

export interface ApiConfigEntry {
  name: string;
  slug: string;
  specFile: string;
  specUrl?: string;
  defaultAuth?: Record<string, string>;
}

const HTTP_METHODS: HttpMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
const KNOWN_PATH_KEYS = new Set([
  'get', 'post', 'put', 'patch', 'delete',
  'parameters', 'summary', 'description', 'servers',
  // OpenAPI also defines: head, options, trace — we don't render these but
  // we want to detect them so we don't silently drop documented operations
]);
const UNSUPPORTED_VERBS = new Set(['head', 'options', 'trace']);

function isInternal(op: any): boolean {
  return op?.['x-internal'] === true;
}

function pickContentType(content: any): string {
  if (!content || typeof content !== 'object') return 'application/json';
  if (content['application/json']) return 'application/json';
  return Object.keys(content)[0] ?? 'application/json';
}

function toExamples(content: any): ApiExample[] {
  const ct = pickContentType(content);
  const block = content?.[ct];
  if (!block) return [];
  if (block.examples && typeof block.examples === 'object') {
    return Object.entries(block.examples).map(([name, ex]: [string, any]) => ({
      name, summary: ex?.summary, value: ex?.value,
    }));
  }
  if (block.example !== undefined) {
    return [{ name: 'default', value: block.example }];
  }
  return [];
}

function toSchema(s: any, seen: WeakMap<object, ApiSchema> = new WeakMap()): ApiSchema {
  if (!s || typeof s !== 'object') return {};
  const cached = seen.get(s);
  if (cached) return cached;

  const out: ApiSchema = {};
  seen.set(s, out);  // register before recursing so cycles see the partial

  out.type = s.type;
  out.format = s.format;
  out.descriptionHtml = renderMarkdownInline(s.description);
  out.required = s.required;
  out.enum = s.enum;
  out.example = s.example;
  out.nullable = s.nullable;
  out.default = s.default;

  if (s.properties) {
    out.properties = {};
    for (const [k, v] of Object.entries(s.properties)) out.properties[k] = toSchema(v, seen);
  }
  if (s.items) out.items = toSchema(s.items, seen);
  if (s.oneOf) out.oneOf = s.oneOf.map((x: any) => toSchema(x, seen));
  if (s.anyOf) out.anyOf = s.anyOf.map((x: any) => toSchema(x, seen));
  if (s.allOf) out.allOf = s.allOf.map((x: any) => toSchema(x, seen));
  return out;
}

function toParameters(params: any[] | undefined): ApiParameter[] {
  if (!Array.isArray(params)) return [];
  return params.map(p => ({
    name: p.name,
    in: p.in,
    required: !!p.required,
    descriptionHtml: renderMarkdown(p.description),
    schema: toSchema(p.schema),
    example: p.example,
  }));
}

function mergeParams(pathLevel: any[], opLevel: any[] | undefined): any[] {
  const op = Array.isArray(opLevel) ? opLevel : [];
  const opKeys = new Set(op.map(p => `${p.in}::${p.name}`));
  // Operation-level overrides; path-level is included only if not overridden
  const inherited = pathLevel.filter(p => !opKeys.has(`${p.in}::${p.name}`));
  return [...inherited, ...op];
}

function toRequestBody(rb: any): ApiRequestBody | undefined {
  if (!rb) return undefined;
  const ct = pickContentType(rb.content);
  const block = rb.content?.[ct];
  return {
    required: !!rb.required,
    descriptionHtml: renderMarkdown(rb.description),
    contentType: ct,
    schema: toSchema(block?.schema),
    examples: toExamples(rb.content),
  };
}

function toResponses(resps: any): ApiResponse[] {
  if (!resps) return [];
  return Object.entries(resps).map(([statusCode, r]: [string, any]) => {
    const ct = pickContentType(r.content);
    const block = r.content?.[ct];
    return {
      statusCode,
      descriptionHtml: renderMarkdown(r.description),
      contentType: r.content ? ct : undefined,
      schema: block?.schema ? toSchema(block.schema) : undefined,
      examples: toExamples(r.content),
    };
  });
}

export function buildApiSpec(deref: any, config: ApiConfigEntry, baseUrl: string): ApiSpec {
  const operations: ApiOperation[] = [];
  const tagOrder: string[] = [];
  const tagOps = new Map<string, string[]>();

  const serverUrl = deref.servers?.[0]?.url ?? '';

  for (const [pathStr, pathItem] of Object.entries<any>(deref.paths ?? {})) {
    // Warn on unsupported verbs so they aren't silently dropped
    for (const key of Object.keys(pathItem ?? {})) {
      if (UNSUPPORTED_VERBS.has(key)) {
        console.warn(
          `[api-ref] ${config.slug} ${pathStr}: '${key.toUpperCase()}' verb is not rendered (only GET/POST/PUT/PATCH/DELETE are supported)`
        );
      }
    }

    const pathItemParams: any[] = Array.isArray(pathItem.parameters) ? pathItem.parameters : [];

    for (const m of HTTP_METHODS) {
      const op = pathItem[m.toLowerCase()];
      if (!op || isInternal(op)) continue;
      if (!op.operationId) {
        console.warn(`[api-ref] ${config.slug} ${m} ${pathStr}: missing operationId, skipping`);
        continue;
      }
      // We flatten op.tags[] to a single primary tag because the sidebar groups
      // each operation under exactly one section. Tag order in the output follows
      // first-appearance in the spec, which matches OpenAPI doc reading order.
      const tag = Array.isArray(op.tags) && op.tags.length > 0 ? op.tags[0] : undefined;
      if (tag) {
        if (!tagOps.has(tag)) { tagOps.set(tag, []); tagOrder.push(tag); }
        tagOps.get(tag)!.push(op.operationId);
      }
      operations.push({
        operationId: op.operationId,
        method: m,
        path: pathStr,
        summary: op.summary ?? op.operationId,
        descriptionHtml: renderMarkdown(op.description),
        tag,
        deprecated: !!op.deprecated,
        parameters: toParameters(mergeParams(pathItemParams, op.parameters)),
        requestBody: toRequestBody(op.requestBody),
        responses: toResponses(op.responses),
        security: (op.security ?? deref.security ?? []).flatMap((s: any) => Object.keys(s)),
        serverUrl,
      });
    }
  }

  const tags: ApiTag[] = tagOrder.map(name => {
    const meta = (deref.tags ?? []).find((t: any) => t.name === name);
    return {
      name,
      descriptionHtml: renderMarkdown(meta?.description),
      operationIds: tagOps.get(name)!,
    };
  });

  const securitySchemes: Record<string, ApiSecurityScheme> = {};
  for (const [k, v] of Object.entries<any>(deref.components?.securitySchemes ?? {})) {
    securitySchemes[k] = {
      type: v.type,
      in: v.in,
      name: v.name,
      scheme: v.scheme,
      descriptionHtml: renderMarkdown(v.description),
    };
  }

  const servers: ApiServer[] = (deref.servers ?? []).map((s: any) => ({
    url: s.url,
    descriptionHtml: renderMarkdownInline(s.description),
  }));

  const cleanBase = baseUrl.replace(/\/+$/, '');
  return {
    slug: config.slug,
    name: config.name,
    version: deref.info?.version ?? '',
    descriptionHtml: renderMarkdown(deref.info?.description),
    servers,
    securitySchemes,
    operations,
    tags,
    defaultAuth: config.defaultAuth ?? {},
    specFileUrl: `${cleanBase}/api-specs/${config.specFile}`,
  };
}
