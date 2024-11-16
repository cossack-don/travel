import { Methods } from "./Methods"
import { getBaseURL } from "./baseURL"
import { createCustomAxios } from "./createCustomAxios"
import { createInterceptorsResponse } from "./createInterceptorsResponse"
import { createConfigAxios, CONFIG_AXIOS } from "./createConfigAxios"
import { listStatusesErrors } from "./listStatusesErrors"
import { camelKeys, snakeKeys } from "./aggregationCase"

export {
	Methods,
	getBaseURL,
	createCustomAxios,
	createInterceptorsResponse,
	createConfigAxios,
	CONFIG_AXIOS,
	listStatusesErrors,
	camelKeys,
	snakeKeys
}
