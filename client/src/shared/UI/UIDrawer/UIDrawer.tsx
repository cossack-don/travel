import style from "./UIDrawer.module.scss"
import { createPortal } from "react-dom"
import { useEffect } from "react"
import { UIButton } from "@/shared/UI"
import { useNavigate } from "react-router-dom"

const BodyContent = ({ onClose }: any) => {
	const navigate = useNavigate()

	return (
		<div className={style.wrapperDrawer}>
			<div className={style.bg} onClick={onClose}></div>

			<div className={style.content}>
				<div className={style.header}>
					<h4>Header</h4>
					<div onClick={onClose}>X</div>
				</div>

				<div className={style.body}>
					body <br />
					{/*<UIButton onClick={() => navigate("/")}>Выход</UIButton>*/}
					<UIButton onClick={() => window.location.assign("/")}>Выход</UIButton>
				</div>

				<div className={style.footer}>Footer</div>
			</div>
		</div>
	)
}

const UIDrawer = ({ isActive, onClose }) => {
	useEffect(() => {
		if (isActive) document.body.style.overflow = "hidden"
		else {
			document.body.style.overflow = "auto"
		}
	}, [isActive])

	return <>{isActive && createPortal(<BodyContent onClose={() => onClose(false)} />, document.body)}</>
}

export default UIDrawer
