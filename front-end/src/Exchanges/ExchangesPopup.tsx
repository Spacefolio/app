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

import { ClickableDiv } from "../AlgonexStyles";
import { Modal } from "../_components";
import {
  Avatar,
  createStyles,
  ListItemAvatar,
  makeStyles,
  MenuItem,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { AccountBalanceWallet, Add } from "@material-ui/icons";
import { useHistory } from "react-router";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import { COLORS } from "../AlgonexStyles/ResponsiveDesign";

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

  const [addExchangeVisible, setAddExchangeVisible] = useState(false);

  const history = useHistory();

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      blend: {
        color: COLORS.darkBase,
        backgroundColor: "white",
        border: `${COLORS.darkBase} solid 2px`,
      },
    })
  );

  const classes = useStyles();

  return (
    <React.Fragment>
      <MenuItem
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
      </MenuItem>
      {userLinkedExchanges.length != 0 &&
        userLinkedExchanges.map((item: IExchangeAccountView) => {
          return (
            <ExchangeItem
              enableEditing={enableEditing}
              key={item.nickname}
              data={item}
            />
          );
        })}
      <MenuItem
        button={true}
        key={"AddExchange"}
        onClick={() => setAddExchangeVisible(true)}
      >
        <ListItemAvatar>
          <Avatar className={classes.blend}>
            <Add />
          </Avatar>
        </ListItemAvatar>
        <Typography>Add Exchange</Typography>
      </MenuItem>
    </React.Fragment>
  );
};
