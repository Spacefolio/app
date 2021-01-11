import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

  //get the current page im on from the redux store to ensure the proper nav tab is highlighted

  //update the redux state of the current page if i click a link to a new page
  return (
    <div className="nav-container">
      <div className="nav-branding-area-container center-my-children">
        <div>AlgoNexus</div>
      </div>
      <div className="nav-button trade-btn">
        <div>Trade</div>
      </div>
      <div className="nav-flex-spacer"></div>
      <div className="account-links-container">
        <div className="nav-button orders-btn">
          <div>Orders</div>
        </div>
        <div className="nav-button portfolio-btn">
          <div>Portfolio</div>
        </div>
        <div className="nav-button account-btn">
          <div className='account-btn-item-group'>
            <div className='text-nowrap'>
              {user.firstName} {user.lastName}
            </div>
            <img className="account-btn-user-photo" src={account_photo_placeholder}></img>
          </div>

        </div>
      </div>
    </div>
  );
};
