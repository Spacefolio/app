import React, { useEffect, useState } from "react";
import { exchangeActions } from "../_actions";
import "./ExchangesPopup.scss";
import { AddExchangeForm, ExchangeItem } from "../Exchanges";
import { IExchangeAccountView, IExchangeReference } from "../../../types";
import { Modal } from "../_components";
import { useDispatch, useSelector } from "react-redux";

interface ExchangesPopupProps {}

export const ExchangesPopup: React.FC<ExchangesPopupProps> = ({}) => {
  const dispatch = useDispatch();

  const loadingExchanges = useSelector((state: any) => state.exchanges.loading);
  const userLinkedExchanges = useSelector(
    (state: any) => state.exchanges.exchanges
  );
  const exchangeRef = useSelector((state: any) => state.exchanges.exchangeRef);

  const [searchFilter, setSearchFilter] = useState("");
  const [addExchangeVisible, setAddExchangeVisible] = useState(false);
  const [addExchangeData, setAddExchangeData] = useState<IExchangeReference>(
    null
  );

  useEffect(() => {
    dispatch(exchangeActions.getAll());
    dispatch(exchangeActions.getRef());
  }, []);

  return (
    <div className="exchange-popup-wrapper">
      <div className="exchange-popup-inner-wrapper">
        <div className="my-exchanges-wrapper">
          <div>
            <h1 className="my-exchanges-label">My Exchanges</h1>
          </div>
          <div className="my-exchanges-list-container">
            {userLinkedExchanges.length != 0
              ? userLinkedExchanges.map((item: IExchangeAccountView) => {
                  return <ExchangeItem data={item} />;
                })
              : "You have no linked accounts... Add one below"}
          </div>
        </div>
        <Modal
          dismiss={() => {
            setAddExchangeVisible(false);
          }}
          children={<AddExchangeForm exchangeRefInfo={addExchangeData} />}
          visible={addExchangeVisible}
        />
        <div className="add-exchange-wrapper">
          <div>
            <input
              className="exchange-search-bar"
              name="search"
              type="text"
              placeholder="search"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
          </div>
          {exchangeRef.length != 0
            ? exchangeRef
                .filter((item: IExchangeReference) => {
                  if (searchFilter != "") {
                    return item.name
                      .toLowerCase()
                      .startsWith(searchFilter.toLowerCase());
                  } else return true;
                })
                .map((item: IExchangeReference) => {
                  return (
                    <div
                      onClick={() => {
                        setAddExchangeVisible(true);
                        setAddExchangeData(item);
                      }}
                      key={item.id}
                    >
                      <img src={item.logoUrl} /> {item.name}
                    </div>
                  );
                })
            : null}
        </div>
      </div>
    </div>
  );
};
