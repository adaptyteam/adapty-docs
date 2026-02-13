import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const apiConfigPath = path.join(__dirname, '../src/api-reference/config.json');
const specsDir = path.join(__dirname, '../public/api-specs');
const outputPath = path.join(__dirname, '../public/sitemap-api.xml');
const baseUrl = 'https://adapty.io/docs';

function generateSitemap() {
    console.log('🚀 Starting API Sitemap generation...');

    if (!fs.existsSync(apiConfigPath)) {
        console.error(`❌ API config not found at: ${apiConfigPath}`);
        return;
    }

    const apiConfig = JSON.parse(fs.readFileSync(apiConfigPath, 'utf8'));
    let urlEntries = [];

    apiConfig.forEach(api => {
        const specPath = path.join(specsDir, api.specFile);
        console.log(`📄 Processing spec: ${api.specFile} (${api.name})`);

        if (!fs.existsSync(specPath)) {
            console.warn(`⚠️ Spec file not found: ${specPath}`);
            return;
        }

        try {
            const specContent = fs.readFileSync(specPath, 'utf8');
            let spec;
            try {
                spec = yaml.load(specContent);
                console.log(`✅ Successfully parsed ${api.specFile} with js-yaml`);
            } catch (e) {
                console.warn(`⚠️ js-yaml failed for ${api.specFile}, trying regex fallback...`);
                // Fallback: extract operationIds via regex if YAML is strictly invalid
                const operationIdMatches = specContent.match(/operationId:\s*["']?([a-zA-Z0-9_-]+)["']?/g);
                if (operationIdMatches) {
                    const opIds = operationIdMatches.map(m => m.split(':')[1].trim().replace(/["']/g, ''));
                    spec = {
                        paths: opIds.reduce((acc, opId) => {
                            acc[`/dummy/${opId}`] = { get: { operationId: opId } };
                            return acc;
                        }, {})
                    };
                    console.log(`✅ Extracted ${opIds.length} operations via regex from ${api.specFile}`);
                }
            }

            if (!spec || !spec.paths) {
                console.warn(`⚠️ Could not extract paths from spec: ${api.specFile}`);
                return;
            }

            // Base URL for this API slug
            const apiBaseUrl = `${baseUrl}/${api.slug}`;

            // Add the main API page
            urlEntries.push(apiBaseUrl);

            // Extract operations
            Object.keys(spec.paths).forEach(pathKey => {
                const pathItem = spec.paths[pathKey];
                const methods = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head'];

                methods.forEach(method => {
                    const operation = pathItem[method];
                    if (operation && operation.operationId) {
                        // Stoplight Elements hash pattern: #/operations/operationId
                        const operationUrl = `${apiBaseUrl}#/operations/${operation.operationId}`;
                        urlEntries.push(operationUrl);
                    }
                });
            });

        } catch (e) {
            console.error(`❌ Error parsing ${api.specFile}:`, e.message);
        }
    });

    const now = new Date().toISOString();
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

    fs.writeFileSync(outputPath, sitemapXml);
    console.log(`✅ API Sitemap generated with ${urlEntries.length} URLs at: ${outputPath}`);
}

generateSitemap();
