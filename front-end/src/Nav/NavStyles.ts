import styled from "styled-components";
import { BasicLink, CenteredFlexBox, ClickableDiv } from "../GlobalStyles";

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
  display: flex;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
  z-index: 2;
  background-color: white;
  width: 100%;
  height: 57px;
  align-items: center;
  justify-content: center;
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

export const ToggleSidebar = styled(ClickableDiv)`
  cursor: pointer;
  border-radius: 8px;
  background-color: var(--primary-base);
  height: 50px;
  width: 50px;
  margin-right: 20px;
  &:hover {
    background-color: var(--accent-base);
  }
`;

export const BrandingContainer = styled(ClickableDiv)``;

export const BrandTextLink = styled(BasicLink)`
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
