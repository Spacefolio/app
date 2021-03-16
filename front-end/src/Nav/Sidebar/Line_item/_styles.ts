import { BaseDiv } from '../../../_styles/GeneralStyles';
import styled from 'styled-components';
import {
	CenteredFlexBox,
	ClickableDiv,
	COLORS,
	SPACING,
	TimingStyle,
} from '../../../_styles';
import { theme } from '../../../_styles/Theme';

export const SidebarActionArea = styled.div`
	margin: 0;
	padding: 0;
`;

export const LinkWrapper = styled.div`
	cursor: pointer;
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: start;
	flex-wrap: none;
`;

export const LinkText = styled.div`
	display: flex;
	margin-left: ${SPACING.NavbarHeight};
	align-items: center;
`;

export const SidebarTab = styled(BaseDiv)<ITabContentContainerProps>`
	display: flex;
	width: 100%;
	height: ${SPACING.sidebarHeight};
	${(props) =>
		props.isActiveTab &&
		!props.Branding &&
		`box-shadow: inset 3px 0 0 0 ${theme.palette.primary.main};`}
	* {
		fill: ${theme.palette.text.disabled};
		${(props) =>
			props.isActiveTab &&
			`fill: ${theme.palette.primary.main}; color: ${theme.palette.primary.main};`}
	}
	${(props) =>
		props.Branding && `height: ${parseInt(SPACING.sidebarHeight) * 2}px;`}
	&:hover {
		* {
			fill: ${theme.palette.primary.main};
			color: ${theme.palette.primary.main};
		}
		background: ${theme.palette.grey[100]};
	}
`;

export const SidebarSubTab = styled(BaseDiv)<ITabContentContainerProps>`
	display: flex;
	width: 100%;
	margin-left: 10px;
	color: whitesmoke;
	height: calc(${SPACING.NavbarHeight} - 15px);
	${(props) =>
		props.isActiveTab &&
		!props.Branding &&
		`box-shadow: inset 3px 0 0 0 ${theme.palette.secondary.main}; background: #3d3d3d;`}
	* {
		${(props) =>
			props.isActiveTab &&
			!props.Branding &&
			`fill: ${theme.palette.secondary.main}; background: #3d3d3d;`}
	}
	&:hover {
		background: #3d3d3d;
	}
`;

interface ITabContentContainerProps {
	isActiveTab: boolean;
	Branding?: boolean;
}
export const TabSubContentContainer = styled.div<ITabContentContainerProps>`
  ${TimingStyle}
  display: ${(props) => (props.isActiveTab ? 'block' : 'none')};
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  width: 100%;
`;

export const SidebarIconContainer = styled.div`
	height: 100%;
	padding: 1em;
	position: absolute;
	width: ${SPACING.NavbarHeight};
	background: transparent;
	${CenteredFlexBox}
`;

export const SidebarDivider = styled.div``;
