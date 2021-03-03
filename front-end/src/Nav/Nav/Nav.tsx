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

  const history = useHistory();

  const { logout } = userActions;

  const container = useRef();

  const AlgonexLogo = (
    <NavLogoArea>
      <BrandTextLink to="/dashboard">
        <Typography style={{ color: "black" }} variant={"h4"}>
          Algonex
        </Typography>
      </BrandTextLink>
    </NavLogoArea>
  );

  const DesktopNav = (
    <NavContainer>
      <ToggleSidebar
        onClick={() =>
          dispatch(applicationViewActions.toggleSidebar("desktop"))
        }
      >
        <ArrowIcon direction={!isSidebarCollapsed ? "right" : "down"} />
      </ToggleSidebar>
      {AlgonexLogo}
      <NavFlexSpacer />

      <NavAccountContainer
        ref={container}
        onClick={() => {
          setAccountDropdownVisible(!accountDropdownVisible);
        }}
      >
        <InlineDiv>
          {user.firstName} {user.lastName}
          <ArrowDropDown />
        </InlineDiv>
        {accountDropdownVisible && (
          <Dropdown
            isVisible={accountDropdownVisible}
            setVisiblity={setAccountDropdownVisible}
            containerRef={container}
          >
            <MenuList>
              <MenuItem onClick={() => history.push("/profile")}>
                Profile
              </MenuItem>
              <MenuItem>Subscription</MenuItem>
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
        )}
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
          {accountDropdownVisible && (
            <Dropdown
              isVisible={accountDropdownVisible}
              setVisiblity={setAccountDropdownVisible}
              containerRef={container}
            >
              <MenuList>
                <MenuItem onClick={() => history.push("/profile")}>
                  Profile
                </MenuItem>
                <MenuItem>Subscription</MenuItem>
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
          )}
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
