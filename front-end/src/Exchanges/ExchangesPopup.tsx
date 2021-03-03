import React, { useEffect, useState } from "react";
import { exchangeActions, portfolioActions } from "../_actions";
import { AddExchangeForm, EditExchangeForm, ExchangeItem } from "../Exchanges";
import { IExchangeAccountView, IExchangeReference } from "../../../types";

import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../_reducers";
import {
  AddExchangeGrid,
  AddExchangeItem,
  AddExchangeWrapper,
  ExchangeSearchBar,
  MyExchangeNameWrapper,
  MyExchangesLineItemContainer,
  MyExchangesListContainer,
  MyExchangeWrapper,
} from "./ExchangeStyles";

import { ClickableDiv } from "../GlobalStyles";
import { Modal } from "../_components";
import { Avatar, ListItemAvatar, Typography } from "@material-ui/core";
import { AccountBalanceWallet } from "@material-ui/icons";

export function AddNewExchangeList() {
  const exchangeRef = useSelector((state: any) => state.exchanges.exchangeRef);
  const [searchFilter, setSearchFilter] = useState("");
  const [addExchangeVisible, setAddExchangeVisible] = useState(false);
  const [addExchangeData, setAddExchangeData] = useState<IExchangeReference>(
    null
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(exchangeActions.getRef());
  }, []);

  return (
    <AddExchangeWrapper>
      <ExchangeSearchBar
        name="search"
        type="text"
        autoComplete={"off"}
        placeholder="search"
        value={searchFilter}
        onChange={(e: any) => setSearchFilter(e.target.value)}
      />
      <AddExchangeGrid>
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
                <AddExchangeItem
                  key={item.id}
                  onClick={() => {
                    setAddExchangeVisible(true);
                    setAddExchangeData(item);
                  }}
                >
                  <Avatar src={item.logoUrl} />
                  <Typography variant={"button"}>{item.name}</Typography>
                </AddExchangeItem>
              );
            })}
      </AddExchangeGrid>

      <Modal
        visible={addExchangeVisible}
        dismiss={() => setAddExchangeVisible(false)}
      >
        <AddExchangeForm exchangeRefInfo={addExchangeData} />
      </Modal>
    </AddExchangeWrapper>
  );
}

interface IListMyExchangesProps {
  enableEditing: boolean;
}

export const ListMyExchanges: React.FC<IListMyExchangesProps> = ({
  enableEditing,
}) => {
  useEffect(() => {
    dispatch(exchangeActions.getAll());
    dispatch(exchangeActions.getRef());
  }, []);
  const loadingExchanges = useSelector((state: any) => state.exchanges.loading);
  const userLinkedExchanges: IExchangeAccountView[] = useSelector(
    (state: IRootState) => state.exchanges.exchanges
  );
  const portfolioFilterID = useSelector(
    (state: IRootState) => state.portfolio.filterId
  );
  const dispatch = useDispatch();
  return (
    <MyExchangesListContainer>
      <MyExchangesLineItemContainer
        button={true}
        selected={portfolioFilterID == ""}
        key={"AllAssets"}
        onClick={() => dispatch(portfolioActions.FilterPortfolio(""))}
      >
        <ListItemAvatar>
          <Avatar>
            <AccountBalanceWallet />
          </Avatar>
        </ListItemAvatar>
        <MyExchangeNameWrapper>All Portfolios</MyExchangeNameWrapper>
      </MyExchangesLineItemContainer>
      {userLinkedExchanges.length != 0
        ? userLinkedExchanges.map((item: IExchangeAccountView) => {
            return (
              <ExchangeItem
                enableEditing={enableEditing}
                key={item.nickname}
                data={item}
              />
            );
          })
        : "You have no linked accounts... You should add one above"}
    </MyExchangesListContainer>
  );
};
