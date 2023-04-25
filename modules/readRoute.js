function readRoute(route, validate, stats) {
  const { readFile } = require('fs')
  const scripts = require('./scripts.js')
  // const markdown = readFileSync(route, { encoding: 'utf8' });	// string del archivo markdow

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
          scripts.log(route, links2[i].link, linkText, linkLine)              
          // console.log(route, links2[i].link, linkText, linkLine)
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
}

module.exports = readRoute
