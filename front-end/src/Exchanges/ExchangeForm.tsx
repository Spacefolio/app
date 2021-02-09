import React, { useEffect, useState } from "react";
import "./ExchangeForm.scss";
import { exchangeActions } from "../_actions";
import {
  IExchangeAccountRequest,
  IExchangeAccount,
  IExchangeReference,
} from "../types";
import { useDispatch, useSelector } from "react-redux";

interface ExchangeFormProps {
  editData?: IExchangeAccount;
  addData?: IExchangeReference;
  formType: "add" | "edit";
}

export const ExchangeForm: React.FC<ExchangeFormProps> = ({
  editData,
  addData,
  formType,
}) => {
  const addingExchange = useSelector(
    (state: any) => state.exchanges.addingExchange
  );
  const dispatch = useDispatch();

  const data = formType == "add" ? addData : editData;
  const [exchangeType, setExchangeType] = useState(formType == "add" ? addData.id : editData.exchangeType);
  const [apiKey, setApiKey] = useState(editData ? editData.apiKey : "");
  const [apiSecret, setApiSecret] = useState(    editData ? editData.apiSecret : ""  );
  const [passphrase, setPassphrase] = useState(    editData ? editData.passphrase : ""  );
  const [name, setName] = useState(    formType == "add" ? addData.name : editData.name  );
  const [nickname, setNickname] = useState(    formType == "add" ? data.name : editData.nickname  );
  const [exchange, setExchange] = useState<any>();

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

  const handleSubmit = () => {
    dispatch(exchangeActions.addNew(exchange));
  };

  const handleUpdate = () => {
    dispatch(exchangeActions.update(exchange, editData.id));
  };

  const formTypeEdit = {
    formTitle: "Edit Exchange",
    buttonText: "Update",
    buttonAction: handleUpdate,
  };
  const formTypeAdd = {
    formTitle: "Add Exchange",
    buttonText: "Submit",
    buttonAction: handleSubmit,
  };
  const formTypeData = formType == "edit" ? formTypeEdit : formTypeAdd;

  return (
    <form className="add-exchange-form">
      <div>
        <h1>{formTypeData.formTitle}</h1>
      </div>
      <div className="add-exchange-data-row">
        <div>
          {name}
          <img src={data.logoUrl} />
        </div>
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
          onClick={() => formTypeData.buttonAction()}
          className="center-my-children"
          style={{
            borderRadius: "3px",
            border: "1px solid black",
            height: "40px",
            backgroundColor: "green",
            color: "white",
          }}
        >
          <div style={{ cursor: "pointer" }}>{formTypeData.buttonText}{addingExchange ? "ing...": null}</div>
          
        </div>
      </div>
    </form>
  );
};
