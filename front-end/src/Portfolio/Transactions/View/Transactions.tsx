import { Avatar, Typography } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React from "react";
import { ITransactionItemView } from "../../../../../types";
import { InlineDiv } from "../../../_styles";


interface ITransactionsProps {
	transactions: ITransactionItemView[];
}

export const Transactions: React.FC<ITransactionsProps> = ({
	transactions,
}) => {
	const rows = transactions.map((item, index: number) => {
		return {
			id: index,
			symbol: [item.logoUrl, `${item.symbol}/${item.quoteSymbol}`],
			date: new Date(item.date),
			amount: item.amount,
		};
	});

	const columns = [
		{
			field: 'symbol',
			headerName: 'Pair',
			width: 150,
			renderCell: (params: any) => (
				<InlineDiv>
					<Avatar sizes="small" src={params.value[0]} />
					<Typography>{params.value[1]}</Typography>
				</InlineDiv>
			),
		},
		{ field: 'date', headerName: 'Date', width: 100 },
		{ field: 'amount', headerName: 'Value', width: 100 },
	];

	return (
		<React.Fragment>
			<div style={{ height: '500px', width: '100%' }}>
				<DataGrid headerHeight={30} rows={rows} columns={columns} />
			</div>
		</React.Fragment>
	);
};
