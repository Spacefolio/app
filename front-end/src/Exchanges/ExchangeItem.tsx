import React, { useState } from "react";
import { DeleteButton, EditButton } from "../_components";
import { IExchangeAccount } from "../types/exchangeInterface";
import { Modal } from "../_components";
import { ExchangeForm } from "./ExchangeForm";
import { exchangeService } from "../_services";


interface ExchangeItemProps {
  data: IExchangeAccount;
}

export const ExchangeItem: React.FC<ExchangeItemProps> = ({ data }) => {
  const [editExchangeVisible, setEditExchangeVisible] = useState(false);

  return (
    <div
      key={data.exchangeType}
      style={{
        padding: "10px 0px",
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
    >
      <img height="25px" width="25px" src={data.logoUrl}></img>
      <div>{data.nickname}</div>
      <DeleteButton
        right="0px"
        clickAction={() => {
          exchangeService.delete(data.id);
        }}
      />
      <Modal
        visible={editExchangeVisible}
        dismiss={() => setEditExchangeVisible(false)}
        children={<ExchangeForm formType={"edit"} editData={data} />}
      />
      <EditButton
        right="30px"
        clickAction={() => {
          setEditExchangeVisible(true);
        }}
      />
    </div>
  );
};
