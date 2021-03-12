import { Sync } from "@material-ui/icons";
import styled from "styled-components";
import { spinAnimation } from "./Animations";

interface ISyncIconProps {
  isSyncing?: boolean;
}

export const SyncIcon = styled(Sync)<ISyncIconProps>`
  ${(props) => (props.isSyncing ? spinAnimation : null)}
`;