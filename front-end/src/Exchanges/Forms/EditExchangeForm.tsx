import React, { useEffect, useState } from "react";
import { exchangeActions } from "../../_actions";
import {
  exchangeType,
  IExchangeAccountView,
  IExchangeAccountRequest,
} from "../../../../types";
import { useDispatch, useSelector } from "react-redux";
import { BaseButton } from "../../GlobalStyles";
import {
  ExchangeFormContainer,
  ExchangeFormRow,
} from "./ExchangeFormStyles";
import { makeStyles, Theme, createStyles, TextField } from "@material-ui/core";

interface ExchangeFormProps {
  exchangeAccountData: IExchangeAccountView;
}

export const EditExchangeForm: React.FC<ExchangeFormProps> = ({
  exchangeAccountData,
}) => {
  const addingExchange = useSelector(
    (state: any) => state.exchanges.addingExchange
  );
  const dispatch = useDispatch();

  const [exchangeType, setExchangeType] = useState(
    exchangeAccountData.exchangeType
  );
  const [apiKey, setApiKey] = useState(exchangeAccountData.apiInfo.apiKey);
  const [apiSecret, setApiSecret] = useState(
    exchangeAccountData.apiInfo.apiSecret
  );
  const [passphrase, setPassphrase] = useState(
    exchangeAccountData.apiInfo.passphrase
  );
  const [name, setName] = useState(exchangeAccountData.name);
  const [nickname, setNickname] = useState(exchangeAccountData.nickname);
  const [exchange, setExchange] = useState<IExchangeAccountRequest>({
    exchangeType,
    apiInfo: {
      apiKey,
      apiSecret,
      passphrase,
    },
    name,
    nickname,
  });

  useEffect(() => {
    setExchange({
      exchangeType,
      apiInfo: {
        apiKey,
        apiSecret,
        passphrase,
      },
      name,
      nickname,
    });
  }, [exchangeType, apiKey, apiSecret, passphrase, name, nickname]);

  const handleUpdate = () => {
    dispatch(exchangeActions.update(exchange, exchangeAccountData.id));
  };

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        "& > *": {
          margin: theme.spacing(1),
          width: "25ch",
        },
      },
    })
  );

  const classes = useStyles();

  return (
    <ExchangeFormContainer
      className={classes.root}
      noValidate
      autoComplete="off"
    >
      <h1>Edit Exchange Info</h1>

      <ExchangeFormRow>
        <TextField
          id="filled-basic"
          label="NICKNAME"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </ExchangeFormRow>
      <ExchangeFormRow>
        <TextField
          required
          id="filled-basic"
          label="API KEY"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
      </ExchangeFormRow>
      <ExchangeFormRow>
        <TextField
          required
          id="filled-basic"
          label="API SECRET"
          onChange={(e) => setApiSecret(e.target.value)}
          value={apiSecret}
        />
      </ExchangeFormRow>
      <ExchangeFormRow>
        <TextField
          required
          id="filled-basic"
          label="PASSPHRASE"
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
        />
      </ExchangeFormRow>

      <BaseButton onClick={() => handleUpdate()}>
        {addingExchange ? "Updating..." : "Update"}
      </BaseButton>
    </ExchangeFormContainer>
  );
};
