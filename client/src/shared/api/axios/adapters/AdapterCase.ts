import { camelKeys } from "../utils"

export const AdapterCase = (isGenerateCamelCase: boolean, response: any) => {
	if (isGenerateCamelCase) {
		return Promise.resolve({
			kind: "Success",
			...camelKeys(response, { recursive: true, recursiveInArray: true })
		})
	}

	if (!isGenerateCamelCase) {
		return Promise.resolve({
			kind: "Success",
			...response
		})
	}
}
