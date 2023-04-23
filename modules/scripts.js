const scripts = {

  checker(route, link, text, line, validate, stats) {
    const markdownLinkCheck = require('markdown-link-check')

    markdownLinkCheck(link, (err, results) => {
      if (err) {
        console.error('Error', err)
        return
      }
      // console.log(results)
      results.forEach(result => {
        if ((validate === 0) && (stats === 0)) console.log(route, result.link, text, line)
        if ((validate === 1) && (stats === 0)) console.log(route, result.link, result.status, result.statusCode, text, line)
      })
    })
  },

  stats(route, links, duplicatesTotal) {
    console.log("")
    console.log(route)
    console.log("  Total: " + links.length)
    console.log("  Unique: " + (links.length - duplicatesTotal))
    console.log("")
  },
  
  broken(route, links, duplicatesTotal) {
    import('linkinator')
      .then(module => {
        let brokenLinks = 0

        const brokenPromise = new Promise((resolve) => {
          const checker = new module.LinkChecker()
          checker.on("link", (link) => {
            if (link.state === "BROKEN") {
              // console.log(link, "link roto encontrado")
              brokenLinks++
            }
          })
          resolve(checker.check({ path: route, concurrency: 3, timeout: 10 }))
        })

        brokenPromise.then(() => {
          console.log("")
          console.log(route)
          console.log("  Total: " + links.length)
          console.log("  Unique: " + (links.length - duplicatesTotal))
          console.log("  Broken: " + brokenLinks)
          console.log("")
        })
      })
  }
}

module.exports = scripts
