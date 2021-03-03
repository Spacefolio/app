import React, { useEffect } from "react";
import { SidebarContainer } from "./SidebarStyles";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../_reducers";
import value from "*.png";
import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
} from "@material-ui/core";
import { useHistory, useLocation, useRouteMatch } from "react-router";
import { Dashboard, Extension, PieChart, Timeline } from "@material-ui/icons";

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
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      style={{ width: "100%", position: "fixed", bottom: "0px" }}
    >
      <BottomNavigationAction
        label="Portfolio"
        icon={<PieChart />}
        onClick={() => history.push("/portfolio")}
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
        label="Integrations"
        icon={<Extension />}
        onClick={() => history.push("/bots")}
      />
    </BottomNavigation>
  );
};
