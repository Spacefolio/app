import React, { useEffect, useState } from "react";
import "./ExchangeForm.scss";
import { exchangeActions } from "../_actions";
import {
  exchangeType,
  IExchangeAccount,
  IExchangeAccountRequest,
} from "../../../types";
import { useDispatch, useSelector } from "react-redux";

interface ExchangeFormProps {
  exchangeAccountData: IExchangeAccount;
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
  const [apiKey, setApiKey] = useState(exchangeAccountData.apiKey);
  const [apiSecret, setApiSecret] = useState(exchangeAccountData.apiSecret);
  const [passphrase, setPassphrase] = useState(exchangeAccountData.passphrase);
  const [name, setName] = useState(exchangeAccountData.name);
  const [nickname, setNickname] = useState(exchangeAccountData.nickname);
  const [exchange, setExchange] = useState<IExchangeAccountRequest>({
    exchangeType,
    apiKey,
    apiSecret,
    passphrase,
    name,
    nickname,
  });

  useEffect(() => {
    setExchange({
      exchangeType,
      apiKey,
      apiSecret,
      passphrase,
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
        <div
          onClick={() => handleUpdate()}
          className="center-my-children"
          style={{
            borderRadius: "3px",
            border: "1px solid black",
            height: "40px",
            backgroundColor: "green",
            color: "white",
          }}
        >
          <div style={{ cursor: "pointer" }}>
            {addingExchange ? "Updating..." : "Update"}
          </div>
        </div>
      </div>
    </form>
  );
};
