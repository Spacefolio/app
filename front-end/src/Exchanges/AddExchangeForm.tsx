import React, { useState } from "react";
import "./AddExchangeForm.scss";
import { exchangeService } from "../_services";
import {exchangeData} from '../types'

interface AddExchangeFormProps {
  data?: exchangeData;
}

export const AddExchangeForm: React.FC<AddExchangeFormProps> = ({data}) => {
  const [apiKey, setApiKey] = useState(data?data.apiKey:"");
  const [apiSecret, setApiSecret] = useState(data?data.apiSecret:"");
  const [passphrase, setPassphrase] = useState(data?data.passphrase:"");
  const [name, setName] = useState(data?data.name:"");
  const [nickname, setNickname] = useState(data?data.nickname:"");

  const { addNew } = exchangeService;

  const handleSubmit = async () => {
    const exchange: exchangeData = {
      apiKey,
      apiSecret,
      passphrase,
      name: "test",
      nickname: "test",
    };
    const response = await addNew(exchange)
    console.log(response);
  };

  return (
    <form className="add-exchange-form">
      <div className="add-exchange-data-row">
        <label className="add-exchange-row-label">Exchange Name</label>
        <input
          name="name"
          onChange={(e) => setName(e.target.value)}
          type="text"
          value={name}
          className="add-exchange-row-input"
        />
      </div>
      <div className="add-exchange-data-row">
        <label className="add-exchange-row-label">Nickname</label>
        <input
          name="nickname"
          onChange={(e) => setNickname(e.target.value)}
          type="text"
          value={nickname}
          className="add-exchange-row-input"
        />
      </div>
      <div className="add-exchange-data-row">
        <label className="add-exchange-row-label">Api Key</label>
        <input
          name="apiKey"
          onChange={(e) => setApiKey(e.target.value)}
          type="text"
          value={apiKey}
          className="add-exchange-row-input"
        />
      </div>
      <div className="add-exchange-data-row">
        <label className="add-exchange-row-label">Api secret</label>
        <input
          name="apiSecret"
          onChange={(e) => setApiSecret(e.target.value)}
          type="text"
          value={apiSecret}
          className="add-exchange-row-input"
        />
      </div>
      <div className="add-exchange-data-row">
        <label className="add-exchange-row-label">Passphrase</label>
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
          onClick={() => handleSubmit()}
          className="center-my-children"
          style={{
            borderRadius: "3px",
            border: "1px solid black",
            height: "40px",
            backgroundColor: "green",
            color: "white",
          }}
        >
          <div>Submit</div>
        </div>
      </div>
    </form>
  );
};
