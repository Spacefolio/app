import styled from 'styled-components';
import { theme } from '../_styles/Theme';

export const TradingWrapper = styled.div`
	width: 100%;
	display: grid;
	gap: ${theme.spacing(2)}px;
	grid-template-columns: 2fr 1fr 1fr;
	grid-template-rows: auto auto auto;
	grid-template-areas: 'selector selector selector' 'summary summary summary' 'holdings holdings allocations';

	@media (max-width: ${theme.breakpoints.values.md}px) {
		grid-template-columns: 100%;
		grid-template-rows: auto auto auto auto;
		grid-template-areas: 'selector' 'summary' 'allocations' 'holdings';
	}
`;
