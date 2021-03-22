import styled from 'styled-components';
import { RD, SPACING } from '../_styles/ResponsiveDesign';
import { theme } from '../_styles/Theme';

export const DashboardWrapper = styled.div`
	width: 100%;
	display: grid;
	gap: ${theme.spacing(2)}px;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: auto auto;
	grid-template-areas: 'summaryLabel summaryLabel summaryLabel' 'summary summary summary';
`;
