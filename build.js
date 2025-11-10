
import esbuild from 'esbuild';
import fs from 'fs/promises';
import path from 'path';

const distDir = 'dist';

async function build() {
  try {
    console.log('Starting build...');

    // 1. Clean and create dist directory
    console.log(`Cleaning directory: ${distDir}`);
    await fs.rm(distDir, { recursive: true, force: true });
    await fs.mkdir(distDir);

    // 2. Build the TSX file with esbuild
    console.log('Bundling application with esbuild...');
    const result = await esbuild.build({
      entryPoints: ['index.tsx'],
      bundle: true,
      // Use outdir and entryNames with a hash for cache busting
      outdir: distDir,
      entryNames: 'bundle.[hash]',
      loader: { '.tsx': 'tsx' },
      format: 'esm',
      external: [
        'react',
        'react-dom/*',
        'react/*',
        'react-hot-toast',
        '@supabase/supabase-js',
        'react-router-dom',
        '@heroicons/react/*',
      ],
      // Metafile is needed to find out the generated filename
      metafile: true,
    });
    console.log('Bundling complete.');

    // Find the generated JS bundle name from the metafile
    const outputFilename = Object.keys(result.metafile.outputs).find(
        (out) => out.endsWith('.js')
    );
    if (!outputFilename) {
        throw new Error('Could not find output JS bundle in metafile.');
    }
    const bundleName = path.basename(outputFilename);
    console.log(`Generated bundle: ${bundleName}`);

    // 3. Copy and modify index.html
    console.log('Processing index.html...');
    let htmlContent = await fs.readFile('index.html', 'utf-8');
    // Update the script tag to point to the hashed bundle file
    htmlContent = htmlContent.replace('src="./index.tsx"', `src="./${bundleName}"`);
    await fs.writeFile(path.join(distDir, 'index.html'), htmlContent);
    console.log('index.html updated.');

    // 4. Create .nojekyll for gh-pages
    await fs.writeFile(path.join(distDir, '.nojekyll'), '');
    console.log('.nojekyll file created.');

    console.log('Build successful!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();
