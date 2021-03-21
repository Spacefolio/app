import { ProfitColorizer } from './../../../_helpers/formating';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import { FlexCard, SPACING } from '../../../_styles';

export const SummaryWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
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

export const OverviewLabel = styled(Typography)`
	font-size: 1rem;
	font-weight: 400;
`;

export const OverviewValue = styled(Typography)`
	font-size: 1.25rem;
	font-weight: 400;
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
`;
