const meow = require('meow');
const meowHelp = require('cli-meow-help');

const program = require('commander')
const options = program.opts();

program
	.argument('<route1>', 'connect to the specified server')
	.option('-v, --validate', 'Validate links, use with a route')
	.option('-s, --stats', 'Show stats, use with a route')
	.action((route1, options) => {
		
		const { readFileSync } = require('fs');
		const markdownLinkExtractor = require('markdown-link-extractor');

		'use strict';

		const { marked } = require('marked');
		const htmlLinkExtractor = require('html-link-extractor');

		const markdown = readFileSync(route1, { encoding: 'utf8' });
		const { links } = markdownLinkExtractor(markdown);

		if (options.validate) {
			const markdownLinkCheck = require('markdown-link-check');

			links.forEach(link => {
				markdownLinkCheck(link, function (err, results) {
					if (err) {
						console.error('Error', err)
						return
					}
					results.forEach(function (result) {
						console.log(route1, result.link, result.status, result.statusCode)
					})
				});
			}); 
		}

		if (options.stats) {
			let duplicatesTotal = links.filter((item, index) => links.indexOf(item) !== index).length
			console.log("Total: " + links.length)
			console.log("Unique: " + (links.length - duplicatesTotal))
		}
	})
program.parse(process.argv)

const flags = {
	clear: {
		type: `boolean`,
		default: false,
		alias: `c`,
		desc: `Clear the console`
	},
	noClear: {
		type: `boolean`,
		default: false,
		desc: `Don't clear the console`
	},
	debug: {
		type: `boolean`,
		default: false,
		alias: `d`,
		desc: `Print debug info`
	},
	version: {
		type: `boolean`,
		desc: `Print CLI version`
	},
};

const commands = {
	help: { desc: `Print help info` }
};

const helpText = meowHelp({
	name: `md-links-alexv`,
	flags,
	commands
});

/* const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
}; */

module.exports = meow(helpText, options);
