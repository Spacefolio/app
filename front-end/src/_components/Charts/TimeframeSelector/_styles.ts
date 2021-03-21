import styled from 'styled-components';
import { ClickableDiv, CenteredFlexBox } from '../../../_styles';
import { theme } from '../../../_styles/Theme';

export const TimeFrameSelectorContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	width: 100%;
`;

interface ITimeFrameItemProps {
	selected: boolean;
}
export const TimeframeItem = styled.div<ITimeFrameItemProps>`
	width: 100%;
	padding: 8px;
	text-align: center;
	color: ${theme.palette.text.secondary};
	${(props) =>
		props.selected ? `color: ${theme.palette.primary.main}` : ``};
`;
