import { Drawer, DrawerProps, Modal, ModalProps } from '@material-ui/core';
import { Polymer } from '@material-ui/icons';
import styled from 'styled-components';

import { TimingStyle } from '../../_styles';
import { SPACING } from '../../_styles/ResponsiveDesign';
import { theme } from '../../_styles/Theme';

export const SidebarSpacer = styled.div`
	height: 100%;
`;

export const SidebarContainer = styled.div<DrawerProps>`
	display: flex;
	justify-content: start;
	box-shadow: 5px 10px 25px -24px;
	overflow: hidden;
	position: sticky;
	top: 60px;
	flex-direction: column;
	height: calc(100vh - 60px);
	flex-shrink: 0;
	z-index: 4;
	width: ${(props: any) =>
		props.open ? SPACING.sidebarWidth : SPACING.NavbarHeight};
	align-items: ${(props: any) => (props.open ? 'center' : 'start')};
	${TimingStyle}
	background: white;
`;

export const MobileSidebarContainer = styled.div`
	display: flex;
	justify-content: start;
	outline: 0;
	overflow: hidden;
	border: none;
	flex-direction: column;
	position: absolute;
	top: 0;
	bottom: 0;
	width: ${SPACING.sidebarWidth};
	flex-shrink: 0;
	background: white;
`;
