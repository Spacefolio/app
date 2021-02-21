import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import "./Nav.scss";
import { NavContainer } from "./generalStyle";
import { userActions } from "../_actions";
import { Dropdown, DropdownItem, Modal } from "../_components";
import { ExchangesPopup } from "../Exchanges";
import { DDListItem } from "../_components/Dropdown/generalStyle";

export const Nav = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.authentication.user);
  const [accountDropdownVisible, setAccountDropdownVisible] = useState(false);
  const [exchangesPopupVisible, setExchangesPopupVisible] = useState(false);

  const { logout } = userActions;

  const container = useRef();

  const ddownItems: DropdownItem[] = [
    {
      id: 1,
      title: "Profile",
      onClickHandler: () => {
        console.log(user);
      },
      selected: false,
      key: "kgjh",
    },
    {
      id: 2,
      title: "My Exchanges",
      onClickHandler: () => {
        setExchangesPopupVisible(true);
        setAccountDropdownVisible(false);
      },
      selected: false,
      key: "subs",
    },
    {
      id: 3,
      title: "Subscription",
      onClickHandler: () => {},
      selected: false,
      key: "hi",
    },
    {
      id: 4,
      title: "Logout",
      onClickHandler: () => {
        dispatch(logout());
        location.reload();
      },
      selected: false,
      key: "yo",
    },
  ];

  const createDropdownItems = () => {
    return ddownItems.map((item: DropdownItem) => {
      return (
        <DDListItem
          key={item.key}
          onClick={() => item.onClickHandler()}
          className="dd-list-item"
        >
          {item.title}
        </DDListItem>
      );
    });
  };

  return (
    <NavContainer>
      <div className="nav-branding-area-container center-my-children">
        <div style={{ color: "var(--primary-dark3)" }}>
          <Link to="/dashboard">Algonex</Link>
        </div>
      </div>
      <div className="nav-flex-spacer"></div>
      <div className="account-links-container">
        <NavLink
          to="/portfolio"
          activeClassName="active-page-btn"
          className="nav-button portfolio-btn"
        >
          <div>Portfolio</div>
        </NavLink>
        <div style={{ position: "relative" }} ref={container}>
          <div
            onClick={() => {
              setAccountDropdownVisible(!accountDropdownVisible);
            }}
            className="nav-button account-btn"
          >
            <div className="account-btn-item-group">
              <div className="text-nowrap">
                {user.firstName} {user.lastName}
              </div>
            </div>
          </div>
          {accountDropdownVisible ? (
            <Dropdown
              isVisible={accountDropdownVisible}
              children={createDropdownItems()}
              setVisiblity={setAccountDropdownVisible}
              containerRef={container}
            />
          ) : null}
        </div>
      </div>
      <Modal
        dismiss={() => setExchangesPopupVisible(false)}
        children={<ExchangesPopup />}
        visible={exchangesPopupVisible}
        clickOutsidedismiss={false}
      />
    </NavContainer>
  );
};
