import React, { useState } from "react";
import { DeleteButton, EditButton } from "../_components";
import { exchangeData } from "../types/exchangeInterface";
import { Modal } from "../_components";
import { ExchangeForm } from "./ExchangeForm";
import { exchangeService } from "../_services";

interface ExchangeItemProps {
  data: exchangeData;
}

const { delete: any } = exchangeService;

export const ExchangeItem: React.FC<ExchangeItemProps> = ({ data }) => {
  const [editExchangeVisible, setEditExchangeVisible] = useState(false);

  return (
    <div
      key={data.id}
      style={{
        padding: "10px 0px",
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
    >
      <img height="25px" width="25px" src={data.imageURL}></img>
      <div>{data.nickname}</div>
      <DeleteButton
        right="0px"
        clickAction={() => {
          delete data.id;
        }}
      />
      <Modal
        visible={editExchangeVisible}
        dismiss={() => setEditExchangeVisible(false)}
        children={<ExchangeForm formType={"edit"} data={data} />}
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
