import React, { useEffect, useState } from "react";
import { DeleteButton, EditButton } from "../_components";
import {
  IExchangeAccount,
  IExchangeReference,
} from "../types/exchangeInterface";
import { Modal } from "../_components";
import { EditExchangeForm } from "./EditExchangeForm";
import { exchangeActions } from "../_actions";
import { useDispatch, useSelector } from "react-redux";

interface ExchangeItemProps {
  data: IExchangeAccount;
}

export const ExchangeItem: React.FC<ExchangeItemProps> = ({ data }) => {
  const dispatch = useDispatch();

  const [logoUrl, setLogoUrl] = useState("");
  const [editExchangeVisible, setEditExchangeVisible] = useState(false);
  const exchangeRef = useSelector((state: any) => state.exchanges.exchangeRef);

  useEffect(() => {
    const targetRef: IExchangeReference = exchangeRef.filter(
      (refItem: IExchangeReference) => {
        return refItem.id === data.exchangeType;
      }
    )[0];

    setLogoUrl(targetRef.logoUrl);
  }, []);

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
      <img height="25px" width="25px" src={logoUrl}></img>
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
        children={<EditExchangeForm exchangeAccountData={data} />}
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
