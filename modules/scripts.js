const scripts = {

  checker (route, link, text, line, validate, stats) {
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
  }
}

module.exports = scripts
