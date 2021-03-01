import styled from "styled-components";
import {
  BaseLink,
  CenteredFlexBox,
  ClickableDiv,
  ClickableSvg,
  SvgWrapActionButton,
} from "../GlobalStyles";
import { COLORS, SPACING } from "../GlobalStyles/ResponsiveDesign";

export const NavLogoArea = styled.div`
  flex-shrink: 0;
  width: 280px;
  height: 100%;
  font-weight: 800;
  font-size: 1.8em;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
`;
export const NavContainer = styled.div`
  font-weight: 500;
  font-size: 1em;
  ${CenteredFlexBox}
  position: relative;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
  z-index: 2;
  background-color: white;
  width: 100%;
  height: ${SPACING.NavbarHeight};
`;
export const NavFlexSpacer = styled.div`
  width: 100%;
  height: 100%;
`;
export const NavAccountContainer = styled.div`
  position: relative;
  height: 100%;
  ${CenteredFlexBox};
  padding: 10px;
`;

export const ToggleSidebar = styled(SvgWrapActionButton)`
  position: absolute;
  left: 5px;
`;

export const BrandingContainer = styled(ClickableDiv)``;

export const BrandTextLink = styled(BaseLink)`
  $:hover {
    color: var(--accent-color);
  }
`;

export const NavAccountText = styled(ClickableDiv)`
  white-space: nowrap;
  &:hover {
    color: var(--accent-base);
  }
`;
