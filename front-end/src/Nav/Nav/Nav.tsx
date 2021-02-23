import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import "./Nav.scss";
import { NavContainer } from "../generalStyle";
import { userActions } from "../../_actions";
import { Dropdown, IDropdownItem, Modal } from "../../_components";
import { ManageExchanges } from "../../Exchanges";

interface INavProps {
  collapseSidebar: any;
  isSidebarCollapsed: boolean;
}

export const Nav: React.FC<INavProps> = ({
  collapseSidebar,
  isSidebarCollapsed,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.authentication.user);
  const [accountDropdownVisible, setAccountDropdownVisible] = useState(false);
  const [exchangesPopupVisible, setExchangesPopupVisible] = useState(false);

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

  const LogoSection = (
    <div className="nav-branding-area-container center-my-children">
      <div
        onClick={() => collapseSidebar(!isSidebarCollapsed)}
        style={{
          borderRadius: "8px",
          border: "red 3px solid",
          height: "50px",
          width: "50px",
          marginRight: "20px",
        }}
      ></div>
      <div style={{ color: "var(--primary-dark3)" }}>
        <Link to="/dashboard">Algonex</Link>
      </div>
    </div>
  );

  return (
    <NavContainer>
      {LogoSection}
      <div className="nav-flex-spacer"></div>
      <div className="account-links-container">
        <div style={{ position: "relative" }} ref={container}>
          <div
            onClick={() => {
              setAccountDropdownVisible(!accountDropdownVisible);
            }}
            className="nav-button portfolio-btn text-nowrap"
          >
            {user.firstName} {user.lastName}
          </div>
          {accountDropdownVisible ? (
            <Dropdown
              isVisible={accountDropdownVisible}
              dropdownItemList={ddownItems}
              setVisiblity={setAccountDropdownVisible}
              containerRef={container}
            />
          ) : null}
        </div>
      </div>
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
};
