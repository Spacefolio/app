import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { userActions } from "../../_actions";
import { Dropdown, IDropdownItem, Modal } from "../../_components";
import { ManageExchanges } from "../../Exchanges";
import { applicationView } from "../../_reducers/applicatoinView.reducer";
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
import { BasicLink, ClickableDiv } from "../../GlobalStyles";

interface INavProps {}

export const Nav: React.FC<INavProps> = ({}) => {
  const dispatch = useDispatch();
  const user = useSelector((state: IRootState) => state.authentication.user);
  const [accountDropdownVisible, setAccountDropdownVisible] = useState(false);
  const [exchangesPopupVisible, setExchangesPopupVisible] = useState(false);
  const viewType = useSelector(
    (state: IRootState) => state.applicationView.currentViewType
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
    <NavContainer>
      <NavLogoArea>
        <ToggleSidebar
          onClick={() => dispatch(applicationViewActions.toggleSidebar())}
        ></ToggleSidebar>
        <BrandingContainer>
          <BasicLink to="/dashboard">Algonex</BasicLink>
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
