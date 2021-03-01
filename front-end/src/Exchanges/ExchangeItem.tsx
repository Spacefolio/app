import React, { useEffect, useState } from "react";
import { DeleteIcon, EditIcon } from "../_components";
import { IExchangeAccountView, IExchangeReference } from "../../../types";
import { Modal } from "../_components";
import { EditExchangeForm } from "./Forms";
import { exchangeActions, portfolioActions } from "../_actions";
import { useDispatch, useSelector } from "react-redux";
import { STATES } from "mongoose";
import { IRootState } from "../_reducers";
import { TabItem } from "../Portfolio/portfolioStyles";
import {
  DeleteButtonContainer,
  EditButtonContainer,
  MyExchangeEditAreaWrapper,
  MyExchangeNameWrapper,
  MyExchangesLineItemContainer,
  MyExchangeSvgWrapper,
} from "./ExchangeStyles";

interface ExchangeItemProps {
  data: IExchangeAccountView;
}

export const ExchangeItem: React.FC<ExchangeItemProps> = ({ data }) => {
  const dispatch = useDispatch();

  const [logoUrl, setLogoUrl] = useState("");
  const [editExchangeVisible, setEditExchangeVisible] = useState(false);
  const exchangeRef = useSelector(
    (state: IRootState) => state.exchanges.exchangeRef
  );
  const [hoverShowEdit, setHoverShowEdit] = useState(false);
  const portfolioFilterID = useSelector(
    (state: IRootState) => state.portfolio.filterId
  );

  useEffect(() => {
    const targetRef: IExchangeReference = exchangeRef.filter(
      (refItem: IExchangeReference) => {
        return refItem.id === data.exchangeType;
      }
    )[0];

    targetRef ? setLogoUrl(targetRef.logoUrl) : null;
  }, []);

  const DeleteButtonSection = (
    <DeleteButtonContainer
      onClick={() => {
        dispatch(exchangeActions.delete(data.id));
      }}
    >
      <DeleteIcon />
    </DeleteButtonContainer>
  );

  const EditButtonSection = (
    <EditButtonContainer
      onClick={() => {
        setEditExchangeVisible(true);
      }}
    >
      <EditIcon />
    </EditButtonContainer>
  );

  return (
    <MyExchangesLineItemContainer
      key={data.id}
      selected={portfolioFilterID == data.id}
      onPointerEnter={() => setHoverShowEdit(true)}
      onPointerLeave={() => setHoverShowEdit(false)}
      onClick={() => dispatch(portfolioActions.FilterPortfolio(data.id))}
    >
      <MyExchangeNameWrapper>
        <img height="25px" width="25px" src={logoUrl}></img>
        {data.nickname}
      </MyExchangeNameWrapper>

      {hoverShowEdit && (
        <>
          {EditButtonSection}
          {DeleteButtonSection}
        </>
      )}

      <Modal
        visible={editExchangeVisible}
        dismiss={() => setEditExchangeVisible(false)}
        children={<EditExchangeForm exchangeAccountData={data} />}
      />
    </MyExchangesLineItemContainer>
  );
};
