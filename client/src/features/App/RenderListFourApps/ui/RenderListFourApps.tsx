import { ListApps } from "@/entities/App"
import { useEffect, useState } from "react"
import { serviceApp } from "@/shared/api/transport"
import { useBadResponse } from "@/shared/hooks"

const RenderListFourApps = () => {
	const [apps, setApps] = useState([])
	const [isBadRequest, setBadRequest] = useBadResponse()

	const apiGetListApps = async () => {
		try {
			setBadRequest(false)
			const { data } = await serviceApp.getAll()
			const lastFourElements = data.data.slice(-4)

			setApps(lastFourElements)
		} catch {
			setBadRequest(true)
		}
	}
	useEffect(() => {
		apiGetListApps()
	}, [])

	return (
		<>
			<ListApps apps={apps} isBadRequest={isBadRequest} />
		</>
	)
}

export default RenderListFourApps
