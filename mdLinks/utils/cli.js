const meow = require('meow');
const meowHelp = require('cli-meow-help');
const program = require('commander')

// Options 
/* program.option('-v, --validate', 'Validate links').action(function() {
	console.log("\n hello --validate \n")
})

program.option('-s, --stats', 'Show stats').action(function() {
	console.log("\n hello --stats \n")
}) */
// let route1 = 'README.md'

const options = program.opts();
program
	.argument('<route1>', 'connect to the specified server')
	.option('-v, --validate', 'Validate links, use with a route')
	.option('-s, --stats', 'Show stats, use with a route')
 	.action((route1, options) => { 	
 		if (options.validate) {	
			const { readFileSync } = require('fs');
			const markdownLinkExtractor = require('markdown-link-extractor');

			'use strict';

			const { marked } = require('marked');
			const htmlLinkExtractor = require('html-link-extractor');

			module.exports = function markdownLinkExtractor(markdown, extended = false) {
    	const anchors = [];

    	const renderer = {
      	  heading(text, level, raw, slugger) {
        	    if (this.options.headerIds) {
          	      var id = this.options.headerPrefix + slugger.slug(raw);
            	    anchors.push('#' + encodeURIComponent(id));
              	  if (id.indexOf('--') !== -1) {
                	    anchors.push('#' + encodeURIComponent(id.replace(/-+/g, '-')));
	                }
  	              return "<h" + level + " id=\"" + id + "\">" + text + "</h" + level + ">\n";
    	        } // ignore IDs


  	          return "<h" + level + ">" + text + "</h" + level + ">\n";
    	    }
   	 };

    	marked.setOptions({
      	  mangle: false, // don't escape autolinked email address with HTML character references.
   	 });
    	marked.use({ renderer });

    	const html = marked(markdown);
    	const links = htmlLinkExtractor(html);
    	return { links, anchors };
		
			};

			const markdown = readFileSync(route1, {encoding: 'utf8'});
			const { links } = markdownLinkExtractor(markdown);
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
 	})
program.parse(process.argv)

/* const options = program.opts();
if (options.validate) {
	console.log("hello --validate")
	
	program
	.argument('<route1>', 'connect to the specified server')
	.argument('[route2]', 'password for user, if required', 'route2 was not given')
	.action((route1) => {
	route1 = 'README.md' 
	const { readFileSync } = require('fs');
	const markdownLinkExtractor = require('markdown-link-extractor');

	'use strict';

	const { marked } = require('marked');
	const htmlLinkExtractor = require('html-link-extractor');

	module.exports = function markdownLinkExtractor(markdown, extended = false) {
	const anchors = [];

	const renderer = {
			heading(text, level, raw, slugger) {
					if (this.options.headerIds) {
							var id = this.options.headerPrefix + slugger.slug(raw);
							anchors.push('#' + encodeURIComponent(id));
							if (id.indexOf('--') !== -1) {
									anchors.push('#' + encodeURIComponent(id.replace(/-+/g, '-')));
							}
							return "<h" + level + " id=\"" + id + "\">" + text + "</h" + level + ">\n";
					} // ignore IDs


					return "<h" + level + ">" + text + "</h" + level + ">\n";
			}
	};

	marked.setOptions({
			mangle: false, // don't escape autolinked email address with HTML character references.
	});
	marked.use({ renderer });

	const html = marked(markdown);
	const links = htmlLinkExtractor(html);
	return { links, anchors };

	};

	const markdown = readFileSync(route1, {encoding: 'utf8'});
	const { links } = markdownLinkExtractor(markdown);
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
)} */
// program.parse()


/* const options = program.opts();
if (options.stats) {
	console.log("")
	console.log(" Total: 'Total de links' \n Unique: 'Total links unicos' ")
	console.log("")
}
if (options.validate) {
	console.log(" ")
	console.log(" hello --validate ")
	console.log(" ")
} */

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
	/* empty: {
		type: `boolean`,
		default: false,
		alias: `e`,
		desc: `Ingrese una ruta`
	} */
	/* ,
	validate: {
		type: `boolean`,
		default: false,
		alias: `v`,
		desc: `Validate links`
	},
	stats: {
		type: `boolean`,
		default: false,
		alias: `s`,
		desc: `Show stats`
	} */
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

/* const { Command } = require('commander');
const route = new Command();

// Argument
route
  .name('connect')
  .argument('<route1>', 'connect to the specified server')
  .argument('[route2]', 'password for user, if required', 'route2 was not given')
  .description('Example program with argument descriptions')
  .action((route1, route2) => {

		const { readFileSync } = require('fs');
		const markdownLinkExtractor = require('markdown-link-extractor');

		'use strict';

		const { marked } = require('marked');
		const htmlLinkExtractor = require('html-link-extractor');

		module.exports = function markdownLinkExtractor(markdown, extended = false) {
    const anchors = [];

    const renderer = {
        heading(text, level, raw, slugger) {
            if (this.options.headerIds) {
                var id = this.options.headerPrefix + slugger.slug(raw);
                anchors.push('#' + encodeURIComponent(id));
                if (id.indexOf('--') !== -1) {
                    anchors.push('#' + encodeURIComponent(id.replace(/-+/g, '-')));
                }
                return "<h" + level + " id=\"" + id + "\">" + text + "</h" + level + ">\n";
            } // ignore IDs


            return "<h" + level + ">" + text + "</h" + level + ">\n";
        }
    };

    marked.setOptions({
        mangle: false, // don't escape autolinked email address with HTML character references.
    });
    marked.use({ renderer });

    const html = marked(markdown);
    const links = htmlLinkExtractor(html);
    return { links, anchors };
		};

		const markdown = readFileSync(route1, {encoding: 'utf8'});
		const { links } = markdownLinkExtractor(markdown);
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
	})
route.parse(); */
