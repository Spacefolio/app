import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Filter, ViewLoading } from '../../_components';
import { IPortfolioDataView } from '../../../../types';
import { OpenOrderItem } from './Line_item/OpenOrderItem';
import { IRootState } from '../../_reducers';
import { useFilteredPortfolio } from '../../_hooks/useFilteredPortfolio';

interface IOpenOrdersProps {
	PortfolioId: string;
}

export const OpenOrders: React.FC<IOpenOrdersProps> = ({ PortfolioId }) => {
	const dispatch = useDispatch();

	const data = useFilteredPortfolio(PortfolioId);

	const [sortAscending, setSortAscending] = useState(false);

	return (
		<React.Fragment>
			{data ? (
				<Filter
					data={data.openOrders}
					sortAscending={sortAscending}
					LineItemComponent={OpenOrderItem}
				/>
			) : (
				<ViewLoading />
			)}
		</React.Fragment>
	);
};
