import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { userActions } from "../../_actions";
import { ArrowIcon, Dropdown, IDropdownItem } from "../../_components";
import { applicationViewActions } from "../../_actions/applicationView.actions";
import { IRootState } from "../../_reducers";
import {
  BrandingContainer,
  BrandTextLink,
  NavAccountContainer,
  NavAccountText,
  NavContainer,
  NavFlexSpacer,
  NavLogoArea,
  ToggleSidebar,
} from "../NavStyles";
import { BaseLink, ClickableDiv, InlineDiv } from "../../GlobalStyles";
import {
  Avatar,
  MenuItem,
  MenuList,
  Slide,
  Typography,
  useScrollTrigger,
} from "@material-ui/core";
import { COLORS } from "../../GlobalStyles/ResponsiveDesign";
import { ArrowDropDown } from "@material-ui/icons";
import { ListMyExchanges } from "../../Exchanges";
import { IPortfolioDataView } from "../../../../types";

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export const Nav = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: IRootState) => state.authentication.user);

  const [accountDropdownVisible, setAccountDropdownVisible] = useState(false);

  const [exchangesPopupVisible, setExchangesPopupVisible] = useState(false);

  const viewType = useSelector(
    (state: IRootState) => state.applicationView.currentViewType
  );

  const isSidebarCollapsed = useSelector(
    (state: IRootState) => state.applicationView.isSidebarCollapsed
  );

  const filteredPortfolioData: IPortfolioDataView = useSelector(
    (state: IRootState) => state.portfolio.filteredPortfolioData
  );

  const history = useHistory();

  const { logout } = userActions;

  const container = useRef();

  const AlgonexLogo = (
    <NavLogoArea>
      <BrandTextLink to="/dashboard">
        <Typography variant={"h4"}>Algonex</Typography>
      </BrandTextLink>
    </NavLogoArea>
  );

  const accountDropdown = (
    <Dropdown
    
      isVisible={accountDropdownVisible}
      setVisiblity={setAccountDropdownVisible}
      containerRef={container}
    >
      <MenuList>
        <ListMyExchanges enableEditing={false} />
        <MenuItem
          onClick={() => {
            dispatch(logout());
            location.reload();
          }}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Dropdown>
  );

  const DesktopNav = (
    <NavContainer>
      <ToggleSidebar
        onClick={() => dispatch(applicationViewActions.toggleSidebar())}
      >
        <ArrowIcon direction={!isSidebarCollapsed ? "right" : "down"} />
      </ToggleSidebar>
      <NavFlexSpacer />

      <NavAccountContainer
        ref={container}
        onClick={() => {
          setAccountDropdownVisible(!accountDropdownVisible);
        }}
      >
        <InlineDiv>
          <Avatar src={filteredPortfolioData.logoUrl} />
          {user.firstName} {user.lastName}
          <ArrowDropDown />
        </InlineDiv>
        {accountDropdownVisible && accountDropdown}
      </NavAccountContainer>
    </NavContainer>
  );

  const MobileNav = (
    <HideOnScroll>
      <NavContainer>
        {AlgonexLogo}
        <NavAccountContainer
          ref={container}
          onClick={() => {
            setAccountDropdownVisible(!accountDropdownVisible);
          }}
          style={{
            position: "absolute",
            right: "1rem",
          }}
        >
          <InlineDiv>
            <Avatar />
            <ArrowDropDown />
          </InlineDiv>
          {accountDropdownVisible && accountDropdown}
        </NavAccountContainer>
      </NavContainer>
    </HideOnScroll>
  );

  return (
    <React.Fragment>
      {viewType == "desktop" ? DesktopNav : MobileNav}
    </React.Fragment>
  );
};
