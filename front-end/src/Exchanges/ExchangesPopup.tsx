import React, { useEffect, useState } from "react";
import { exchangeActions, portfolioActions } from "../_actions";
import { AddExchangeForm, EditExchangeForm, ExchangeItem } from "../Exchanges";
import { IExchangeAccountView, IExchangeReference } from "../../../types";
import { Modal } from "../_components";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../_reducers";
import { data } from "jquery";
import { PortfolioIcon } from "../_components/Icons";
import { off } from "process";
import {
  AddExchangeWrapper,
  ExchangeSearchBar,
  MyExchangeNameWrapper,
  MyExchangesLineItemContainer,
  MyExchangesListContainer,
  MyExchangeWrapper,
} from "./ExchangeStyles";
import { filter } from "d3";

interface ExchangesPopupProps {
  headerText?: string;
  myExchanges: boolean;
  addExchange: boolean;
}

export const ManageExchanges: React.FC<ExchangesPopupProps> = ({
  myExchanges,
  addExchange,
  headerText,
}) => {
  const dispatch = useDispatch();

  const loadingExchanges = useSelector((state: any) => state.exchanges.loading);
  const userLinkedExchanges = useSelector(
    (state: IRootState) => state.exchanges.exchanges
  );
  const exchangeRef = useSelector((state: any) => state.exchanges.exchangeRef);

  const [searchFilter, setSearchFilter] = useState("");
  const [addExchangeVisible, setAddExchangeVisible] = useState(false);
  const [addExchangeData, setAddExchangeData] = useState<IExchangeReference>(
    null
  );
  const portfolioFilterID = useSelector(
    (state: IRootState) => state.portfolio.filterId
  );

  useEffect(() => {
    dispatch(exchangeActions.getAll());
    dispatch(exchangeActions.getRef());
  }, []);

  const RenderExchangeItems = (
    <MyExchangesListContainer>
      <MyExchangesLineItemContainer
        selected={portfolioFilterID == ""}
        key={"AllAssets"}
        onClick={() => dispatch(portfolioActions.FilterPortfolio(""))}
      >
        <MyExchangeNameWrapper>
          <PortfolioIcon style={{ width: "25px", height: "25px" }} />
          <div>All Assets</div>
        </MyExchangeNameWrapper>
      </MyExchangesLineItemContainer>
      {userLinkedExchanges.length != 0
        ? userLinkedExchanges.map((item: IExchangeAccountView) => {
            return <ExchangeItem key={item.nickname} data={item} />;
          })
        : "You have no linked accounts... You should add one above"}
    </MyExchangesListContainer>
  );

  const AddExchange = (
    <AddExchangeWrapper>
      <div>
        <ExchangeSearchBar
          name="search"
          type="text"
          autoComplete={"off"}
          placeholder="search"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
        />
      </div>
      {exchangeRef &&
        exchangeRef
          .filter((item: IExchangeReference) => {
            if (searchFilter != "") {
              return item.name
                .toLowerCase()
                .startsWith(searchFilter.toLowerCase());
            } else return true;
          })
          .map((item: IExchangeReference) => {
            return (
              <div
                onClick={() => {
                  setAddExchangeVisible(true);
                  setAddExchangeData(item);
                }}
                key={item.id}
              >
                <img src={item.logoUrl} /> {item.name}
              </div>
            );
          })}
    </AddExchangeWrapper>
  );
  return (
    <div>
      <MyExchangeWrapper>
        <h1>{headerText}</h1>
      </MyExchangeWrapper>
      {myExchanges && RenderExchangeItems}
      <Modal
        dismiss={() => {
          setAddExchangeVisible(false);
        }}
        visible={addExchangeVisible}
      >
        <AddExchangeForm exchangeRefInfo={addExchangeData} />
      </Modal>
      {addExchange && AddExchange}
    </div>
  );
};
