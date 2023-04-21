const gulp = require('gulp');
// const { promisify } = require('util');
const exec = require('child_process').exec
// const execAsync = promisify(exec)


gulp.task('md-links', function (callback) {
  exec('node index.js')/* , function (err, stdout, stderr) { */
    // // #!/usr/bin/env node


    // /**
    //  * md-links
    //  * check links
    //  *
    //  * @author Alexandra F. Vega <https://github.com/AlexVYard/>
    //  */

    // // Option* validat = app.add_flag("--validate");

    // // CLI11_PARSE(app, argv, argc);

    // // const init = require('./utils/init');
    // /* const meow = require('meow');
    // const meowHelp = require('cli-meow-help'); */
    // /* const {mdlinks} = require('commander');
    // const program = mdlinks(); */
    // const program = require('commander');
    // // const options = program.opts();

    // // import LinkChecker from 'linkinator';

    // /* program
    //   .name('mdlinks')
    //   .description('CLI to some JavaScript string utilities')
    //   .version('0.8.0'); */

    // program
    //   .argument('<route>', 'connect to the specified server')
    //   .option('-v, --validate', 'Validate links, use with a route')
    //   .option('-s, --stats', 'Show stats, use with a route')
    //   .action((route, options) => {

    //     console.log("") // linea extra para que se vea bonito

    //     import('linkinator')
    //       .then(module => {

    //         const { readdirSync, /* readFileSync,  */readFile } = require('fs');
    //         const markdownLinkExtractor = require('markdown-link-extractor');
    //         // const markdown = readFileSync(route, { encoding: 'utf8' });	// string del archivo markdown

    //         const validate = options.validate ? 1 : 0;
    //         const stats = options.stats ? 1 : 0;

    //         if (route.match(/(\.md)$/)) {
    //           // const markdown = readFileSync(route, { encoding: 'utf8' });	// string del archivo markdown
    //           // let markdown = "no esta modificado"
    //           readFile(route, { encoding: 'utf8' }, function (err, data) {
    //             // markdown = data
    //             // console.log(markdown)
    //             const { links/* , anchors */ } = markdownLinkExtractor(data)
    //             // console.log(links)
    //             // console.log(links.length, anchors.length)
    //             let regex = /(?=\[(!\[.+?\]\(.+?\)|.+?)]\((https:\/\/[^\)]+)\))/gi

    //             let links2 = [...data.matchAll(regex)].map((m) => ({ text: m[1], link: m[2], input: m["input"].split("\r\n") }))
    //             // console.log(links2[0]) 
    //             for (i in links2) {
    //               for (j in links2[0]["input"]) {
    //                 if (links2[0]["input"][j].includes(`[${links2[i]["text"]}](${links2[i]["link"]})`)) {
    //                   // console.log(`[${links2[i]["text"]}](${links2[i]["link"]})`)
    //                   // console.log(j)
    //                   links2[i].line = parseFloat(j) + 1
    //                 }
    //               }
    //             }
    //             // console.log(links2[0]) 

    //             // let line = "   <details><summary>Links</summary><p>".includes("<details><summary>Links</summary><p>")
    //             // console.log(line)
    //             // for (i in links2) {console.log(links2[i].input)}
    //             // console.log(links2)

    //             let brokenLinks = 0

    //             const brokenPromise = new Promise((resolve) => {
    //               import('linkinator')
    //                 .then(module => {
    //                   const checker = new module.LinkChecker()
    //                   checker.on("link", (link) => {
    //                     if (link.state === "BROKEN") {
    //                       brokenLinks++
    //                     }
    //                   })
    //                   resolve(checker.check({ path: route }))
    //                 });
    //             })

    //             const markdownLinkCheck = require('markdown-link-check');

    //             // console.log(links2[0].link)

    //             // links2.link.forEach(link => {
    //             for (j in links2) {
    //               const linkText = links2[j].text
    //               const linkLine = links2[j].line
    //               markdownLinkCheck(links2[j].link, (err, results) => {
    //                 if (err) {
    //                   console.error('Error', err)
    //                   return
    //                 }
    //                 // console.log(results)
    //                 results.forEach(result => {
    //                   if ((validate === 0) && (stats === 0)) console.log(route, result.link, linkText, linkLine)
    //                   if ((validate === 1) && (stats === 0)) console.log(route, result.link, result.status, result.statusCode, linkText, linkLine)
    //                 })
    //               })
    //             }
    //             // })

    //             if (stats === 1) {
    //               let duplicatesTotal = links.filter((item, index) => links.indexOf(item) !== index).length
    //               console.log("Total: " + links.length)
    //               console.log("Unique: " + (links.length - duplicatesTotal))
    //               brokenPromise.then(() => {
    //                 if (validate === 1) {
    //                   console.log("Broken: " + brokenLinks)
    //                 }
    //               })
    //             }

    //           }) // end readFile

    //         } else {
    //           const markdown2 = readdirSync(route, { encoding: 'utf8' })

    //           const checker = new module.LinkChecker()

    //           for (i in markdown2) {
    //             // console.log(markdown2[i])
    //             // let markdown = "no esta modificado"
    //             const routeMarkdown = `${route}\\${markdown2[i]}`
    //             readFile(routeMarkdown, { encoding: 'utf8' }, function (err, data) {
    //               // markdown = data
    //               // console.log(routeMarkdown)
    //               // console.log(markdown2[i])
    //               let { links } = markdownLinkExtractor(data)
    //               // console.log(data)
    //               let links2 = links.filter((item) => item.match(/^(https)+\:\/\//)) // quitamos links que no son https

    //               let regex = /(?=\[(!\[.+?\]\(.+?\)|.+?)]\((https:\/\/[^\)]+)\))/gi

    //               let links3 = [...data.matchAll(regex)].map((m) => ({ text: m[1], link: m[2], input: m["input"].split("\r\n") }))
    //               // console.log(links3[0])
    //               // console.log(links3[0]["link"])
    //               for (j in links3) {
    //                 for (k in links3[0]["input"]) {
    //                   if (links3[0]["input"][k].includes(`[${links3[j]["text"]}](${links3[j]["link"]})`)) {
    //                     // console.log(`[${links3[j]["text"]}](${links3[j]["link"]})`)
    //                     // console.log(k)
    //                     links3[j].line = parseFloat(k) + 1
    //                   }
    //                 }
    //               }
    //               // console.log(links3[0])
    //               // const markdown2Step = markdown2[i]
    //               // console.log(links2)	

    //               if ((validate === 0) && (stats === 1)) {
    //                 let duplicatesTotal = links2.filter((item, index) => links2.indexOf(item) !== index).length
    //                 console.log(routeMarkdown)
    //                 console.log("  Total: " + links2.length)
    //                 console.log("  Unique: " + (links2.length - duplicatesTotal))
    //                 console.log("")
    //               }

    //               for (j in links3) {
    //                 const linkLine = links3[j].line
    //                 const linkText = links3[j].text

    //                 if ((validate === 0) && (stats === 0)) console.log(routeMarkdown, links3[j].link, linkText, linkLine)

    //               }

    //               for (k in links3) {

    //                 if ((validate === 1) && (stats === 0)) {
    //                   // console.log(markdown2[i])
    //                   // console.log(links2[j]) 

    //                   const linkLine = links3[k].line
    //                   const linkText = links3[k].text
    //                   Promise.resolve(links3[k].link)
    //                     .then((value) =>
    //                       new Promise((resolve) => {
    //                         // console.log(value)
    //                         // console.log(value[1])
    //                         // const result = checker.on("link", (value) => {
    //                         // console.log(link)
    //                         // })
    //                         const result = checker.check({ path: value });
    //                         // console.log(markdown2[i], result.links[0].url, result.links[0].state, result.links[0].status)
    //                         resolve(result)
    //                       })
    //                     )
    //                     .then((value) => {
    //                       // console.log(value)
    //                       console.log(routeMarkdown, value.links[0].url, value.links[0].state, value.links[0].status, linkText, linkLine);
    //                     })

    //                 }

    //               }

    //               if ((validate === 1) && (stats === 1)) {

    //                 let brokenLinks = 0

    //                 const brokenPromise = new Promise((resolve) => {

    //                   const checker = new module.LinkChecker()
    //                   checker.on("link", (link) => {
    //                     if (link.state === "BROKEN") {
    //                       brokenLinks++
    //                     }
    //                   })
    //                   resolve(checker.check({ path: links2[j] }))

    //                 })

    //                 brokenPromise.then(() => {
    //                   let duplicatesTotal = links.filter((item, index) => links.indexOf(item) !== index).length
    //                   console.log(routeMarkdown)
    //                   console.log("  Total: " + links.length)
    //                   console.log("  Unique: " + (links.length - duplicatesTotal))
    //                   console.log("  Broken: " + brokenLinks)
    //                   console.log("")
    //                 })

    //               }

    //             }) // end readFile						
    //           } // end for markdown2					
    //         } // end else
    //       }) // end special import
    //   }) // end commander

    // program.parse(process.argv)

    // module.exports = program

    // // program.parse(process.argv)

    // /* (() => {
    //   // console.log("Ingrese una ruta")
    //   // init({ clear });
    
    //   input.includes(`mdLinks`) && cli.showHelp(0);
    
    //   debug && log(flags);
    
    //   if (input.includes("mdLinks")) {
    //     console.log("hola")
    //   } 
    
    // }) */

    // /* const regex0 = (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)	// email
    // const regex1 = (/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&=]*)/) // con https
    // const regex2 = (/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/) // sin https
    // const regex3 = (/^([^\W_]-?)*[^\W_](\.(md|txt))?$/) // md extension not https
    // const regex4 = (/(\.\/)?([^\W_]-?)*[^\W_](\.(md|txt))?$/) // md extension con ./
    // const regex5 = (/^.*\.(md)$/) // md extension
    // const regex6 = (/([-a-zA-Z0-9@:%._\+~#=]\.md)$/) // filename + md extension
    // const regex7 = (/(\.\/)[-a-zA-Z0-9@:%._\+~#=].*\.(md)$/) // ./ + filename + md extension
    // const regex8 = (/(https?:\/\/[-a-zA-Z0-9@:%._\+~#=]).*([-a-zA-Z0-9@:%._\+~#=]\.md)$/) // https + filename + .md
    // const regex9 = (/^(https?:\/\/[-a-zA-Z0-9@:%._\+~#=])/) // https + filename
    // const regex10 = (/[-a-zA-Z0-9@:%._\+~#=]\/[-a-zA-Z0-9@:%._\+~#=]+\.(md)$/) // filename + / + filename + .md */

    // // callback()
    // /* onsole.log(err);
    // console.log(stdout);
    // console.log(stderr); */
  ;
  // console.log('process.argv:', process.argv);
  callback()
});