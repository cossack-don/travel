export enum EnumSizes {
	XL = "xl",
	MD = "md",
	SM = "sm",
}

export const listSizes = {
	[EnumSizes.XL]: {
		padding: "16px 32px",
    	fontSize: "20px",
	},
	[EnumSizes.MD]: {
		padding: "12px 24px",
		fontSize: "18px",
	},
	[EnumSizes.SM]: {
		padding: "8px 16px",
		fontSize: "16px",
	},
}