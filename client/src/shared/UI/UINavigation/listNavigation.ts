export const listNavigation = [
	{
		id: 1,
		title: "Обзор",
		url: ``,
		icon: "name",
		isActive: false
	},
	{
		id: 2,
		title: "Features",
		url: "features",
		icon: "name",
		isActive: false,
		children: [
			{
				id: 1,
				title: "title",
				url: "url",
				icon: "name"
			},
			{
				id: 2,
				title: "title",
				url: "url",
				icon: "name"
			}
		]
	},
	{
		id: 3,
		title: "Настройки",
		url: "settings",
		icon: "name",
		isActive: false
	}
]
