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
    <NavContainer><ToggleSidebar
          onClick={() =>
            dispatch(applicationViewActions.toggleSidebar("desktop"))
          }
        ><ArrowIcon direction={!isSidebarCollapsed ? "right" : "left"} />
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
    <NavContainer>
      <ToggleSidebar
        onClick={() => dispatch(applicationViewActions.toggleSidebar("mobile"))}
      >
        <ArrowIcon direction={isSidebarVisible ? "right" : "left"} />
      </ToggleSidebar>
      <NavLogoArea>
        <Link to="/dashboard">Algonex</Link>
      </NavLogoArea>
    </NavContainer>
  );

  return (
    <React.Fragment>
      {viewType == "desktop" ? DesktopNav : MobileNav}
    </React.Fragment>
  );
};
