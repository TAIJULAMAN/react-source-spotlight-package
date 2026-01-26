#!/usr/bin/env node
const { Command } = require('commander');
const { generateMap } = require('../dist/cli/generator');
const chalk = require('chalk');

const program = new Command();

program
    .name('spotlight')
    .description('Generate source code map for React Source Spotlight')
    .version('1.0.0');

program
    .command('generate')
    .description('Scan components and generate spotlight-map.json')
    .option('-c, --config <path>', 'Config file path', 'spotlight.config.js')
    .option('-o, --output <path>', 'Output path for JSON map')
    .option('-i, --input <pattern>', 'Input glob pattern for components')
    .action(async options => {
        try {
            await generateMap(options);
        } catch (error) {
            console.error(chalk.red('Error generating spotlight map:'), error.message);
            process.exit(1);
        }
    });

program.parse();
