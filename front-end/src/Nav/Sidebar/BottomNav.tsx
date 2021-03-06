import React, { useEffect } from "react";
import { BottomNavbar, SidebarContainer } from "./SidebarStyles";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../_reducers";
import value from "*.png";
import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
} from "@material-ui/core";
import { useHistory, useLocation, useRouteMatch } from "react-router";
import { Dashboard, Extension, PieChart, Settings, Timeline } from "@material-ui/icons";
import { COLORS } from "../../GlobalStyles/ResponsiveDesign";

interface BottomNavProps {}

export const MobileNav: React.FC<BottomNavProps> = ({}) => {
  const dispatch = useDispatch();

  const viewType = useSelector(
    (state: IRootState) => state.applicationView.currentViewType
  );

  const isSidebarVisible = useSelector(
    (state: IRootState) => state.applicationView.isSidebarVisible
  );

  const location = useLocation();

  const history = useHistory();

  const [value, setValue] = React.useState(0);

  useEffect(() => {
    switch (location.pathname) {
      case "/portfolio":
        setValue(0);
        break;
      case "/dashboard":
        setValue(1);
        break;
      case "/bots":
        setValue(2);
        break;
      case "/integrations":
        setValue(3);
        break;
    }
  }, []);

  

  return (
    <BottomNavbar
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction
        label="Portfolio"
        icon={<PieChart />}
        onClick={() => history.push("/portfolio")}
        classes={{ selected: 'my-class-name' }}
      />
      <BottomNavigationAction
        label="Dashboard"
        icon={<Dashboard />}
        onClick={() => history.push("/dashboard")}
      />
      <BottomNavigationAction
        label="Bots"
        icon={<Timeline />}
        onClick={() => history.push("/bots")}
      />
      <BottomNavigationAction
        label="Settings"
        icon={<Settings />}
        onClick={() => history.push("/settings")}
      />
    </BottomNavbar>
  );
};
