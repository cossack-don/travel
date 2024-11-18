import { Methods, getBaseURL, AdapterApi } from "@/shared/api/axios"

export const serviceBlog = {
	getAll: () => {
		return AdapterApi({
			url: getBaseURL("/blog/list-posts"),
			method: Methods.GET
		})
	},
	deleteByIds: (listIdPosts: any | []) => {
		return AdapterApi({
			url: getBaseURL(`/blog/delete-post`),
			method: Methods.DELETE,
			data: listIdPosts
		})
	},
	getById: (id: string) => {
		return AdapterApi({
			url: getBaseURL(`/blog/${id}`),
			method: Methods.GET
		})
	},
	create: ({ name, description }: { name: string; description: string }) => {
		return AdapterApi({
			url: getBaseURL("/blog/create-post"),
			method: Methods.POST,
			data: {
				name,
				description
			}
		})
	},
	update: ({ id, name, description }: { id: string; name: string; description: string }) => {
		return AdapterApi({
			url: getBaseURL(`/blog/${id}`),
			method: Methods.PATCH,
			data: {
				name,
				description
			}
		})
	}
}
