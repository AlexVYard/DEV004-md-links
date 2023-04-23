const mdLinks = require('../index.js')
const exec = require('child_process').exec
// console.log(mdLinks)

describe('mdLinks', () => {
  test('is an object', () => {
    expect(typeof mdLinks).toBe("object")
  })

  describe('node ', () => {
    test('no route', async () => {
      const result = await run(['', ''], '..')
      expect(result.code).toBe(0)
    })
  })   

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
    test('invalid route', async () => {
      const result = await run(['', 'README.dm'], '.')
      expect(result.code).toBe(1)
    })      

    test('invalid option', async () => {
      const result = await run(['--invalidoption', 'README.md'], '.')
      expect(result.code).toBe(1)
    })

    /* test('--stats', async () => {
      const result = await run(['--stats', 'dir'], '.')
      expect(result.code).toBe(0)
    }) */
  })

  /* describe('dataFunctions.filterData', () => {
    it('is a function', () => {
      // expect(typeof dataFunctions.filterData).toBe('function')
    })
  }) */
})

function run (args, cwd) {
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
