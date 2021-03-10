import { Button, Portal, Tab, Tabs, ThemeProvider } from "@material-ui/core";

import React, { useEffect, useState } from "react";
import { CustomFlexCard, FlexCard, GrowFromZero } from "../AlgonexStyles";
import { theme } from "../AlgonexStyles/Theme";
import { Modal } from "../_components";
import { SettingsWrapper } from "./Styles";

interface SettingsProps {}

export const Settings: React.FC<SettingsProps> = ({}) => {
  const [component, setComponent] = useState(null);

  const [value, setValue] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <SettingsWrapper>
        <CustomFlexCard style={{ maxWidth: "250px", flexShrink: 0 }}>
          <Tabs
            orientation="vertical"
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={(e, val) => {
              setValue(val);
            }}
          >
            <Tab
              label="Profile"
              onClick={() =>
                setComponent(<div style={{ background: "blue" }}>asdfasd</div>)
              }
            ></Tab>
            <Tab
              label="Integrations"
              onClick={() =>
                setComponent(<div style={{ background: "red" }}>asdfadsf</div>)
              }
            ></Tab>
            <Tab
              label="Holdings"
              onClick={() =>
                setComponent(
                  <div style={{ background: "green" }}>asdfasedfa</div>
                )
              }
            ></Tab>
          </Tabs>
        </CustomFlexCard>
        <FlexCard>{component}</FlexCard>
      </SettingsWrapper>
    </ThemeProvider>
  );
};
