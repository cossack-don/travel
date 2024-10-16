const BASE_URL = "http://127.0.0.1:8000"
const BASE_API_PREFIX = "/api/v1"

export const getBaseURL = (url: string) => `${BASE_URL}${BASE_API_PREFIX}${url}`
