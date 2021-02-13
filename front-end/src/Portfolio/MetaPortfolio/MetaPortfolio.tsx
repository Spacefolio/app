import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MetaPortfolioWrapper,
  PortfolioValueWrapper,
  MetaPortfolioChartWrapper,
} from "./generalStyle";
import { FlexCard, SyncButton } from "../../_components";
import { portfolioService } from "../../_services";
import { alertActions } from "../../_actions";
import { PortfolioLineChart } from "./MetaPortfolioChart";
import useDimensions from "react-use-dimensions";

export const MetaPortfolio = () => {
  const dispatch = useDispatch();
  const [isSyncing, setIsSyncing] = useState(false);
  const [data, setData] = useState<any>();
  const [ref, refSize] = useDimensions();


  const onSync = () => {
    setIsSyncing(true);
    portfolioService
      .syncExchanges()
      .then(() => {
        setIsSyncing(false);
        //dummy return data for testing
        setData({
          PValue: 6325.56,
          PLPercent: -32,
          PLValue: -2145.67,
        });
        dispatch(alertActions.success("Sync Sucessful"));
      })
      .catch((err) => {
        console.log(err);
        dispatch(alertActions.error(err));
      });
  };

  const portfolioValueItemStyler = (num: number) => {
    return num < 0
      ? { color: "var(--error-base)" }
      : { color: "var(--accent-base}" };
  };

  useEffect(() => {
    onSync();
  }, []);

  return (
    <MetaPortfolioWrapper>
      <PortfolioValueWrapper>
        {data ? (
          <React.Fragment>
            <div style={portfolioValueItemStyler(data.PValue)}>
              {data.PValue}
            </div>
            <div style={portfolioValueItemStyler(data.PLValue)}>
              {data.PLValue}
            </div>
            <div style={portfolioValueItemStyler(data.PLPercent)}>
              {data.PLPercent}
            </div>
          </React.Fragment>
        ) : (
          "Loading..."
        )}
        <div onClick={() => onSync()} style={{ width: "40px" }}>
          Refresh
          <SyncButton isSyncing={isSyncing} />
        </div>
      </PortfolioValueWrapper>

      <MetaPortfolioChartWrapper>
        <PortfolioLineChart
          width={200}
          height={100}
          id={"MetaportfolioChart"}
        />
      </MetaPortfolioChartWrapper>
      <div onClick={() => onSync()} style={{ width: "40px" }}>
        Sync
        <SyncButton isSyncing={isSyncing} />
      </div>
    </MetaPortfolioWrapper>
  );
};
