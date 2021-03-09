import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { userActions } from "../../../_actions";
import {
  ArrowIcon,
  Dropdown,
  IDropdownItem,
  Modal,
} from "../../../_components";
import { applicationViewActions } from "../../../_actions/applicationView.actions";
import { IRootState } from "../../../_reducers";
import {
  NavAccountContainer,
  NavContainer,
  NavFlexSpacer,
  ToggleSidebar,
} from "./Styles";
import { InlineDiv } from "../../../AlgonexStyles";
import {
  Avatar,
  ListItemAvatar,
  MenuItem,
  MenuList,
  Portal,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { COLORS, RD } from "../../../AlgonexStyles/ResponsiveDesign";
import { Add, ArrowDropDown, ExitToApp } from "@material-ui/icons";
import { AddExchangePopup, ListMyExchanges } from "../../../Exchanges";
import { IPortfolioDataView } from "../../../../../types";

export const DesktopTopNav = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: IRootState) => state.authentication.user);

  const [accountDropdownVisible, setAccountDropdownVisible] = useState(false);

  const filteredPortfolioData: IPortfolioDataView = useSelector(
    (state: IRootState) => state.portfolio.filteredPortfolioData
  );

  const isSidebarCollapsed = useSelector(
    (state: IRootState) => state.applicationView.isSidebarCollapsed
  );

  const history = useHistory();

  const { logout } = userActions;

  const container = useRef();

  const accountDropdown = (
    <Dropdown
      isVisible={accountDropdownVisible}
      setVisiblity={setAccountDropdownVisible}
      containerRef={container}
    >
      <MenuList>
        <ListMyExchanges enableEditing={false} />
        <MenuItem
          button={true}
          key={"AddExchange"}
          onClick={() =>
            dispatch(
              applicationViewActions.setModal(true, <AddExchangePopup />, 'Add Exchange')
            )
          }
        >
          <ListItemAvatar>
            <Add />
          </ListItemAvatar>
          <Typography>Add Exchange</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(logout());
            location.reload();
          }}
          button={true}
        >
          <ListItemAvatar>
            <Avatar
              style={{
                color: COLORS.darkBase,
                backgroundColor: "white",
                border: `${COLORS.darkBase} solid 2px`,
              }}
            >
              <ExitToApp />
            </Avatar>
          </ListItemAvatar>
          <Typography>Logout</Typography>
        </MenuItem>
      </MenuList>
    </Dropdown>
  );

  return (
    <NavContainer>
      <ToggleSidebar
        onClick={() => dispatch(applicationViewActions.toggleSidebar())}
      >
        <ArrowIcon direction={!isSidebarCollapsed ? "left" : "right"} />
      </ToggleSidebar>
      <NavFlexSpacer />
      <NavAccountContainer
        ref={container}
        onClick={() => {
          setAccountDropdownVisible(!accountDropdownVisible);
        }}
      >
        <InlineDiv>
          {/* <Avatar src={filteredPortfolioData.logoUrl} /> */}
          {user.firstName} {user.lastName}
          <ArrowDropDown />
        </InlineDiv>
        {accountDropdown}
      </NavAccountContainer>
    </NavContainer>
  );
};
