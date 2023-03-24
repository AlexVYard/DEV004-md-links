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

const { Command } = require('commander');
const route = new Command();

const regex0 = (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)	// email
const regex1 = (/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&=]*)/) // con https
const regex2 = (/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/) // sin https
const regex3 = (/^([^\W_]-?)*[^\W_](\.(md|txt))?$/) // md extension not https
const regex4 = (/(\.\/)?([^\W_]-?)*[^\W_](\.(md|txt))?$/) // md extension con ./
const regex5 = (/^.*\.(md)$/) // md extension
const regex6 = (/([-a-zA-Z0-9@:%._\+~#=]\.md)$/) // filename + md extension
const regex7 = (/(\.\/)[-a-zA-Z0-9@:%._\+~#=].*\.(md)$/) // ./ + filename + md extension
const regex8 = (/(https?:\/\/[-a-zA-Z0-9@:%._\+~#=]).*([-a-zA-Z0-9@:%._\+~#=]\.md)$/) // https + filename + .md
const regex9 = (/^(https?:\/\/[-a-zA-Z0-9@:%._\+~#=])/) // https + filename
const regex10 = (/[-a-zA-Z0-9@:%._\+~#=]\/[-a-zA-Z0-9@:%._\+~#=]+\.(md)$/) // filename + / + filename + .md

// Argument
route
  .name('connect')
  .argument('<route1>', 'connect to the specified server')
  .argument('[route2]', 'password for user, if required', 'route2 was not given')
  .description('Example program with argument descriptions')
  .action((route1, route2) => {

/* 		if (route1.match(regex10)) {
    	console.log(route1+" Es una ruta valida");
		} else {
			console.log(route1+" No es una ruta valida")
		}
		if (route2.match(regex10)) {
	  	console.log(route2+" Es una ruta valida")
		} else if (route2 = " ") {
			console.log("route2 was not given")
		} else {
			console.log(route2+" No es una ruta valida")
		} */

		const { readFileSync } = require('fs');
		const markdownLinkExtractor = require('markdown-link-extractor');
		const markdown = readFileSync(route2, {encoding: 'utf8'});
		const { links } = markdownLinkExtractor(markdown);
		const  markdownLinkCheck = require('markdown-link-check');

		links.forEach(link => {
  		markdownLinkCheck(link, function (err, results) {
  			if (err) {
    			console.error('Error', err)
   				return
  			}
  			 results.forEach(function (result) {
    			 console.log(route2, result.link, result.status, result.statusCode)
  			})
  		});
		});
	})
route.parse();

(() => {
	// console.log("Ingrese una ruta")
	// init({ clear });
	
	input.includes(`help`) && cli.showHelp(0);

	debug && log(flags);

/*  	if (input.includes("hola@bye.com")) {
		const empty = new Promise((resolve, reject) => {
			resolve(flags.empty = true);
			reject(console.log("Ingrese una ruta"))
		});
		empty.then(() => {
			console.log("Ingrese una ruta")
		})
	} */
/* 	if (input.includes(``)) {
		const empty = new Promise((resolve, reject) => {
			resolve(flags.empty = true);
			reject('Not a Success!')
		});
		empty.then(() => {
			console.log("Ingrese una ruta")
		})
	}  */

/* 	if (input.includes('validate')) {
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
	} */

});

/* const { readFileSync } = require('fs');
const markdownLinkExtractor = require('markdown-link-extractor');
const markdown = readFileSync(route2, {encoding: 'utf8'});
const { links } = markdownLinkExtractor(markdown);
const  markdownLinkCheck = require('markdown-link-check');

'use strict'  

links.forEach(link => {
  markdownLinkCheck(link, function (err, results) {
  if (err) {
    console.error('Error', err)
    return
  }
  results.forEach(function (result) {
    console.log(result.link, result.status, result.statusCode)
  })
  });
}); */


/* 'use strict';

var markdownLinkCheck = require('markdown-link-check');

markdownLinkCheck('(https://github.com/tcort/markdown-link-check/blob/master/README.md)', function (err, results) {
    if (err) {
        console.error('Error', err);
        return;
    }
    results.forEach(function (result) {
        console.log('%s is %s', result.link, result.status);
				console.log("")
    });
}); */
