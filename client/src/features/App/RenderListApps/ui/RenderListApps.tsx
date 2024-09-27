import { ListApps } from "@/entities/App"
import { useEffect, useState } from "react"
import { serviceApp } from "@/shared/api/transport"
import { useBadResponse } from "@/shared/hooks"

const RenderListApps = () => {
	const [apps, setApps] = useState([])
	const [isBadRequest, setBadRequest] = useBadResponse()

	const apiGetListApps = async () => {
		try {
			setBadRequest(false)
			const { data } = await serviceApp.getAll()

			setApps(data)
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

export default RenderListApps
