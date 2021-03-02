import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ManageExchanges } from "../../Exchanges";
import { BaseButton, BaseText } from "../../GlobalStyles";
import { Modal } from "../../_components";
import { Scrollbox } from "../../GlobalStyles";
import { IRootState } from "../../_reducers";
import { Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";

interface ExchangeSidebarFilterProps {}

export const ExchangeSidebarFilter: React.FC<ExchangeSidebarFilterProps> = ({}) => {
  const exchangeData = useSelector(
    (state: IRootState) => state.exchanges.exchanges
  );

  const [addExchangeVisible, setAddExchangeVisible] = useState(false);

  return (
    <Scrollbox>
      <h1>My Exchanges</h1>
      <ManageExchanges myExchanges={true} addExchange={false} />
      <Fab
        style={{ position: "absolute", bottom: ".5rem", right: ".5rem" }}
        color="primary"
        aria-label="add"
        onClick={() => setAddExchangeVisible(true)}
      >
        <Add />
      </Fab>
      <Modal dismiss={setAddExchangeVisible} visible={addExchangeVisible}>
        <ManageExchanges
          headerText={"Add New Exchange"}
          myExchanges={false}
          addExchange={true}
        />
      </Modal>
    </Scrollbox>
  );
};
