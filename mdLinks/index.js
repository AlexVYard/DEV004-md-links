#!/usr/bin/env node

/**
 * md-links-alexv
 * check links
 *
 * @author Alexandra F. Vega <https://github.com/AlexVYard/>
 */

// Option* validat = app.add_flag("--validate");

// CLI11_PARSE(app, argv, argc);

// const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');

const input = cli.input;
const flags = cli.flags;
const {/*  clear, */ debug } = flags;

(() => {
	// init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	debug && log(flags);

	if (input.includes('validate')) {
		const validating = new Promise((resolve, reject) => {
			resolve(flags.validate = true);
			reject('Not a Success!')
		});
		validating.then(() => {
			console.log("flags.validate = "+flags.validate)
		})
	}

 	if (input.includes('stats')) {
		const stating = new Promise((resolve, reject) => {
			resolve(flags.stats = true);
			reject('Not a Success!')
		});
		stating.then(() => {
			console.log("flags.stats = "+flags.stats)
		})		
	}

})();
