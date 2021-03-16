import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { CenteredFlexBox, COLORS, TimingStyle } from '.';
import { theme } from './Theme';

// export const BigWideButton = styled.button`
//   ${CenteredFlexBox}
//   width: 100%;
//   border-radius: 1rem;
//   background-color: ${theme.palette.primary.main};
//   padding: 1rem;
//   color: white;
//   box-shadow: 0px 15px 25px -17px ${theme.palette.primary.main};
//   cursor: pointer;
//   ${TimingStyle}
//   &:hover {
//     background-color: ${theme.palette.secondary.main};
//     box-shadow: 0px 15px 25px -17px ${theme.palette.secondary.main};
//   }
// `;

export const ActionButton = styled(Button)`
	box-shadow: 0px 15px 25px -17px ${theme.palette.primary.main};
	min-width: 120px;
	padding: 10 10px;
	border-radius: 20px;
`;

export const NavButton = styled(Button)`
	box-shadow: 0px 15px 25px -17px ${theme.palette.primary.main};
	min-width: 120px;
	padding: 10 10px;
	border-radius: 20px;
`;
