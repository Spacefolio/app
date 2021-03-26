import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  ViewLoading } from '../../_components';
import { IOpenOrderItemView, IPortfolioDataView } from '../../../../types';
import { OpenOrderItem } from './Line_item/OpenOrderItem';
import { IRootState } from '../../_reducers';
import { useFilteredPortfolio } from '../../_hooks/useFilteredPortfolio';

interface IOpenOrdersProps {
	openOrders: IOpenOrderItemView[];
}

export const OpenOrders: React.FC<IOpenOrdersProps> = ({ openOrders }) => {
	const dispatch = useDispatch();

	const [sortAscending, setSortAscending] = useState(false);

	return (
		<React.Fragment>
			{/* {openOrders ? (
				// <Filter
				// 	data={openOrders}
				// 	sortAscending={sortAscending}
				// 	LineItemComponent={OpenOrderItem}
				// />
			) : (
				<ViewLoading />
			)} */}
		</React.Fragment>
	);
};
