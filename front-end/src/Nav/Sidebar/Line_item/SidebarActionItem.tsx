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
import { Avatar, Typography } from '@material-ui/core';
import styled from 'styled-components';

interface ISidebarActionItemProps {
	text: string;
	children?: React.ReactNode;
	Icon?: any;
	linkUri: string;
}

const SidebarText = styled.div`
	font-size: 0.875rem;
	font-weight: 600;
`;

export const SidebarActionItem: React.FC<ISidebarActionItemProps> = ({
	text,
	children,
	Icon,
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
					<SidebarIconContainer>
						<Avatar style={{ background: 'whitesmoke' }}>
							<Icon fontSize="inherit" />
						</Avatar>
					</SidebarIconContainer>
					<LinkText>
						<SidebarText>{text}</SidebarText>
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
