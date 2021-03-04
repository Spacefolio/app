import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IPortfolioDataView } from "../../../types";
import { portfolioActions } from "../_actions";
import { IRootState } from "../_reducers";

interface Props {}
export const useFilteredPortfolioData = () => {
  
  const dispatch = useDispatch();
  
  const filterId = useSelector((state: IRootState) => state.portfolio.filterId);

  const portfolioData = useSelector(
    (state: IRootState) => state.portfolio.portfolioData
  );

  const [filteredPData, setFilteredPData] = useState<IPortfolioDataView>(null);

  useEffect(() => {
    console.log("test", portfolioData);
    if (filterId != "") {
      setFilteredPData(
        portfolioData.filter((portfolio: IPortfolioDataView) => {
          return portfolio.id == filterId;
        })[0]
      );
    } else {
      setFilteredPData(portfolioData[0]);
    }
    dispatch(portfolioActions.SetFilteredPortfolioData(filteredPData))
  }, [filterId, portfolioData]);

  return filteredPData;
};
