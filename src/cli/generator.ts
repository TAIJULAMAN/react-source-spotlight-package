import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';
import chalk from 'chalk';
import { loadConfig } from './config';
import { SourceData } from '../types';

interface GenerateOptions {
    config?: string;
    output?: string;
    input?: string;
}

export async function generateMap(options: GenerateOptions): Promise<void> {
    console.log(chalk.blue('🔍 React Source Spotlight - Generating source map...\n'));

    // 1. Load configuration
    const config = loadConfig(options.config || 'spotlight.config.js');

    // Override config with CLI options if provided
    const inputPattern = options.input || config.input;
    const outputPath = options.output || config.output;

    console.log(chalk.gray(`Input pattern: ${inputPattern}`));
    console.log(chalk.gray(`Output path: ${outputPath}\n`));

    // 2. Scan for component files
    const files = await glob(inputPattern, {
        ignore: config.exclude || [],
        absolute: false,
    });

    if (files.length === 0) {
        console.warn(chalk.yellow('⚠️  No component files found!'));
        console.log(chalk.gray('Check your input pattern in spotlight.config.js'));
        return;
    }

    console.log(chalk.green(`✓ Found ${files.length} component files\n`));

    // 3. Build source map
    const sourceMap: Record<string, SourceData> = {};
    let processedCount = 0;

    for (const file of files) {
        try {
            const absolutePath = path.resolve(process.cwd(), file);
            const content = fs.readFileSync(absolutePath, 'utf-8');
            const stats = fs.statSync(absolutePath);

            // Use relative path as key for portability
            const relativePath = path.relative(process.cwd(), absolutePath);

            sourceMap[relativePath] = {
                code: content,
                lines: content.split('\n').length,
                size: content.length,
                lastModified: stats.mtime,
            };

            processedCount++;

            // Show progress for large projects
            if (processedCount % 10 === 0) {
                console.log(chalk.gray(`  Processed ${processedCount}/${files.length} files...`));
            }
        } catch (error) {
            console.warn(chalk.yellow(`⚠️  Could not process ${file}:`, error));
        }
    }

    // 4. Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // 5. Write source map to file
    fs.writeFileSync(outputPath, JSON.stringify(sourceMap, null, 2), 'utf-8');

    // 6. Calculate total size
    const totalSize = Object.values(sourceMap).reduce(
        (sum, data) => sum + data.size,
        0
    );
    const sizeInKB = (totalSize / 1024).toFixed(2);

    console.log(chalk.green('\n✅ Source map generated successfully!'));
    console.log(chalk.gray(`   Components: ${processedCount}`));
    console.log(chalk.gray(`   Total size: ${sizeInKB} KB`));
    console.log(chalk.gray(`   Output: ${outputPath}\n`));
}
