import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Nav.scss";
import { userActions } from "../_actions";
import account_photo_placeholder from "../public/account_photo_placeholder.png";
import { Dropdown, Modal } from "../_components";
import {ExchangesPopup} from '../Exchanges';

export const Nav = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.authentication.user);
  const [accountDropdownVisible, setAccountDropdownVisible] = useState(false);
  const [exchangesPopupVisible, setExchangesPopupVisible] = useState(true);

  const { logout } = userActions;

  const container = useRef();

  const ddownItems = [
    {
      id: 1,
      title: "Profile",
      onClickHandler: () => {},
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

  return (
    <div className="nav-container">
      <div className="nav-branding-area-container center-my-children">
        <div>Algonex</div>
      </div>
      <NavLink
        to="/trade"
        activeClassName="active-page-btn"
        className="nav-button trade-btn"
      >
        <div>Trade</div>
      </NavLink>

      <div className="nav-flex-spacer"></div>
      <div className="account-links-container">
        <a className="nav-button orders-btn">
          <div>Orders</div>
        </a>
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
              <img
                className="account-btn-user-photo"
                src={account_photo_placeholder}
              ></img>
            </div>
          </div>
          {accountDropdownVisible ? (
            <Dropdown
              isVisible={accountDropdownVisible}
              setVisiblity={setAccountDropdownVisible}
              items={ddownItems}
              containerRef={container}
            />
          ) : null}
        </div>
      </div>
      <Modal
        dismiss={() => setExchangesPopupVisible(false)}
        children={<ExchangesPopup/>}
        visible={exchangesPopupVisible}
        clickOutsidedismiss={false}
      />
    </div>
  );
};
