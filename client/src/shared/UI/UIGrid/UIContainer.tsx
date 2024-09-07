import * as React from 'react';

export default function UIContainer({ children, listClasses }) {
	return (
		<div className={`row ${listClasses}`}>
			{children}
		</div>
	);
}
