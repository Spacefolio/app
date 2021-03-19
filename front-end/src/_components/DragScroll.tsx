import React, { useRef, useState } from 'react';

interface DragScrollProps {}

export const DragScroll: React.FC<DragScrollProps> = ({ children }) => {
	const ref = useRef(null);

	const [isScrolling, setIsScrolling] = useState(false);

	const [clientX, setClientX] = useState(0);

	const [scrollX, setScrollX] = useState(0);

	const onMouseDown = (e: any) => {
		setIsScrolling(true);

		setClientX(e.clientX);
	};

	const onMouseUp = () => {
		setIsScrolling(false);
	};

	const onMouseMove = (e: any) => {
		if (isScrolling) {
			ref.current.scrollLeft = scrollX + e.clientX - clientX;
			setScrollX(scrollX + e.clientX - clientX);
			setClientX(e.clientX);
		}
	};

	return (
		<div
			ref={ref}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
			onMouseMove={onMouseMove}
		>
			{React.Children.map(children, (child) => React.Children.only(child))}
		</div>
	);
};
