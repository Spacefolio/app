import React, { useEffect, useState } from "react";
import { exchangeActions, portfolioActions } from "../_actions";
import "./ExchangesPopup.scss";
import { AddExchangeForm, EditExchangeForm, ExchangeItem } from "../Exchanges";
import { IExchangeAccountView, IExchangeReference } from "../../../types";
import { Modal } from "../_components";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../_reducers";
import { data } from "jquery";
import { PortfolioIcon } from "../_components/Icons";

interface ExchangesPopupProps {
  headerText?: string;
  myExchanges: boolean;
  addExchange: boolean;
}

export const ManageExchanges: React.FC<ExchangesPopupProps> = ({
  myExchanges,
  addExchange,
  headerText,
}) => {
  const dispatch = useDispatch();

  const loadingExchanges = useSelector((state: any) => state.exchanges.loading);
  const userLinkedExchanges = useSelector(
    (state: IRootState) => state.exchanges.exchanges
  );
  const exchangeRef = useSelector((state: any) => state.exchanges.exchangeRef);

  const [searchFilter, setSearchFilter] = useState("");
  const [addExchangeVisible, setAddExchangeVisible] = useState(false);
  const [addExchangeData, setAddExchangeData] = useState<IExchangeReference>(
    null
  );
  const portfolioFilterID = useSelector(
    (state: IRootState) => state.portfolio.filterPortfolio
  );

  useEffect(() => {
    dispatch(exchangeActions.getAll());
    dispatch(exchangeActions.getRef());
  }, []);

  const RenderExchangeItems = (
    <div className="my-exchanges-list-container">
      <div
        key={"AllAssets"}
        style={{
          width: "100%",
          padding: "10px 0px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderLeft:
            portfolioFilterID == "ALL" ? "3px solid var(--primary-base)" : "",
        }}
        onClick={() => dispatch(portfolioActions.FilterPortfolio("ALL"))}
      >
        <div
          style={{
            padding: "10px 0px",
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <PortfolioIcon width={25} height={25} />
          <div>All Assets</div>
        </div>
      </div>
      {userLinkedExchanges.length != 0
        ? userLinkedExchanges.map((item: IExchangeAccountView) => {
            return <ExchangeItem data={item} />;
          })
        : "You have no linked accounts... You should add one above"}
    </div>
  );

  const AddExchange = (
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
  );

  return (
    <div className="exchange-popup-wrapper">
      <div className="exchange-popup-inner-wrapper">
        <div className="my-exchanges-wrapper">
          <div>
            <h1 className="my-exchanges-label">{headerText}</h1>
          </div>
        </div>
        {myExchanges ? RenderExchangeItems : null}
        <Modal
          dismiss={() => {
            setAddExchangeVisible(false);
          }}
          visible={addExchangeVisible}
        >
          <AddExchangeForm exchangeRefInfo={addExchangeData} />
        </Modal>
        {addExchange ? AddExchange : null}
      </div>
    </div>
  );
};
