import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AddNewExchangeList, ListMyExchanges } from "../../Exchanges";
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
      <ListMyExchanges enableEditing={true} />
      {/* <AddNewExchangeList/> */}
    </Scrollbox>
  );
};
