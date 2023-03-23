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
program
.option('-v, --validate', 'Validate links, use with a route')
.option('-s, --stats', 'Show stats, use with a route')
program.parse(process.argv)

const options = program.opts();
if (options.stats) {
	console.log("")
	console.log(" Total: 'Total de links' \n Unique: 'Total links unicos' ")
	console.log("")
}
if (options.validate) {
	console.log(" ")
	console.log(" hello --validate ")
	console.log(" ")
}

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
