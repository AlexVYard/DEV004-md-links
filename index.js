#!/usr/bin/env node

const program = require('commander')

program
  .argument('[route]', 'Markdown file or dir')
  .option('-v, --validate', 'Validate links, use with a route')
  .option('-s, --stats', 'Show stats, use with a route')
  .action((route, options) => {
    const { readdirSync } = require('fs')
    const readRoute = require('./modules/readRoute.js')
    // const markdown = readFileSync(route, { encoding: 'utf8' });	// string del archivo markdown

    const validate = options.validate ? 1 : 0
    const stats = options.stats ? 1 : 0
    // console.log(typeof route)
    if (route === undefined) { // no route
      console.log("")
      console.log("Usage: md-links [route] [options]")
      console.log("")
      console.log("Options:")
      console.log("  -v, --validate  Validate links, use with a route")
      console.log("  -s, --stats     Show stats, use with a route")
      console.log("")
      console.log("Example call:")
      console.log("  $ md-links README.md --validate")
      console.log("")
      console.log("Please insert a route")
      console.log("")
    } else if (route.match(/(\.md)$/)) {
      readRoute(route, validate, stats)
    } else {
      try {
        const markdown = readdirSync(route, { encoding: 'utf8' })
        // console.log(markdown)
        const markdown2 = markdown.filter((item) => item.match(/(\.md)$/)) // filtramos los archivos que no son md
        // console.log("markdown2", markdown2.length)
        // const checker = new module.LinkChecker()
        if (markdown2.length === 0) {
          console.log("No valid markdown file found in the directory")
        } else {
          for (const i in markdown2) {
            // console.log(markdown2[i])
            // let markdown = "no esta modificado"
            const routeMarkdown = `${route}\\${markdown2[i]}`
            // console.log(routeMarkdown)
            readRoute(routeMarkdown, validate, stats)            
          } // end for markdown2
        }
      } catch (err) {
        console.log("Input invalid")
      }
    } // end else
  }) // end commander

program.parse(process.argv)

// console.log(mdLinks)
// console.log('process.argv:', process.argv);
module.exports = program
// console.log('process.argv:', process.argv);
// console.log(program)
