import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { exchangeService } from "../_services";
import "./ExchangesPopup.scss";

type exchangeData = {
  nickname: string;
  name: string;
  imageURL: string;
};

interface ExchangesPopupProps {}

export const ExchangesPopup: React.FC<ExchangesPopupProps> = ({}) => {
  const [exchangeData, setExchangeData] = useState([]);

  const { getAll } = exchangeService;

  useEffect(() => {
    getAll().then((data) => {
      setExchangeData(data);
    });
    console.log(exchangeData);
  }, []);

  return (
    <div className="exchange-popup-wrapper">
      <div className="my-exchanges-wrapper center-my-children-column">
        <div className="my-exchanges-label-container center-my-children">
          <div className="my-exchanges-label">My Exchanges</div>
        </div>
        <div className="my-exchanges-list-container">
          {
            //loop though all of the users linked exchanges and display them with an exchange component
            exchangeData ? <div>exchangeData</div> : "nothing here dawg"
          }
        </div>
      </div>
      <div className="add-exchange-wrapper">add exchange section</div>
    </div>
  );
};

interface ExchangeItemProps {}

const ExchangeItem: React.FC<ExchangeItemProps> = ({}) => {
  return <div></div>;
};
