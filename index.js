#!/usr/bin/env node

const program = require('commander')

program
  .argument('[route]', 'Markdown file or dir')
  .option('-v, --validate', 'Validate links, use with a route')
  .option('-s, --stats', 'Show stats, use with a route')
  .action((route, options) => {
    import('linkinator')
      .then(module => {
        const { readdirSync, /* readFileSync,  */readFile } = require('fs')
        const markdownLinkExtractor = require('markdown-link-extractor')
        const scripts = require('./modules/scripts.js')
        // const markdown = readFileSync(route, { encoding: 'utf8' });	// string del archivo markdown

        const validate = options.validate ? 1 : 0
        const stats = options.stats ? 1 : 0
        // console.log(typeof route)
        if (route === undefined) {
          console.log("")
          console.log("Usage: md-Links [route] [options]")
          console.log("")
          console.log("Options:")
          console.log("  -v, --validate  Validate links, use with a route")
          console.log("  -s, --stats     Show stats, use with a route")
          console.log("")
          console.log("Example call:")
          console.log("  $ md-Links README.md --validate")
          console.log("")
          console.log("Please insert a route")
          console.log("")
        } else if (route.match(/(\.md)$/)) {
          // const markdown = readFileSync(route, { encoding: 'utf8' });	// string del archivo markdown
          // let markdown = "no esta modificado"
          readFile(route, { encoding: 'utf8' }, function (err, data) {
            // console.log(typeof data)
            if (data === undefined) {
              console.log("Input invalid")
            } else {
              console.log("Checking links")
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
                scripts.checker(route, links2[i].link, linkText, linkLine, validate, stats)    
              }
              // console.log(links2[0])

              // let line = "   <details><summary>Links</summary><p>".includes("<details><summary>Links</summary><p>")
              // console.log(line)
              // for (i in links2) {console.log(links2[i].input)}
              // console.log(links2)

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
                    resolve(checker.check({ path: route, concurrency: 3, timeout: 10 }))
                  })
              })

              // console.log(links2[0].link)

              if (stats === 1) {
                const duplicatesTotal = links2.filter((item, index) => links2.indexOf(item) !== index).length
                console.log("Total: " + links2.length)
                console.log("Unique: " + (links2.length - duplicatesTotal))
                brokenPromise.then(() => {
                  if (validate === 1) {
                    console.log("Broken: " + brokenLinks)
                  }
                })
              }
            }
          }) // end readFile
        } else {
          const markdown = readdirSync(route, { encoding: 'utf8' })
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
                const links2 = links.filter((item) => item.match(/^(https:\/\/)/)) // quitamos links que no son https

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
                    scripts.checker(routeMarkdown, links3[j].link, linkText, linkLine, validate, stats)                    
                  }
                }
                // console.log(links3[0])
                // const markdown2Step = markdown2[i]
                // console.log(links2)

                if ((validate === 0) && (stats === 1)) {
                  const duplicatesTotal = links2.filter((item, index) => links2.indexOf(item) !== index).length
                  console.log(routeMarkdown)
                  console.log("  Total: " + links2.length)
                  console.log("  Unique: " + (links2.length - duplicatesTotal))
                }

                if ((validate === 1) && (stats === 1)) {
                  let brokenLinks = 0

                  const brokenPromise = new Promise((resolve) => {
                    const checker = new module.LinkChecker()
                    checker.on("link", (link) => {
                      if (link.state === "BROKEN") {
                        // console.log(link, "link roto encontrado")
                        brokenLinks++
                      }
                    })
                    resolve(checker.check({ path: links2, concurrency: 3, timeout: 10 }))
                  })

                  brokenPromise.then(() => {
                    const duplicatesTotal = links.filter((item, index) => links.indexOf(item) !== index).length
                    console.log(routeMarkdown)
                    console.log("  Total: " + links.length)
                    console.log("  Unique: " + (links.length - duplicatesTotal))
                    console.log("  Broken: " + brokenLinks)
                    console.log("")
                  })
                }
              }) // end readFile
            } // end for markdown2
          }
        } // end else
      }) // end special import
  }) // end commander

program.parse(process.argv)

// console.log(mdLinks)
// console.log('process.argv:', process.argv);
module.exports = program
// console.log('process.argv:', process.argv);
// console.log(program)
