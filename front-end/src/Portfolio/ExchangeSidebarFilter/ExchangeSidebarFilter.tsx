import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ManageExchanges } from "../../Exchanges";
import { Button, Modal } from "../../_components";
import { Scrollbox } from "../../_components/Scrollbox/Scrollbox";
import { IRootState } from "../../_reducers";

interface ExchangeSidebarFilterProps {
  
}

export const ExchangeSidebarFilter: React.FC<ExchangeSidebarFilterProps> = ({}) => {
  const exchangeData = useSelector(
    (state: IRootState) => state.exchanges.exchanges
  );

const [addExchangeVisible, setAddExchangeVisible] = useState(false);

  return (
    <Scrollbox>
      <ManageExchanges headerText={"Exchanges"} myExchanges={true} addExchange={false} />
      <Button onClick={() => setAddExchangeVisible(true)}>
        Add Exchange 
      </Button>
      <Modal dismiss={setAddExchangeVisible} visible={addExchangeVisible}>
        <ManageExchanges headerText={"Add New Exchange"} myExchanges={false} addExchange={true} />
      </Modal>
    </Scrollbox>
  );
};
