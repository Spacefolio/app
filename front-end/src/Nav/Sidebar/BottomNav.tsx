import React from "react";
import { SidebarContainer } from "./SidebarStyles";

import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../_reducers";

import value from "*.png";
import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
} from "@material-ui/core";
import { BotsIcon } from "../../_components";
import { useHistory } from "react-router";
import { Dashboard, PieChart, Timeline } from "@material-ui/icons";

interface BottomNavProps {}

export const MobileNav: React.FC<BottomNavProps> = ({}) => {
  const dispatch = useDispatch();

  const viewType = useSelector(
    (state: IRootState) => state.applicationView.currentViewType
  );

  const isSidebarVisible = useSelector(
    (state: IRootState) => state.applicationView.isSidebarVisible
  );
  const useStyles = makeStyles({
    root: {
      width: 500,
    },
  });

  const classes = useStyles();

  const history = useHistory();

  const [value, setValue] = React.useState("recents");

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
      style={{ width: "100%", position: "fixed", bottom: "0px" }}
    >
      <BottomNavigationAction
        label="Portfolio"
        icon={<PieChart />}
        onClick={() => history.push("/portfolio")}
        selected={location.toString() == "/portfolio"}
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
    </BottomNavigation>
  );
};
