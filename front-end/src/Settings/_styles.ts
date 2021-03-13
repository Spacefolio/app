import styled from 'styled-components';
import { SPACING } from '../_styles';

export const SettingsWrapper = styled.div`
	padding: ${SPACING.flexCardGap} 0;
	display: flex;
	flex-direction: column;
	gap: ${SPACING.flexCardGap};
`;

export const ProfileGridContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr ;
	grid-template-rows: 1fr ;
  grid-template-areas: 
  'profileinfo '
`;
