import http from 'node:http'

import finalhandler from 'finalhandler'
import serveStatic from 'serve-static'
import open from 'open'
import { green, red, yellow } from './colored.js'

type Params = {
  host?: string
  port?: number
  root?: string
  openBrowser?: boolean
  onlyError?: boolean
}

const status = (code: number) => {
  if (code >= 200 && code < 300) {
    return green(`${code}`)
  } else if (code >= 300 && code < 400) {
    return yellow(`${code}`)
  } else if (code >= 400) {
    return red(`${code}`)
  }
  return `${code}`
}

export const startServer = ({
  root = './',
  port = 8000,
  host = 'localhost',
  openBrowser = true,
  onlyError = true,
}: Params) => {
  const protocol = 'http'
  const url = `${protocol}://${host}:${port}`
  const serveStat = serveStatic(root, {
    fallthrough: false,
  })
  const server = http.createServer(function (req, res) {
    const done = finalhandler(req, res, {
      onerror: (_, { method, url }, { statusCode }) => {
        console.info(`[${status(statusCode)}] ${method}  ${url}`)
      },
    })
    serveStat(req, res, done)
  })

  server.on('listening', async () => {
    console.info(`http server ${url}`)
    if (openBrowser) {
      await open(url)
    }
  })

  server.on('request', ({ method, url }, { statusCode }) => {
    if (!onlyError) console.info(`[${status(statusCode)}] ${method}  ${url}`)
  })

  server.listen(port, host)
  return server
}
