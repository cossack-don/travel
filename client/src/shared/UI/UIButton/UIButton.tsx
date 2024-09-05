import { ReactNode } from "react"
import styles from "@/shared/UI/UIButton/UIButton.module.scss"
import { Link } from "react-router-dom"

interface Props {
	children: ReactNode;
	onClick?: () => void;
	href?: string;
	size?: "xl" | "md" | "sm";
	iconLeft?: ReactNode;
	iconRight?: ReactNode;
}

// Sizes xl / md / sm
export default function UIButton({ children, onClick, href, size = "md", iconLeft, iconRight }: Props) {
	const buttonSizeClass = size === 'xl' ? styles.sizeXl
                        : size === 'md' ? styles.sizeMd
                        : styles.sizeSm;

  const className = `${styles.button} ${buttonSizeClass}`;

	const content = (
		<>
			{iconLeft && <span className={styles.icon}>{iconLeft}</span>}
			{children}
			{iconRight && <span className={styles.icon}>{iconRight}</span>}
		</>
	);

	if (href) {
		const isExternal = href.startsWith('http');
	  
		return isExternal ? (
		  <a href={href} className={className} target="_blank" rel="noopener noreferrer">
			{content}
		  </a>
		) : (
		  <Link to={'/' + href} className={className}>
			{content}
		  </Link>
		);
	  }

	return (
		<button onClick={onClick} className={className}>
			{content}
		</button>
	)
}
