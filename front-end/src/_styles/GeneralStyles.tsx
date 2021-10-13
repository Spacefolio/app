import { Link, NavLink } from 'react-router-dom';
import React from 'react';
import { COLORS, SPACING, TIMING } from './ResponsiveDesign';
import styled from 'styled-components';
import { Polymer } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { theme } from './Theme';
export const TimingStyle = `
transition: ${TIMING.transitionTime};
`;
export const CenteredFlexBox = `
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const BaseSvg = styled.svg``;

export const BaseDiv = styled.div`
	position: relative;
	cursor: pointer;
	* {
		cursor: pointer;
	}
`;

export const ClickableDiv = styled(BaseDiv)`
	&:hover {
		color: ${theme.palette.secondary.main};
		svg {
			fill: ${theme.palette.secondary.main};
		}
	}
	${TimingStyle}
`;
export const ClickableSvg = styled(BaseSvg)`
	width: 1rem;
	height: 1rem;
	cursor: pointer;
	&:hover {
		fill: ${theme.palette.secondary.main};
	}
	${TimingStyle}
`;
export const ScrollBox = styled.div`
	max-height: inherit;
	overflow-y: scroll;
	overflow-x: hidden;
`;
export const BaseGrid = styled.div`
	display: grid;
	${TimingStyle}
`;

export const BaseSearchBar = styled.input`
  cursor: pointer
  border-radius: 3px;
  border: ${theme.palette.primary.main} solid 1px;
  width: 100%;
  padding: 1rem;
  &:focus {
  }
`;

export const FullScreenOverlay = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  top 0;
  bottom: 0;
  margin: 50%;
`;
export const BaseLink = styled(Link)`
	color: ${theme.palette.primary.main};
	${TimingStyle}
`;

interface InlineDivProps {
	align?: any;
	spacing?: number;
}
export const InlineDiv = styled.div<InlineDivProps>`
	gap: calc(
		${SPACING.flexCardGap} * ${(props) => (props.spacing ? props.spacing : 0)}
	);
	white-space: nowrap;
	display: flex;
	align-items: center;
	justify-content: ${(props) => props.align};
`;

export const SvgWrapperButton = styled(ClickableDiv)`
	height: 2rem;
	width: 2rem;

`;

export const SpacefolioLogo = styled(Polymer)`
	height: 100%;
	width: 100%;
	fill: ${theme.palette.primary.main} !important;
`;

interface FlexSpacerProps {
	showLine?: boolean;
	color?: string;
}
export const FlexSpacer = styled.div<FlexSpacerProps>`
	${(props) =>
		props.showLine &&
		`height: 3px; background: ${props.color}; margin: 0 10px;`}
	width: 100%;
	border-radius: 3px;
	opacity: 0.7;
`;
