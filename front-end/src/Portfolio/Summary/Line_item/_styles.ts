import { ProfitColorizer } from './../../../_helpers/formating';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import { FlexCard, SPACING } from '../../../_styles';
import { theme } from '../../../_styles/Theme';

export const SummaryWrapper = styled.div`
	width: 100%;
	display: grid;
	gap: ${theme.spacing(2)}px;
	grid-template-columns: 2fr 1fr 1fr;
	grid-template-rows: auto auto auto auto;
	grid-template-areas: 'selector selector selector' 'summary summary summary' 'holdings holdings allocations' 'transactions transactions transactions';

	@media (max-width: ${theme.breakpoints.values.md}px) {
		grid-template-columns: 100%;
		grid-template-rows: auto auto auto auto auto;
		grid-template-areas: 'selector' 'summary' 'allocations' 'holdings' 'transactions';
	}
`;

export const Container = styled.div`
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-columns: 1fr 3fr;
	grid-template-rows: 1fr 2fr;
	grid-template-areas:
		'name chart'
		'holdings holdings';
`;

interface PercentProps {
	value: number;
}
export const OverviewPercent = styled(Typography)<PercentProps>`
	font-size: 1rem;
	font-weight: 400;
	color: ${(props) => ProfitColorizer(props.value)};
`;

export const OverviewContainer = styled(FlexCard)`
	padding: 12px;
	position: relative;
`;
