import React, { useState } from "react";
import { DeleteButton, EditButton } from "../_components";
import { IExchangeAccount, IExchangeReference } from "../types/exchangeInterface";
import { Modal } from "../_components";
import { ExchangeForm } from "./ExchangeForm";
import { exchangeActions } from "../_actions";
import { useDispatch, useSelector } from "react-redux";

interface ExchangeItemProps {
  data: IExchangeAccount;
}

export const ExchangeItem: React.FC<ExchangeItemProps> = ({ data }) => {
  const [editExchangeVisible, setEditExchangeVisible] = useState(false);

  const exchangeRef = useSelector((state: any) => state.exchanges.exchangeRef)

  const dispatch = useDispatch();

  const getLogoUrl = () =>{
    const targetRef = exchangeRef.filter((refItem: IExchangeReference) =>{
      return refItem.id === data.exchangeType
    })[0]
    console.log(targetRef);
    return targetRef.logoUrl
  }
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
      <img height="25px" width="25px" src={getLogoUrl()}></img>
      <div>{data.nickname}</div>
      <DeleteButton
        right="0px"
        clickAction={() => {
          dispatch(exchangeActions.delete(data.id));
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
