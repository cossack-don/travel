import * as React from "react"

export default function UIContainer({ children, listClasses ='row' }) {
	return <div className={`${listClasses}`}>{children}</div>
}
