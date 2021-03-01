import React, { useEffect, useState } from "react";
import { exchangeActions } from "../../_actions";
import {
  IExchangeAccountRequest,
  IExchangeAccountView,
  IExchangeReference,
} from "../../../../types";
import { useDispatch, useSelector } from "react-redux";
import { BaseButton } from "../../GlobalStyles";
import {
  ExchangeFormContainer,
  ExchangeFormRow,
} from "./ExchangeFormStyles";
import { TextField } from "@material-ui/core";

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

  const handleSubmit = () => {
    dispatch(exchangeActions.addNew(exchange));
  };

  return (
    <ExchangeFormContainer>
      <h1>Add New Exchange</h1>

      <ExchangeFormRow>
        <div>
          {name}
          <img src={exchangeRefInfo.logoUrl} />
        </div>
      </ExchangeFormRow>
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

      <BaseButton onClick={() => handleSubmit()}>
        {addingExchange ? "Submitting..." : "Submit"}
      </BaseButton>
    </ExchangeFormContainer>
  );
};
