const meow = require('meow');
const meowHelp = require('cli-meow-help');

const program = require('commander');
const options = program.opts();

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

		if (options.validate) {
			// myPromise.then(() => {
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
			// })
		}

		let brokenLinks = 0

		const brokenPromise = new Promise((resolve) => {
			import('linkinator')
				.then(module => {
					// console.log("module es: ", module)
					// console.log(module.LinkChecker)
					// console.log("PROCESANDO, ESTA LENTO")

					const checker = new module.LinkChecker()

					checker.on("link", (link) => {
						if (link.state === "BROKEN") {
							brokenLinks++
							// console.log(link["url"])
						}
					})

					// const myPromise = new Promise((resolve) => {
					resolve(checker.check({ path: route1 }))
					// });
				});
		})

		if (options.stats) {
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
		// 'use strict';

		/* 		const link = require('linkinator');
		
				async function complex() {
					// create a new `LinkChecker` that we'll use to run the scan.
					const checker = new link.LinkChecker();
		
					// Respond to the beginning of a new page being scanned
					checker.on('pagestart', url => {
						console.log(`Scanning ${url}`);
					});
		
					// After a page is scanned, check out the results!
					checker.on('link', result => {
		
						// check the specific url that was scanned
						console.log(`  ${result.url}`);
		
						// How did the scan go?  Potential states are `BROKEN`, `OK`, and `SKIPPED`
						console.log(`  ${result.state}`);
		
						// What was the status code of the response?
						console.log(`  ${result.status}`);
		
						// What page linked here?
						console.log(`  ${result.parent}`);
					});
				} */

		// import LinkChecker from 'linkinator';
		// const { LinkChecker } = require('linkinator');

		/* 		var { HtmlUrlChecker } = require("broken-link-checker");
				var brokenUrlList = [];
		
				const processedLinks = links.filter(link => link.match(/^(https?:\/\/[-a-zA-Z0-9@:%._\+~#=])/));
		
				const defaultBaseUrlList = processedLinks
				async function main() {
		
					async function urlChecker(url) {
		
						await new Promise(resolve => {
		
							const htmlUrlChecker = new HtmlUrlChecker(
								{
									excludeInternalLinks: false,
									excludeExternalLinks: false,
									excludedKeywords: ['*linkedin*'],
									filterLevel: 0,
									acceptedSchemes: ["http", "https"],
									requestMethod: "get"
								},
								{
									"error": (error) => {
										console.error(error);
									},
									"link": (result) => {
										try {
											let brokenLink = `${result.http.response.statusCode} => ${result.url.resolved}`;
											console.log(brokenLink);
		
											if (result.broken) {
												if (result.http.response && ![undefined, 200].includes(result.http.response.statusCode)) {
		
													var urlCrawlResult = new Object();
													urlCrawlResult.status = result.http.response.statusCode;
													urlCrawlResult.url = result.url.resolved;
													urlCrawlResult.htmlBaseUrl = result.base.original;
													urlCrawlResult.statusMessage = result.http.response.statusMessage;
		
													brokenUrlList.push(urlCrawlResult);
												}
											}
										} catch (error) {
											console.log(error)
										}
		
									},
									"end": () => {
										console.log("base url check completed..");
										resolve();
									}
								}
							);
		
							try {
								htmlUrlChecker.enqueue(url);
		
							} catch (error) {
								console.log(error)
							}
		
						});
					}
		
					async function checkAndGetResults() {
						console.log(defaultBaseUrlList)
						for (let baseUrl of defaultBaseUrlList) {
							await urlChecker(baseUrl);
						}
		
						await new Promise(resolve => {
							if (brokenUrlList.length > 0) {
								brokenUrlList.forEach(url => {
									let message = "\nurl is: " + url.url + "\n"
										+ "html base url is: " + url.htmlBaseUrl + "\n"
										+ "status message is: " + url.statusMessage + "\n"
										+ "status is: " + url.status + "\n";
		
									console.log(message);
								});
							}
							else {
								console.log("\nJob Completed.. There is no broken links!!")
							}
		
							resolve();
						});
					}
		
					async function executeJob() {
						await checkAndGetResults();
						process.exit(0);
					};
		
					executeJob();
				}
		
				main(...process.argv.slice(2)); */





		/* 		new Promise(brokenLinks)
					// parte 1
					.then((value) => {
						if (options.validate) {
							const markdownLinkCheck = require('markdown-link-check');
							links.forEach(link => {
								markdownLinkCheck(link, (err, results) => {
									if (err) {
										console.error('Error', err)
									}
									results.forEach(result => {
										new Promise(result, value)
											.then((result, value) => {
												if (stats === 0) {
													console.log(route1, result.link, result.status, result.statusCode)
												}
												resolve(result, value);
											})
											.then((result, value) => {
												if (result.status === "dead") {
													value += 1
													console.log("brokenLinks iteracion es: " + value)
												}
												resolve(result, value);
											})
		
									})
								})
							})
						}
						resolve(value);
					})
					// parte 2
					.then((value) => {
						console.log("brokenLinks 1° .then es: " + brokenLinks)
						return value
					})
					// parte 3
					.then((value) => {
						console.log("brokenLinks 2° .then es: " + brokenLinks)
						if (options.stats) {
							let duplicatesTotal = links.filter((item, index) => links.indexOf(item) !== index).length
							console.log("Total: " + links.length)
							console.log("Unique: " + (links.length - duplicatesTotal))
							if (validate === 1) {
								console.log("Broken: " + value)
							}
						}
					}) */






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

// module.exports = meow(helpText, options);
