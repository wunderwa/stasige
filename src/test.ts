import minimist from 'minimist'
const argv = minimist(process.argv.slice(2), {
  boolean: ['x', 'y'],
  alias: {
    // x: 'ddd',
  },
})
console.warn(process.argv.slice(2).join(' \n'), '\n\n')
console.warn(argv)
