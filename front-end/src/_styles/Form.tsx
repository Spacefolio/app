import styled from 'styled-components';
import { SPACING } from '.';

export const StyledFormRow = styled.div`
	display: flex;
	gap: ${SPACING.flexCardGap};
	align-items: flex-end;
	justify-content: space-between;
	padding: 12px;
	svg {
		margin-bottom: 8px;
	}
`;

export const StyledFormColumn = styled.div`
	padding: 12px;
`;
