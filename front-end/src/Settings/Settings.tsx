import { Button, Portal, Tab, Tabs, ThemeProvider } from "@material-ui/core";

import React, { useEffect, useState } from "react";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
} from "react-router";
import { CustomFlexCard, FlexCard, GrowFromZero } from "../AlgonexStyles";
import { theme } from "../AlgonexStyles/Theme";
import { StyledTabs, StyledTab } from "../Portfolio/Styles";
import { Modal } from "../_components";
import { SettingsWrapper } from "./Styles";

interface SettingsProps {}

export const Settings: React.FC<SettingsProps> = ({}) => {
  const [value, setValue] = useState(0);

  const history = useHistory();

  const location = useLocation();

  const path = "/settings";

  useEffect(() => {
    if (location.pathname == path) {
      history.push(`${path}/profile`);
    }
  }, []);

  const SettingsTabs = (
    <StyledTabs
      value={value}
      indicatorColor="primary"
      onChange={(e, val) => {
        setValue(val);
      }}
    >
      <StyledTab
        label="Profile"
        onClick={() => history.push(`${path}/profile`)}
      ></StyledTab>
      <StyledTab
        label="Integrations"
        onClick={() => history.push(`${path}/integrations`)}
      ></StyledTab>
      <StyledTab
        label="Holdings"
        onClick={() => history.push(`${path}/holdings`)}
      ></StyledTab>
    </StyledTabs>
  );
  return (
    <ThemeProvider theme={theme}>
      <SettingsWrapper>
        <CustomFlexCard>{SettingsTabs}</CustomFlexCard>
        <FlexCard>
          <Switch>
            <Route exact path={`${path}/profile`}>
              <div>sadl;kfja</div>
            </Route>
            <Route exact path={`${path}/integrations`}>
              <div>dfgh;kfja</div>
            </Route>
            <Route exact path={`${path}/holdings`}>
              <div>saasdfdl;kfja</div>
            </Route>
          </Switch>
        </FlexCard>
      </SettingsWrapper>
    </ThemeProvider>
  );
};
