// EXAMPLE

//работает для объектов
// console.log(camelKeys(a, { recursive: true, recursiveInArray: true }), 'toCamel')
// console.log(snakeKeys(aa, { recursive: true, recursiveInArray: true }), 'toSnake')
//example for api data:snakeKeys(payload)

export interface Options {
	recursive: boolean
	recursiveInArray?: boolean
	keepTypesOnRecursion?: any[]
}

export const DefaultOption: Options = {
	recursive: false,
	recursiveInArray: false,
	keepTypesOnRecursion: []
}

export const validateOptions = (opt: Options = DefaultOption): Options => {
	if (opt.recursive == null) {
		opt = DefaultOption
	} else if (opt.recursiveInArray == null) {
		opt.recursiveInArray = false
	}
	return opt
}

export const isArrayObject = (obj: any): boolean => obj != null && Array.isArray(obj)

export const isValidObject = (obj: any): boolean =>
	obj != null && typeof obj === "object" && !Array.isArray(obj)

export const belongToTypes = (obj: any, types?: any[]): boolean =>
	(types || []).some(Type => obj instanceof Type)

// ===== // TODO SNAKE_CASE for primitive date
export function toCamelCase(str: string = ""): string {
	if (!str) return ""

	return String(str)
		.replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, "")
		.replace(/[^A-Za-z0-9]+/g, "$")
		.replace(/([a-z])([A-Z])/g, (m, a, b) => `${a}$${b}`)
		.toLowerCase()
		.replace(/(\$)(\w)/g, (m, a, b) => b.toUpperCase())
}

// ===== // TODO toCamelCase for objects and arrays

export function camelKeys(obj: any, opt: Options = DefaultOption): object | null {
	if (!isValidObject(obj)) return null
	opt = validateOptions(opt)

	const res: any = {}
	Object.keys(obj).forEach(key => {
		let value = obj[key]
		const nkey = toCamelCase(key)
		if (opt.recursive) {
			if (isValidObject(value)) {
				if (!belongToTypes(value, opt.keepTypesOnRecursion)) {
					value = camelKeys(value, opt)
				}
			} else if (opt.recursiveInArray && isArrayObject(value)) {
				value = [...value].map(v => {
					let ret = v
					if (isValidObject(v)) {
						// object in array
						if (!belongToTypes(ret, opt.keepTypesOnRecursion)) {
							ret = camelKeys(v, opt)
						}
					} else if (isArrayObject(v)) {
						// array in array
						// workaround by using an object holding array value
						const temp: any = camelKeys(
							{
								key: v
							},
							opt
						)
						ret = temp.key
					}
					return ret
				})
			}
		}
		res[nkey] = value
	})

	return res
}

// ===== // TODO SNAKE_CASE for primitive date

export function toSnakeCase(str: string = ""): string {
	if (!str) return ""

	return String(str)
		.replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, "")
		.replace(/([a-z])([A-Z])/g, (m, a, b) => a + "_" + b.toLowerCase())
		.replace(/[^A-Za-z0-9]+|_+/g, "_")
		.toLowerCase()
}

// ===== // TODO SNAKE_CASE for objects and arrays

export function snakeKeys(obj: any, opt: Options = DefaultOption): object | null {
	if (!isValidObject(obj)) return null
	opt = validateOptions(opt)

	const res: any = {}
	Object.keys(obj).forEach(key => {
		let value = obj[key]
		const nkey = toSnakeCase(key)
		if (opt.recursive) {
			if (isValidObject(value)) {
				if (!belongToTypes(value, opt.keepTypesOnRecursion)) {
					value = snakeKeys(value, opt)
				}
			} else if (opt.recursiveInArray && isArrayObject(value)) {
				value = [...value].map(v => {
					let ret = v
					if (isValidObject(v)) {
						// object in array
						if (!belongToTypes(ret, opt.keepTypesOnRecursion)) {
							ret = snakeKeys(v, opt)
						}
					} else if (isArrayObject(v)) {
						// array in array
						// workaround by using an object holding array value
						const temp: any = snakeKeys(
							{
								key: v
							},
							opt
						)
						ret = temp.key
					}
					return ret
				})
			}
		}
		res[nkey] = value
	})

	return res
}
