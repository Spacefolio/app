import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MetaPortfolioWrapper, PortfolioValueWrapper } from "./generalStyle";
import { FlexCard, SyncButton } from "../../_components";
import { portfolioService } from "../../_services";
import { alertActions } from "../../_actions";

export const MetaPortfolio = () => {
  const dispatch = useDispatch();
  const [isSyncing, setIsSyncing] = useState(false);

  return (
    <MetaPortfolioWrapper>
      <PortfolioValueWrapper>
        <div>Total Profit/Loss</div>
        <div>Profit/Loss %</div>
        <div>Current Portfolio Value</div>
        <div
          onClick={() => {
            setIsSyncing(true);
            portfolioService
              .syncExchanges()
              .then(() => {
                setIsSyncing(false);
                dispatch(alertActions.success("Sync Sucessful"));
              })
              .catch((err) => {
                console.log(err);
                dispatch(alertActions.error(err));
              });
          }}
          style={{ width: "1.5em" }}
        >
          <SyncButton isSyncing={isSyncing} />
          <div>{isSyncing ? "Syncing..." : null}</div>
        </div>
      </PortfolioValueWrapper>
      <div>Portfolio Chart</div>
    </MetaPortfolioWrapper>
  );
};
