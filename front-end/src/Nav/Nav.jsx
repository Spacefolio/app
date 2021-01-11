import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Nav.scss";
import { userActions } from "../_actions";
import account_photo_placeholder from "../public/account_photo_placeholder.png";

const Dropdown = () => {
  const [accountDropdownVisible, setAccountDropdownVisible] = useState(false);

  return <div></div>;
};

export const Nav = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.user);

  const { logout } = userActions;

  return (
    <div className="nav-container">
      <div className="nav-branding-area-container center-my-children">
        <div>AlgoNexus</div>
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
        <div
          onClick={() => {
            dispatch(logout());
            window.location.reload();
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
      </div>
    </div>
  );
};
