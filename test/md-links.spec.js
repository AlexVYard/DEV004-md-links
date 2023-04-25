// const { markdownLinkCheck } = require('../modules/barrel.js')
// const { markdownLinkCheck } = require('./barrel.js')
const exec = require('child_process').exec
const scripts = require('../modules/scripts.js')
// const barrel = require("../modules/barrel.js")
// console.log(mdLinks)
// jest.useFakeTimers()

const route = "README.md"
/* const link = "https://www.npmjs.com/package/chalk"
const text = "chalk"
const line = "251" */
/* const validate = 1
const stats = 0 */

const links = [
  '* [Referencia para la tabla](https://pokemondb.net/pokedex/all)',
  '* [Saltar un loop](https://www.w3schools.com/js/js_break.asp)',
  '* [Busqueda](https://www.w3schools.com/jsref/jsref_includes_array.asp)'
]
const duplicatesTotal = 0

/* jest.mock("../modules/barrel.js", () => ({
  markdownLinkCheckCheck: jest.fn(() => Promise.resolve(["README.md", link, "alive", "200", text, line]))
})) */

describe('node README.md', () => {
  test('no option', async () => {
    const result = await run(['', 'README.md'], '..')
    expect(result.code).toBe(0)
  })

  test('--validate', async () => {
    const result = await run(['--validate', 'README.md'], '..')
    expect(result.code).toBe(0)
  })

  test('--stats', async () => {
    const result = await run(['--stats', 'README.md'], '..')
    expect(result.code).toBe(0)
  })

  test('-v -s', async () => {
    const result = await run(['-v -s', 'README.md'], '..')
    expect(result.code).toBe(0)
  })
})

describe('node dir', () => {
  test('no option', async () => {
    const result = await run(['', 'dir'], '.')
    expect(result.code).toBe(0)
  })

  test('--validate', async () => {
    const result = await run(['--validate', 'dir'], '.')
    expect(result.code).toBe(0)
  })

  test('--stats', async () => {
    const result = await run(['--stats', 'dir'], '.')
    expect(result.code).toBe(0)
  })

  test('-v -s', async () => {
    const result = await run(['-v -s', 'dir'], '.')
    expect(result.code).toBe(0)
  })
})

describe('errors', () => {
  test('no route', async () => {
    const result = await run(['', ''], '..')
    expect(result.code).toBe(0)
  })

  test('invalid route', async () => {
    const result = await run(['', 'README.dm'], '.')
    expect(result.code).toBe(0)
  })

  test('invalid option', async () => {
    const result = await run(['--invalidoption', 'README.md'], '.')
    expect(result.code).toBe(1)
  })
})

describe('scripts', () => {
  /* test('checker', async () => {
    barrel.markdownLinkCheckCheck.mockImplementation(jest.fn(() => Promise.resolve(["README.md", link, "alive", "200", text, line])))
    const result = await scripts.checker(route, link, text, line, validate, stats)
    // console.log(result)
    await expect(result).resolves.toBe(["README.md", link, "alive", "200", text, line])
  }) */

  test('stats', async () => {
    const result = await scripts.stats(route, links, duplicatesTotal)
    expect(result).toStrictEqual(["README.md", 3, 3])
  })

  /* test('broken', async () => {
    const result = scripts.broken(route, links, duplicatesTotal)
    await expect(result).toBe(1)
  }) */
})

function run(args, cwd) {
  return new Promise(resolve => {
    exec(`md-links ${args.join(' ')}`,
      { cwd },
      (error, stdout, stderr) => {
        resolve({
          code: error && error.code ? error.code : 0,
          error,
          stdout,
          stderr
        })
      })
  })
}
