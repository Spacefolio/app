import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { userActions } from "../../_actions";
import { ArrowIcon, Dropdown, IDropdownItem, Modal } from "../../_components";
import { ManageExchanges } from "../../Exchanges";
import { applicationView } from "../../_reducers/applicationView.reducer";
import { applicationViewActions } from "../../_actions/applicationView.actions";
import { IRootState } from "../../_reducers";
import {
  BrandingContainer,
  NavAccountContainer,
  NavAccountText,
  NavContainer,
  NavFlexSpacer,
  NavLogoArea,
  ToggleSidebar,
} from "../NavStyles";
import { BaseLink, ClickableDiv } from "../../GlobalStyles";
import { Slide, useScrollTrigger } from "@material-ui/core";

interface INavProps {}

export const Nav: React.FC<INavProps> = ({}) => {
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
  const isSidebarVisible = useSelector(
    (state: IRootState) => state.applicationView.isSidebarVisible
  );

  interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    children: React.ReactElement;
  }
  function HideOnScroll(props: Props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }

  const { logout } = userActions;

  const container = useRef();

  const ddownItems: IDropdownItem[] = [
    {
      text: "Profile",
      onClickHandler: () => {
        console.log(user);
      },
      selected: false,
    },
    {
      text: "Subscription",
      onClickHandler: () => {},
      selected: false,
    },
    {
      text: "Logout",
      onClickHandler: () => {
        dispatch(logout());
        location.reload();
      },
      selected: false,
    },
  ];

  const DesktopNav = (
    <NavContainer>
      <ToggleSidebar
        onClick={() =>
          dispatch(applicationViewActions.toggleSidebar("desktop"))
        }
      >
        <ArrowIcon direction={!isSidebarCollapsed ? "right" : "left"} />
      </ToggleSidebar>
      <NavLogoArea>
        <BrandingContainer>
          <BaseLink to="/dashboard">Algonex</BaseLink>
        </BrandingContainer>
      </NavLogoArea>
      <NavFlexSpacer />

      <NavAccountContainer
        ref={container}
        onClick={() => {
          setAccountDropdownVisible(!accountDropdownVisible);
        }}
      >
        <NavAccountText>
          {user.firstName} {user.lastName}
        </NavAccountText>
        {accountDropdownVisible ? (
          <Dropdown
            isVisible={accountDropdownVisible}
            dropdownItemList={ddownItems}
            setVisiblity={setAccountDropdownVisible}
            containerRef={container}
          />
        ) : null}
      </NavAccountContainer>

      <Modal
        dismiss={() => setExchangesPopupVisible(false)}
        visible={exchangesPopupVisible}
        clickOutsidedismiss={false}
      >
        <ManageExchanges
          headerText={"My Exchanges"}
          addExchange={true}
          myExchanges={false}
        />
      </Modal>
    </NavContainer>
  );

  const MobileNav = (
    <HideOnScroll>
      <NavContainer>
        <NavLogoArea>
          <Link to="/dashboard">Algonex</Link>
        </NavLogoArea>
      </NavContainer>
    </HideOnScroll>
  );

  return (
    <React.Fragment>
      {viewType == "desktop" ? DesktopNav : MobileNav}
    </React.Fragment>
  );
};
