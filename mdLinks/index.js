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
  .argument('<route>', 'connect to the specified server')
  .description('Example program with argument descriptions')
  .action((route) => {
	// if (/* (route.match(regex9)&&route.match(regex6))|| */route.match(regex7)||(route.match(regex2)&&route.match(regex6))) {
	if (/* route.match(regex7)|| */route.match(regex10)) {
		console.log(" ")
    console.log(route);
		console.log(" ")
	} else {
		console.log(" ")
		console.log("Ingrese una ruta valida")
		console.log(" ")
	}
  });

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
