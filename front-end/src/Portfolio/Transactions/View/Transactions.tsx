import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IPortfolioDataView, ITransactionItemView } from '../../../../../types';
import { TransactionItem } from './TransactionItem';

import { useState } from 'react';

import { Filter, ViewLoading } from '../../../_components';

import { IRootState } from '../../../_reducers';
import { useFilteredPortfolio } from '../../../_hooks/useFilteredPortfolio';

interface ITransactionsProps {
	PortfolioId: string;
}

export const Transactions: React.FC<ITransactionsProps> = ({ PortfolioId }) => {
	const dispatch = useDispatch();

	const data = useFilteredPortfolio(PortfolioId);

	const [sortAscending, setSortAscending] = useState(false);

	return (
		<React.Fragment>
			{data != null ? (
				<Filter
					data={data.transactionViewItems}
					sortAscending={sortAscending}
					LineItemComponent={TransactionItem}
				/>
			) : (
				<ViewLoading />
			)}
		</React.Fragment>
	);
};
