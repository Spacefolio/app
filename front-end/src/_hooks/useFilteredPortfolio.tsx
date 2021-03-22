import { dispatch } from 'd3-dispatch';
import { useRef, useEffect, RefObject, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { IPortfolioDataView } from '../../../types/portfolio.types';
import { portfolioActions } from '../_actions';
import { applicationViewActions } from '../_actions/applicationView.actions';
import { IRootState } from '../_reducers';

export const useFilteredPortfolio = (portfolioId: string) => {
	const portfolioData = useSelector(
		(state: IRootState) => state.portfolio.portfoliosData
	);

	const [filteredPortfolio, setFilteredPortfolio] = useState<
		IPortfolioDataView
	>(null);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(portfolioActions.refresh(portfolioId));
	}, [portfolioId]);

	useEffect(() => {
		if (portfolioData) {
			setFilteredPortfolio(
				portfolioData.filter((item) => item.id === portfolioId)[0]
			);
		}
	}, [portfolioData, portfolioId]);

	return filteredPortfolio;
};
