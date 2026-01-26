#!/usr/bin/env node

/**
 * Image Migration Script
 * 
 * This script migrates images from src/content/docs/version-3.0/{img,FF_img,img_webhook_flows}
 * to the new structure:
 * - Article-specific images go to src/assets/{article-name}/
 * - Shared images go to src/assets/shared/
 * 
 * The script analyzes which images are used by which articles and organizes them accordingly.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.join(__dirname, '..');
const CONTENT_DIR = path.join(PROJECT_ROOT, 'src/content/docs/version-3.0');
const ASSETS_DIR = path.join(PROJECT_ROOT, 'src/assets');
const SHARED_DIR = path.join(ASSETS_DIR, 'shared');

// Image folders to migrate
const IMAGE_FOLDERS = ['img', 'FF_img', 'img_webhook_flows'];

/**
 * Get all MDX files in the content directory
 */
function getAllMdxFiles() {
  const files = [];
  
  function traverse(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory() && !IMAGE_FOLDERS.includes(entry.name)) {
        traverse(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
        files.push(fullPath);
      }
    }
  }
  
  traverse(CONTENT_DIR);
  return files;
}

/**
 * Extract image references from an MDX file
 */
function extractImageReferences(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const images = new Set();
  
  // Pattern 1: require('./img/...')
  const requirePattern = /require\(['"]\.\/(?:img|FF_img|img_webhook_flows)\/([^'"]+)['"]\)/g;
  let match;
  while ((match = requirePattern.exec(content)) !== null) {
    images.add(match[1]);
  }
  
  // Pattern 2: Direct image imports (if any)
  const importPattern = /from\s+['"]\.\/(?:img|FF_img|img_webhook_flows)\/([^'"]+)['"]/g;
  while ((match = importPattern.exec(content)) !== null) {
    images.add(match[1]);
  }
  
  return Array.from(images);
}

/**
 * Build a map of images to the articles that use them
 */
function buildImageUsageMap() {
  const mdxFiles = getAllMdxFiles();
  const imageUsageMap = new Map(); // image -> [articles]
  
  for (const mdxFile of mdxFiles) {
    const articleName = path.basename(mdxFile, '.mdx');
    const images = extractImageReferences(mdxFile);
    
    for (const image of images) {
      if (!imageUsageMap.has(image)) {
        imageUsageMap.set(image, []);
      }
      imageUsageMap.get(image).push(articleName);
    }
  }
  
  return imageUsageMap;
}

/**
 * Get all image files from the old structure
 */
function getAllImageFiles() {
  const images = [];
  
  for (const folder of IMAGE_FOLDERS) {
    const folderPath = path.join(CONTENT_DIR, folder);
    
    if (!fs.existsSync(folderPath)) {
      continue;
    }
    
    const files = fs.readdirSync(folderPath);
    for (const file of files) {
      const fullPath = path.join(folderPath, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isFile() && /\.(png|jpg|jpeg|webp|gif)$/i.test(file)) {
        images.push({
          name: file,
          folder: folder,
          path: fullPath
        });
      }
    }
  }
  
  return images;
}

/**
 * Copy image to destination
 */
function copyImage(sourcePath, destPath) {
  const destDir = path.dirname(destPath);
  
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  fs.copyFileSync(sourcePath, destPath);
}

/**
 * Main migration function
 */
function migrateImages(dryRun = true) {
  console.log('🔍 Analyzing image usage...\n');
  
  const imageUsageMap = buildImageUsageMap();
  const allImages = getAllImageFiles();
  
  console.log(`Found ${allImages.length} images in old structure`);
  console.log(`Found ${imageUsageMap.size} images referenced in MDX files\n`);
  
  const migrations = {
    articleSpecific: [],
    shared: [],
    unused: []
  };
  
  // Categorize images
  for (const image of allImages) {
    const usages = imageUsageMap.get(image.name) || [];
    
    if (usages.length === 0) {
      migrations.unused.push(image);
    } else if (usages.length === 1) {
      // Article-specific
      migrations.articleSpecific.push({
        image,
        article: usages[0]
      });
    } else {
      // Shared (used by multiple articles)
      migrations.shared.push({
        image,
        articles: usages
      });
    }
  }
  
  console.log('📊 Migration Plan:');
  console.log(`  - Article-specific images: ${migrations.articleSpecific.length}`);
  console.log(`  - Shared images: ${migrations.shared.length}`);
  console.log(`  - Unused images: ${migrations.unused.length}\n`);
  
  if (dryRun) {
    console.log('🔍 DRY RUN - No files will be moved\n');
    
    // Show some examples
    console.log('Examples of article-specific images:');
    migrations.articleSpecific.slice(0, 5).forEach(({ image, article }) => {
      console.log(`  ${image.name} → src/assets/${article}/${image.name}`);
    });
    
    console.log('\nExamples of shared images:');
    migrations.shared.slice(0, 5).forEach(({ image, articles }) => {
      console.log(`  ${image.name} → src/assets/shared/${image.name} (used by ${articles.length} articles)`);
    });
    
    console.log('\nExamples of unused images:');
    migrations.unused.slice(0, 5).forEach((image) => {
      console.log(`  ${image.name} → src/assets/shared/${image.name} (unused, moved to shared as fallback)`);
    });
    
    console.log('\n💡 Run with --execute flag to perform the migration');
    return;
  }
  
  console.log('🚀 Starting migration...\n');
  
  // Ensure shared directory exists
  if (!fs.existsSync(SHARED_DIR)) {
    fs.mkdirSync(SHARED_DIR, { recursive: true });
  }
  
  // Migrate article-specific images
  console.log('📁 Migrating article-specific images...');
  for (const { image, article } of migrations.articleSpecific) {
    const destPath = path.join(ASSETS_DIR, article, image.name);
    copyImage(image.path, destPath);
    console.log(`  ✓ ${image.name} → ${article}/`);
  }
  
  // Migrate shared images
  console.log('\n📁 Migrating shared images...');
  for (const { image, articles } of migrations.shared) {
    const destPath = path.join(SHARED_DIR, image.name);
    copyImage(image.path, destPath);
    console.log(`  ✓ ${image.name} (used by ${articles.length} articles)`);
  }
  
  // Migrate unused images to shared (as fallback)
  console.log('\n📁 Migrating unused images to shared (fallback)...');
  for (const image of migrations.unused) {
    const destPath = path.join(SHARED_DIR, image.name);
    copyImage(image.path, destPath);
    console.log(`  ✓ ${image.name}`);
  }
  
  console.log('\n✅ Migration complete!');
  console.log('\n📝 Next steps:');
  console.log('  1. Review the migrated images in src/assets/');
  console.log('  2. Test the updated components');
  console.log('  3. Update MDX files to use new ZoomImage component');
  console.log('  4. Remove old image folders after verification');
}

// Parse command line arguments
const args = process.argv.slice(2);
const execute = args.includes('--execute');

migrateImages(!execute);

