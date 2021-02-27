import React, { useEffect, useState } from "react";
import { exchangeActions } from "../../_actions";
import {
  exchangeType,
  IExchangeAccountView,
  IExchangeAccountRequest,
} from "../../../../types";
import { useDispatch, useSelector } from "react-redux";
import { BasicButton } from "../../GlobalStyles";
import {
  ExchangeFormContainer,
  ExchangeFormInput,
  ExchangeFormLabel,
  ExchangeFormRow,
} from "./ExchangeFormStyles";

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

  return (
    <ExchangeFormContainer>
      <h1>Edit Exchange Info</h1>

      <ExchangeFormRow>
        <div>
          {name}
          <img src={exchangeAccountData.logoUrl} />
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

      <BasicButton onClick={() => handleUpdate()}>
        {addingExchange ? "Updating..." : "Update"}
      </BasicButton>
    </ExchangeFormContainer>
  );
};
