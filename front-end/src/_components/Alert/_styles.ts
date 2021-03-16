import styled from 'styled-components';
import { InlineDiv } from '../../_styles';
import { COLORS } from '../../_styles/ResponsiveDesign';
import { theme } from '../../_styles/Theme';

export const AlertWrapper = styled.div`
	width: 100%;
`;

interface IAlertContainerProps {
	alertType: 'success' | 'danger';
}
export const AlertContainer = styled.div`
	border-radius: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${(props: IAlertContainerProps) =>
		props.alertType == 'danger'
			? COLORS.errorBase
			: theme.palette.secondary.main};
	padding: 10px;
	position: fixed;
	bottom: 5%;
	z-index: 500;
`;

export const AlertMessage = styled(InlineDiv)`
	color: white;
	margin-right: 10px;
`;

export const IconContainer = styled.div`
	width: 2rem;
	height: 2rem;
`;
