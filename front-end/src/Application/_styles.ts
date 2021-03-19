import styled from 'styled-components';
import { RD, SPACING } from '../_styles/ResponsiveDesign';
import { CenteredFlexBox, ResizeTransition, TimingStyle } from '../_styles';
import { IViewType } from '../../../types';

interface ApplicationProps {}

export const ApplicationContainer = styled.div<ApplicationProps>`
	display: flex;
	position: relative;
	height: 100%;
	${TimingStyle}
`;

export const BodyWrapper = styled.div`
	display: flex;
	height: 100%;
	flex-direction: column;
	position: relative;
`;
