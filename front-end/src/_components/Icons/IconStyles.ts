import { Sync } from "@material-ui/icons";
import styled from "styled-components";
import { BaseSvg, ClickableSvg, TimingStyle } from "../../GlobalStyles";
import { spinAnimation } from "../../GlobalStyles/Animations";

interface ISyncIconProps {
  isSyncing?: boolean;
}

export const SyncIcon = styled(Sync)<ISyncIconProps>`
  ${(props) => (props.isSyncing ? spinAnimation : null)}
`;