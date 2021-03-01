import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ManageExchanges } from "../../Exchanges";
import { BaseButton, BaseText } from "../../GlobalStyles";
import { Modal } from "../../_components";
import { Scrollbox } from "../../GlobalStyles";
import { IRootState } from "../../_reducers";

interface ExchangeSidebarFilterProps {}

export const ExchangeSidebarFilter: React.FC<ExchangeSidebarFilterProps> = ({}) => {
  const exchangeData = useSelector(
    (state: IRootState) => state.exchanges.exchanges
  );

  const [addExchangeVisible, setAddExchangeVisible] = useState(false);
  const [portfolioID, setPortfolioID] = useState("All PORTFOLIOS");

  return (
    <Scrollbox>
      <BaseButton onClick={() => setAddExchangeVisible(true)}>
        Add Exchange
      </BaseButton>
      <ManageExchanges myExchanges={true} addExchange={false} />

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
