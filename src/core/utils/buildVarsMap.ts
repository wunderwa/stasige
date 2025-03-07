import { DeepObject, DeepValue, PlainObject } from './types.js'
import { buildVarEnd, buildVarStart } from './config.js'

const isObject = (it: DeepValue) => typeof it === 'object'

export const buildVarsMap = (
  obj: DeepObject,
  start: string | null = null,
): PlainObject => {
  return Object.getOwnPropertyNames(obj).reduce(
    (acc: PlainObject, key): PlainObject => {
      const val = obj[key]
      if (isObject(val)) {
        return {
          ...acc,
          ...buildVarsMap(
            val as DeepObject,
            start ? [start, key].join('.') : key,
          ),
        }
      } else {
        const endKey = `${buildVarStart}${[start, key].join('.')}${buildVarEnd}`
        return {
          ...acc,
          [endKey]: val.toString(),
          [buildVarStart + [start, key].join('.') + buildVarEnd]:
            val.toString(),
        }
      }
    },
    {},
  )
}
