import value from "*.png";
import { Tabs, Tab } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router";
import { Charts, Transactions, OpenOrders, Holdings } from "../Portfolio";

interface SettingsProps {}

export const Settings: React.FC<SettingsProps> = ({}) => {
  const [message, setMessage] = useState("im settings");

  const { path } = useRouteMatch("/settings");

  const [value, setValue] = useState(0);
  
  const history = useHistory();

  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case path + "/profile":
        setValue(0);
        break;
      case path + "/integrations":
        setValue(1);
        break;
      case path + "/transactions":
        setValue(2);
        break;
      case path + "/orders":
        setValue(3);
        break;
    }
  }, []);

  return (
    <React.Fragment>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={(e, val) => {
          console.log(e, val);
          setValue(val);
        }}
      >
        <Tab
          onClick={() => history.push(path + "/profile")}
          label="Personal Info"
        ></Tab>

        <Tab
          onClick={() => history.push(path + "/integrations")}
          label="Integrations"
        ></Tab>

        {/* <Tab
          onClick={() => history.push(path + "/transactions")}
          label="Transactions"
        ></Tab>

        <Tab
          onClick={() => history.push(path + "/orders")}
          label="Open Orders"
        ></Tab> */}
      </Tabs>
      <Switch>
        <Route exact path={`${path}/profile`} component={Charts} />
        <Route exact path={`${path}/integrations`} component={Transactions} />
        <Redirect from={`${path}`} to={`${path}/profile`} />
      </Switch>
    </React.Fragment>
  );
};
