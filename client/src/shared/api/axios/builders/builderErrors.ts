//Example	BuilderErrors.addCurrentStatusError(error.response.status).addError404("Auth-status: ")

import { toast } from "react-toastify"
import { listStatusesErrors } from "@/shared/api/axios"

export const BuilderErrors = {
	settings: {
		error: null
	},
	addError404: function (description = "status") {
		if (this.settings?.error === listStatusesErrors.STATUS_CODE_404) {
			toast.error(`${description} ${listStatusesErrors.STATUS_CODE_404}`)
		}
		return this
	},
	addError422: function (description = "status") {
		if (this.settings.error === listStatusesErrors.STATUS_CODE_422) {
			toast.error(`${description} ${listStatusesErrors.STATUS_CODE_422}`)
		}
		return this
	},
	addError400: function (description = "status") {
		if (this.settings.error === listStatusesErrors.STATUS_CODE_400) {
			toast.error(`${description} ${listStatusesErrors.STATUS_CODE_400}`)
		}
		return this
	},
	addCurrentStatusError: function (val: number) {
		this.settings.error = val
		return this
	}
}
