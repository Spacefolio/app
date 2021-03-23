import { ThemeProvider } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { theme } from '../_styles/Theme';
import { PortfolioSummary } from './Summary';
import { PortfolioWrapper, StyledTab, StyledTabs } from './_styles';

interface IPortfolioProps {}

export const Portfolio: React.FC<IPortfolioProps> = () => {
	const dispatch = useDispatch();

	const [value, setValue] = useState(0);

	const history = useHistory();

	const location = useLocation();

	const path = '/portfolio';

	const PortfolioTabs = (
		<StyledTabs
			value={value}
			indicatorColor="primary"
			onChange={(e, val) => {
				setValue(val);
			}}
		>
			<StyledTab
				onClick={() => history.push(`${path}/charts`)}
				label="Charts"
			></StyledTab>

			<StyledTab
				onClick={() => history.push(`${path}/assets`)}
				label="Holdings"
			></StyledTab>

			<StyledTab
				onClick={() => history.push(`${path}/transactions`)}
				label="Transactions"
			></StyledTab>

			<StyledTab
				onClick={() => history.push(`${path}/openorders`)}
				label="Open Orders"
			></StyledTab>
		</StyledTabs>
	);

	return (
		<ThemeProvider theme={theme}>
			<PortfolioWrapper>
				{/* <div>
          <ListMyExchanges enableEditing={false} />
        </div> */}
				{/* <FlexCard>{PortfolioTabs}</FlexCard> */}
				<Switch>
					<Route exact path={`${path}`}>
						<PortfolioSummary />
					</Route>
					<Route exact path={`${path}/transactions`}>
						{/* <Transactions  /> */}
					</Route>
					<Route exact path={`${path}/openorders`}>
						{/* <OpenOrders /> */}
					</Route>
				</Switch>
			</PortfolioWrapper>
		</ThemeProvider>
	);
};
