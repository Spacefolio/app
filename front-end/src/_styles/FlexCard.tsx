import { Card, CardProps, Icon, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import styled from 'styled-components';
import { SPACING } from '.';
import { InlineDiv, TimingStyle } from './GeneralStyles';
import { theme } from './Theme';

export interface FlexCardProps extends CardProps {
	fullWidth?: boolean;
	flexDirection?: 'row' | 'column';
	disableGutters?: boolean;
}

export const FlexCard = styled(Card)<FlexCardProps>`
	display: flex;
	background: white;
	border-radius: 4px;
	border: 1px solid rgb(236, 239, 241);
	box-shadow: none;
	${(props) => (props.disableGutters ? 'padding: 0;' : 'padding: 0 12px;')}
	${TimingStyle};
	${(props) => (props.fullWidth ? 'width: 100%;' : 'width: auto;')}
	${(props) =>
		props.flexDirection == 'row'
			? 'flex-direction: row;'
			: 'flex-direction: column;'};
	overflow: visible;
`;

export interface FlexCardContentProps {
	flexDirection?: 'row' | 'column';
	justifyContent?: any;
}
export const FlexCardContent = styled.div<FlexCardContentProps>`
	display: flex;
	padding: 16px;
	padding-top: 0;
	max-height: inherit;
`;

export interface FlexCardHeaderProps {
	top?: number;
	side?: number;
}
export const FlexCardHeader = styled.div<FlexCardHeaderProps>`
	padding: ${(props) =>
			props.top ? theme.spacing(props.top) : theme.spacing(2)}px
		${(props) => (props.side ? theme.spacing(props.side) : theme.spacing(4))}px;
`;

export interface FlexCardContainerProps {}

export const FlexCardContainer: React.FC<FlexCardContainerProps> = ({
	children,
	...props
}) => {
	return (
		<FlexCardContainerStyle {...props}> {children} </FlexCardContainerStyle>
	);
};

const FlexCardContainerStyle = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${SPACING.flexCardGap};
`;

export function CardHeader(title: string, caption: string) {
	return (
		<FlexCardHeader>
			<InlineDiv>
				<Typography variant="h2">{title}</Typography>
			</InlineDiv>
			<InlineDiv spacing={1}>
				<Typography variant="caption">{caption}</Typography>
			</InlineDiv>
		</FlexCardHeader>
	);
}
