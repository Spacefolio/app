import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DashboardWrapper } from "./_styles";
import { FlexCard } from "../_styles";
import { IRootState } from "../_reducers";
import { MetaPortfolio } from "../Portfolio";
import { DashboardNoExchanges } from "../_components/Placeholders";

export const Dashboard = () => {
  const dispatch = useDispatch();

  const exchanges = useSelector(
    (state: IRootState) => state.exchanges.exchanges
  );

  return (
    <React.Fragment>
      {exchanges.length > 0 ? (
        <DashboardWrapper>
          <FlexCard style={{ gridArea: "one", flexDirection: "column" }}>
            {/* <Typography variant={"h4"}>Portfolio</Typography> */}
            {/* <PortfolioLineChart
          data={metaPortfolioChartData}
          width={size[0]}
          height={size[1]}
          id={"dashboardSummaryChart"}
        /> */}
            <MetaPortfolio />
          </FlexCard>
          <FlexCard style={{ gridArea: "two", flexDirection: "column" }}>
            {/* <Typography variant={"h4"}>Add Integrations</Typography> */}
          </FlexCard>
          <FlexCard style={{ gridArea: "three", flexDirection: "column" }}>
            {/* <Typography variant={"h4"}></Typography> */}
          </FlexCard>
          <FlexCard style={{ gridArea: "four", flexDirection: "column" }}>
            {/* <Typography variant={"h4"}></Typography> */}
          </FlexCard>
          <FlexCard style={{ gridArea: "five", flexDirection: "column" }}>
            {/* <Typography variant={"h4"}></Typography> */}
          </FlexCard>
        </DashboardWrapper>
      ) : ( 
        <DashboardNoExchanges />
      )}
    </React.Fragment>
  );
};
