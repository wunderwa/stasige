export const clean = (isSoft?: boolean) => {
  process.stdout.write(
    isSoft ? '\x1B[H\x1B[2J' : '\x1B[2J\x1B[3J\x1B[H\x1Bc'
  );
}

export const cleanFormat = () => {
  clean()
  console.info(['yarn vars', ...process.argv.slice(2)].join(' '))
}
