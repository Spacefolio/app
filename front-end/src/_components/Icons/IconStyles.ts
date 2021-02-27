import styled from "styled-components";
import { BaseSvg, ClickableSvg } from "../../GlobalStyles";
import { spinAnimation } from "../../GlobalStyles/Animations";

interface ISyncIconProps {
  isSyncing?: boolean;
}

export const SyncIconWrapper = styled(ClickableSvg)<ISyncIconProps>`
  ${(props) => (props.isSyncing ? spinAnimation : null)}
`;
