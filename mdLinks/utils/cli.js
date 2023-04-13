/* const meow = require('meow');
const meowHelp = require('cli-meow-help'); */

const program = require('commander');
// const options = program.opts();

// import LinkChecker from 'linkinator';

program
	.argument('<route1>', 'connect to the specified server')
	.option('-v, --validate', 'Validate links, use with a route')
	.option('-s, --stats', 'Show stats, use with a route')
	.action((route, options) => {

		console.log("") // linea extra para que se vea bonito

		import('linkinator')
			.then(module => {

				const { readdirSync, /* readFileSync,  */readFile } = require('fs');
				const markdownLinkExtractor = require('markdown-link-extractor');
				const markdownLinkCheck = require('markdown-link-check');

				// const markdown = readFileSync(route, { encoding: 'utf8' });	// string del archivo markdown

				const validate = options.validate ? 1 : 0;
				const stats = options.stats ? 1 : 0;

				if (route.match(/(\.md)$/)) {
					// const markdown = readFileSync(route, { encoding: 'utf8' });	// string del archivo markdown
					let markdown = "no esta modificado"
					readFile(route, { encoding: 'utf8' }, function (err, data) {
						markdown = data
						// console.log(markdown)
						const { links } = markdownLinkExtractor(markdown)
						// console.log(links)
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
									resolve(checker.check({ path: route }))
								});
						})

						const markdownLinkCheck = require('markdown-link-check');

						links.forEach(link => {
							markdownLinkCheck(link, (err, results) => {
								if (err) {
									console.error('Error', err)
									return
								}
								results.forEach(result => {
									if ((validate === 0) && (stats === 0)) console.log(route, result.link)
									if ((validate === 1) && (stats === 0)) console.log(route, result.link, result.status, result.statusCode)
								})
							})
						})

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

					}) // end readFile

				} else {
					const markdown2 = readdirSync(route, { encoding: 'utf8' })

					const checker = new module.LinkChecker()

					for (i in markdown2) {
						// console.log(markdown2[i])
						// let markdown = "no esta modificado"
						const routeMarkdown = `${route}\\${markdown2[i]}`
						readFile(routeMarkdown, { encoding: 'utf8' }, function (err, data) {
							// markdown = data
							// console.log(routeMarkdown)
							// console.log(markdown2[i])
							let { links } = markdownLinkExtractor(data)
							console.log(data)
							let links2 = links.filter((item) => item.match(/^(https)+\:\/\//)) // quitamos links que no son https
							// const markdown2Step = markdown2[i]
							// console.log(links2)	

							if ((validate === 0) && (stats === 1)) {
								let duplicatesTotal = links2.filter((item, index) => links2.indexOf(item) !== index).length
								console.log(routeMarkdown)
								console.log("  Total: " + links2.length)
								console.log("  Unique: " + (links2.length - duplicatesTotal))
								console.log("")
							}

							for (j in links2) {

								if ((validate === 0) && (stats === 0)) console.log(routeMarkdown, links2[j])

								if ((validate === 1) && (stats === 0)) {									
									// console.log(markdown2[i])
									// console.log(links2[j]) 

									/* const resultPromise = new Promise((resolve) => {
	
										const checker = new module.LinkChecker()
										checker.on("link", (link) => {
											// console.log(link)
											// console.log(routeMarkdown, link.url, link.state, link.status)
										})
										resolve(checker.check({ path: links2[j] }))
	
									})
	
									resultPromise.then(() => {
										console.log(routeMarkdown, result.links[0].url, result.links[0].state, result.links[0].status)
									}) */

									Promise.resolve(links2[j])
										.then((value) =>
											new Promise((resolve) => {
												// console.log(value)
												// console.log(value[1])
												// const result = checker.on("link", (value) => {
												// console.log(link)
												// })
												const result = checker.check({ path: value });
												// console.log(markdown2[i], result.links[0].url, result.links[0].state, result.links[0].status)
												resolve(result)
											})
										)
										.then((value) => {
											// console.log(value)
											console.log(routeMarkdown, value.links[0].url, value.links[0].state, value.links[0].status);
										})

								}

							}

							if ((validate === 1) && (stats === 1)) {

								let brokenLinks = 0

								const brokenPromise = new Promise((resolve) => {

									const checker = new module.LinkChecker()
									checker.on("link", (link) => {
										if (link.state === "BROKEN") {
											brokenLinks++
										}
									})
									resolve(checker.check({ path: links2[j] }))

								})

								brokenPromise.then(() => {
									let duplicatesTotal = links.filter((item, index) => links.indexOf(item) !== index).length
									console.log(markdown2[i])
									console.log("  Total: " + links.length)
									console.log("  Unique: " + (links.length - duplicatesTotal))
									console.log("  Broken: " + brokenLinks)
								})

							}

						}) // end readFile
					} // end for markdown2
				} // end else
			}) // end special import
	}) // end commander

/* const result = await checker.check({
	path: links[j],
	// port: 8673,
	// recurse: true,
	// linksToSkip: [
	//   'https://jbeckwith.com/some/link',
	//   'http://example.com'
	// ]
}); */

// console.log(result.passed ? 'PASSED :D' : 'FAILED :(');

// console.log(markdown2[i], links[j])
/* checker.check({
	path: links[j]
	// linksToSkip: [links[j]]
});
console.log(markdown2[i], links[j]) */
// console.log(results["links"][0]["url"]);
// }


// const check = new module.check		
/* checker.on("link", (link) => {
	console.log(markdown2[i], links[j], link.state)
	// process.stdout.write(link.state)
	if (link.state === "BROKEN") {
		brokenLinks++
	}
}) */

// resolve(checker.check({ path: links[i] }))
/*	checker.check({
	path: links[j],
	recurse: false,
	linksToSkip: ["/src/img/historiasdeusuario.jpg"]
}) */

// })




/* links.forEach(link => {
	markdownLinkCheck(link, (err, results) => {
		if (err) {
			console.error('Error', err)
			return
		}
		results.forEach(result => {
			if ((validate === 0) && (stats === 0)) console.log(markdown2[i], result.link)
			if ((validate === 1) && (stats === 0)) console.log(markdown2[i], result.link, result.status, result.statusCode)
		})
	})
}) */

/* if (stats === 1) {
	let duplicatesTotal = links.filter((item, index) => links.indexOf(item) !== index).length
	console.log("Total: " + links.length)
	console.log("Unique: " + (links.length - duplicatesTotal))
	brokenPromise.then(() => {
		if (validate === 1) {
			console.log("Broken: " + brokenLinks)
		}
	})
} */

// const { links } = markdownLinkExtractor(markdown);	// objeto con todos los links		
// console.log(readFileSync(links[10], { encoding: 'utf8' }))
// console.log(links)

/* const validate = options.validate ? 1 : 0;
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

const markdownLinkCheck = require('markdown-link-check');
	
links.forEach(link => {
	markdownLinkCheck(link, (err, results) => {
		if (err) {
			console.error('Error', err)
			return
		}
		results.forEach(result => {
			if ((validate === 0) && (stats === 0)) console.log(route1, result.link)
			if ((validate === 1) && (stats === 0)) console.log(route1, result.link, result.status, result.statusCode)
		})
	})
})

if (stats === 1) {
	let duplicatesTotal = links.filter((item, index) => links.indexOf(item) !== index).length
	console.log("Total: " + links.length)
	console.log("Unique: " + (links.length - duplicatesTotal))
	brokenPromise.then(() => {
		if (validate === 1) {
			console.log("Broken: " + brokenLinks)
		}
	})
} */

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
