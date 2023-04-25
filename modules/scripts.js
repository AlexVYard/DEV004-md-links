
const scripts = {

  checker(route, link, text, line) {
    // new Promise((resolve) => {
    // const { markdownLinkCheckCheck } = require('./barrel.js')
    const markdownLinkCheck = require('markdown-link-check')
    // let status = "" // promesa
    markdownLinkCheck(link, (err, results) => {
      if (err) {
        console.error('Error', err) // reject
        return
      }
      /* status = results[0].status
      console.log(status) */
      // if ((validate === 1) && (stats === 0)) {
      console.log(route, results[0].link, results[0].status, results[0].statusCode, text, line) // resolve
      // resolve([route, results[0].link, results[0].status, results[0].statusCode, text, line])
      // return [route, results[0].link, results[0].status, results[0].statusCode, text, line]
      // }
      // return results
    })
    // })
    /* checker.then(() => {
      console.log(checker)
      return checker
    }) */
  },

  stats(route, links, duplicatesTotal) {
    console.log("")
    console.log(route)
    console.log("  Total: " + links.length)
    console.log("  Unique: " + (links.length - duplicatesTotal))
    console.log("")
    return [route, links.length, (links.length - duplicatesTotal)]
  },

  broken(route, links, duplicatesTotal) {
    //
    let brokenLinks = 0

    const brokenPromise = new Promise((resolve) => {
      import('linkinator')
        .then(module => {
          const checker = new module.LinkChecker()
          checker.on("link", (link) => {
            if (link.state === "BROKEN") {
              // console.log(link, "link roto encontrado")
              brokenLinks++
            }
          })

          resolve(checker.check({ path: route, concurrency: 3, timeout: 10 }))
        })
    })

    // const hola = new Promise((resolve) => {
    brokenPromise.then(() => {
      console.log("")
      console.log(route)
      console.log("  Total: " + links.length)
      console.log("  Unique: " + (links.length - duplicatesTotal))
      console.log("  Broken: " + brokenLinks)
      console.log("")
      // resolve(route, links.length, (links.length - duplicatesTotal), brokenLinks)
    })
    // resolve(brokenLinks)
    // })

    /* const bye2 = brokenPromise.then(() => {
      // console.log(brokenLinks)
      return brokenLinks
    })
    console.log(bye2) */
    // return hola.then(route, links.length, (links.length - duplicatesTotal), brokenLinks)
    /* brokenPromise.then(() => {
      return brokenLinks
    }) */
  }
}

module.exports = scripts
