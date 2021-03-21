import styled from 'styled-components';
import { RD, SPACING } from '../_styles/ResponsiveDesign';
import { CenteredFlexBox, ResizeTransition, TimingStyle } from '../_styles';
import { IViewType } from '../../../types';

interface ApplicationProps {}

export const ApplicationContainer = styled.div<ApplicationProps>`
	display: flex;
	${TimingStyle}
`;

export const BodyWrapper = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
`;
