import React, { useEffect } from 'react';
import { ArrowIcon } from '../../../_components/Icons';
import {
	LinkText,
	LinkWrapper,
	SidebarTab,
	SidebarIconContainer,
	TabSubContentContainer,
	SidebarSubTab,
} from './_styles';
import { Route, useHistory, useLocation, useRouteMatch } from 'react-router';
import { useState } from 'react';
import { link } from 'fs/promises';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../_reducers';
import { SvgWrapperButton, ScrollBox, SPACING } from '../../../_styles';
import { useCheckCurrentLocation } from '../../../_hooks/useCheckCurrentLocation';
import { Typography } from '@material-ui/core';

interface ISidebarActionItemProps {
	text: string;
	children?: React.ReactNode;
	icon?: React.ReactNode;
	linkUri: string;
}

export const SidebarActionItem: React.FC<ISidebarActionItemProps> = ({
	text,
	children,
	icon,
	linkUri,
}) => {
	const history = useHistory();

	const [subIsVisible, setSubIsVisible] = useState(false);

	const isCurrentPage = useCheckCurrentLocation(linkUri);

	const handleClick = () => {
		if (!isCurrentPage) {
			history.push(linkUri);
		}
	};

	return (
		<React.Fragment>
			<LinkWrapper>
				<SidebarTab isActiveTab={isCurrentPage} onClick={() => handleClick()}>
					<SidebarIconContainer>{icon}</SidebarIconContainer>
					<LinkText>
						<Typography>{text}</Typography>
					</LinkText>
					{children && (
						<SvgWrapperButton
							style={{ height: '100%' }}
							onClick={() => setSubIsVisible(!subIsVisible)}
						>
							<ArrowIcon
								style={{ fill: 'white' }}
								direction={subIsVisible ? 'up' : 'down'}
							/>
						</SvgWrapperButton>
					)}
				</SidebarTab>
			</LinkWrapper>
			{children && (
				<TabSubContentContainer isActiveTab={subIsVisible}>
					{children}
				</TabSubContentContainer>
			)}
		</React.Fragment>
	);
};
