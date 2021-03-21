import {
	Button,
	Popper,
	Paper,
	ClickAwayListener,
	MenuList,
	MenuItem,
	Typography,
} from '@material-ui/core';
import { DateRange } from '@material-ui/icons';
import React, { useState } from 'react';
import { ITimeframe } from '../../../../../types';
import { timeFrameSelectors } from '../../../_helpers';
import { ActionButton } from '../../../_styles';
import { theme } from '../../../_styles/Theme';
import { TimeFrameSelectorContainer, TimeframeItem } from './_styles';

interface TimeframeSelectorDDProps {
	Tframe: ITimeframe;
	setTimeframe: any;
}

export const TimeframeSelectorDropdown: React.FC<TimeframeSelectorDDProps> = ({
	Tframe,
	setTimeframe,
}) => {
	const anchorRef = React.useRef<any>(null);

	const [open, setOpen] = useState(false);

	const handleClose = (event: React.MouseEvent<EventTarget>) => {
		if (
			anchorRef.current &&
			anchorRef.current.contains(event.target as HTMLElement)
		) {
			return;
		}

		setOpen(false);
	};

	return (
		<div>
			<div
				ref={anchorRef}
				aria-controls={open ? 'menu-list-grow' : undefined}
				aria-haspopup="true"
				onClick={() => setOpen(!open)}
				style={{ fontWeight: 500 }}
			>
				{Tframe}
			</div>
			<Popper
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				transition
			>
				<Paper>
					<ClickAwayListener onClickAway={handleClose}>
						<MenuList
							autoFocusItem={open}
							id="menu-list-grow"
							onClick={() => setOpen(false)}
						>
							{timeFrameSelectors.map((item: ITimeframe, index: number) => {
								return (
									<MenuItem
										key={index}
										onClick={() => {
											setTimeframe(item);
										}}
										selected={item == Tframe}
									>
										{item}
									</MenuItem>
								);
							})}
						</MenuList>
					</ClickAwayListener>
				</Paper>
			</Popper>
		</div>
	);
};

export const TimeframeSelectorToggle: React.FC<TimeframeSelectorDDProps> = ({
	Tframe,
	setTimeframe,
}) => {
	return (
		<div>
			<Button onClick={() => setTimeframe(Tframe == '24H' ? 'ALL' : '24H')}>
				<Typography variant="body2" color="textSecondary">
					{Tframe}
				</Typography>
				{/* <DateRange fontSize="small" /> */}
			</Button>
		</div>
	);
};

interface TimeframeSelectorBarProps {
	Tframe: ITimeframe;
	setTimeframe: any;
}

export const TimeframeSelectorBar: React.FC<TimeframeSelectorBarProps> = ({
	Tframe,
	setTimeframe,
}) => {
	return (
		<TimeFrameSelectorContainer>
			{timeFrameSelectors.map((item: ITimeframe, index) => {
				return (
					<TimeframeItem
						key={index}
						onClick={() => {
							setTimeframe(item);
						}}
						selected={item == Tframe}
					>
						{item}
					</TimeframeItem>
				);
			})}
		</TimeFrameSelectorContainer>
	);
};
