import styled from "styled-components";
import {
  ClickableDiv,
  CenteredFlexBox,
  SPACING,
  SvgWrapperButton,
  BaseLink,
} from "../../../AlgonexStyles";

export const NavLogoArea = styled(ClickableDiv)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const NavContainer = styled.div`
  font-weight: 500;
  font-size: 1em;
  ${CenteredFlexBox}
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
  z-index: 5;
  position: sticky;
  top: 0;
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
`;

export const ToggleSidebar = styled(SvgWrapperButton)`
  position: absolute;
  left: 0;
  height: 5rem;
  width: 5rem;
`;

export const BrandingContainer = styled.div``;

export const BrandTextLink = styled(BaseLink)`
  font-size: 2rem;
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
