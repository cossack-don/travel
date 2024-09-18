import { useState } from "react"

export const useBadResponse = () => {
	const [isBadRequest, setBadRequest] = useState(false)

	return [isBadRequest, setBadRequest]
}
