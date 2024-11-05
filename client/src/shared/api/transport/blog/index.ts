import { Methods, getBaseURL, ADAPTER_API_REQUEST } from "@/shared/api/axios"

export const serviceBlog = {
	getAll: () => {
		return ADAPTER_API_REQUEST({
			url: getBaseURL("/blog/list-posts"),
			method: Methods.GET
		})
	},
	deleteByIds: (listIdPosts: any | []) => {
		return ADAPTER_API_REQUEST({
			url: getBaseURL(`/blog/delete-post`),
			method: Methods.DELETE,
			data: listIdPosts
		})
	},
	getById: (id: string) => {
		return ADAPTER_API_REQUEST({
			url: getBaseURL(`/blog/${id}`),
			method: Methods.GET
		})
	},
	create: ({ name, description }: { name: string; description: string }) => {
		return ADAPTER_API_REQUEST({
			url: getBaseURL("/blog/create-post"),
			method: Methods.POST,
			data: {
				name,
				description
			}
		})
	},
	update: ({ id, name, description }: { id: string; name: string; description: string }) => {
		return ADAPTER_API_REQUEST({
			url: getBaseURL(`/blog/${id}`),
			method: Methods.PATCH,
			data: {
				name,
				description
			}
		})
	}
}
