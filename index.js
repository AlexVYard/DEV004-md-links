#!/usr/bin/env node

const program = require('commander')

program
  .argument('[route]', 'Markdown file or dir')
  .option('-v, --validate', 'Validate links, use with a route')
  .option('-s, --stats', 'Show stats, use with a route')
  .action((route, options) => {
    const { readdirSync, /* readFileSync,  */readFile } = require('fs')
    const markdownLinkExtractor = require('markdown-link-extractor')
    const scripts = require('./modules/scripts.js')
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
      // const markdown = readFileSync(route, { encoding: 'utf8' });	// string del archivo markdown
      // let markdown = "no esta modificado"
      readFile(route, { encoding: 'utf8' }, function (err, data) {
        // console.log(typeof data)
        if (data === undefined) { // route is invalid
          console.log("Input invalid")
        } else {
          if (err) {
            console.log("error")
          }
          // markdown = data
          // console.log(markdown)
          // console.log(data)
          // const { links/* , anchors */ } = markdownLinkExtractor(data)              
          // console.log(links)
          // console.log(links.length, anchors.length)
          const regex = /(?=\[(!\[.+?\]\(.+?\)|.+?)]\((https:\/\/[^)]+)\))/gi

          const links2 = [...data.matchAll(regex)].map((m) => ({ text: m[1], link: m[2], input: m.input.split("\r\n") }))
          // console.log(links2[0])
          for (const i in links2) {
            for (const j in links2[0].input) {
              if (links2[0].input[j].includes(`[${links2[i].text}](${links2[i].link})`)) {
                // console.log(`[${links2[i]["text"]}](${links2[i]["link"]})`)
                // console.log(j)
                links2[i].line = parseFloat(j) + 1
              }
            }
            const linkText = links2[i].text
            const linkLine = links2[i].line
            // console.log(scripts.checker)
            if ((validate === 0) && (stats === 0)) {
              console.log(route, links2[i].link, linkText, linkLine)
            }
            if ((validate === 1) && stats === 0) {
              scripts.checker(route, links2[i].link, linkText, linkLine)
            }
          }
          // console.log(links2[0])

          // let line = "   <details><summary>Links</summary><p>".includes("<details><summary>Links</summary><p>")
          // console.log(line)
          // for (i in links2) {console.log(links2[i].input)}
          // console.log(links2)

          const duplicatesTotal = links2.filter((item, index) => links2.indexOf(item) !== index).length

          if ((validate === 0) && (stats === 1)) {
            // console.log(links2)
            scripts.stats(route, links2, duplicatesTotal)
          }

          if ((validate === 1) && (stats === 1)) {
            scripts.broken(route, links2, duplicatesTotal)
          }
        }
      }) // end readFile
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
            readFile(routeMarkdown, { encoding: 'utf8' }, function (err, data) {
              if (err) {
                console.log("error")
              }
              // markdown = data
              // console.log(routeMarkdown)
              // console.log(markdown2[i])
              const { links } = markdownLinkExtractor(data)
              // console.log(data)
              // const links2 = links.filter((item) => item.match(/^(https:\/\/)/)) // quitamos links que no son https

              const regex = /(?=\[(!\[.+?\]\(.+?\)|.+?)]\((https:\/\/[^)]+)\))/gi

              const links3 = [...data.matchAll(regex)].map((m) => ({ text: m[1], link: m[2], input: m.input.split("\r\n") }))
              // console.log(links3[0])
              // console.log(links3[0]["link"])
              for (const j in links3) {
                for (const k in links3[0].input) {
                  if (links3[0].input[k].includes(`[${links3[j].text}](${links3[j].link})`)) {
                    // console.log(`[${links3[j]["text"]}](${links3[j]["link"]})`)
                    // console.log(k)
                    links3[j].line = parseFloat(k) + 1
                  }
                }
                const linkLine = links3[j].line
                const linkText = links3[j].text

                if ((validate === 0) && (stats === 0)) console.log(routeMarkdown, links3[j].link, linkText, linkLine)
                if ((validate === 1) && (stats === 0)) {
                  // console.log(markdown2[i])
                  // console.log(links2[j])
                  scripts.checker(routeMarkdown, links3[j].link, linkText, linkLine)
                }
              }
              // console.log(links3[0])
              // const markdown2Step = markdown2[i]
              // console.log(links2)

              const duplicatesTotal = links.filter((item, index) => links.indexOf(item) !== index).length

              if ((validate === 0) && (stats === 1)) {
                scripts.stats(routeMarkdown, links, duplicatesTotal)
              }

              if ((validate === 1) && (stats === 1)) {
                scripts.broken(`${route}\\${markdown2[i]}`, links, duplicatesTotal)
              }
            }) // end readFile
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
