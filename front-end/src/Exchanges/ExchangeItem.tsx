import React, { useEffect, useState } from "react";
import { DeleteButton, EditButton } from "../_components";
import {
  IExchangeAccountView,
  IExchangeReference,
} from "../../../types";
import { Modal } from "../_components";
import { EditExchangeForm } from "./EditExchangeForm";
import { exchangeActions } from "../_actions";
import { useDispatch, useSelector } from "react-redux";

interface ExchangeItemProps {
  data: IExchangeAccountView;
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

    targetRef? setLogoUrl(targetRef.logoUrl):null;
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
      <div
        onClick={() => {
          dispatch(exchangeActions.delete(data.id));
        }}
        style={{width: "1.5em",position: "absolute", right: "0px" }}
      >
        <DeleteButton />
      </div>
      <Modal
        visible={editExchangeVisible}
        dismiss={() => setEditExchangeVisible(false)}
        children={<EditExchangeForm exchangeAccountData={data} />}
      />
      <div
        onClick={() => {
          setEditExchangeVisible(true);
        }}
        style={{width: "1.5em",position: "absolute", right: "30px" }}
      >
        <EditButton />
      </div>
    </div>
  );
};
