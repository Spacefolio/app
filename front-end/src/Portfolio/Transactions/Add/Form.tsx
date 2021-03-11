import { Avatar, Typography, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  IIntegrationInfo,
  IExchangeAccountRequest,
} from "../../../../../types";
import { StyledFormRow } from "../../../AlgonexStyles";

import { exchangeActions } from "../../../_actions";

interface IAddTransactionFormProps {}

export const AddTransactionForm: React.FC<IAddTransactionFormProps> = ({}) => {
  const dispatch = useDispatch();

  const [submitted, setSubmitted] = useState(false);

  const [integrationId, setExchangeType] = useState(""); 
  const [apiKey, setApiKey] = useState("");

  const [apiSecret, setApiSecret] = useState("");

  const [passphrase, setPassphrase] = useState("");

  const [privateKey, setPrivateKey] = useState("");

  const [login, setLogin] = useState("");

  const [token, setToken] = useState("");

  const [uid, setUid] = useState("");

  const [walletAddress, setWalletAddress] = useState("");

  const [name, setName] = useState("");

  const [nickname, setNickname] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off" id="add-exchange-form">
      <StyledFormRow
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
        }}
      ></StyledFormRow>
      <StyledFormRow>
        <TextField
          variant="outlined"
          id="nickname"
          fullWidth
          label="Nickname"
          value={nickname}
          type="text"
          onChange={(e) => setNickname(e.target.value)}
        />
      </StyledFormRow>

      <StyledFormRow>
        <TextField
          variant="outlined"
          required
          id="apikey"
          fullWidth
          label="API Key"
          value={apiKey}
          type="text"
          onChange={(e) => setApiKey(e.target.value)}
        />
      </StyledFormRow>

      <StyledFormRow>
        <TextField
          variant="outlined"
          required
          id="apisecret"
          fullWidth
          label="API Seccret"
          type="text"
          onChange={(e) => setApiSecret(e.target.value)}
          value={apiSecret}
        />
      </StyledFormRow>

      <StyledFormRow>
        <TextField
          variant="outlined"
          required
          id="passphrase"
          fullWidth
          label="Passphrase"
          value={passphrase}
          type="text"
          onChange={(e) => setPassphrase(e.target.value)}
        />
      </StyledFormRow>

      <StyledFormRow>
        <TextField
          variant="outlined"
          required
          id="privateKey"
          fullWidth
          label="Private Key"
          value={privateKey}
          type="text"
          onChange={(e) => setPrivateKey(e.target.value)}
        />
      </StyledFormRow>

      <StyledFormRow>
        <TextField
          variant="outlined"
          required
          id="login"
          fullWidth
          label="Login"
          value={login}
          type="text"
          onChange={(e) => setLogin(e.target.value)}
        />
      </StyledFormRow>

      <StyledFormRow>
        <TextField
          variant="outlined"
          required
          id="token"
          fullWidth
          label="Token"
          value={token}
          type="text"
          onChange={(e) => setToken(e.target.value)}
        />
      </StyledFormRow>

      <StyledFormRow>
        <TextField
          variant="outlined"
          required
          id="uid"
          fullWidth
          label="User ID"
          value={uid}
          type="text"
          onChange={(e) => setUid(e.target.value)}
        />
      </StyledFormRow>

      <StyledFormRow>
        <TextField
          variant="outlined"
          required
          id="walletAddress"
          fullWidth
          label="WalletAddress"
          value={walletAddress}
          type="text"
          onChange={(e) => setWalletAddress(e.target.value)}
        />
      </StyledFormRow>
    </form>
  );
};
