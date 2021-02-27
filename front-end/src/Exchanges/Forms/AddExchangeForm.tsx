import React, { useEffect, useState } from "react";
import { exchangeActions } from "../../_actions";
import {
  IExchangeAccountRequest,
  IExchangeAccountView,
  IExchangeReference,
} from "../../../../types";
import { useDispatch, useSelector } from "react-redux";
import { BasicButton } from "../../GlobalStyles";
import {
  ExchangeFormContainer,
  ExchangeFormRow,
  ExchangeFormLabel,
  ExchangeFormInput,
} from "./ExchangeFormStyles";

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
        <ExchangeFormLabel>NICKNAME</ExchangeFormLabel>
        <ExchangeFormInput
          name="nickname"
          onChange={(e) => setNickname(e.target.value)}
          type="text"
          value={nickname}
        />
      </ExchangeFormRow>
      <ExchangeFormRow>
        <ExchangeFormLabel>API KEY</ExchangeFormLabel>
        <ExchangeFormInput
          name="apiKey"
          onChange={(e) => setApiKey(e.target.value)}
          type="text"
          value={apiKey}
        />
      </ExchangeFormRow>
      <ExchangeFormRow>
        <ExchangeFormLabel>API SECRET</ExchangeFormLabel>
        <ExchangeFormInput
          name="apiSecret"
          onChange={(e) => setApiSecret(e.target.value)}
          type="text"
          value={apiSecret}
        />
      </ExchangeFormRow>
      <ExchangeFormRow>
        <ExchangeFormLabel>PASSPHRASE</ExchangeFormLabel>
        <ExchangeFormInput
          name="passphrase"
          onChange={(e) => setPassphrase(e.target.value)}
          type="text"
          value={passphrase}
        />
      </ExchangeFormRow>

      <BasicButton onClick={() => handleSubmit()}>
        {addingExchange ? "Submitting..." : "Submit"}
      </BasicButton>
    </ExchangeFormContainer>
  );
};
