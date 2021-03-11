import React, { useEffect, useState } from "react";
import { exchangeActions } from "../../_actions";
import {
  IExchangeAccountRequest,
  IExchangeAccountView,
  IIntegrationInfo,
} from "../../../../types";
import { useDispatch, useSelector } from "react-redux";
import { BigWideButton } from "../../AlgonexStyles";
import { ExchangeFormRow } from "../Forms/ExchangeFormStyles";
import { Avatar, TextField, Typography } from "@material-ui/core";

interface ExchangeFormProps {
  integrationInfo: IIntegrationInfo;
}

export const AddExchangeForm: React.FC<ExchangeFormProps> = ({
  integrationInfo,
}) => {
  const dispatch = useDispatch();

  const [submitted, setSubmitted] = useState(false);

  const [integrationId, setExchangeType] = useState(integrationInfo.id);

  const [apiKey, setApiKey] = useState("");

  const [apiSecret, setApiSecret] = useState("");

  const [passphrase, setPassphrase] = useState("");

  const [name, setName] = useState(integrationInfo.name);

  const [nickname, setNickname] = useState(integrationInfo.name);

  const [exchange, setExchange] = useState<IExchangeAccountRequest>({
    exchangeType: integrationId,
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
      exchangeType: integrationId,
      apiInfo: {
        apiKey,
        apiSecret,
        passphrase,
      },
      name,
      nickname,
    });
  }, [integrationId, apiKey, apiSecret, passphrase, name, nickname]);

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
    <form onSubmit={handleSubmit} autoComplete="off" id="add-exchange-form">
      <ExchangeFormRow
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        <Avatar src={integrationInfo.logoUrl} />
        <Typography>{name}</Typography>
      </ExchangeFormRow>
      <ExchangeFormRow>
        <TextField
          variant="outlined"
          id="nickname"
          fullWidth
          label="Nickname"
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
          variant="outlined"
          required
          id="apikey"
          fullWidth
          label="API Key"
          value={apiKey}
          type="text"
          onChange={(e) => setApiKey(e.target.value)}
          helperText={submitted && !apiKey && "First Name is Required."}
        />
      </ExchangeFormRow>
      <ExchangeFormRow>
        <TextField
          variant="outlined"
          required
          id="apisecret"
          fullWidth
          label="API Seccret"
          type="text"
          onChange={(e) => setApiSecret(e.target.value)}
          helperText={submitted && !apiSecret && "First Name is Required."}
          value={apiSecret}
        />
      </ExchangeFormRow>
      <ExchangeFormRow>
        <TextField
          variant="outlined"
          required
          id="passphrase"
          fullWidth
          label="Passphrase"
          value={passphrase}
          type="text"
          onChange={(e) => setPassphrase(e.target.value)}
          helperText={submitted && !passphrase && "First Name is Required."}
        />
      </ExchangeFormRow>
    </form>
  );
};
