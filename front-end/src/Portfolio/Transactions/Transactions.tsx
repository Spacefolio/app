import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IPortfolioDataView, ITransactionItemView } from '../../../../types';

import { useState } from 'react';

import { Filter, ViewLoading } from '../../_components';

import { IRootState } from '../../_reducers';
import { TransactionItem } from '.';

interface TransactionProps {
	data: ITransactionItemView[];
}

export const Transactions: React.FC<TransactionProps> = ({ data }) => {
	const dispatch = useDispatch();

	const [sortAscending, setSortAscending] = useState(false);

	return (
		<React.Fragment>
			{data != null ? (
				<Filter
					data={data}
					sortAscending={sortAscending}
					LineItemComponent={TransactionItem}
				/>
			) : (
				<ViewLoading />
			)}
		</React.Fragment>
	);
};
