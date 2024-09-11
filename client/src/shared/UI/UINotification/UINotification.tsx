import { FC, useEffect, useState } from "react"
import cls from "./UINotification.module.scss"
import { createPortal } from "react-dom"

interface UINotificationType {
	title?: string
	description?: string
	time?: number
	active?: boolean
}

export const UINotification: FC<UINotificationType> = ({
	title,
	description,
	time = 100000,
	active = false
}) => {
	const fps = 60
	const rerenderTime = Math.floor(1000 / fps)

	const [progressValue, setProgressValue] = useState<number>(100)
	const [timer, setTimer] = useState<number>(time)
	const [activePoint, setActivePoint] = useState<boolean>(active)

	useEffect(() => {
		setTimeout(() => {
			if (progressValue <= 0) return setActivePoint(false)

			setProgressValue((timer * 100) / time)
			setTimer(timer - rerenderTime)
			console.log("first")
		}, rerenderTime)
	}, [timer])

	return (
		<div>
			{activePoint &&
				createPortal(
					<div className={cls.wrapper}>
						<div className={cls.title}>{title}</div>
						<div className={cls.description}>{description}</div>
						<progress id="progress" className={cls.progress} value={progressValue} max="100"></progress>
						<span className={cls.close} onClick={() => setActivePoint(false)}>
							X
						</span>
					</div>,
					document.body
				)}
		</div>
	)
}
