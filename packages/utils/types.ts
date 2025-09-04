export const isUndefined = (val: any): val is undefined => val === undefined
export const isBoolean = (val: any): val is boolean => typeof val === 'boolean'
export const isNumber = (val: any): val is number => typeof val === 'number'

export const isString = (val: any): val is string => typeof val === 'string'

export const isSymbol = (val: any): val is symbol => typeof val === 'symbol'

export const isArray = Array.isArray
export const isObject = (val: any): val is Record<string, any> =>
    val !== null && typeof val === 'object' && !isArray(val)
export const isFunction = (val: any): val is Function => typeof val === 'function'

export const isStringNumber = (val: string): boolean => {
  if (!isString(val)) {
    return false
  }
  return !Number.isNaN(Number(val))
}

export const isEmpty = (val: unknown) =>
  (!val && val !== 0) ||
  (isArray(val) && val.length === 0) ||
  (isObject(val) && !Object.keys(val).length)
