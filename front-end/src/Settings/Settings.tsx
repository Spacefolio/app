import { Button, Portal, Tab, Tabs } from "@material-ui/core";

import React, { useEffect, useState } from "react";
import { FlexCard, GrowFromZero } from "../AlgonexStyles";
import { Modal } from "../_components";

interface SettingsProps {}

export const Settings: React.FC<SettingsProps> = ({}) => {
  const [component, setComponent] = useState(null);

  return (
    <GrowFromZero in={true}>
      <React.Fragment>
        <FlexCard>
          <Tabs>
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
        </FlexCard>
        <FlexCard>{component}</FlexCard>
      </React.Fragment>
    </GrowFromZero>
  );
};
