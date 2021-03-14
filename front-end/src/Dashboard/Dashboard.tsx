import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardWrapper } from './_styles';
import { IRootState } from '../_reducers';
import { MetaPortfolio } from '../Portfolio';
import { DashboardNoExchanges } from '../_components/Placeholders';
import { FlexCard } from '../_styles';

export const Dashboard = () => {
	const dispatch = useDispatch();

	const exchanges = useSelector(
		(state: IRootState) => state.exchanges.exchanges
	);

	return (
		<React.Fragment>
			{exchanges.length > 0 ? (
				<DashboardWrapper>
					<FlexCard style={{ gridArea: 'one' }}>
						<MetaPortfolio />
					</FlexCard>
					<FlexCard style={{ gridArea: 'two' }}>
						{/* <Typography variant={"h4"}>Add Integrations</Typography> */}
					</FlexCard>
					<FlexCard style={{ gridArea: 'three' }}>
						{/* <Typography variant={"h4"}></Typography> */}
					</FlexCard>
					<FlexCard style={{ gridArea: 'four' }}>
						{/* <Typography variant={"h4"}></Typography> */}
					</FlexCard>
					<FlexCard style={{ gridArea: 'five' }}>
						{/* <Typography variant={"h4"}></Typography> */}
					</FlexCard>
				</DashboardWrapper>
			) : (
				<DashboardNoExchanges />
			)}
		</React.Fragment>
	);
};
