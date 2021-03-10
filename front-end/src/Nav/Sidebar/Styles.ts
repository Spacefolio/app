import { Polymer } from "@material-ui/icons";
import styled from "styled-components";
import {
  CenteredFlexBox,
  ClickableDiv,
  ClickableSvg,
  FadeoutAnimation,
  SvgWrapperButton,
  TimingStyle,
} from "../../AlgonexStyles";
import { COLORS, RD, SPACING } from "../../AlgonexStyles/ResponsiveDesign";

export const SidebarSpacer = styled.div`
  height: 100%;
`;

interface ISidebarContainerProps {
  isSidebarCollapsed: boolean;
  isMobile: boolean;
}

export const SidebarContainer = styled.div<ISidebarContainerProps>`
  display: flex;
  justify-content: start;
  box-shadow: 5px 10px 25px -24px;
  overflow: hidden;
  flex-direction: column;
  position: sticky;
  top: 0;
  background-color: ${COLORS.darkBase};
  flex-shrink: 0;
  z-index: 4;
  height: 100vh;
  * {
    color: white;
  }
  width: ${(props: any) =>
    props.isSidebarCollapsed
      ? props.isMobile
        ? "0"
        : SPACING.NavbarHeight
      : SPACING.sidebarWidth};

  ${(props) => props.isMobile && `position: fixed; left: 0;`}

  align-items: ${(props: any) =>
    props.isSidebarCollapsed ? "center" : "start"};
  ${TimingStyle}
`;
