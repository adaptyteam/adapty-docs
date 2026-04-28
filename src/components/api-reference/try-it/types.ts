import type { ApiOperation, ApiSecurityScheme } from '../../../api-reference/lib/model.ts';

export interface SerializedOperation {
  operationId: string;
  method: ApiOperation['method'];
  path: string;
  serverUrl: string;
  contentType?: string;
  parameters: Array<{
    name: string; in: 'path' | 'query' | 'header' | 'cookie';
    required: boolean; example?: unknown;
  }>;
  bodyExample?: string;          // pretty-printed JSON, or undefined
  security: string[];
}

export interface AuthValues {
  [securitySchemeName: string]: string;
}

export interface BuildRequestArgs {
  operation: SerializedOperation;
  pathParams: Record<string, string>;
  queryParams: Record<string, string>;
  headerParams: Record<string, string>;
  body: string | undefined;
  auth: AuthValues;
  securitySchemes: Record<string, ApiSecurityScheme>;
}

export interface BuiltRequest {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: string;
}
