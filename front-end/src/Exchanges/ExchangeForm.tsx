import React, { useState } from "react";
import "./ExchangeForm.scss";
import { exchangeService } from "../_services";
import {
  IExchangeAccountRequest,
  IExchangeAccount,
  IExchangeReference,
} from "../types";

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
  const data = formType == "add" ? addData : editData;

  const [exchangeType, setExchangeType] = useState(
    formType == "add" ? addData.id : editData.exchangeType
  );
  const [apiKey, setApiKey] = useState(editData ? editData.apiKey : "");
  const [apiSecret, setApiSecret] = useState(
    editData ? editData.apiSecret : ""
  );
  const [passphrase, setPassphrase] = useState(
    editData ? editData.passphrase : ""
  );
  const [name, setName] = useState(formType=="add" ? addData.name : editData.name);
  const [nickname, setNickname] = useState(formType == "add" ? data.name : editData.nickname);

  const { addNew, update } = exchangeService;

  const handleSubmit = async () => {
    const exchange: IExchangeAccountRequest = {
      exchangeType,
      apiKey,
      apiSecret,
      passphrase,
      name,
      nickname,
      logoUrl:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAYAAADhu0ooAAAAAXNSR0IArs4c6QAABNdJREFUaAXtWmtoHFUU/s7Mxia21JQ+IhER4qOBCIriA2PcjQX9URQsEmjxT/5YKxhQEdomobVpLEGs0D+CYAVBKluxIgg+qJsXqUaxiAgmtbUGgmBtrTZBs5md47luF2XdnTtzZ3YSZc6f4c79zuM7586dO/cOkEiSgSQDSQaSDMSXAYrPlXgaGN8IcjaD0SGtZoCbwNQE4oK0LwL0i1xn5P7ngDWJq1aMo+fu3+ReaKk90Re/WomFC0/DpW4h0BIoYqLfBX8MlnUYvfcdD6RbBq4d0ew3V2Dq3HapXp8Q3FDmN3iT6BPY9g7s7pgOrizjw0RJqzM03oxvf5oA86FISCqHzPfDdR/W+q4CiJ7o4OhtyC9Oir/bq/g0u02Q59g5YqYMpEwVK+q9MNwBx/1A+q6s2B/qJh1D36ZZUxPRVXTw0yY4yMoYqwFJoWfjoClJpRdNRbNsY2rkLSF5te9giM7JRCUzKn8tr5VipVxeK9NGm7xu7hE7d8hzeXmypBPYnTnh23YFYDREp0d6JahMBfv/vkX0IwjP4qZ0Fl2k3p+V5cBYCxbdHZK8Hnm9vFQZ5P9u+NfLy7lGXKIfJKDVPty+j8aGbYEWAQdyN2Bn5gyIXB/2q0LCP6Pz9KQvkkTvoXXDlkAkVdi7Or8LS1KZCVfRgxMNmMufFaKaBQGdRcOam/HcLfPK6VJIuIrOL27TkxRaNh5fSpIqseGIgh/0UZ3j6M187ANXU0g4ooy0PjrrVT2m9ghzovvG27TDlnAereverT0NvQdzolTIaM0zTaCrLa/FxQAIQZRv1cZn8aQWExPAnChjnTZGll2CZSJhiMq6VCO2O6NBxNZtTpR8VDSl9oGWh5gTZegruv7/QJSwxrtW5KC78w9vTHy9YSqqWbdyCmqDbJmIOVHgZy2HU5c0VddaiAwQgiif10bhOo1aTEwAc6JEeqIoXBMTD60bc6J+hi65d2ojiAlgTpRwWhsj011aTEwAc6KgYR8xtkPtEC4DMSe6uvkz2ctRh0DVhXk9poYfqg6Ir8ecaM+NCxKmfq+V8UR8dKp7MieqbBLnqpu+3EP0APaPqA3pJZVwRFN1b8jwXfRkoHbbXX4Nh06t8MTVuDMc0Z33zkh8R/Qxcit+nX3l7yMGvUbUiHBEVTS2NSRVZW1gzN0YHDkceBZ+PVevte0DEG4Du+Rg3/A7slH2SKnpeSU6KUdb27ErI/8peEgul8IYHpWJYAgWbUVfesIDre2Khqg64V5wTmp3BUvhFEfAmJDIwuYvYaVm4RQY5K4Fy2kac7vY2iKnbU1/qRAdRX+mq6Ruco2GqPI8OLoJBfcjCTD841DORJ1219W1oDgnlPf6akcXlPprxMLzvrwGBbEcauQLTwVV+yc+uoqWrA7k9sqQ21NqRneli1h1fTOeudZ7NVbFYXQVLTno79wrB7ePyTmdWjlFKNyIuTPGy8noiSpqfek3YafSMtl4z6xB0qASZ5v/ihD90C0PfiAnrwjsl+G8sbzLV7v44fC2JG0P+tPf+9KpAKo9UeVUfapNj7bLUnCzrI/Vv4ByQOUhRIrQF0LuQ/kf8GjgU/IKpuMhWu5YrXsvnF6JVF0DuL5enmcHVMiD8nmsum4OxS+jcq2knWQgyUCSgSQD/5kM/AkF2TZEiqtrJAAAAABJRU5ErkJggg==",
    };
    console.log(exchange);
    await addNew(exchange);
  };

  const handleUpdate = async () => {
    const exchange: IExchangeAccountRequest = {
      exchangeType,
      apiKey,
      apiSecret,
      passphrase,
      name,
      nickname,
      logoUrl: data.logoUrl,
    };
    const response = await update(editData.id, exchange);
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
          <div style={{ cursor: "pointer" }}>{formTypeData.buttonText}</div>
        </div>
      </div>
    </form>
  );
};
