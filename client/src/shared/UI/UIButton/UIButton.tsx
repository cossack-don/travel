import { ReactNode } from "react"
import styles from "@/shared/UI/UIButton/UIButton.module.scss"
import { Link } from "react-router-dom"
import { EnumSizes, listSizes } from "./listSizes"

interface Props {
	children: ReactNode;
	onClick?: () => void;
	to?: string;
	size?: EnumSizes;
	target?:string;
	iconLeft?: ReactNode;
	iconRight?: ReactNode;
}

export default function UIButton({ children, onClick, to = undefined, size = EnumSizes.MD, iconLeft, iconRight, target }: Props) {
	const buttonSizeClass = listSizes[size];
  const className = `${styles.button} ${styles[size]}`;

	const content = (
		<>
			{iconLeft && <span className={styles.icon}>{iconLeft}</span>}
			{children}
			{iconRight && <span className={styles.icon}>{iconRight}</span>}
		</>
	);

	return (
		<>
			{ to && <Link
					to={to}
					className={className}
					style={buttonSizeClass}
					onClick={onClick}
					target={target}
				>
					{content}
				</Link>
			}

			{ !to && <button
				className={className}
				style={buttonSizeClass}
				onClick={onClick}>
				{content}
			</button>
			}
		</>
	)
}

