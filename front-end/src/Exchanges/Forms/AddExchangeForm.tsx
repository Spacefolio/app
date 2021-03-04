import React, { useEffect, useState } from "react";
import { exchangeActions } from "../../_actions";
import {
  IExchangeAccountRequest,
  IExchangeAccountView,
  IExchangeReference,
} from "../../../../types";
import { useDispatch, useSelector } from "react-redux";
import { BaseButton } from "../../GlobalStyles";
import { ExchangeForm, ExchangeFormRow } from "./ExchangeFormStyles";
import { Avatar, TextField, Typography } from "@material-ui/core";

interface ExchangeFormProps {
  exchangeRefInfo: IExchangeReference;
}

export const AddExchangeForm: React.FC<ExchangeFormProps> = ({
  exchangeRefInfo,
}) => {
  const addingExchange = useSelector(
    (state: any) => state.exchanges.addingExchange
  );
  const dispatch = useDispatch();

  const [submitted, setSubmitted] = useState(false);

  const [exchangeType, setExchangeType] = useState(exchangeRefInfo.id);

  const [apiKey, setApiKey] = useState("");

  const [apiSecret, setApiSecret] = useState("");

  const [passphrase, setPassphrase] = useState("");

  const [name, setName] = useState(exchangeRefInfo.name);

  const [nickname, setNickname] = useState(exchangeRefInfo.name);

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

  const nicknameCharLimit = 20;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);

    if (
      apiKey &&
      apiSecret &&
      passphrase &&
      nickname &&
      nickname.length <= nicknameCharLimit
    ) {
      dispatch(exchangeActions.addNew(exchange));
    }
  };

  return (
    <ExchangeForm onSubmit={handleSubmit} autoComplete="off">
      <Typography
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        variant="h6"
      >
        Add Integration
      </Typography>

      <ExchangeFormRow
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        <Avatar src={exchangeRefInfo.logoUrl} />
        <Typography variant="h6">{name}</Typography>
      </ExchangeFormRow>
      <ExchangeFormRow>
        <TextField
          id="nickname"
          fullWidth
          label="NICKNAME"
          value={nickname}
          type="text"
          onChange={(e) => setNickname(e.target.value)}
          helperText={
            nickname.length > nicknameCharLimit &&
            `${nickname.length - nicknameCharLimit} too many characters`
          }
        />
      </ExchangeFormRow>
      <ExchangeFormRow>
        <TextField
          required
          id="apikey"
          fullWidth
          label="API KEY"
          value={apiKey}
          type="text"
          onChange={(e) => setApiKey(e.target.value)}
          helperText={submitted && !apiKey && "First Name is Required."}
        />
      </ExchangeFormRow>
      <ExchangeFormRow>
        <TextField
          required
          id="apisecret"
          fullWidth
          label="API SECRET"
          type="text"
          onChange={(e) => setApiSecret(e.target.value)}
          helperText={submitted && !apiSecret && "First Name is Required."}
          value={apiSecret}
        />
      </ExchangeFormRow>
      <ExchangeFormRow>
        <TextField
          required
          id="passphrase"
          fullWidth
          label="PASSPHRASE"
          value={passphrase}
          type="text"
          onChange={(e) => setPassphrase(e.target.value)}
          helperText={submitted && !passphrase && "First Name is Required."}
        />
      </ExchangeFormRow>
      <BaseButton type="submit">
        {addingExchange ? "Submitting..." : "Submit"}
      </BaseButton>
    </ExchangeForm>
  );
};
