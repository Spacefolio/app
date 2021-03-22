import { Tab, Tabs } from '@material-ui/core';
import styled from 'styled-components';
import { RD, SPACING } from '../_styles/ResponsiveDesign';
import { theme } from '../_styles/Theme';

export const PortfolioWrapper = styled.div`
	padding: ${theme.spacing(2)}px 0;
	width: 100%;
	height: 100%;
`;

export const StyledTabs = styled(Tabs)``;

export const StyledTab = styled(Tab)`
	padding: 0 50px;
`;
