import React, { useEffect, useState } from "react";
import { exchangeActions } from "../../_actions";
import {
  exchangeType,
  IExchangeAccountView,
  IExchangeAccountRequest,
} from "../../../../types";
import { useDispatch, useSelector } from "react-redux";
import { BigWideButton, ScrollBox, StyledFormRow } from "../../AlgonexStyles";
import {
  makeStyles,
  Theme,
  createStyles,
  TextField,
  Avatar,
  Typography,
} from "@material-ui/core";

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

  const [submitted, setSubmitted] = useState(false);

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

  const handleUpdate = (e: any) => {
    e.preventDefault();
    setSubmitted(true);
    if (
      apiKey &&
      apiSecret &&
      passphrase &&
      nickname &&
      nickname.length <= nicknameCharLimit
    ) {
      dispatch(exchangeActions.update(exchange, exchangeAccountData.id));
    }
  };

  return (
    <ScrollBox>
      <form onSubmit={handleUpdate} autoComplete="off">
        <StyledFormRow
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          <Avatar src={exchangeAccountData.logoUrl} />
          <Typography variant="h6">{name}</Typography>
        </StyledFormRow>

        <StyledFormRow>
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
        </StyledFormRow>

        <StyledFormRow>
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
        </StyledFormRow>

        <StyledFormRow>
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
        </StyledFormRow>

        <StyledFormRow>
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
        </StyledFormRow>

        <BigWideButton type="submit">
          {addingExchange ? "Updating..." : "Update"}
        </BigWideButton>
      </form>
    </ScrollBox>
  );
};
