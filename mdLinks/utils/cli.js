/* const meow = require('meow');
const meowHelp = require('cli-meow-help'); */

const program = require('commander');
// const options = program.opts();

// import LinkChecker from 'linkinator';

program
	.argument('<route1>', 'connect to the specified server')
	.option('-v, --validate', 'Validate links, use with a route')
	.option('-s, --stats', 'Show stats, use with a route')
	.action((route1, options) => {

		const { readFileSync } = require('fs');
		const markdownLinkExtractor = require('markdown-link-extractor');

		const markdown = readFileSync(route1, { encoding: 'utf8' });	// string del archivo markdown
		const { links } = markdownLinkExtractor(markdown);	// objeto con todos los links

		const validate = options.validate ? 1 : 0;
		const stats = options.stats ? 1 : 0;

		let brokenLinks = 0

		const brokenPromise = new Promise((resolve) => {
				import('linkinator')
					.then(module => {
						const checker = new module.LinkChecker()
						checker.on("link", (link) => {
							if (link.state === "BROKEN") {
								brokenLinks++
							}
						})
						resolve(checker.check({ path: route1 }))
					});
		})

		if (validate === 1) {
			const markdownLinkCheck = require('markdown-link-check');
			links.forEach(link => {
				markdownLinkCheck(link, (err, results) => {
					if (err) {
						console.error('Error', err)
						return
					}
					results.forEach(result => {
						if (stats === 0) {
							console.log(route1, result.link, result.status, result.statusCode)
						}
					})
				})
			})
		}

		if (stats === 1) {
			let duplicatesTotal = links.filter((item, index) => links.indexOf(item) !== index).length
			console.log("Total: " + links.length)
			console.log("Unique: " + (links.length - duplicatesTotal))
			brokenPromise.then(() => {
				if (validate === 1) {
					console.log("Broken: " + brokenLinks)
				}
			})
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

/* const commands = {
	help: { desc: `Print help info` }
}; */

/* const helpText = meowHelp({
	name: `md-links-alexv`,
	flags,
	commands
}); */

/* const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
}; */

// module.exports = meow(helpText, options);
