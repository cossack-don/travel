import { ReactNode } from "react"
import styles from "@/shared/UI/UIButton/UIButton.module.scss"
import { Link } from "react-router-dom"
import { EnumSizes, listSizes } from "./listSizes"

interface Props {
	children: ReactNode;
	onClick?: () => void;
	href?: string;
	size?: EnumSizes;
	iconLeft?: ReactNode;
	iconRight?: ReactNode;
}

export default function UIButton({ children, onClick, href, size = EnumSizes.MD, iconLeft, iconRight }: Props) {
	const buttonSizeClass = listSizes[size];

  	const className = `${styles.button} ${styles[size]}`;

	const content = (
		<>
			{iconLeft && <span className={styles.icon}>{iconLeft}</span>}
			{children}
			{iconRight && <span className={styles.icon}>{iconRight}</span>}
		</>
	);

	if (href) {
		const isExternal = href.startsWith('http');
	  
		return (
		  	<Link 
		  		to={href}
				className={className}
				style={buttonSizeClass}
				onClick={onClick}
				{...(isExternal ? { target: "_blank", rel: "noopener noreferrer"} : {})}
			>
			{content}
		  	</Link>
		) 
	} else {
		return (
			<button className={className} style={buttonSizeClass} onClick={onClick}>
				{content}
			</button>
		)
	}	
}
