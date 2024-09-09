import * as React from 'react';

export default function UICol({ children, listClasses }) {
	return (
		<div className={`${listClasses}`}>
			{children}
		</div>
	);
}
