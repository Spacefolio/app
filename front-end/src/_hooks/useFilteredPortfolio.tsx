import { useRef, useEffect, RefObject, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { IPortfolioDataView } from '../../../types/portfolio.types';
import { IRootState } from '../_reducers';

export const useFilteredPortfolio = (portfolioId: string) => {
	const portfolioData = useSelector(
		(state: IRootState) => state.portfolio.portfoliosData
	);

	const [filteredPortfolio, setFilteredPortfolio] = useState<
		IPortfolioDataView
	>(null);

	useEffect(() => {
		if (portfolioData) {
			setFilteredPortfolio(
				portfolioData.filter((item) => item.id === portfolioId)[0]
			);
		}
	}, [portfolioData, portfolioId]);

	return filteredPortfolio;
};
