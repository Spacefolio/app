import React, { useEffect, useState } from "react";
import "./ExchangeForm.scss";
import { exchangeActions } from "../../_actions";
import {
  exchangeType,
  IExchangeAccountView,
  IExchangeAccountRequest,
} from "../../../../types";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../_components";

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
    <form className="add-exchange-form">
      <div>
        <h1>Edit Exchange Info</h1>
      </div>
      <div className="add-exchange-data-row">
        <div>
          {name}
          <img src={exchangeAccountData.logoUrl} />
        </div>
      </div>
      <div className="add-exchange-data-row">
        <label className="add-exchange-row-label">NICKNAME</label>
        <input
          name="nickname"
          onChange={(e) => setNickname(e.target.value)}
          type="text"
          value={nickname}
          className="add-exchange-row-input"
        />
      </div>
      <div className="add-exchange-data-row">
        <label className="add-exchange-row-label">API KEY</label>
        <input
          name="apiKey"
          onChange={(e) => setApiKey(e.target.value)}
          type="text"
          value={apiKey}
          className="add-exchange-row-input"
        />
      </div>
      <div className="add-exchange-data-row">
        <label className="add-exchange-row-label">API SECRET</label>
        <input
          name="apiSecret"
          onChange={(e) => setApiSecret(e.target.value)}
          type="text"
          value={apiSecret}
          className="add-exchange-row-input"
        />
      </div>
      <div className="add-exchange-data-row">
        <label className="add-exchange-row-label">PASSPHRASE</label>
        <input
          name="passphrase"
          onChange={(e) => setPassphrase(e.target.value)}
          type="text"
          value={passphrase}
          className="add-exchange-row-input"
        />
      </div>
      <div>
        <Button onClick={() => handleUpdate()}>
          {addingExchange ? "Updating..." : "Update"}
        </Button>
      </div>
    </form>
  );
};
