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

	const handlerDeleteAppById = async (id: number) => {
		// await serviceApp.deleteById(id)
		// await apiGetListApps()
		console.log(id)
	}

	return (
		<>
			<ListApps apps={apps} onDeleteCardById={handlerDeleteAppById} isBadRequest={isBadRequest} />
		</>
	)
}

export default RenderListApps
