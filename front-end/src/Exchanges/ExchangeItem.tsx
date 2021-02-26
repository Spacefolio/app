import React, { useEffect, useState } from "react";
import { DeleteButton, EditButton } from "../_components";
import { IExchangeAccountView, IExchangeReference } from "../../../types";
import { Modal } from "../_components";
import { EditExchangeForm } from "./Forms";
import { exchangeActions, portfolioActions } from "../_actions";
import { useDispatch, useSelector } from "react-redux";
import { STATES } from "mongoose";
import { IRootState } from "../_reducers";
import { TabItem } from "../Portfolio/portfolioStyles";

interface ExchangeItemProps {
  data: IExchangeAccountView;
}

export const ExchangeItem: React.FC<ExchangeItemProps> = ({ data }) => {
  const dispatch = useDispatch();

  const [logoUrl, setLogoUrl] = useState("");
  const [editExchangeVisible, setEditExchangeVisible] = useState(false);
  const exchangeRef = useSelector((state: IRootState) => state.exchanges.exchangeRef);
  const [hoverShowEdit, setHoverShowEdit] = useState(false);
  const portfolioFilterID = useSelector((state: IRootState) => state.portfolio.filterId)

  useEffect(() => {
    const targetRef: IExchangeReference = exchangeRef.filter(
      (refItem: IExchangeReference) => {
        return refItem.id === data.exchangeType;
      }
    )[0];

    targetRef ? setLogoUrl(targetRef.logoUrl) : null;
  }, []);

  const DeleteButtonSection = (
    <div
      onClick={() => {
        dispatch(exchangeActions.delete(data.id));
      }}
      style={{ width: "1.2em" }}
    >
      <DeleteButton />
    </div>
  );

  const EditButtonSection = (
    <div
      onClick={() => {
        setEditExchangeVisible(true);
      }}
      style={{ width: "1.2em" }}
    >
      <EditButton />
    </div>
  );

  return (
    <div
      key={data.id}
      style={{
        width: "100%",
        padding: "10px 0px",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderLeft: (portfolioFilterID == data.id? '3px solid var(--primary-base)': '')
      }}
      onPointerEnter={() => setHoverShowEdit(true)}
      onPointerLeave={() => setHoverShowEdit(false)}
      onClick={() => dispatch(portfolioActions.FilterPortfolio(data.id))}
    >
      <div
        style={{
          padding: "10px 0px",
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img height="25px" width="25px" src={logoUrl}></img>
        <div>{data.nickname}</div>
      </div>

      {hoverShowEdit ? (
        <div
          style={{
            display: "flex",
            padding: "5px",
            justifyContent: "space-evenly",
          }}
        >
          {EditButtonSection}
          {DeleteButtonSection}
        </div>
      ) : null}

      <Modal
        visible={editExchangeVisible}
        dismiss={() => setEditExchangeVisible(false)}
        children={<EditExchangeForm exchangeAccountData={data} />}
      />
    </div>
  );
};
