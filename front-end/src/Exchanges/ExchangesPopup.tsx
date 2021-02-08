import React, { useEffect, useState } from "react";
import { exchangeActions } from "../_actions";
import "./ExchangesPopup.scss";
import { ExchangeForm, ExchangeItem } from "../Exchanges";
import { IExchangeAccount, IExchangeReference } from "../types";
import { Modal } from "../_components";
import { useDispatch, useSelector } from "react-redux";

interface ExchangesPopupProps {}

export const ExchangesPopup: React.FC<ExchangesPopupProps> = ({}) => {
  const dispatch = useDispatch;

  const loadingExchanges = useSelector((state: any) => state.exchanges.loading);
  const userLinkedExchanges = useSelector((state: any) => state.exchanges.exchanges);

  const [exchangeRef, setExchangeRef] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");

  const [addExchangeVisible, setAddExchangeVisible] = useState(false);
  const [addExchangeData, setAddExchangeData] = useState<IExchangeReference>(
    null
  );

  // const { getAll, getInfo } = exchangeService;

  // const getExchangeRef = async () => {
  //   getInfo()
  //     .then((res: any) => {
  //       setExchangeRef(res.data.exchanges);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const getExchangeData = () => {
  //   getAll()
  //     .then((res: any) => {
  //       setUserLinkedExchanges(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  useEffect(() => {exchangeActions.getAll()}, []);

  return (
    <div className="exchange-popup-wrapper">
      <div className="exchange-popup-inner-wrapper">
        <div className="my-exchanges-wrapper">
          <div>
            <h1 className="my-exchanges-label">My Exchanges</h1>
          </div>
          <div className="my-exchanges-list-container">
            {
              //loop though all of the users linked exchanges and display them with an exchange component
               loadingExchanges != 0 ? (
                userLinkedExchanges.map((item: IExchangeAccount) => {
                  return <ExchangeItem data={item} />;
                })
              ) : (
                "You have no linked accounts... Add one below"
              )
            }
          </div>
        </div>
        <Modal
          dismiss={() => {
            setAddExchangeVisible(false);
          }}
          children={<ExchangeForm addData={addExchangeData} formType={"add"} />}
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
                    // return item.name.toLowerCase() == searchFilter.toLowerCase();
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
