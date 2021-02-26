import React, { useEffect, useState } from "react";
import "./ExchangeForm.scss";
import { exchangeActions } from "../../_actions";
import {
  IExchangeAccountRequest,
  IExchangeAccountView,
  IExchangeReference,
} from "../../../../types";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../_components";

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
    <form className="add-exchange-form">
      <div>
        <h1>Add New Exchange</h1>
      </div>
      <div className="add-exchange-data-row">
        <div>
          {name}
          <img src={exchangeRefInfo.logoUrl} />
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
        <Button onClick={() => handleSubmit()}>
            {addingExchange ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};
